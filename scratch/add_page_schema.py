"""
Add enhanced schema markup and internal linking to all HTML pages for Google sitelinks eligibility.
"""
import os, glob, re, json

DOMAIN = "https://localiqdigitalmedia.in"

# Page configs: path pattern -> (slug, title, description)
PAGE_CONFIGS = {
    "about.html": {
        "slug": "/about",
        "name": "About LocalIQ Digital Media",
        "description": "Learn about LocalIQ Digital Media — our team, values and approach to website development and digital solutions.",
        "breadcrumbs": [
            {"name": "Home", "item": "/"},
            {"name": "About", "item": "/about"}
        ]
    },
    "services/index.html": {
        "slug": "/services",
        "name": "Our Web Development Services",
        "description": "Explore all website development, SEO, UI/UX and digital services offered by LocalIQ Digital Media.",
        "breadcrumbs": [
            {"name": "Home", "item": "/"},
            {"name": "Services", "item": "/services"}
        ]
    },
    "portfolio.html": {
        "slug": "/portfolio",
        "name": "Our Portfolio",
        "description": "See our portfolio of websites, web apps and digital projects built by LocalIQ Digital Media.",
        "breadcrumbs": [
            {"name": "Home", "item": "/"},
            {"name": "Portfolio", "item": "/portfolio"}
        ]
    },
    "careers.html": {
        "slug": "/careers",
        "name": "Careers at LocalIQ Digital Media",
        "description": "Join the LocalIQ Digital Media team. Explore open positions in web development, design and digital marketing.",
        "breadcrumbs": [
            {"name": "Home", "item": "/"},
            {"name": "Careers", "item": "/careers"}
        ]
    },
    "contact.html": {
        "slug": "/contact",
        "name": "Contact LocalIQ Digital Media",
        "description": "Get in touch with LocalIQ Digital Media for website development, SEO and digital marketing enquiries.",
        "breadcrumbs": [
            {"name": "Home", "item": "/"},
            {"name": "Contact", "item": "/contact"}
        ]
    },
}

# Internal links footer snippet for extra internal link signals
INTERNAL_LINKS_COMMENT = """<!-- Internal Navigation Links for SEO -->"""

def build_schema(slug, name, description, breadcrumbs):
    bc_items = [
        {
            "@type": "ListItem",
            "position": i+1,
            "name": bc["name"],
            "item": DOMAIN + bc["item"]
        }
        for i, bc in enumerate(breadcrumbs)
    ]
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": DOMAIN + slug + "#webpage",
                "url": DOMAIN + slug,
                "name": name,
                "description": description,
                "isPartOf": {"@id": DOMAIN + "/#website"},
                "about": {"@id": DOMAIN + "/#organization"}
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": bc_items
            }
        ]
    }
    return json.dumps(schema, indent=2)


files_updated = 0

for rel_path, config in PAGE_CONFIGS.items():
    full_path = os.path.join(r"c:\Users\aksha\Downloads\files", rel_path)
    if not os.path.exists(full_path):
        print(f"[SKIP] Not found: {full_path}")
        continue

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Build new schema block
    schema_json = build_schema(config["slug"], config["name"], config["description"], config["breadcrumbs"])
    new_schema_block = f'<script type="application/ld+json">\n{schema_json}\n</script>'

    # Check if schema already exists
    existing_match = re.search(r'<script type="application/ld\+json">[\s\S]*?</script>', content)
    if existing_match:
        # Replace existing schema
        content = content[:existing_match.start()] + new_schema_block + content[existing_match.end():]
        print(f"[REPLACED SCHEMA] {rel_path}")
    else:
        # Insert before </head>
        content = content.replace("</head>", new_schema_block + "\n</head>")
        print(f"[ADDED SCHEMA] {rel_path}")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

    files_updated += 1

print(f"\nTotal files updated: {files_updated}")
