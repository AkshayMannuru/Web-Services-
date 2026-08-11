import os, glob, re

files = glob.glob('**/*.html', recursive=True)
print(f"Total HTML files found: {len(files)}")

legacy_query_count = 0
dot_html_href_count = 0

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = re.findall(r'href=["\']([^"\']*service-details[^"\']*)["\']', content)
    if matches:
        print(f"[LEGACY LINK] {fpath}: {matches}")
        legacy_query_count += len(matches)

    html_links = re.findall(r'href=["\']([^"\']+\.html[^"\']*)["\']', content)
    internal_html = [l for l in html_links if not l.startswith('http') and not l.startswith('//')]
    if internal_html:
        print(f"[DOT_HTML HREF] {fpath}: {internal_html}")
        dot_html_href_count += len(internal_html)

print(f"\nSummary:")
print(f"  Legacy service-details href count: {legacy_query_count}")
print(f"  Internal .html href count: {dot_html_href_count}")
