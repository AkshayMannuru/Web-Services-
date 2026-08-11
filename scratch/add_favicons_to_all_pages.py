import os, glob, re

favicon_block = """<!-- Favicons & App Icons for Browsers & Google Search -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
"""

files = glob.glob('**/*.html', recursive=True)
updated_count = 0

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if favicon is already added
    if 'favicon.ico' in content or 'apple-touch-icon.png' in content:
        print(f"[SKIP] Already has favicon: {fpath}")
        continue
    
    # Insert right before </head>
    if '</head>' in content:
        new_content = content.replace('</head>', favicon_block + '</head>')
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[UPDATED] {fpath}")
        updated_count += 1
    else:
        print(f"[WARNING] No </head> tag found in {fpath}")

print(f"\nTotal files updated: {updated_count}/{len(files)}")
