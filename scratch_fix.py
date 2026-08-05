import re
import urllib.parse

with open('services.html', 'r', encoding='utf-8') as f:
    content = f.read()

parts = content.split('<div class="service-detail-item')
for i in range(1, len(parts)):
    h3_match = re.search(r'<h3>(.*?)</h3>', parts[i])
    if h3_match:
        title = h3_match.group(1)
        encoded_title = urllib.parse.quote(title)
        parts[i] = parts[i].replace('href="service-details.html"', f'href="service-details.html?service={encoded_title}"')

new_content = '<div class="service-detail-item'.join(parts)
with open('services.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
