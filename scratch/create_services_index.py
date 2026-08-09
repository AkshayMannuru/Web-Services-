import os
import re

with open("services.html", "r", encoding="utf-8") as f:
    content = f.read()

# Update asset paths to work relative to services/ directory as well as root-relative
content = content.replace('href="styles.css?v=2.0"', 'href="../styles.css?v=2.0"')
content = content.replace('src="script.js?v=2.0"', 'src="../script.js?v=2.0"')
content = content.replace('src="logo.png?v=4.0"', 'src="../logo.png?v=4.0"')
content = content.replace('src="images/hero.jpg"', 'src="../images/hero.jpg"')

target_path = os.path.join("services", "index.html")
with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Created {target_path} successfully!")
