import os
import re

FILES = [
    "index.html",
    "services.html",
    "about.html",
    "careers.html",
    "contact.html",
    "portfolio.html",
    "service-details.html"
]

def update_file(filename):
    if not os.path.exists(filename):
        return
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Main Navigation & Page Canonical Links
    content = re.sub(r'href="index\.html"', 'href="/"', content)
    content = re.sub(r'href="about\.html"', 'href="/about"', content)
    content = re.sub(r'href="services\.html"', 'href="/services"', content)
    content = re.sub(r'href="careers\.html"', 'href="/careers"', content)
    content = re.sub(r'href="contact\.html"', 'href="/contact"', content)
    content = re.sub(r'href="portfolio\.html"', 'href="/portfolio"', content)

    # 2. Canonical Tags in Main Pages
    content = re.sub(r'<link rel="canonical" href="https://localiqdigitalmedia\.in/([^">]+)\.html">',
                     r'<link rel="canonical" href="https://localiqdigitalmedia.in/\1">', content)
    content = re.sub(r'<link rel="canonical" href="https://localiqdigitalmedia\.in/index">',
                     r'<link rel="canonical" href="https://localiqdigitalmedia.in/">', content)

    # 3. Footer Links Specific Replacement
    content = content.replace('<li><a href="/services">Business Website</a></li>', '<li><a href="/services/business-website-development">Business Website</a></li>')
    content = content.replace('<li><a href="/services">E-commerce Store</a></li>', '<li><a href="/services/ecommerce-website-development">E-commerce Store</a></li>')
    content = content.replace('<li><a href="/services">Restaurant Website</a></li>', '<li><a href="/services/restaurant-website-development">Restaurant Website</a></li>')
    content = content.replace('<li><a href="/services">Portfolio Website</a></li>', '<li><a href="/services/portfolio-website-development">Portfolio Website</a></li>')
    content = content.replace('<li><a href="/services">Website Redesign</a></li>', '<li><a href="/services/website-redesign">Website Redesign</a></li>')
    content = content.replace('<li><a href="/services">SEO Optimization</a></li>', '<li><a href="/services/seo-services">SEO Optimization</a></li>')
    content = content.replace('<li><a href="/services">Custom Development</a></li>', '<li><a href="/services/software-development">Custom Development</a></li>')

    # 4. Legacy Service Queries Replacement
    content = content.replace('service-details.html?service=Web%20Development', '/services/business-website-development')
    content = content.replace('service-details.html?service=Mobile%20App%20Development', '/services/mobile-app-development')
    content = content.replace('service-details.html?service=Mobile+App+Development', '/services/mobile-app-development')
    content = content.replace('service-details.html?service=Software%20Development', '/services/software-development')
    content = content.replace('service-details.html?service=Software+Development', '/services/software-development')
    content = content.replace('service-details.html?service=UI/UX%20Design', '/services/ui-ux-design')
    content = content.replace('service-details.html?service=UI%2FUX+%26+Figma+Design', '/services/ui-ux-design')
    content = content.replace('service-details.html?service=Figma%20Design', '/services/figma-design')
    content = content.replace('service-details.html?service=Digital%20Marketing', '/services/digital-marketing')
    content = content.replace('service-details.html?service=Content%20Creation', '/services/content-creation')
    content = content.replace('service-details.html?service=Software%20Testing', '/services/software-testing')

    # 5. Index.html Service Cards Wrapping
    if filename == "index.html":
        content = content.replace('<div class="service-card reveal" data-delay="0" aria-label="Business Website service">', '<a href="/services/business-website-development" class="service-card reveal" data-delay="0" aria-label="Business Website service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="1" aria-label="E-commerce Website service">', '<a href="/services/ecommerce-website-development" class="service-card reveal" data-delay="1" aria-label="E-commerce Website service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="2" aria-label="Restaurant Website service">', '<a href="/services/restaurant-website-development" class="service-card reveal" data-delay="2" aria-label="Restaurant Website service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="3" aria-label="Portfolio Website service">', '<a href="/services/portfolio-website-development" class="service-card reveal" data-delay="3" aria-label="Portfolio Website service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="4" aria-label="Website Redesign service">', '<a href="/services/website-redesign" class="service-card reveal" data-delay="4" aria-label="Website Redesign service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="5" aria-label="SEO Optimization service">', '<a href="/services/seo-services" class="service-card reveal" data-delay="5" aria-label="SEO Optimization service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="6" aria-label="Website Maintenance service">', '<a href="/services/website-maintenance" class="service-card reveal" data-delay="6" aria-label="Website Maintenance service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="7" aria-label="UI/UX & Figma Design service">', '<a href="/services/ui-ux-design" class="service-card reveal" data-delay="7" aria-label="UI/UX & Figma Design service" style="text-decoration:none; color:inherit; display:block;">')
        content = content.replace('<div class="service-card reveal" data-delay="8" aria-label="Custom Web Applications service">', '<a href="/services/software-development" class="service-card reveal" data-delay="8" aria-label="Custom Web Applications service" style="text-decoration:none; color:inherit; display:block;">')

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated links in {filename}")

if __name__ == "__main__":
    for fname in FILES:
        update_file(fname)
