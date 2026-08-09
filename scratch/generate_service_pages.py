import os

SERVICES = [
    {
        "slug": "software-development",
        "name": "Software Development",
        "title": "Software Development Services | LocalIQ Digital Media",
        "desc": "Custom software development, web applications, dashboards, API integrations, and enterprise software solutions by LocalIQ Digital Media.",
        "h1": "Custom Software Development Services",
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Custom Software", "Enterprise Solutions", "API Development", "Cloud Software", "Legacy Migration"]
    },
    {
        "slug": "business-website-development",
        "name": "Business Website Development",
        "title": "Business Website Development Services | LocalIQ Digital Media",
        "desc": "Professional business website development services tailored for small businesses, startups, and growing enterprises by LocalIQ Digital Media.",
        "h1": "Business Website Development Services",
        "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Frontend Development", "Backend Development", "CMS Development", "Responsive Design", "Web Maintenance"]
    },
    {
        "slug": "ecommerce-website-development",
        "name": "Ecommerce Website Development",
        "title": "Ecommerce Website Development | LocalIQ Digital Media",
        "desc": "Custom ecommerce website development, Shopify integration, online store design, and secure payment solutions by LocalIQ Digital Media.",
        "h1": "Ecommerce Website Development",
        "image": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Shopify Development", "Custom Cart Systems", "Payment Gateway Integration", "Inventory Management", "E-commerce SEO"]
    },
    {
        "slug": "restaurant-website-development",
        "name": "Restaurant Website Development",
        "title": "Restaurant Website Development | LocalIQ Digital Media",
        "desc": "High-converting restaurant website development with online menu display, table reservation integration, and local SEO for food businesses.",
        "h1": "Restaurant Website Development",
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Online Menus", "Table Reservations", "Local SEO", "Food Ordering Systems", "Mobile Optimization"]
    },
    {
        "slug": "portfolio-website-development",
        "name": "Portfolio Website Development",
        "title": "Portfolio Website Development | LocalIQ Digital Media",
        "desc": "Stunning portfolio website development for creatives, agencies, freelancers, and professionals to showcase work and convert clients.",
        "h1": "Portfolio Website Development",
        "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Creative Showcase", "Personal Branding", "Interactive Gallery", "Case Studies", "Lead Generation"]
    },
    {
        "slug": "website-redesign",
        "name": "Website Redesign",
        "title": "Website Redesign Services | LocalIQ Digital Media",
        "desc": "Modern website redesign services to update visual design, improve mobile responsiveness, boost page speed, and increase conversion rates.",
        "h1": "Website Redesign Services",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=100&w=3840&auto=format&fit=crop",
        "categories": ["UI Modernization", "Mobile Responsiveness", "Speed Optimization", "SEO Preservation", "Conversion Optimization"]
    },
    {
        "slug": "seo-services",
        "name": "SEO Services",
        "title": "SEO Services | LocalIQ Digital Media",
        "desc": "Professional search engine optimization (SEO) services to increase organic rankings, drive targeted traffic, and grow online visibility.",
        "h1": "Professional SEO Services",
        "image": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=100&w=3840&auto=format&fit=crop",
        "categories": ["On-Page SEO", "Technical SEO Audits", "Local SEO", "Keyword Research", "Link Building"]
    },
    {
        "slug": "website-maintenance",
        "name": "Website Maintenance",
        "title": "Website Maintenance Services | LocalIQ Digital Media",
        "desc": "Comprehensive website maintenance, security patches, regular backups, speed optimization, and ongoing technical support.",
        "h1": "Website Maintenance Services",
        "image": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Security Updates", "Automated Backups", "Performance Tuning", "Content Updates", "Technical Support"]
    },
    {
        "slug": "ui-ux-design",
        "name": "UI/UX Design",
        "title": "UI/UX Design Services | LocalIQ Digital Media",
        "desc": "User-centered UI/UX design, Figma wireframing, interactive prototyping, and design systems crafted for optimal conversion and usability.",
        "h1": "UI/UX & Figma Design Services",
        "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=100&w=3840&auto=format&fit=crop",
        "categories": ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"]
    },
    {
        "slug": "custom-web-application-development",
        "name": "Custom Web Application Development",
        "title": "Custom Web Application Development | LocalIQ Digital Media",
        "desc": "Scalable custom web application development tailored to streamline complex business workflows, SaaS platforms, and internal tools.",
        "h1": "Custom Web Application Development",
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=100&w=3840&auto=format&fit=crop",
        "categories": ["SaaS Applications", "Custom Dashboards", "Workflow Automation", "Cloud Integration", "API Development"]
    },
    {
        "slug": "mobile-app-development",
        "name": "Mobile App Development",
        "title": "Mobile App Development Services | LocalIQ Digital Media",
        "desc": "Native and cross-platform iOS and Android mobile app development engineered for performance, security, and exceptional user experience.",
        "h1": "Mobile App Development Services",
        "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=100&w=3840&auto=format&fit=crop",
        "categories": ["iOS App Development", "Android App Development", "Cross-Platform Apps", "App UI/UX", "App Maintenance"]
    },
    {
        "slug": "figma-design",
        "name": "Figma Design",
        "title": "Figma Design Services | LocalIQ Digital Media",
        "desc": "High-fidelity Figma web and mobile UI design, interactive prototypes, component libraries, and developer handoff assets.",
        "h1": "Figma Design & Wireframing Services",
        "image": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Design Systems", "Web Layouts", "Mobile App Design", "Interactive Prototypes", "Asset Handoff"]
    },
    {
        "slug": "digital-marketing",
        "name": "Digital Marketing",
        "title": "Digital Marketing Services | LocalIQ Digital Media",
        "desc": "Data-driven digital marketing campaigns, PPC advertising, social media strategy, and content marketing to maximize ROI.",
        "h1": "Digital Marketing Services",
        "image": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=100&w=3840&auto=format&fit=crop",
        "categories": ["SEO Optimization", "Social Media Marketing", "Content Strategy", "PPC Campaigns", "Email Marketing"]
    },
    {
        "slug": "content-creation",
        "name": "Content Creation",
        "title": "Content Creation Services | LocalIQ Digital Media",
        "desc": "Professional copywriting, blog writing, social media content, and visual assets designed to engage audiences and drive conversions.",
        "h1": "Content Creation Services",
        "image": "https://images.unsplash.com/photo-1542435503-956c25e1be8f?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Copywriting", "Blog Writing", "Video Production", "Graphic Design", "Social Media Posts"]
    },
    {
        "slug": "software-testing",
        "name": "Software Testing",
        "title": "Software Testing & QA Services | LocalIQ Digital Media",
        "desc": "Comprehensive automated and manual software testing, performance benchmarking, security vulnerability auditing, and QA consulting.",
        "h1": "Software Testing & QA Services",
        "image": "https://images.unsplash.com/photo-1516322311711-27d108ba3b25?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Automated Testing", "Manual Testing", "Performance Testing", "Security Testing", "QA Consulting"]
    },
    {
        "slug": "data-analysis",
        "name": "Data Analysis",
        "title": "Data Analysis Services | LocalIQ Digital Media",
        "desc": "Business intelligence, data visualization, predictive analytics, and automated reporting solutions by LocalIQ Digital Media.",
        "h1": "Data Analysis Services",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Business Intelligence", "Data Visualization", "Predictive Analytics", "Data Mining", "Reporting"]
    },
    {
        "slug": "cloud-devops",
        "name": "Cloud & DevOps",
        "title": "Cloud & DevOps Services | LocalIQ Digital Media",
        "desc": "Cloud infrastructure migration, CI/CD pipeline automation, Docker/Kubernetes management, and 24/7 server monitoring.",
        "h1": "Cloud & DevOps Services",
        "image": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Cloud Migration", "Infrastructure as Code", "Docker & Kubernetes", "CI/CD Automation", "Server Monitoring"]
    },
    {
        "slug": "cybersecurity",
        "name": "Cybersecurity",
        "title": "Cybersecurity Services | LocalIQ Digital Media",
        "desc": "Web application security audits, penetration testing, vulnerability assessment, and threat mitigation services by LocalIQ Digital Media.",
        "h1": "Cybersecurity Services",
        "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=100&w=3840&auto=format&fit=crop",
        "categories": ["Security Auditing", "Penetration Testing", "Vulnerability Assessment", "Threat Mitigation", "Compliance Checks"]
    }
]

