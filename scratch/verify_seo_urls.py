import os
import glob
import re
from xml.etree import ElementTree as ET

def verify():
    errors = []
    successes = []

    # 1. Check all HTML files in root and services subdirectories
    html_files = glob.glob("*.html") + glob.glob("services/*/*.html")
    
    print(f"Auditing {len(html_files)} HTML files...")

    titles = {}
    descriptions = {}
    canonicals = {}
    h1s = {}

    for fpath in html_files:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # Check internal links for legacy patterns
        legacy_matches = re.findall(r'href="[^"]*(?:\.html|\?service=|\%20|_[a-zA-Z0-9])', content)
        # Exclude valid external links or standard anchor tags if any
        bad_links = [m for m in legacy_matches if not m.startswith('href="http') and 'service-details.html' not in fpath]
        if bad_links:
            errors.append(f"[{fpath}] Found legacy link patterns: {bad_links[:3]}")
        
        # Check Title
        t_match = re.search(r'<title>(.*?)</title>', content)
        if t_match:
            title = t_match.group(1).strip()
            if title in titles:
                errors.append(f"[{fpath}] Duplicate title with {titles[title]}: '{title}'")
            else:
                titles[title] = fpath
        else:
            errors.append(f"[{fpath}] Missing <title> tag")

        # Check Description
        d_match = re.search(r'<meta name="description" content="(.*?)">', content)
        if d_match:
            desc = d_match.group(1).strip()
            if desc in descriptions and fpath != 'service-details.html':
                errors.append(f"[{fpath}] Duplicate description with {descriptions[desc]}: '{desc}'")
            else:
                descriptions[desc] = fpath
        else:
            errors.append(f"[{fpath}] Missing meta description")

        # Check Canonical
        c_match = re.search(r'<link rel="canonical" href="(.*?)">', content)
        if c_match:
            can = c_match.group(1).strip()
            if ".html" in can or "?service=" in can or "%20" in can:
                errors.append(f"[{fpath}] Invalid canonical format: {can}")
            canonicals[can] = fpath
        else:
            errors.append(f"[{fpath}] Missing canonical tag")

        # Check H1
        h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        if len(h1_matches) == 0:
            errors.append(f"[{fpath}] Missing <h1> tag")
        elif len(h1_matches) > 1:
            errors.append(f"[{fpath}] Multiple <h1> tags found ({len(h1_matches)})")

    # 2. Check Sitemap
    print("Auditing sitemap.xml...")
    tree = ET.parse("sitemap.xml")
    root = tree.getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [elem.text for elem in root.findall(".//sm:loc", ns)]

    for url in urls:
        if ".html" in url or "?service=" in url or "%20" in url:
            errors.append(f"[sitemap.xml] Unclean URL in sitemap: {url}")
    
    print(f"\n--- AUDIT RESULTS ---")
    if errors:
        print(f"Found {len(errors)} errors:")
        for err in errors:
            print("  [FAIL]", err)
    else:
        print("  [OK] All files passed automated SEO & URL architecture validation!")
        print(f"  Total Clean Canonical URLs verified: {len(canonicals)}")
        print(f"  Total Clean Titles verified: {len(titles)}")
        print(f"  Total Clean Descriptions verified: {len(descriptions)}")

if __name__ == "__main__":
    verify()
