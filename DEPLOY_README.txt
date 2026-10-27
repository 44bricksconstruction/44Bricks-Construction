44 BRICKS WEBSITE — GOING LIVE (cPanel)
=======================================

WHAT'S IN THIS FOLDER
  index.html                    → entry point (opens the home page)
  44 Bricks Website.dc.html     → Home
  About / Services / Team / Projects / Project / Hub / Contact .dc.html → inner pages
  Brand Film.dc.html            → the 28-second brand animation (embedded on Home)
  Header.dc.html, Footer.dc.html→ shared header and footer
  support.js, site-data.js, fx3d.js, three.min.js,
  animations-v3.jsx, tweaks-panel.jsx, brand-film.jsx → site code (keep together)
  assets/                       → all photos and logos
  videos/                       → the four project films
  contact.php                   → emails every form to info@44bricksconstruction.com
  .htaccess                     → correct file types + default page

UPLOAD
  1. cPanel → File Manager → open public_html (delete the old index.html first).
  2. Upload EVERYTHING in this folder, keeping assets/ and videos/ as folders.
     Tip: upload the .zip, then right-click → Extract inside public_html.
  3. Visit https://44bricksconstruction.com — the site is live.
  4. Submit one form yourself and confirm the email arrives.

FORMS → info@44bricksconstruction.com + 44bricksconstruction@gmail.com
  Every form posts to /contact.php, which emails info@44bricksconstruction.com AND 44bricksconstruction@gmail.com
  with Reply-To set to the visitor's email:
    • Start your project (4-step brief)      — Contact page
    • Book a consultation                    — Contact, Property Hub, Home
    • Book a site visit                      — Contact
    • Register interest                      — Contact, each Project page, Home
    • Careers & partners                     — Contact
    • Request a quote                        — Home
    • Newsletter / project updates           — footer on every page
  If /contact.php can't be reached, the visitor's email app opens pre-filled.

ENQUIRY WORKFLOW (automatic, every form)
  1. Visitor submits → gets an on-screen reference number (e.g. 44B-261018-A3F9).
  2. info@44bricksconstruction.com receives the enquiry; subject starts with
     the reference; Reply-To is the visitor, so just press Reply.
  3. The visitor receives an automatic confirmation email with the reference
     and the next steps (review within 1 working day → call/site visit → quote).
     Turn off: set $AUTOREPLY = false in contact.php.
  4. Every enquiry is also saved to public_html/leads/leads.csv (blocked from
     the public; download it from cPanel File Manager and open in Excel).
  5. Spam protection: hidden honeypot field + max 6 submissions per 10 min per visitor.

IF EMAILS DON'T ARRIVE
  • Check spam first.
  • In cPanel → Email Accounts, create website@44bricksconstruction.com
    (contact.php sends From that address), or edit $FROM in contact.php.
  • If your host blocks PHP mail(), ask for the SMTP (PHPMailer) version.

WWW vs NON-WWW
  contact.php accepts both 44bricksconstruction.com and www.44bricksconstruction.com.

NOTES
  • The site needs an internet connection for fonts and its page runtime (loaded
    from public CDNs) — normal for any hosted site.
  • To replace the animated brand film with a video file: export it to MP4,
    upload as videos/brand_film.mp4, and ask to swap the embed.

PRE-RENDERED PAGES (search engines & link previews)
  The page files in this folder contain a ready-made static copy of each page,
  so Google, WhatsApp/LinkedIn previews and AI tools read real text instead of
  template code like {{ statusQuote }}. Visitors' browsers swap in the live,
  interactive page automatically. Always upload THIS folder — not the editor files.

AFTER UPLOADING
  • Delete the old files on the server first, then upload, so nothing stale remains.
  • If you use Cloudflare: Caching → Configuration → Purge Everything.

WHATSAPP
  Every page has a floating WhatsApp button and WhatsApp links (header menu,
  footer, Home contact, Contact page) → chat with +233 54 310 0015, pre-filled
  with "Hello 44 BRICKS, I'd like a construction quote."

SEO & EXTRAS (already included)
  • Clean addresses: /about /services /team /projects /project?p=nakos-place /hub /contact /privacy
    (handled by .htaccess; the old .dc.html addresses still work).
  • https + non-www enforced automatically.
  • Link previews (WhatsApp, Facebook, LinkedIn, X) use assets/og-image.jpg.
  • Google business details (structured data) on the home page.
  • Browser tab icon, phone home-screen icon (site.webmanifest).
  • sitemap.xml + robots.txt  → submit https://44bricksconstruction.com/sitemap.xml
    in Google Search Console (search.google.com/search-console).
  • Branded 404.html "page not found".
  • Privacy Policy page, linked in every footer.

GOOGLE ANALYTICS
  Connected: G-F08GTNKPEC (tag is in the <head> of every page). Check Realtime in Google Analytics after upload.
  Tracks visits, form leads (generate_lead) and WhatsApp/phone/email/social clicks.
