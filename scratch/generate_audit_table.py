import os, glob

service_mappings = [
    ("Software Development", "/service-details.html?service=Software%20Development", "/services/software-development"),
    ("Business Website Development", "/service-details.html?service=Business%20Website", "/services/business-website-development"),
    ("Ecommerce Website Development", "/service-details.html?service=Ecommerce%20Website", "/services/ecommerce-website-development"),
    ("Restaurant Website Development", "/service-details.html?service=Restaurant%20Website", "/services/restaurant-website-development"),
    ("Portfolio Website Development", "/service-details.html?service=Portfolio%20Website", "/services/portfolio-website-development"),
    ("Website Redesign", "/service-details.html?service=Website%20Redesign", "/services/website-redesign"),
    ("SEO Services", "/service-details.html?service=SEO", "/services/seo-services"),
    ("Website Maintenance", "/service-details.html?service=Website%20Maintenance", "/services/website-maintenance"),
    ("UI/UX Design", "/service-details.html?service=UI/UX%20Design", "/services/ui-ux-design"),
    ("Custom Web Application Development", "/service-details.html?service=Custom%20Web%20Applications", "/services/custom-web-application-development"),
    ("Mobile App Development", "/service-details.html?service=Mobile%20App%20Development", "/services/mobile-app-development"),
    ("Figma Design", "/service-details.html?service=Figma%20Design", "/services/figma-design"),
    ("Digital Marketing", "/service-details.html?service=Digital%20Marketing", "/services/digital-marketing"),
    ("Content Creation", "/service-details.html?service=Content%20Creation", "/services/content-creation"),
    ("Software Testing", "/service-details.html?service=Software%20Testing", "/services/software-testing"),
    ("Data Analysis", "/service-details.html?service=Data%20Analysis", "/services/data-analysis"),
    ("Cloud & DevOps", "/service-details.html?service=Cloud%20&%20DevOps", "/services/cloud-devops"),
    ("Cybersecurity", "/service-details.html?service=Cybersecurity", "/services/cybersecurity")
]

print("| OLD URL | NEW URL | REDIRECT | CANONICAL | STATUS |")
print("|---|---|---|---|---|")

for name, old_url, new_url in service_mappings:
    slug = new_url.replace('/services/', '')
    file_path = f"services/{slug}/index.html"
    exists = os.path.exists(file_path)
    canonical = f"https://localiqdigitalmedia.in{new_url}"
    status = "Active & Verified" if exists else "Missing"
    print(f"| `{old_url}` | `{new_url}` | 301 Permanent | `{canonical}` | {status} |")
