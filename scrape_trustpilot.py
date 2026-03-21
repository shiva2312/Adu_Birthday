"""
Trustpilot Review Scraper for HSBC
Scrapes all available customer reviews and saves to Excel.
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json
import re

BASE_URL = "https://www.trustpilot.com/review/www.hsbc.co.uk"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def scrape_page(page_num):
    """Scrape a single page of reviews using __NEXT_DATA__ JSON."""
    url = f"{BASE_URL}?page={page_num}" if page_num > 1 else BASE_URL
    print(f"  Fetching page {page_num}...")

    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    reviews = []
    total_pages = 1

    # Primary: extract from __NEXT_DATA__ (richest data source)
    next_data_script = soup.find("script", id="__NEXT_DATA__")
    if next_data_script:
        data = json.loads(next_data_script.string)
        page_props = data.get("props", {}).get("pageProps", {})

        # Get total pages from filters
        total_pages = page_props.get("filters", {}).get("pagination", {}).get("totalPages", 1)

        for review in page_props.get("reviews", []):
            consumer = review.get("consumer", {})
            labels = review.get("labels", {})
            verification = labels.get("verification", {})

            reviews.append({
                "Author": consumer.get("displayName", ""),
                "Country": consumer.get("countryCode", ""),
                "Review Count": consumer.get("numberOfReviews", ""),
                "Rating": review.get("rating", ""),
                "Title": review.get("title", ""),
                "Review Text": review.get("text", ""),
                "Date": review.get("dates", {}).get("publishedDate", ""),
                "Experience Date": review.get("dates", {}).get("experiencedDate", ""),
                "Verified": "Yes" if verification.get("isVerified") else "No",
                "Verification Source": verification.get("verificationSource", ""),
                "Language": review.get("language", ""),
                "Likes": review.get("likes", 0),
                "Review ID": review.get("id", ""),
            })

    # Fallback: JSON-LD
    if not reviews:
        for script in soup.find_all("script", type="application/ld+json"):
            try:
                ld_data = json.loads(script.string)
                if isinstance(ld_data, dict) and ld_data.get("@type") == "LocalBusiness":
                    for review in ld_data.get("review", []):
                        reviews.append({
                            "Author": review.get("author", {}).get("name", ""),
                            "Country": "",
                            "Review Count": "",
                            "Rating": review.get("reviewRating", {}).get("ratingValue", ""),
                            "Title": review.get("headline", ""),
                            "Review Text": review.get("reviewBody", ""),
                            "Date": review.get("datePublished", ""),
                            "Experience Date": "",
                            "Verified": "",
                            "Verification Source": "",
                            "Language": review.get("inLanguage", ""),
                            "Likes": "",
                            "Review ID": "",
                        })
            except (json.JSONDecodeError, TypeError):
                continue

    return reviews, total_pages


def main():
    print("=" * 60)
    print("Trustpilot HSBC Review Scraper")
    print("=" * 60)
    print(f"\nTarget: {BASE_URL}\n")

    # Fetch first page to determine total pages
    first_page_reviews, total_pages = scrape_page(1)
    print(f"\n  Found {total_pages} pages of reviews")

    all_reviews = first_page_reviews
    print(f"  Page 1: {len(first_page_reviews)} reviews collected")

    # Scrape remaining pages (stop after 3 consecutive empty pages — Trustpilot rate-limits)
    consecutive_empty = 0
    for page in range(2, total_pages + 1):
        time.sleep(2)  # Be respectful with rate limiting
        try:
            page_reviews, _ = scrape_page(page)
            if not page_reviews:
                consecutive_empty += 1
                print(f"  Page {page}: 0 reviews (blocked/empty)")
                if consecutive_empty >= 3:
                    print(f"\n  Stopped: Trustpilot is rate-limiting after page {page - 2}.")
                    print(f"  Collected {len(all_reviews)} reviews total.")
                    break
                continue
            consecutive_empty = 0
            all_reviews.extend(page_reviews)
            print(f"  Page {page}: {len(page_reviews)} reviews (total: {len(all_reviews)})")
        except Exception as e:
            print(f"  Page {page}: Error - {e}")
            consecutive_empty += 1
            if consecutive_empty >= 3:
                break
            continue

    if not all_reviews:
        print("\nNo reviews were scraped. Trustpilot may be blocking the request.")
        return

    df = pd.DataFrame(all_reviews)

    # Clean up data types
    df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce")
    df["Likes"] = pd.to_numeric(df["Likes"], errors="coerce").fillna(0).astype(int)
    for date_col in ["Date", "Experience Date"]:
        df[date_col] = pd.to_datetime(df[date_col], errors="coerce", utc=True)
        df[date_col] = df[date_col].dt.strftime("%Y-%m-%d")

    output_file = "HSBC_Trustpilot_Reviews.xlsx"

    with pd.ExcelWriter(output_file, engine="openpyxl") as writer:
        # Main reviews sheet
        df.to_excel(writer, sheet_name="All Reviews", index=False)

        # Adjust column widths
        ws = writer.sheets["All Reviews"]
        col_widths = {
            "A": 20, "B": 10, "C": 14, "D": 8, "E": 40,
            "F": 60, "G": 12, "H": 15, "I": 10, "J": 18,
            "K": 10, "L": 8, "M": 28,
        }
        for col, width in col_widths.items():
            ws.column_dimensions[col].width = width

        # Summary sheet
        summary_data = {
            "Metric": [
                "Total Reviews Scraped",
                "Average Rating",
                "5-Star Reviews",
                "4-Star Reviews",
                "3-Star Reviews",
                "2-Star Reviews",
                "1-Star Reviews",
                "Verified Reviews",
                "Reviews With Text",
                "Most Common Country",
                "Total Likes",
                "Date Range (Earliest)",
                "Date Range (Latest)",
            ],
            "Value": [
                len(df),
                f"{df['Rating'].mean():.2f}",
                int((df["Rating"] == 5).sum()),
                int((df["Rating"] == 4).sum()),
                int((df["Rating"] == 3).sum()),
                int((df["Rating"] == 2).sum()),
                int((df["Rating"] == 1).sum()),
                int((df["Verified"] == "Yes").sum()),
                int(df["Review Text"].notna().sum() - (df["Review Text"] == "").sum()),
                df["Country"].mode().iloc[0] if not df["Country"].mode().empty else "N/A",
                int(df["Likes"].sum()),
                df["Date"].min() if df["Date"].notna().any() else "N/A",
                df["Date"].max() if df["Date"].notna().any() else "N/A",
            ],
        }
        summary_df = pd.DataFrame(summary_data)
        summary_df.to_excel(writer, sheet_name="Summary", index=False)
        ws2 = writer.sheets["Summary"]
        ws2.column_dimensions["A"].width = 28
        ws2.column_dimensions["B"].width = 18

    print(f"\n{'=' * 60}")
    print(f"DONE! Saved {len(df)} reviews to: {output_file}")
    print(f"Average Rating: {df['Rating'].mean():.2f} / 5")
    print(f"\nRating Distribution:")
    for star in range(5, 0, -1):
        count = int((df["Rating"] == star).sum())
        bar = "█" * (count * 40 // max(1, len(df)))
        print(f"  {star}★: {count:>4} {bar}")
    print(f"\nSheets: 'All Reviews' + 'Summary'")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
