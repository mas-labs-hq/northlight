==========================================================
Northlight Hospital - 24 Hour Private Hospital
Eastleigh, Nairobi
README-SETUP (v1.0)
==========================================================

WHAT'S IN THIS PACKAGE
----------------------
  index.html            Homepage: hero, services, about,
                        booking form, blog teaser, contact
  blog.html             Blog listing (3 articles)
  blog-er.html          Article: emergency warning signs
  blog-antenatal.html   Article: first antenatal visit
  blog-fever.html       Article: child fever guide
  css/styles.css        Full design system (v1.0.0)
  js/main.js            Loader, nav, booking, protection
  images/               14 optimized photos (45-113KB each)
  icons/                Favicons, apple-touch, og-image
  README-SETUP.txt      This file

HOW TO PUBLISH (GitHub Pages)
-----------------------------
  1. Create a repository (e.g. northlight-hospital).
  2. Upload ALL files and folders from this package to
     the ROOT of the repository (do not nest them in a
     subfolder).
  3. Settings -> Pages -> Deploy from branch ->
     Branch: main, Folder: / (root) -> Save.
  4. Your site goes live within 1-2 minutes.
  5. When you buy the domain, add it under
     Settings -> Pages -> Custom domain, and set a CNAME
     record at your domain provider pointing to
     <your-user>.github.io.

CONNECTING THE BOOKING FORM TO FORMSPREE (LATER)
------------------------------------------------
  The booking form currently shows a beautiful success
  message locally (it "works" for demo purposes). When
  the client approves, connect it for real:

  1. Create a free account at formspree.io and create
     a new form. You get an endpoint like:
     https://formspree.io/f/abcdwxyz
  2. Open index.html and find this line:
        <form id="booking-form" data-endpoint="" novalidate>
  3. Put your endpoint inside the quotes:
        data-endpoint="https://formspree.io/f/abcdwxyz"
  4. Save and re-upload index.html. Done.

  Every booking will then arrive in the client's email
  inbox with name, phone, service, date, time and notes.
  The success screen on the website stays exactly as it
  is either way.

KEY DETAILS BAKED INTO THE SITE
-------------------------------
  Phones:      +254 745 190190 (main)
               +254 722 142090
               +254 722 102050
  WhatsApp:    wa.me/254745190190 (floating button, ripples)
  Address:     Muyuyu Avenue, off Yusuf Haji Avenue,
               Al-Mujtama Apartments, Eastleigh, Nairobi
  Plus Code:   PRHX+CW8, Nairobi
  Coordinates: 1 16'17.0"S 36 50'58.9"E
               (-1.271389, 36.849694)
  Directions:  "Get Directions" buttons open Google Maps
               directions straight to the hospital
  Hours:       Open 24 hours, Monday to Sunday
  Payments:    Credit cards, debit cards, NFC mobile

DESIGN NOTES
------------
  - Clean, calming, luxurious light theme
  - Fonts: Fraunces (headings), Manrope (body),
    Satisfy (the handwritten "Powered By MortApps
    Studios" signature, like La Peris Cars)
  - 2.8 second hospital loading screen with ECG
    heartbeat line, pulse rings and progress bar,
    perfectly centered on mobile
  - Floating WhatsApp button with soft ripple rings
    (pure CSS, GPU friendly, will not slow phones)
  - Right-click and dev-tools keyboard shortcuts are
    blocked (deterrent level protection)
  - Images are pre-optimized (total under 1MB),
    lazy-loaded below the fold, hero is preloaded
  - Works beautifully on PC, tablets and phones

CHANGING CONTENT
----------------
  - Phone numbers: search for "745 190190" and
    "254745190190" across the HTML files.
  - Colors: edit the :root variables at the top of
    css/styles.css (--primary, --accent, etc).
  - Blog posts: each is a standalone HTML file; copy
    one to create a new article and add its card to
    blog.html.

Version 1.0 - built by MortApps Studios
