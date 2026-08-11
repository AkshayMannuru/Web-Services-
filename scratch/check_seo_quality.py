import os, glob, re

files = sorted(glob.glob('**/*.html', recursive=True))

titles = {}
descriptions = {}
canonicals = {}
h1s = {}

for fpath in files:
    if fpath == 'service-details.html':
        continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    t_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    title = t_match.group(1).strip() if t_match else "MISSING TITLE"
    titles[fpath] = title
    
    d_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE | re.DOTALL)
    if not d_match:
        d_match = re.search(r'<meta\s+content=["\'](.*?)["\']\s+name=["\']description["\']', content, re.IGNORECASE | re.DOTALL)
    desc = d_match.group(1).strip() if d_match else "MISSING DESCRIPTION"
    descriptions[fpath] = desc

for fpath, title in titles.items():
    if fpath.startswith('services'):
        print(f"{fpath:<60} | Title: {title}")
        print(f"{' '*60} | Desc:  {descriptions[fpath]}")
        print("-" * 120)