def generate_service_html(s):
    cat_items = "".join([f'<li><a href="#" class="{"active" if i==0 else ""}">{cat}</a></li>' for i, cat in enumerate(s["categories"])])
    feat_items = "".join([f'<li style="color:#a1a1aa; margin-bottom:0.5rem; line-height:1.6;">Customized <strong>{cat}</strong> strategy & execution tailored to your business goals</li>' for cat in s["categories"][:4]])
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{s["title"]}</title>
  <meta name="description" content="{s["desc"]}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://localiqdigitalmedia.in/services/{s["slug"]}">

  <!-- OpenGraph -->
  <meta property="og:title" content="{s["title"]}">
  <meta property="og:description" content="{s["desc"]}">
  <meta property="og:url" content="https://localiqdigitalmedia.in/services/{s["slug"]}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="{s["image"]}">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6L6SNNJPHT"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-6L6SNNJPHT');
  </script>
  <meta name="google-site-verification" content="rEng8aMR0klDiC2g6esZni-jOf4PFhTVwuRrEy4fyG4">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="../../styles.css?v=2.0">
  
  <style>
    body[data-page="service-details"] .section {{
      background: #121212 !important;
    }}
    .page-header {{
      position: relative;
      overflow: hidden;
      padding: 150px 0 50px;
      text-align: center;
      background: #020818;
    }}
    .page-header .container {{
      position: relative;
      z-index: 1;
    }}
    .section-label {{
      color: #9ca3af;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }}
    .section-label::before,
    .section-label::after {{
      content: "";
      height: 1px;
      width: 60px;
    }}
    .section-label::before {{
      background: linear-gradient(to left, #6366f1, transparent);
    }}
    .section-label::after {{
      background: linear-gradient(to right, #6366f1, transparent);
    }}
    .page-header h1 {{
      font-size: 2.8rem;
      margin-bottom: 1rem;
      color: #ffffff;
      position: relative;
      z-index: 2;
    }}
    .breadcrumbs {{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.9rem;
      color: #9ca3af;
      margin-top: 1rem;
    }}
    .breadcrumbs a {{
      color: #60a5fa;
      text-decoration: none;
      transition: color 0.2s;
    }}
    .breadcrumbs a:hover {{
      color: #93c5fd;
      text-decoration: underline;
    }}
    .breadcrumbs .separator {{
      color: #4b5563;
    }}
    .breadcrumbs .current {{
      color: #e5e7eb;
      font-weight: 500;
    }}
    .service-content-wrapper {{
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      padding: 3rem 0;
    }}
    .service-body h2 {{
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #fff;
    }}
    .service-body p {{
      color: #a1a1aa;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }}
    .service-main-img {{
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 16px;
      margin-bottom: 2rem;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }}
    .sidebar-widget {{
      background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(18, 18, 22, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
    }}
    .sidebar-widget h3 {{
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: #fff;
    }}
    .category-list {{
      list-style: none;
      padding: 0;
    }}
    .category-list li {{
      margin-bottom: 0.75rem;
    }}
    .category-list a {{
      color: #e5e7eb;
      text-decoration: none;
      display: block;
      padding: 0.85rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      transition: 0.3s;
    }}
    .category-list a:hover, .category-list a.active {{
      background: rgba(59, 130, 246, 0.12);
      color: #60a5fa;
      border-left: 3px solid #6366f1;
    }}
    .contact-form-widget {{
      background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(18, 18, 22, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 2rem;
    }}
    .contact-form-widget h3 {{
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: #fff;
    }}
    @media (max-width: 991px) {{
      .service-content-wrapper {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>

  <!-- Structured Data: Service -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "{s["h1"]}",
    "serviceType": "{s["name"]}",
    "url": "https://localiqdigitalmedia.in/services/{s["slug"]}",
    "description": "{s["desc"]}",
    "provider": {{
      "@type": "Organization",
      "name": "LocalIQ Digital Media",
      "url": "https://localiqdigitalmedia.in/"
    }}
  }}
  </script>

  <!-- Structured Data: BreadcrumbList -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://localiqdigitalmedia.in/"
      }},
      {{
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://localiqdigitalmedia.in/services"
      }},
      {{
        "@type": "ListItem",
        "position": 3,
        "name": "{s["name"]}",
        "item": "https://localiqdigitalmedia.in/services/{s["slug"]}"
      }}
    ]
  }}
  </script>
</head>
<body data-page="service-details">
  <!-- NAVBAR -->
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a class="logo" href="/" style="flex-shrink:0;">
        <img src="../../logo.png?v=4.0" alt="LocaliQ Digital Media" class="logo-img">
      </a>
      <ul class="nav-links" id="navLinks">
        <li><a href="/" data-page="home"><i class="bi bi-house-door"></i> Home</a></li>
        <li><a href="/about" data-page="about"><i class="bi bi-info-circle"></i> About</a></li>
        <li><a href="/services" data-page="services" class="active"><i class="bi bi-grid-fill"></i> Services</a></li>
        <li><a href="/careers" data-page="careers"><i class="bi bi-briefcase-fill"></i> Careers</a></li>
        <li><a href="/contact" data-page="contact"><i class="bi bi-envelope-fill"></i> Contact</a></li>
      </ul>
      <a class="btn-nav" href="/contact" style="flex-shrink:0; white-space:nowrap;">Request a Website</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="page-header">
    <canvas id="aurora-canvas" aria-hidden="true"></canvas>
    <canvas id="particle-canvas" aria-hidden="true"></canvas>
    <div class="grid-overlay" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-3" aria-hidden="true"></div>
    <div class="hero-bg" id="heroBg" aria-hidden="true"></div>
    
    <div class="container">
      <div class="section-label">Service Overview</div>
      <h1 class="hero-title">{s["h1"]}</h1>
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="separator">&gt;</span>
        <a href="/services">Services</a>
        <span class="separator">&gt;</span>
        <span class="current">{s["name"]}</span>
      </nav>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <div class="service-content-wrapper">
        <div class="service-main-content">
          <img src="{s["image"]}" alt="{s["name"]} Illustration" class="service-main-img">
          <div class="service-body">
            <h2>We Ensure Best {s["name"]} Services</h2>
            <p>{s["desc"]}</p>
            <p>Our dedicated team employs state-of-the-art technology, industry best practices, and robust engineering workflows to build solutions engineered for performance, high speed, and maximum market reach. We work closely with your leadership team to craft scalable architectures tailored specifically to your objectives.</p>
            
            <h2 style="margin-top: 2rem;">What You Will Get</h2>
            <p>Choosing our {s["name"]} services ensures your business benefits from a end-to-end development cycle:</p>
            <ul style="padding-left: 1.5rem; margin-bottom: 2rem;">
              {feat_items}
              <li style="color:#a1a1aa; margin-bottom:0.5rem; line-height:1.6;">Dedicated Support Team available to address your inquiries and updates</li>
              <li style="color:#a1a1aa; margin-bottom:0.5rem; line-height:1.6;">Scalable & Secure Architecture engineered to grow with your enterprise</li>
            </ul>
          </div>
        </div>
        
        <div class="service-sidebar">
          <div class="sidebar-widget">
            <h3>Specializations</h3>
            <ul class="category-list">
              {cat_items}
            </ul>
          </div>

          <div class="contact-form-widget">
            <h3>Let's Talk</h3>
            <p style="color:#a1a1aa; font-size:0.9rem; margin-bottom:1rem;">Have a project in mind? Reach out to discuss your requirements and receive a custom estimate within 24 hours.</p>
            <ul style="color:#a1a1aa; font-size:0.88rem; padding-left:1rem; margin-bottom:1.5rem; line-height:2;">
              <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@localiqdigitalmedia.com" target="_blank" rel="noopener noreferrer" style="color:#a1a1aa;text-decoration:none;">📧 info@localiqdigitalmedia.com</a></li>
              <li>📞 +91 8121433370</li>
              <li>🕒 Mon – Sat: 9:30 AM – 6:00 PM</li>
            </ul>
            <a href="/contact" class="submit-btn" style="text-align:center; display:block; text-decoration:none; box-sizing:border-box;">Contact With Us</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Related Services -->
  <section class="related-services" style="padding: 4rem 0; background: #0a0a0d; border-top: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
      <h2 style="font-size: 2rem; color: #fff; margin-bottom: 2rem;">Related Services</h2>
      <div class="service-detail-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <div class="service-detail-item" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px;">
          <div class="service-detail-text">
            <h3 style="color: #fff; margin-bottom: 0.5rem;">Business Website Development</h3>
            <p style="color: #a1a1aa; font-size: 0.9rem; margin-bottom: 1rem;">Custom business websites engineered for speed, mobile responsiveness, and high conversion.</p>
            <a href="/services/business-website-development" class="discover-btn" style="color: #60a5fa; text-decoration: none; font-weight: 600;">Discover services &rarr;</a>
          </div>
        </div>
        <div class="service-detail-item" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px;">
          <div class="service-detail-text">
            <h3 style="color: #fff; margin-bottom: 0.5rem;">Ecommerce Website Development</h3>
            <p style="color: #a1a1aa; font-size: 0.9rem; margin-bottom: 1rem;">Online stores, custom shopping carts, and payment integrations built to sell products.</p>
            <a href="/services/ecommerce-website-development" class="discover-btn" style="color: #60a5fa; text-decoration: none; font-weight: 600;">Discover services &rarr;</a>
          </div>
        </div>
        <div class="service-detail-item" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px;">
          <div class="service-detail-text">
            <h3 style="color: #fff; margin-bottom: 0.5rem;">SEO Services</h3>
            <p style="color: #a1a1aa; font-size: 0.9rem; margin-bottom: 1rem;">Data-driven search engine optimization to boost your organic search rankings and traffic.</p>
            <a href="/services/seo-services" class="discover-btn" style="color: #60a5fa; text-decoration: none; font-weight: 600;">Discover services &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer" id="siteFooter">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="logo" href="/">
            <img src="../../logo.png?v=4.0" alt="LocaliQ Digital Media" class="logo-img">
          </a>
          <p>Affordable, professional web solutions for businesses of all sizes. We help businesses grow online.</p>
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61559983935950" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/localiq1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="https://x.com/LocaliqM" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><i class="bi bi-twitter-x"></i></a>
            <a aria-label="LinkedIn" style="pointer-events: none; cursor: default;" onclick="event.preventDefault();"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="/services/business-website-development">Business Website</a></li>
            <li><a href="/services/ecommerce-website-development">E-commerce Store</a></li>
            <li><a href="/services/restaurant-website-development">Restaurant Website</a></li>
            <li><a href="/services/portfolio-website-development">Portfolio Website</a></li>
            <li><a href="/services/website-redesign">Website Redesign</a></li>
            <li><a href="/services/seo-services">SEO Optimization</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul class="contact-info">
            <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@localiqdigitalmedia.com" target="_blank" rel="noopener noreferrer">📧 info@localiqdigitalmedia.com</a></li>
            <li><a href="tel:+918121433370">📞 +918121433370</a></li>
            <li><a href="https://maps.google.com/?q=Patancheruvu,Hyderabad,Telangana,India" target="_blank" rel="noopener noreferrer">📍 Patancheruvu</a></li>
            <li><a href="https://wa.me/918121433370" target="_blank" rel="noopener noreferrer" class="whatsapp-link">💬 WhatsApp Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 LocaliQ Digital Media. All rights reserved.</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </div>
  </footer>

  <script src="../../script.js?v=2.0"></script>
</body>
</html>
'''
    return html

def main():
    base_dir = os.path.join(os.getcwd(), "services")
    os.makedirs(base_dir, exist_ok=True)
    
    for s in SERVICES:
        dir_path = os.path.join(base_dir, s["slug"])
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, "index.html")
        html_content = generate_service_html(s)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Generated: {file_path}")

if __name__ == "__main__":
    main()
