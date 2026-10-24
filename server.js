/**
 * ASMI - Haute Joaillerie Universal Local & Cloud Persistence Server
 * 
 * High-performance, zero-dependency Node.js HTTP & REST API server.
 * Persists all admin changes, product catalogs, customer orders, reviews,
 * categories, SEO settings, and image uploads to local JSON databases.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.log('[ASMI Mailer] nodemailer loaded in fallback logging mode.');
}

const PORT = parseInt(process.env.PORT, 10) || 8000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets', 'images');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// -----------------------------------------------------------------------------
// DEFAULT DATA SEEDING
// -----------------------------------------------------------------------------
const DEFAULT_SETTINGS = {
  activeThemeId: "theme-noir-gold",
  siteTitle: "ASMI's Collection | Luxury Pearls, Emeralds & Fine Handcrafted Jewelry",
  metaDescription: "Explore ASMI's Collection of luxury handcrafted jewelry, glowing South Sea pearls, rich green emeralds, and sparkling American diamonds.",
  metaKeywords: "luxury jewelry, basra pearls, emerald choker, bis hallmark, diamonds, royal kundan, 22k gold, handcrafted necklaces",
  canonicalUrl: "https://asmijewelry.com/",
  authorName: "ASMI Haute Joaillerie Atelier",
  robotsIndex: "index, follow",
  revisitAfter: "3 days",
  contentLanguage: "en-IN",
  geoRegion: "IN-MH",
  geoPlacename: "Mumbai, Maharashtra",
  geoPosition: "18.9220;72.8347",
  geoICBM: "18.9220, 72.8347",
  googleVerification: "asmi_luxury_google_search_token_9160",
  bingVerification: "ASMI_BING_WEBMASTER_VERIFIED_2026",
  pinterestVerification: "asmi_pinterest_domain_token_889",
  yandexVerification: "asmi_yandex_webmaster_token_452",
  ga4MeasurementId: "G-ASMI9160XX",
  gtmContainerId: "GTM-ASMI789",
  facebookPixelId: "984102948192019",
  customHeadScript: "<!-- Google Analytics & Meta Pixel Injection -->",
  customBodyScript: "<!-- Custom Live Chat & Tracking -->",
  ogTitle: "ASMI's Collection | Haute Joaillerie & Handcrafted Luxury Jewelry",
  ogDescription: "Bespoke South Sea pearls, royal Colombian emeralds, and BIS 916 hallmarked handcrafted heirloom jewelry in India.",
  ogImage: "assets/images/hero-pearl-model.jpg",
  ogType: "website",
  ogSiteName: "ASMI's Collection",
  twitterCard: "summary_large_image",
  twitterHandle: "@asmijewelry",
  twitterCreator: "@asmi_curator",
  sitemapEnabled: true,
  sitemapUrl: "https://asmijewelry.com/sitemap.xml",
  robotsTxtRules: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nDisallow: /cart\nSitemap: https://asmijewelry.com/sitemap.xml",
  structuredDataType: "JewelryStore",
  structuredPriceRange: "₹₹ - Affordable Haute Joaillerie (Under ₹10,000 INR)",
  announcementActive: true,
  announcementText: "✦ COMPLIMENTARY INSURED ARMORED DELIVERY & BIS 916 HALLMARK CERTIFICATION ACROSS INDIA ✦",
  offerBannerActive: true,
  offerBannerText: "FLAT 10% OFF ON ORDERS ABOVE ₹5,000 WITH PRIVILEGE CODE: ROYAL10",
  
  brandLogoText: "ASMI'S Collection",
  customLogoUrl: "",
  customFaviconUrl: "",
  headerCtaText: "Book Call",
  headerCtaLink: "#consultationSection",
  officialPhone: "+91 98765 43210",
  officialWhatsapp: "+91 98765 43210",
  officialEmail: "concierge@asmijewelry.com",
  officialFacebook: "https://facebook.com/asmiclassicjewelry",
  officialInstagram: "https://instagram.com/asmi_luxury_atelier",

  // Customer Support & AI Concierge Configurations
  supportPhone: "+91 98765 43210",
  supportEmail: "concierge@asmijewelry.com",
  supportWhatsapp: "+91 98765 43210",
  supportHours: "Mon - Sat: 10:00 AM - 8:00 PM IST (Appointments Recommended)",
  aiGreeting: "Welcome to ASMI Haute Joaillerie Royal Concierge! How may I assist your fine jewelry journey today?",
  aiFallbackMsg: "Our master concierge and admin jewelers are at your immediate service. You can reach us directly via:",

  heroBadgeText: "New Haute Joaillerie 2025",
  heroTitleTop: "Discover Handcrafted",
  heroTitleHighlight: "Luxury & Elegance",
  heroDescription: "A breathtaking collection of glowing Basra pearls, royal Colombian emeralds, and sparkling uncut diamonds — crafted with love for timeless royal elegance.",
  heroCtaPrimaryText: "Explore Pearl Sets",
  heroCtaPrimaryLink: "#vaultSection",
  heroCtaSecondaryText: "Curated Vault",
  heroCtaSecondaryLink: "#vaultSection",
  heroStat1Value: "Grade AAA",
  heroStat1Label: "Natural Luster Pearls",
  heroStat2Value: "VVS1 Sparkle",
  heroStat2Label: "Certified Gemstones",
  heroStat3Value: "Pure 22K",
  heroStat3Label: "BIS Hallmark Gold",
  heroFloatingSubtitle: "Asmi's Limited Collection",
  heroFloatingTitle: "Wine Royal Fresh Water Pearl with AD",
  heroFloatingPrice: "₹2,340",
  heroFloatingBtnText: "Acquire Set",
  heroFloatingProductId: "asmi-custom-1791976015427",
  heroModelImage: "assets/images/hero-pearl-model.jpg",

  catalogBadgeText: "Curated Collections",
  catalogHeading: "Explore Our Luxury Jewelry",
  catalogSubtitle: "Displaying all handcrafted pieces",
  catalogBespokeTitle: "Looking for Custom Wedding Jewelry?",
  catalogBespokeDesc: "Our master jewelers create customized bridal necklaces with natural pearls and certified emeralds tailored to your vision.",
  catalogBespokeBtnText: "Book Design Session",

  editorialBadge: "Style Lookbook",
  editorialHeading: "Worn by Modern Icons",
  editorialQuote: "Timeless royal charm crafted for the modern woman.",
  lookbook1Image: "assets/images/hero-pearl-model.jpg",
  lookbook1Style: "Style 01",
  lookbook1Title: "The Royal Pearl Cascade",
  lookbook1PieceName: "Wine Royal Fresh Water Pearl with AD",
  lookbook1Price: "₹2,340",
  lookbook1ProductId: "asmi-custom-1791976015427",
  lookbook2Image: "assets/images/muse-emerald-model.jpg",
  lookbook2Style: "Style 02",
  lookbook2Title: "Imperial Green Emerald",
  lookbook2PieceName: "Imperial Emerald Choker",
  lookbook2Price: "₹8,999",
  lookbook2ProductId: "asmi-em-001",
  lookbook3Image: "assets/images/muse-polki-model.jpg",
  lookbook3Style: "Style 03",
  lookbook3Title: "Royal Emerald & Button Pearl",
  lookbook3PieceName: "The Sitara Emerald & Button Pearl Choker",
  lookbook3Price: "₹6,999",
  lookbook3ProductId: "asmi-em-003",

  pillar1Title: "100% Handcrafted",
  pillar1Desc: "Every stone and pearl is hand-set with precision by fourth-generation master artisans.",
  pillar2Title: "Certified Quality",
  pillar2Desc: "Each jewel comes with an authentic laboratory certificate for metal purity and stone quality.",
  pillar3Title: "Insured Safe Delivery",
  pillar3Desc: "Shipped in tamper-proof sealed velvet luxury boxes with 100% transit insurance worldwide.",
  pillar4Title: "Free Lifetime Care",
  pillar4Desc: "Enjoy free annual jewelry cleaning, setting checks, and gold polishing for life.",

  reviewsBadge: "Haute Joaillerie Patrons",
  reviewsHeading: "Client Reviews & Heirloom Stories",
  reviewsSubtitle: "Based on Verified Client Reviews",
  reviewsAvgRating: "5.0 / 5.0",

  consultationBadge: "Happy Customers",
  consultationHeading: "Loved by Buyers Worldwide",
  consultationFeaturedQuote: "\"The Zambian emerald choker was the highlight of my wedding reception. The sparkle and quality are simply unbelievable, and everyone kept asking where I got it!\"",
  consultationFeaturedAuthor: "Meera Singhania",
  consultationFeaturedMeta: "Verified Buyer • Custom Wedding Set",
  consultationStat1Val: "4.98 / 5.0",
  consultationStat1Lbl: "Average Rating (840+ Reviews)",
  consultationStat2Val: "100%",
  consultationStat2Lbl: "Authentic Certification",
  consultationCardTitle: "Book a Free Design Consultation",
  consultationCardDesc: "Talk directly with our jewelry designers to customize your necklace length, pearl color, or design a custom bridal set.",

  footerNewsletterBadge: "VIP Club",
  footerNewsletterTitle: "Join the ASMI VIP Club",
  footerNewsletterDesc: "Get early access to new jewelry launches, special sales, and private design previews.",
  footerBrandTitle: "ASMI'S Collection",
  footerAboutText: "Creating timeless luxury jewelry with genuine pearls, emeralds, and sparkling stones since 2012.",
  footerAddress: "ASMI Flagship Atelier & Vault, Heritage Gold Quadrant, Mumbai 400001",
  footerHours: "Mon - Sat: 11:00 AM - 8:00 PM IST (Appointments Recommended)",
  footerCopyright: "© 2026 ASMI'S COLLECTION. All Rights Reserved. Haute Joaillerie Atelier.",

  policyShippingTitle: "Armored & Insured Transit Protocol",
  policyShippingText: "Every jewelry shipment is transported in tamper-evident sealed luxury velvet vaults with comprehensive door-to-door transit insurance across India and internationally.",
  policyBuybackTitle: "Lifetime Buyback & 100% Exchange Guarantee",
  policyBuybackText: "We provide guaranteed buyback and lifetime trade-in value on all certified authentic 925 sterling silver and 22K gold heirloom jewelry pieces.",
  policyHallmarkTitle: "BIS 916 Hallmark & International Certificate",
  policyHallmarkText: "All precious metals and authentic gemstones are accompanied by an embossed certificate of authenticity with QR verification from certified gemological labs.",

  razorpayEnabled: true,
  razorpayKeyId: "rzp_test_Tihe0pt7I4L8K4",
  razorpayKeySecret: "B40K6aQoksDiHqvceot6EItm",
  stripeEnabled: false,
  stripePublishableKey: "",
  stripeSecretKey: "",
  paytmEnabled: false,
  paytmMerchantId: "",
  paytmMerchantKey: "",
  phonepeEnabled: false,
  phonepeMerchantId: "",
  phonepeSaltKey: "",

  orderNotificationEmail: "orders@asmijewelry.com",
  orderEmailSenderName: "ASMI Master Atelier Orders",
  orderEmailEnabled: true,
  orderEmailSmtpHost: "smtp.gmail.com",
  orderEmailSmtpPort: 465,
  orderEmailSmtpSecure: true,
  orderEmailSmtpUser: "",
  orderEmailSmtpPass: "",
  paymentGatewayActionsPaused: false,

  // SMS Gateway & Mobile OTP Service Settings
  smsGatewayProvider: "fast2sms", // "fast2sms" | "twilio" | "msg91"
  fast2smsApiKey: "",
  twilioAccountSid: "",
  twilioAuthToken: "",
  twilioFromNumber: "",
  msg91AuthKey: "",
  smsOtpEnabled: true
};

const DEFAULT_PRODUCTS = [
  {
    "id": "asmi-custom-1791976015427",
    "name": "Wine Royal Fresh Water Pearl with AD",
    "subtitle": "",
    "category": "pearls",
    "categoryLabel": "Glowing Pearls",
    "tag": "New Addition",
    "priceINR": 2340,
    "priceUSD": 28,
    "rating": 5,
    "reviewsCount": 22,
    "image": "assets/images/prod-asmi-custom-1791976015427-1792741714178-5r87t.png",
    "altImages": [
      "assets/images/prod-asmi-custom-1791976015427-alt0-1792741714185-k7ivr.png",
      "assets/images/prod-asmi-custom-1791976015427-alt1-1792741714190-oquy7.jpg"
    ],
    "gemstone": "",
    "accentStones": "American Diamonds",
    "metal": "",
    "hallmark": "IGL Certified Authentic",
    "shortDesc": "Wine Burgundy Fresh Water Pearl with AD Paisley Pendant Set",
    "description": "Wine Burgundy Fresh Water Pearl with AD Paisley Pendant Set\n\nPearl: 100% Real Fresh Water Round Pearl - Deep Wine / Burgundy Colour (premium)\n\nShade: Wine Red - high luster, smooth round shape\n\nDesign: Single Line Long - 18inch approx, S-shape flatlay\n\nPendant: Silver Polish AD Paisley /Kairy Design Pendant - full AD stone with marquise cuts\n\nEarrings: Matching Silver AD Paisley Studs - curved design with top flower\n\nPearl Size: 6-7mm ;round, original freshwater\n\nPolish: Silver polish pendant + earrings\n\nQuality: Real Fresh Water Pearl + Premium AD",
    "stock": 3,
    "sku": "ASM-NV-7455",
    "featured": true,
    "isNew": true,
    "seoTitle": "Wine Royal Fresh Water Pearl with AD | BIS Hallmarked 22K | ASMI",
    "seoDescription": "Shop Wine Royal Fresh Water Pearl with AD at ASMI. Handcrafted with Certified Gemstones, authentic hallmark, and insured express delivery across India & worldwide.",
    "seoFocusKeyword": "wine royal fresh water pearl with ad",
    "seoCanonicalUrl": "https://asmijewelry.com/product/asmi-custom-1791976015427",
    "seoKeywords": "wine royal fresh water pearl with ad, pearls, certified gemstones, bis hallmarked jewelry, asmi luxury collection",
    "seoRobots": "index, follow",
    "seoOgTitle": "Wine Royal Fresh Water Pearl with AD | ASMI Haute Joaillerie",
    "seoOgDescription": "Exquisite handcrafted Wine Royal Fresh Water Pearl with AD in luxury 22K finish.",
    "seoOgImage": "assets/images/prod-asmi-custom-1791976015427-seoOgImage-1792741740545-daok1.png",
    "seoTwitterCard": "summary_large_image",
    "seoSchemaType": "Product"
  },
  {
    "seoTitle": "xyz | BIS Hallmarked 22K | ASMI",
    "seoDescription": "Shop xyz at ASMI. Handcrafted with Certified Gemstones, authentic hallmark, and insured express delivery across India & worldwide.",
    "seoKeywords": "xyz, polki, certified gemstones, bis hallmarked jewelry, asmi luxury collection",
    "seoFocusKeyword": "xyz",
    "seoCanonicalUrl": "https://asmijewelry.com/product/asmi-custom-1791825712020",
    "seoRobots": "index, follow",
    "seoOgTitle": "xyz | ASMI Haute Joaillerie",
    "seoOgDescription": "Exquisite handcrafted xyz in luxury 22K finish.",
    "seoOgImage": "assets/images/prod-asmi-custom-1791825712020-seoOgImage-1792741740550-ykvya.jpg",
    "seoTwitterCard": "summary_large_image",
    "seoSchemaType": "Product",
    "id": "asmi-custom-1791825712020",
    "name": "xyz",
    "subtitle": "",
    "category": "polki",
    "categoryLabel": "Royal Kundan & Polki",
    "tag": "New Addition",
    "priceINR": 5999,
    "priceUSD": 72,
    "rating": 5,
    "reviewsCount": 30,
    "image": "assets/images/prod-asmi-custom-1791825712020-1792741714193-g0pkg.jpg",
    "altImages": [
      "assets/images/prod-asmi-custom-1791825712020-alt0-1792741714197-jn9ub.jpg"
    ],
    "gemstone": "",
    "accentStones": "",
    "metal": "",
    "hallmark": "BIS Hallmarked & Certified Authentic",
    "shortDesc": "",
    "description": "",
    "stock": 3,
    "sku": "ASM-NV-8885",
    "featured": false,
    "isNew": true
  },
  {
    "seoTitle": "abc | BIS Hallmarked 22K | ASMI",
    "seoDescription": "Shop abc at ASMI. Handcrafted with Certified Gemstones, authentic hallmark, and insured express delivery across India & worldwide.",
    "seoKeywords": "abc, pearls, certified gemstones, bis hallmarked jewelry, asmi luxury collection",
    "seoFocusKeyword": "abc",
    "seoCanonicalUrl": "https://asmijewelry.com/product/asmi-custom-1791793593399",
    "seoRobots": "index, follow",
    "seoOgTitle": "abc | ASMI Haute Joaillerie",
    "seoOgDescription": "Exquisite handcrafted abc in luxury 22K finish.",
    "seoOgImage": "assets/images/prod-asmi-custom-1791793593399-seoOgImage-1792741740553-dmktn.jpg",
    "seoTwitterCard": "summary_large_image",
    "seoSchemaType": "Product",
    "id": "asmi-custom-1791793593399",
    "name": "abc",
    "subtitle": "",
    "category": "pearls",
    "categoryLabel": "Glowing Pearls",
    "tag": "New Addition",
    "priceINR": 2500,
    "priceUSD": 50,
    "rating": 5,
    "reviewsCount": 35,
    "image": "assets/images/prod-asmi-custom-1791793593399-1792741714200-ruwxm.jpg",
    "altImages": [
      "assets/images/prod-asmi-custom-1791793593399-alt0-1792741714202-0i8v4.jpg"
    ],
    "gemstone": "",
    "accentStones": "",
    "metal": "",
    "hallmark": "BIS Hallmarked & Certified Authentic",
    "shortDesc": "",
    "description": "",
    "stock": 3,
    "sku": "ASM-NV-9696",
    "featured": false,
    "isNew": true
  },
  {
    "seoTitle": "Royal Zambian Emerald & Diamond Choker | BIS Hallmarked Pure | ASMI",
    "seoDescription": "Shop Royal Zambian Emerald & Diamond Choker at ASMI. Handcrafted with Natural Zambian Emerald, authentic hallmark, and insured express delivery across India & worldwide.",
    "seoKeywords": "royal zambian emerald & diamond choker, emeralds, natural zambian emerald, bis hallmarked jewelry, asmi luxury collection",
    "seoFocusKeyword": "royal zambian emerald & diamond choker",
    "seoCanonicalUrl": "https://asmijewelry.com/product/asmi-em-001",
    "seoRobots": "index, follow",
    "seoOgTitle": "Royal Zambian Emerald & Diamond Choker | ASMI Haute Joaillerie",
    "seoOgDescription": "A show-stopping emerald choker necklace surrounded by double rows of sparkling brilliant-cut diamonds.",
    "seoOgImage": "assets/images/emerald-necklace.jpg",
    "seoTwitterCard": "summary_large_image",
    "seoSchemaType": "Product",
    "id": "asmi-em-001",
    "name": "Royal Zambian Emerald & Diamond Choker",
    "subtitle": "Vivid Green Cushion Emerald with Sparkling Diamond Borders",
    "category": "emeralds",
    "categoryLabel": "Green Emeralds",
    "tag": "Best Seller",
    "priceINR": 8999,
    "priceUSD": 108,
    "rating": 5,
    "reviewsCount": 38,
    "image": "assets/images/emerald-necklace.jpg",
    "altImages": [
      "assets/images/emerald-necklace.jpg",
      "assets/images/emerald-necklace-alt.png"
    ],
    "gemstone": "Natural Zambian Emerald (7.2 Carats)",
    "accentStones": "Sparkling American Diamonds (VVS Clarity)",
    "metal": "Pure 925 Sterling Silver with 22K Gold Finish",
    "hallmark": "BIS Hallmarked & Certified Authentic",
    "shortDesc": "A show-stopping emerald choker necklace surrounded by double rows of sparkling brilliant-cut diamonds.",
    "description": "Handcrafted to perfection, this luxurious necklace features a rich 7.2-carat green Zambian emerald center stone. Wrapped in shining 22-karat gold plating with precision-cut stones that sparkle brilliantly in any light.",
    "stock": 1,
    "sku": "ASM-EM-7201",
    "featured": true,
    "isNew": true
  },
  {
    "seoTitle": "Floral Diamond Brooch & Choker Pendant | BIS Hallmarked Pure | ASMI",
    "seoDescription": "Shop Floral Diamond Brooch & Choker Pendant at ASMI. Handcrafted with Micro-Set VVS-Grade American Diamonds, authentic hallmark, and insured express delivery across India & worldwide.",
    "seoKeywords": "floral diamond brooch & choker pendant, stones, micro-set vvs-grade american diamonds, bis hallmarked jewelry, asmi luxury collection",
    "seoFocusKeyword": "floral diamond brooch & choker pendant",
    "seoCanonicalUrl": "https://asmijewelry.com/product/asmi-st-001",
    "seoRobots": "index, follow",
    "seoOgTitle": "Floral Diamond Brooch & Choker Pendant | ASMI Haute Joaillerie",
    "seoOgDescription": "A blooming floral bouquet set with over 180 brilliant diamonds with a hidden detachable necklace clip.",
    "seoOgImage": "assets/images/diamond-brooch.png",
    "seoTwitterCard": "summary_large_image",
    "seoSchemaType": "Product",
    "id": "asmi-st-001",
    "name": "Floral Diamond Brooch & Choker Pendant",
    "subtitle": "2-in-1 Versatile Brooch and Necklace Centerpiece",
    "category": "stones",
    "categoryLabel": "Sparkling Diamonds",
    "tag": "2-in-1 Piece",
    "priceINR": 3499,
    "priceUSD": 42,
    "rating": 4.8,
    "reviewsCount": 31,
    "image": "assets/images/diamond-brooch.png",
    "altImages": [
      "assets/images/diamond-brooch.png"
    ],
    "gemstone": "Micro-Set VVS-Grade American Diamonds",
    "accentStones": "Petal Cut Sparkle Stones",
    "metal": "Pure 925 Sterling Silver with Rhodium Polish",
    "hallmark": "BIS 925 Stamp Guaranteed",
    "shortDesc": "A blooming floral bouquet set with over 180 brilliant diamonds with a hidden detachable necklace clip.",
    "description": "Incredibly versatile and stylish. Wear it as a luxury brooch pin on your favorite jacket, or clip it onto a pearl necklace as an eye-catching pendant.",
    "stock": 7,
    "sku": "ASM-ST-4606",
    "featured": false,
    "isNew": false
  },
  {
    "seoTitle": "The Sitara Emerald & Button Pearl Choker | BIS Hallmarked 22K | ASMI",
    "seoDescription": "Shop The Sitara Emerald & Button Pearl Choker at ASMI. Handcrafted with Rich Forest Green Emeralds & Natural Button Pearls, authentic hallmark, and insured express delivery across India & worldwide.",
    "seoKeywords": "the sitara emerald & button pearl choker, emeralds, rich forest green emeralds & natural button pearls, bis hallmarked jewelry, asmi luxury collection",
    "seoFocusKeyword": "the sitara emerald & button pearl choker",
    "seoCanonicalUrl": "https://asmijewelry.com/product/asmi-em-003",
    "seoRobots": "index, follow",
    "seoOgTitle": "The Sitara Emerald & Button Pearl Choker | ASMI Haute Joaillerie",
    "seoOgDescription": "A symmetric gold lattice choker accented by emerald cut green stones and natural button pearls.",
    "seoOgImage": "assets/images/emerald-sitara.png",
    "seoTwitterCard": "summary_large_image",
    "seoSchemaType": "Product",
    "id": "asmi-em-003",
    "name": "The Sitara Emerald & Button Pearl Choker",
    "subtitle": "Emerald Cut Forest Stones with Natural Pearl Hangings",
    "category": "emeralds",
    "categoryLabel": "Green Emeralds",
    "tag": "Limited Design",
    "priceINR": 6999,
    "priceUSD": 84,
    "rating": 4.9,
    "reviewsCount": 23,
    "image": "assets/images/emerald-sitara.png",
    "altImages": [
      "assets/images/emerald-sitara.png"
    ],
    "gemstone": "Rich Forest Green Emeralds & Natural Button Pearls",
    "accentStones": "Baguette & Round Diamond Accents",
    "metal": "22K Gold Plated Finish",
    "hallmark": "BIS Hallmarked & Insured",
    "shortDesc": "A symmetric gold lattice choker accented by emerald cut green stones and natural button pearls.",
    "description": "Crisp geometric clean lines balanced with natural pearl drops. Features an adjustable soft silk cord with golden tassels for a custom comfortable fit.",
    "stock": 3,
    "sku": "ASM-EM-9507",
    "featured": false,
    "isNew": true
  }
];

const DEFAULT_COUPONS = [
  { code: "ROYAL10", type: "percent", value: 10, minOrder: 0, description: "10% VIP Privilege Discount", active: true },
  { code: "ASMI500", type: "flat", value: 500, minOrder: 3000, description: "₹500 Atelier Welcome Voucher", active: true },
  { code: "ASMI2025", type: "flat", value: 500, minOrder: 3000, description: "₹500 Festive Celebration Voucher", active: true },
  { code: "WELCOME", type: "flat", value: 300, minOrder: 2000, description: "₹300 First Acquisition Discount", active: true }
];

const DEFAULT_CATEGORIES = [
  { id: "pearls", label: "Glowing Pearls", icon: "fa-circle-dot", count: 3 },
  { id: "emeralds", label: "Green Emeralds", icon: "fa-crown", count: 3 },
  { id: "stones", label: "Diamonds & Stones", icon: "fa-ring", count: 2 },
  { id: "polki", label: "Royal Kundan & Polki", icon: "fa-gem", count: 2 }
];

const DEFAULT_ORDERS = [
  {
    orderNumber: "ASM-2026-784109",
    authCode: "BIS-916-PRL841",
    trackingId: "ASMI-BD-894021-IN",
    courier: "BlueDart Armored Express Logistics (Air Transit)",
    currentLocation: "Mumbai International Airport Air Cargo Vault, Gate 4",
    statusBadge: "In Transit",
    currentStepIndex: 3,
    placedTimestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
    dateStr: "14 Sep 2026",
    customerName: "Aaryahi Roy",
    customerEmail: "aaryahi.roy@luxury.com",
    city: "Mumbai, Maharashtra",
    gateway: "UPI QR (Instant Verified)",
    items: [
      {
        id: "asmi-pr-001",
        quantity: 1,
        selectedFinish: "22K Champagne Gold",
        selectedSize: '16" Choker'
      }
    ],
    calculations: {
      subtotal: 6499,
      discount: 0,
      taxGST: 195,
      shippingFee: 0,
      giftWrapFee: 150,
      finalTotal: 6844
    }
  }
];

const DEFAULT_REVIEWS = [
  {
    id: "rev-001",
    productId: "asmi-custom-1791976015427",
    productName: "Wine Royal Fresh Water Pearl with AD",
    reviewerName: "Meera Singhania",
    city: "Mumbai, Maharashtra",
    rating: 5,
    date: "14 Sep 2026",
    title: "Breathtaking Lustre & Royal Craftsmanship!",
    comment: "The Wine Royal Fresh Water Pearl set was the highlight of my wedding reception. The deep wine luster and silky drape in person are divine. The IGL certificate and luxury velvet box made the unboxing feel like royalty.",
    verified: true,
    photo: "assets/images/prod-asmi-custom-1791976015427-1792741714178-5r87t.png"
  },
  {
    id: "rev-002",
    productId: "asmi-em-001",
    productName: "Royal Zambian Emerald & Diamond Choker",
    reviewerName: "Ananya Deshmukh",
    city: "Bengaluru, Karnataka",
    rating: 5,
    date: "10 Sep 2026",
    title: "Mesmerizing Vivid Green Emeralds!",
    comment: "Photos cannot do justice to the deep green fire of these Zambian emeralds. The double row of sparkling diamonds captures every beam of light. Delivered in an armored package in pristine condition.",
    verified: true,
    photo: "assets/images/emerald-necklace.jpg"
  },
  {
    id: "rev-003",
    productId: "asmi-st-001",
    productName: "Floral Diamond Brooch & Choker Pendant",
    reviewerName: "Rhea Kapoor",
    city: "New Delhi",
    rating: 5,
    date: "04 Sep 2026",
    title: "My Favorite Statement Jewel",
    comment: "The 2-in-1 brooch and necklace centerpiece is pure perfection. The micro-set VVS stones sparkle brilliantly in any light. Everyone at the gala was inquiring where I acquired it.",
    verified: true,
    photo: "assets/images/diamond-brooch.png"
  },
  {
    id: "rev-004",
    productId: "asmi-em-003",
    productName: "The Sitara Emerald & Button Pearl Choker",
    reviewerName: "Dr. Priya Sharma",
    city: "Kolkata, West Bengal",
    rating: 5,
    date: "28 Aug 2026",
    title: "True Royal Heritage Craftsmanship",
    comment: "The emerald-cut stones and delicate natural button pearl hangings are breathtaking. The 22K gold lattice is so comfortable against the skin. Worth every single rupee.",
    verified: true,
    photo: "assets/images/emerald-sitara.png"
  }
];

const DEFAULT_GIFTCARDS = [
  { code: "GIFT-ROYAL-1000", balance: 1000, recipient: "Gayatri Roy", active: true, issuedDate: "15 Sep 2026" },
  { code: "GIFT-EMERALD-2500", balance: 2500, recipient: "Aaryahi Roy", active: true, issuedDate: "18 Sep 2026" },
  { code: "GIFT-PEARL-5000", balance: 5000, recipient: "Meera Singhania", active: true, issuedDate: "20 Sep 2026" }
];

// Helper to get or seed a JSON file
function getDbFile(fileName, defaultValue) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
    return defaultValue;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return defaultValue;
  }
}

// Helper to reliably save a JSON file on disk
function saveDbFile(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error saving ${fileName}:`, err);
    return false;
  }
}

const DEFAULT_PATRONS = [
  {
    id: "patron_default_01",
    name: "Gayatri Roy",
    email: "gayatri.roy@gmail.com",
    phone: "+91 98200 12345",
    tier: "Royal Heirloom Patron",
    memberId: "ASMI-VIP-9160",
    joinedDate: "January 2025",
    ordersCount: 2,
    totalSpentINR: 17998,
    lastLogin: Date.now(),
    addresses: [
      {
        id: "addr_gr_1",
        tag: "Primary Residence",
        recipientName: "Gayatri Roy",
        phone: "+91 98200 12345",
        street: "402, Sea Face Manor, Worli Sea Face",
        landmark: "Opposite Coastline Promenade",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400018",
        isDefault: true
      },
      {
        id: "addr_gr_2",
        tag: "Corporate Office",
        recipientName: "Gayatri Roy",
        phone: "+91 98200 12345",
        street: "Suite 801, Express Towers, Nariman Point",
        landmark: "Near Marine Drive",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400021",
        isDefault: false
      }
    ]
  },
  {
    id: "patron_default_02",
    name: "Aaryahi Roy",
    email: "aaryahi.roy@luxury.com",
    phone: "+91 98765 43210",
    tier: "Royal Heirloom Patron",
    memberId: "ASMI-VIP-7841",
    joinedDate: "August 2025",
    ordersCount: 1,
    totalSpentINR: 6499,
    lastLogin: Date.now(),
    addresses: [
      {
        id: "addr_ar_1",
        tag: "Heritage Villa",
        recipientName: "Aaryahi Roy",
        phone: "+91 98765 43210",
        street: "12, Altamount Road, Cumballa Hill",
        landmark: "Near Villa Vista",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400026",
        isDefault: true
      }
    ]
  }
];

const DEFAULT_SUPPORT_CHATS = [
  {
    id: "chat-patron-01",
    patronId: "patron_default_01",
    patronName: "Gayatri Roy",
    patronEmail: "gayatri.roy@gmail.com",
    patronPhone: "+91 98200 12345",
    patronTier: "Royal Heirloom Patron",
    subject: "Bespoke Length Customization for Zambian Emerald Choker",
    status: "active",
    createdAt: "2026-10-06T05:45:00.000Z",
    lastUpdated: "2026-10-06T08:30:00.000Z",
    messages: [
      {
        id: "msg-1",
        sender: "patron",
        senderName: "Gayatri Roy",
        text: "Namaste ASMI Concierge, I would like to inquire if the Zambian Emerald Choker can be made in an 18-inch length instead of the standard 16-inch choker length?",
        timestamp: "2026-10-06T05:45:00.000Z",
        formattedTime: "6 Oct, 11:15 AM"
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Master Atelier Jeweler (Admin)",
        text: "Dear Maharani Gayatri Roy, absolutely! Our fourth-generation master artisans can craft an authentic 18-inch extender chain with matching 22K hallmark gold finish at no extra charge. We have attached this specification to your account.",
        timestamp: "2026-10-06T08:30:00.000Z",
        formattedTime: "6 Oct, 2:00 PM"
      }
    ]
  }
];

// Ensure all DB files exist
getDbFile('settings.json', DEFAULT_SETTINGS);
getDbFile('products.json', DEFAULT_PRODUCTS);
getDbFile('coupons.json', DEFAULT_COUPONS);
getDbFile('categories.json', DEFAULT_CATEGORIES);
getDbFile('orders.json', DEFAULT_ORDERS);
getDbFile('reviews.json', DEFAULT_REVIEWS);
getDbFile('giftcards.json', DEFAULT_GIFTCARDS);
getDbFile('patrons.json', DEFAULT_PATRONS);
getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);

// -----------------------------------------------------------------------------
// MIME TYPES
// -----------------------------------------------------------------------------
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.htm': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf'
};

// -----------------------------------------------------------------------------
// ORDER EMAIL NOTIFICATION DISPATCHER (PRIVATE REGISTERED MAIL ENGINE)
// -----------------------------------------------------------------------------
function buildOrderEmailHtml(order, settings) {
  const orderNum = order.orderNumber || order.id || `ASM-${Date.now()}`;
  const customerName = order.customerName || 'Valued Patron';
  const customerEmail = order.customerEmail || 'N/A';
  const customerPhone = order.customerPhone || order.shippingAddress?.phone || 'N/A';
  const dateStr = order.dateStr || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const paymentMode = order.gateway || 'Online Payment Gateway';
  const paymentId = order.paymentId || order.authCode || 'N/A';
  const ship = order.shippingAddress || {};
  const fullAddress = [
    ship.street,
    ship.landmark,
    ship.city,
    ship.state,
    ship.pincode ? `PIN: ${ship.pincode}` : '',
    ship.country || 'India'
  ].filter(Boolean).join(', ') || order.city || 'Standard Delivery Address';

  const calc = order.calculations || {};
  const subtotal = calc.subtotal || 0;
  const discount = calc.discount || 0;
  const taxGST = calc.taxGST || 0;
  const finalTotal = calc.finalTotal || subtotal;
  const currency = order.currency || 'INR';

  let itemsHtml = '';
  if (Array.isArray(order.items) && order.items.length > 0) {
    order.items.forEach((item, idx) => {
      const name = item.customName || item.name || item.title || `Jewelry Piece #${idx + 1}`;
      const qty = item.quantity || 1;
      const finish = item.selectedFinish || item.finish || '22K Gold';
      const size = item.selectedSize || item.size || 'Standard';
      const priceINR = item.customPriceINR !== undefined ? item.customPriceINR : (item.priceINR || 0);
      const priceUSD = item.customPriceUSD !== undefined ? item.customPriceUSD : (item.priceUSD || Math.round(priceINR * 0.012));
      const lineTotal = priceINR * qty;

      itemsHtml += `
        <tr style="border-bottom: 1px solid #e5e0d8;">
          <td style="padding: 14px 10px; font-weight: 600; color: #1a1714;">
            ${name}
            <div style="font-size: 11px; color: #8C6E17; font-weight: normal; margin-top: 3px;">
              Finish: <strong>${finish}</strong> | Size: <strong>${size}</strong> | SKU: ${item.id || 'ASMI-SKU'}
            </div>
          </td>
          <td style="padding: 14px 10px; text-align: center; color: #555; font-size: 13px;">${qty}</td>
          <td style="padding: 14px 10px; text-align: right; color: #555; font-size: 13px;">₹${priceINR.toLocaleString('en-IN')} / $${priceUSD}</td>
          <td style="padding: 14px 10px; text-align: right; font-weight: 700; color: #8C6E17; font-size: 14px;">₹${lineTotal.toLocaleString('en-IN')}</td>
        </tr>
      `;
    });
  } else {
    itemsHtml = `<tr><td colspan="4" style="padding: 16px; text-align: center; color: #777;">Order details captured in master database.</td></tr>`;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>New Order Notification: ${orderNum}</title>
    </head>
    <body style="margin: 0; padding: 24px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222;">
      <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dcd5c9; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-radius: 6px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #111111 0%, #1f1b16 100%); padding: 28px 32px; border-bottom: 3px solid #8C6E17; text-align: center;">
          <span style="display: inline-block; padding: 4px 14px; background: rgba(212, 175, 55, 0.2); border: 1px solid #D4AF37; color: #D4AF37; font-size: 10px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700; margin-bottom: 10px; border-radius: 20px;">
            🚨 CONFIDENTIAL ORDER DISPATCH ALERT
          </span>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; font-family: Georgia, serif;">ASMI HAUTE JOAILLERIE</h1>
          <p style="color: #D4AF37; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;">Master Atelier Order Notification Engine</p>
        </div>

        <!-- Banner Summary -->
        <div style="background-color: #fdfbf7; padding: 20px 32px; border-bottom: 1px solid #ece5da;">
          <table style="width: 100%;">
            <tr>
              <td>
                <span style="font-size: 11px; color: #777; text-transform: uppercase; letter-spacing: 1px; display: block;">Order Reference</span>
                <strong style="font-size: 18px; color: #8C6E17; font-family: monospace;">${orderNum}</strong>
              </td>
              <td style="text-align: right;">
                <span style="font-size: 11px; color: #777; text-transform: uppercase; letter-spacing: 1px; display: block;">Grand Total Paid</span>
                <strong style="font-size: 20px; color: #10B981;">₹${finalTotal.toLocaleString('en-IN')}</strong>
              </td>
            </tr>
          </table>
        </div>

        <div style="padding: 32px;">

          <!-- Patron & Shipping Details Card -->
          <div style="background: #faf8f5; border: 1px solid #e7dfd3; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8C6E17; border-bottom: 1px solid #ded5c6; padding-bottom: 6px;">
              👤 Customer & Delivery Logistics
            </h3>
            <table style="width: 100%; font-size: 13px; line-height: 1.6;">
              <tr>
                <td style="width: 35%; color: #666; padding: 4px 0;">Customer Name:</td>
                <td style="width: 65%; font-weight: 600; color: #111;">${customerName}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Contact Phone:</td>
                <td style="font-weight: 600; color: #111;">${customerPhone}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Customer Email:</td>
                <td style="font-weight: 600; color: #111;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0; vertical-align: top;">Shipping Destination:</td>
                <td style="font-weight: 600; color: #111; vertical-align: top;">${fullAddress}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Payment Method:</td>
                <td style="font-weight: 600; color: #10B981;">${paymentMode} (${paymentId})</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Placed Date / Time:</td>
                <td style="color: #555;">${dateStr}</td>
              </tr>
            </table>
          </div>

          <!-- Items Ordered Table -->
          <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #111;">
            💎 Ordered Jewelry Pieces (${(order.items || []).length} Items)
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background-color: #f3efe8; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; color: #666;">
                <th style="padding: 10px; text-align: left;">Piece Description</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Unit Price</th>
                <th style="padding: 10px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Financial Totals Box -->
          <div style="background-color: #faf8f5; border: 1px solid #e7dfd3; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
            <table style="width: 100%; font-size: 13px;">
              <tr>
                <td style="padding: 4px 0; color: #666;">Catalog Subtotal:</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 600;">₹${subtotal.toLocaleString('en-IN')}</td>
              </tr>
              ${discount > 0 ? `
              <tr>
                <td style="padding: 4px 0; color: #10B981;">Coupon Privilege Discount:</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #10B981;">-₹${discount.toLocaleString('en-IN')}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 4px 0; color: #666;">Delivery Charges (${calc.shippingZone || 'Within 500gm Base'}):</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #8C6E17;">+₹${(calc.shippingFee || 0).toLocaleString('en-IN')}</td>
              </tr>
              ${calc.giftWrapFee > 0 ? `
              <tr>
                <td style="padding: 4px 0; color: #666;">Luxury Velvet Gift Box:</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #111;">+₹${(calc.giftWrapFee).toLocaleString('en-IN')}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 4px 0; color: #666;">Precious Jewelry GST (3%):</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 600;">₹${taxGST.toLocaleString('en-IN')}</td>
              </tr>
              <tr style="border-top: 2px solid #8C6E17; font-size: 16px;">
                <td style="padding: 10px 0 4px 0; font-weight: 700; color: #111;">Grand Total Paid:</td>
                <td style="padding: 10px 0 4px 0; text-align: right; font-weight: 700; color: #8C6E17;">₹${finalTotal.toLocaleString('en-IN')}</td>
              </tr>
            </table>
          </div>

          <!-- Private Merchant Footer Note -->
          <div style="background-color: #fff9e6; border: 1px dashed #D4AF37; padding: 14px 18px; border-radius: 4px; font-size: 12px; color: #735108; line-height: 1.5;">
            <strong>🔒 Private Merchant Notification:</strong> This order alert was dispatched directly to your registered administrator notification mailbox (<code>${settings.orderNotificationEmail || 'orders@asmijewelry.com'}</code>). This email address is private, internal to ASMI Atelier Management, and never displayed on the public storefront.
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #1a1714; padding: 18px 32px; text-align: center; font-size: 11px; color: #999;">
          © 2026 ASMI Haute Joaillerie Atelier &bull; Master Vault Notification Engine &bull; Heritage Gold Quadrant, Mumbai 400001
        </div>

      </div>
    </body>
    </html>
  `;
}

function buildOrderEmailText(order, settings) {
  const orderNum = order.orderNumber || order.id || 'N/A';
  const customerName = order.customerName || 'Valued Patron';
  const customerEmail = order.customerEmail || 'N/A';
  const customerPhone = order.customerPhone || order.shippingAddress?.phone || 'N/A';
  const dateStr = order.dateStr || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const paymentMode = order.gateway || 'Online Payment Gateway';
  const paymentId = order.paymentId || order.authCode || 'N/A';
  const ship = order.shippingAddress || {};
  const fullAddress = [
    ship.street,
    ship.landmark,
    ship.city,
    ship.state,
    ship.pincode ? `PIN: ${ship.pincode}` : '',
    ship.country || 'India'
  ].filter(Boolean).join(', ') || order.city || 'Standard Delivery Address';

  const calc = order.calculations || {};
  const subtotal = calc.subtotal || 0;
  const discount = calc.discount || 0;
  const shippingFee = calc.shippingFee || 0;
  const shippingZone = calc.shippingZone || 'Within 500gm';
  const taxGST = calc.taxGST || 0;
  const finalTotal = calc.finalTotal || subtotal;

  let itemsText = '';
  if (Array.isArray(order.items) && order.items.length > 0) {
    itemsText = order.items.map((item, idx) => {
      const name = item.customName || item.name || item.title || `Jewelry Piece #${idx + 1}`;
      const qty = item.quantity || 1;
      const finish = item.selectedFinish || item.finish || '22K Gold';
      const size = item.selectedSize || item.size || 'Standard';
      const priceINR = item.customPriceINR !== undefined ? item.customPriceINR : (item.priceINR || 0);
      const priceUSD = item.customPriceUSD !== undefined ? item.customPriceUSD : (item.priceUSD || Math.round(priceINR * 0.012));
      return `  - ${name} (Qty: ${qty}, Finish: ${finish}, Size: ${size}) -> ₹${priceINR.toLocaleString('en-IN')} / $${priceUSD} [Total: ₹${(priceINR * qty).toLocaleString('en-IN')}]`;
    }).join('\n');
  } else {
    itemsText = '  - (Order item records captured in master database)';
  }

  return `
================================================================================
ASMI HAUTE JOAILLERIE - MASTER ATELIER NEW ORDER NOTIFICATION
================================================================================
Order Reference : #${orderNum}
Placed At       : ${dateStr}
Grand Total Paid: ₹${finalTotal.toLocaleString('en-IN')} (${paymentMode})
Payment Auth ID : ${paymentId}

PATRON & SHIPPING LOGISTICS:
--------------------------------------------------------------------------------
Customer Name   : ${customerName}
Phone Number    : ${customerPhone}
Email Address   : ${customerEmail}
Delivery Address: ${fullAddress}

ORDERED JEWELRY ITEMS:
--------------------------------------------------------------------------------
${itemsText}

FINANCIAL SUMMARY:
--------------------------------------------------------------------------------
Catalog Subtotal: ₹${subtotal.toLocaleString('en-IN')}
Privilege Disc. : ${discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '₹0'}
Delivery Charges: +₹${shippingFee.toLocaleString('en-IN')} (${shippingZone})
Precious GST 3% : ₹${taxGST.toLocaleString('en-IN')}
--------------------------------------------------------------------------------
GRAND TOTAL     : ₹${finalTotal.toLocaleString('en-IN')}
================================================================================
CONFIDENTIAL NOTICE:
This order notification was dispatched exclusively to the private registered
administrator email address: ${settings.orderNotificationEmail || 'orders@asmijewelry.com'}
configured in the ASMI Master Atelier Control Panel.
================================================================================
`;
}

function appendEmailLog(entry) {
  try {
    let logs = getDbFile('email_notifications.json', []);
    if (!Array.isArray(logs)) logs = [];
    logs.unshift(entry);
    if (logs.length > 200) logs = logs.slice(0, 200);
    saveDbFile('email_notifications.json', logs);
  } catch (e) {
    console.error('[ASMI Mailer] Could not append email log:', e);
  }
}

// Generic mail dispatcher supporting SMTP delivery + persistent JSON audit vault
function dispatchEmailGeneric({ to, subject, html, text, type = 'notification', metadata = {}, settings, callback = () => {} }) {
  const finalSettings = settings || getDbFile('settings.json', DEFAULT_SETTINGS);
  const targetEmail = (to || finalSettings.orderNotificationEmail || 'concierge@asmijewelry.com').trim();
  const senderName = finalSettings.orderEmailSenderName || 'ASMI Haute Joaillerie Atelier';

  const emailLogEntry = {
    id: `eml-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type: type,
    recipient: targetEmail,
    senderName: senderName,
    subject: subject,
    status: 'pending',
    timestamp: new Date().toISOString(),
    formattedTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    metadata: metadata,
    textSummary: (text || '').substring(0, 350)
  };

  const smtpHost = (finalSettings.orderEmailSmtpHost || '').trim();
  const smtpUser = (finalSettings.orderEmailSmtpUser || '').trim();
  const smtpPass = (finalSettings.orderEmailSmtpPass || '').trim();
  const smtpPort = parseInt(finalSettings.orderEmailSmtpPort, 10) || 465;
  const smtpSecure = finalSettings.orderEmailSmtpSecure !== false;

  if (nodemailer && smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465 || smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
        tls: { rejectUnauthorized: false }
      });

      const mailOptions = {
        from: `"${senderName}" <${smtpUser}>`,
        to: targetEmail,
        subject: subject,
        text: text,
        html: html
      };

      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error('[ASMI Mailer] SMTP Transmission Error:', mailErr.message);
          emailLogEntry.status = 'smtp_error_saved_to_vault';
          emailLogEntry.errorMessage = mailErr.message;
        } else {
          console.log(`[ASMI Mailer] SMTP Email Sent Successfully to [${targetEmail}]! Message ID:`, info.messageId);
          emailLogEntry.status = 'delivered';
          emailLogEntry.messageId = info.messageId;
        }
        appendEmailLog(emailLogEntry);
        callback(null, { success: true, ...emailLogEntry });
      });
      return;
    } catch (err) {
      console.error('[ASMI Mailer] Transporter Exception:', err.message);
      emailLogEntry.status = 'transporter_exception';
      emailLogEntry.errorMessage = err.message;
    }
  } else {
    console.log(`[ASMI Mailer] ${type.toUpperCase()} alert formatted and recorded for [${targetEmail}] (Vault Notification Mode).`);
    emailLogEntry.status = 'dispatched_vaulted';
    emailLogEntry.notes = 'Email formatted in Noir & Champagne Gold and recorded in persistent notification vault.';
  }

  appendEmailLog(emailLogEntry);
  callback(null, { success: true, ...emailLogEntry });
  return { success: true, ...emailLogEntry };
}

// -----------------------------------------------------------------------------
// SECURE ONE-TIME PASSCODE (OTP) DISPATCH & VERIFICATION ENGINE
// -----------------------------------------------------------------------------
const ACTIVE_OTP_SESSIONS = new Map();

function sendOtpEmail({ to, code, customerName, settings, callback = () => {} }) {
  const finalSettings = settings || getDbFile('settings.json', DEFAULT_SETTINGS);
  const targetEmail = (to || '').trim();
  const patronName = customerName || 'Valued Patron';

  const subject = `🔑 ${code} is your ASMI Haute Joaillerie Verification Passcode`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0B0B0C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; -webkit-font-smoothing: antialiased;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0B0B0C; padding: 40px 16px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 520px; background-color: #121215; border: 1.5px solid #D4AF37; border-radius: 4px; box-shadow: 0 12px 40px rgba(0,0,0,0.6); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 32px 28px 24px 28px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.25);">
                  <span style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; font-weight: 700; display: block; margin-bottom: 8px;">HAUTE JOAILLERIE ATELIER &bull; MUMBAI</span>
                  <h1 style="font-family: Georgia, serif; font-size: 26px; font-weight: 400; color: #FFFFFF; margin: 0; letter-spacing: 1px;">ASMI's Collection</h1>
                </td>
              </tr>
              <!-- Body Content -->
              <tr>
                <td style="padding: 32px 28px 28px 28px; text-align: center;">
                  <p style="font-size: 14px; color: #E5E5E7; margin: 0 0 16px 0; line-height: 1.6;">
                    Namaste <strong>${patronName}</strong>,
                  </p>
                  <p style="font-size: 13px; color: #A1A1AA; margin: 0 0 28px 0; line-height: 1.6;">
                    Please use the single-use 4-digit verification passcode below to sign in to your ASMI Haute Joaillerie boutique account.
                  </p>
                  
                  <!-- OTP Code Box -->
                  <div style="background: rgba(212, 175, 55, 0.08); border: 2px solid #D4AF37; border-radius: 4px; padding: 18px 24px; margin: 0 auto 28px auto; display: inline-block;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 10px; color: #D4AF37; padding-left: 10px;">${code}</span>
                  </div>

                  <p style="font-size: 12px; color: #D4AF37; margin: 0 0 12px 0; font-weight: 600;">
                    <i style="margin-right: 4px;">⏱️</i> Valid for 5 minutes &bull; Single Use Only
                  </p>
                  <p style="font-size: 11px; color: #71717A; margin: 0 0 24px 0; line-height: 1.5;">
                    For your security, never share this passcode with anyone. ASMI Atelier concierge jewelers will never ask for your verification code.
                  </p>
                  
                  <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 11px; color: #52525B; line-height: 1.5;">
                    If you did not request this verification code, please ignore this email or reach us immediately at concierge@asmijewelry.com.
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #0A0A0C; padding: 16px 28px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 10px; color: #71717A; letter-spacing: 0.05em;">
                  &copy; 2026 ASMI'S COLLECTION &bull; ALL RIGHTS RESERVED &bull; BIS 916 HALLMARK CERTIFIED
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  const text = `ASMI Haute Joaillerie Atelier\n\nYour 4-Digit Verification Passcode: ${code}\nValid for 5 minutes. Do not share with anyone.\n\nASMI Concierge: concierge@asmijewelry.com`;

  dispatchEmailGeneric({
    to: targetEmail,
    subject: subject,
    html: html,
    text: text,
    type: 'auth_otp',
    metadata: { code, customerName: patronName },
    settings: finalSettings,
    callback: callback
  });
}

function sendOtpSms({ to, code, customerName, settings, callback = () => {} }) {
  const finalSettings = settings || getDbFile('settings.json', DEFAULT_SETTINGS);
  const rawPhone = (to || '').replace(/[^0-9]/g, '');
  const phone10 = rawPhone.length > 10 && rawPhone.startsWith('91') ? rawPhone.substring(2) : rawPhone;

  const smsLogEntry = {
    id: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipient: to,
    phoneCleaned: phone10,
    timestamp: new Date().toISOString(),
    formattedTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    provider: (finalSettings.smsGatewayProvider || 'fast2sms').toLowerCase(),
    status: 'pending'
  };

  const provider = (finalSettings.smsGatewayProvider || 'fast2sms').toLowerCase();

  // 1. FAST2SMS (India Quick OTP Route)
  if (provider === 'fast2sms' && finalSettings.fast2smsApiKey) {
    const postBody = JSON.stringify({
      route: 'otp',
      variables_values: code,
      numbers: phone10
    });

    const options = {
      hostname: 'www.fast2sms.com',
      port: 443,
      path: '/dev/bulkV2',
      method: 'POST',
      headers: {
        'authorization': finalSettings.fast2smsApiKey.trim(),
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const resp = JSON.parse(data);
          if (resp.return === true || res.statusCode === 200) {
            smsLogEntry.status = 'delivered';
            smsLogEntry.response = resp;
            console.log(`[ASMI SMS] Fast2SMS OTP delivered successfully to ${phone10}`);
            appendSmsLog(smsLogEntry);
            return callback(null, { success: true, provider: 'fast2sms', response: resp });
          } else {
            smsLogEntry.status = 'failed';
            smsLogEntry.error = resp.message || 'Fast2SMS error';
            console.error('[ASMI SMS] Fast2SMS Error:', resp);
            appendSmsLog(smsLogEntry);
            return callback(new Error(smsLogEntry.error), { success: false, error: smsLogEntry.error });
          }
        } catch (e) {
          smsLogEntry.status = 'error';
          smsLogEntry.error = e.message;
          appendSmsLog(smsLogEntry);
          return callback(e, { success: false, error: e.message });
        }
      });
    });

    req.on('error', (err) => {
      smsLogEntry.status = 'network_error';
      smsLogEntry.error = err.message;
      appendSmsLog(smsLogEntry);
      return callback(err, { success: false, error: err.message });
    });

    req.write(postBody);
    req.end();
    return;
  }

  // 2. TWILIO (Global SMS Gateway)
  if (provider === 'twilio' && finalSettings.twilioAccountSid && finalSettings.twilioAuthToken && finalSettings.twilioFromNumber) {
    const accountSid = finalSettings.twilioAccountSid.trim();
    const authToken = finalSettings.twilioAuthToken.trim();
    const fromNumber = finalSettings.twilioFromNumber.trim();
    const toNumber = to.startsWith('+') ? to.replace(/\s+/g, '') : `+91${phone10}`;
    const messageBody = `Your ASMI Haute Joaillerie verification passcode is ${code}. Valid for 5 minutes. Do not share with anyone.`;

    const postParams = new URLSearchParams({
      From: fromNumber,
      To: toNumber,
      Body: messageBody
    }).toString();

    const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const options = {
      hostname: 'api.twilio.com',
      port: 443,
      path: `/2010-04-01/Accounts/${accountSid}/Messages.json`,
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postParams)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const resp = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            smsLogEntry.status = 'delivered';
            smsLogEntry.sid = resp.sid;
            console.log(`[ASMI SMS] Twilio SMS sent successfully to ${toNumber}. SID: ${resp.sid}`);
            appendSmsLog(smsLogEntry);
            return callback(null, { success: true, provider: 'twilio', sid: resp.sid });
          } else {
            smsLogEntry.status = 'failed';
            smsLogEntry.error = resp.message || 'Twilio error';
            console.error('[ASMI SMS] Twilio Error:', resp);
            appendSmsLog(smsLogEntry);
            return callback(new Error(smsLogEntry.error), { success: false, error: smsLogEntry.error });
          }
        } catch (e) {
          smsLogEntry.status = 'error';
          smsLogEntry.error = e.message;
          appendSmsLog(smsLogEntry);
          return callback(e, { success: false, error: e.message });
        }
      });
    });

    req.on('error', (err) => {
      smsLogEntry.status = 'network_error';
      smsLogEntry.error = err.message;
      appendSmsLog(smsLogEntry);
      return callback(err, { success: false, error: err.message });
    });

    req.write(postParams);
    req.end();
    return;
  }

  // 3. Fallback: Check if Patron exists with email
  const patrons = getDbFile('patrons.json', DEFAULT_PATRONS);
  const matchedPatron = patrons.find(p => p.phone && p.phone.replace(/[^0-9]/g, '').includes(phone10));
  if (matchedPatron && matchedPatron.email) {
    console.log(`[ASMI SMS] Gateway pending configuration. Dispatched OTP to registered patron email: ${matchedPatron.email}`);
    smsLogEntry.status = 'routed_to_patron_email';
    smsLogEntry.notes = `Routed to linked patron email ${matchedPatron.email} because SMS gateway is pending configuration.`;
    appendSmsLog(smsLogEntry);
    sendOtpEmail({ to: matchedPatron.email, code, customerName: matchedPatron.name, settings: finalSettings, callback: () => {} });
    return callback(null, {
      success: true,
      routedToEmail: true,
      email: matchedPatron.email,
      message: `SMS gateway is pending configuration in Store Settings, but we found your registered email (${matchedPatron.email}) and have dispatched your OTP passcode there.`
    });
  }

  smsLogEntry.status = 'gateway_not_configured';
  smsLogEntry.notes = 'No active SMS Gateway API key (Fast2SMS or Twilio) configured in Store Settings.';
  appendSmsLog(smsLogEntry);
  return callback(new Error('SMS Gateway not configured'), {
    success: false,
    requiresGatewayConfig: true,
    error: 'sms_gateway_not_configured',
    message: 'SMS gateway is not configured yet. Please configure your Fast2SMS or Twilio API key in Admin Settings -> Store Settings, or sign in using your Email / Gmail address.'
  });
}

function appendSmsLog(entry) {
  try {
    let logs = getDbFile('sms_logs.json', []);
    if (!Array.isArray(logs)) logs = [];
    logs.unshift(entry);
    if (logs.length > 200) logs = logs.slice(0, 200);
    saveDbFile('sms_logs.json', logs);
  } catch (e) {
    console.error('[ASMI SMS] Could not append SMS log:', e);
  }
}

// -----------------------------------------------------------------------------
// COUPON & GIFT CARD HTML/TEXT BUILDERS
// -----------------------------------------------------------------------------
function buildCouponEmailHtml(coupon, patron, settings, customMsg) {
  const couponCode = coupon.code || 'ROYAL10';
  const discountType = coupon.type || 'percent';
  const discountVal = coupon.value || 10;
  const discountText = discountType === 'percent' ? `${discountVal}% OFF` : `₹${discountVal.toLocaleString('en-IN')} FLAT OFF`;
  const description = coupon.description || `${discountText} Exclusive Privilege Voucher`;
  const patronName = patron ? (patron.name || 'Esteemed Patron') : 'Esteemed VIP Patron';
  const patronTier = patron ? (patron.tier || 'Royal Heirloom Patron') : 'Royal Heirloom Patron';
  const minOrderText = coupon.minOrder > 0 ? `Valid on orders above ₹${coupon.minOrder.toLocaleString('en-IN')}` : 'No Minimum Order Requirement';
  
  const siteUrl = (settings.canonicalUrl || 'http://localhost:8000/').replace(/\/+$/, '');
  const applyUrl = `${siteUrl}/?coupon=${encodeURIComponent(couponCode)}`;
  const bespokeMsg = customMsg || `As a cherished member of our inner circle, we cordially invite you to enjoy this exclusive private acquisition privilege on handcrafted Basra pearls, certified emeralds, and 22K pure gold heirloom masterworks.`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Exclusive Privilege Token: ${couponCode}</title>
    </head>
    <body style="margin: 0; padding: 24px; background-color: #0d0b07; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e0d8;">
      <div style="max-width: 640px; margin: 0 auto; background-color: #14110d; border: 1px solid rgba(212, 175, 55, 0.35); box-shadow: 0 10px 40px rgba(0,0,0,0.6); border-radius: 8px; overflow: hidden;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #070707 0%, #1e1912 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <div style="display: inline-block; padding: 4px 16px; background: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700; border-radius: 20px; margin-bottom: 12px;">
            👑 PRIVATE PATRON PRIVILEGE
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 3px; font-family: Georgia, 'Times New Roman', serif;">ASMI HAUTE JOAILLERIE</h1>
          <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Atelier Private Client Salon &bull; Mumbai</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 36px 32px;">
          <p style="font-size: 13px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px 0;">Special Invitation For</p>
          <h2 style="color: #ffffff; font-family: Georgia, serif; font-size: 22px; margin: 0 0 4px 0;">Dear ${patronName},</h2>
          <span style="display: inline-block; font-size: 11px; color: #a89f91; margin-bottom: 20px;">Tier: <strong style="color: #D4AF37;">${patronTier}</strong></span>

          <p style="font-size: 14px; line-height: 1.7; color: #d0c8be; margin-bottom: 28px;">
            ${bespokeMsg}
          </p>

          <!-- Golden Coupon Token Box -->
          <div style="background: linear-gradient(135deg, #1b1610 0%, #261f14 100%); border: 2px dashed #D4AF37; border-radius: 8px; padding: 28px; text-align: center; margin-bottom: 28px; position: relative;">
            <span style="font-size: 11px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 6px;">
              YOUR EXCLUSIVE PROMOTION CODE
            </span>
            <div style="background: #0d0b07; border: 1px solid rgba(212, 175, 55, 0.5); padding: 12px 24px; border-radius: 6px; display: inline-block; margin-bottom: 12px;">
              <span style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: 800; color: #D4AF37; letter-spacing: 4px;">
                ${couponCode}
              </span>
            </div>
            <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
              ${discountText}
            </div>
            <p style="font-size: 12px; color: #a89f91; margin: 0;">
              ${description} &bull; <span style="color: #D4AF37;">${minOrderText}</span>
            </p>
          </div>

          <!-- 1-Click Redeem CTA Button -->
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${applyUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%); color: #070707; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; padding: 16px 36px; text-decoration: none; border-radius: 4px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);">
              ✨ Auto-Apply Privilege &amp; Browse Vault
            </a>
            <span style="display: block; font-size: 11px; color: #777; margin-top: 10px;">
              Or apply code <strong style="color: #D4AF37;">${couponCode}</strong> at checkout.
            </span>
          </div>

          <!-- Atelier Guarantees -->
          <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 20px; display: table; width: 100%;">
            <div style="display: table-row;">
              <div style="display: table-cell; width: 33%; text-align: center; padding: 6px;">
                <span style="font-size: 16px; display: block;">🔒</span>
                <span style="font-size: 11px; color: #a89f91; font-weight: 600;">BIS 916 Hallmark</span>
              </div>
              <div style="display: table-cell; width: 33%; text-align: center; padding: 6px;">
                <span style="font-size: 16px; display: block;">✈️</span>
                <span style="font-size: 11px; color: #a89f91; font-weight: 600;">Insured Armored Air</span>
              </div>
              <div style="display: table-cell; width: 33%; text-align: center; padding: 6px;">
                <span style="font-size: 16px; display: block;">✨</span>
                <span style="font-size: 11px; color: #a89f91; font-weight: 600;">Free Lifetime Care</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #070707; border-top: 1px solid rgba(212, 175, 55, 0.2); padding: 20px 32px; text-align: center; font-size: 11px; color: #777; line-height: 1.6;">
          © 2026 ASMI Haute Joaillerie Atelier &bull; Heritage Gold Quadrant, Mumbai 400001<br/>
          This private privilege token was transmitted exclusively to your registered patron account.
        </div>

      </div>
    </body>
    </html>
  `;
}

function buildCouponEmailText(coupon, patron, settings, customMsg) {
  const couponCode = coupon.code || 'ROYAL10';
  const discountType = coupon.type || 'percent';
  const discountVal = coupon.value || 10;
  const discountText = discountType === 'percent' ? `${discountVal}% OFF` : `₹${discountVal.toLocaleString('en-IN')} FLAT OFF`;
  const patronName = patron ? (patron.name || 'Esteemed Patron') : 'Esteemed VIP Patron';
  const siteUrl = (settings.canonicalUrl || 'http://localhost:8000/').replace(/\/+$/, '');
  const applyUrl = `${siteUrl}/?coupon=${encodeURIComponent(couponCode)}`;

  return `
================================================================================
ASMI HAUTE JOAILLERIE - EXCLUSIVE PATRON PRIVILEGE TOKEN
================================================================================
Dear ${patronName},

${customMsg || 'It is our distinct honor to extend this private privilege token to you as a valued patron of ASMI Haute Joaillerie.'}

PROMOTION PRIVILEGE:
--------------------------------------------------------------------------------
Coupon Code   : ${couponCode}
Discount Offer: ${discountText}
Description   : ${coupon.description || 'VIP Exclusive Voucher'}
Min Order     : ${coupon.minOrder > 0 ? `₹${coupon.minOrder}` : 'None'}

HOW TO REDEEM:
--------------------------------------------------------------------------------
1. Visit: ${applyUrl}
2. Your discount code [${couponCode}] will be automatically applied to your cart.
3. Or enter "${couponCode}" in the shopping bag promo code field.

ATELIER STANDARDS:
- BIS 916 Hallmark & International Gemological Authenticity
- 100% Insured Armored Air Delivery
- Complimentary Lifetime Jewelry Care & Gold Polishing

================================================================================
ASMI Haute Joaillerie Atelier • Heritage Gold Quadrant, Mumbai 400001
================================================================================
`;
}

function buildGiftCardEmailHtml(giftcard, patron, settings, customMsg) {
  const giftCardCode = giftcard.code || 'GIFT-ASMI-9160';
  const balance = giftcard.balance || 5000;
  const recipientName = giftcard.recipient || (patron ? patron.name : 'Valued Patron');
  const issuedDate = giftcard.issuedDate || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const siteUrl = (settings.canonicalUrl || 'http://localhost:8000/').replace(/\/+$/, '');
  const applyUrl = `${siteUrl}/?giftcard=${encodeURIComponent(giftCardCode)}`;
  const bespokeMsg = customMsg || `You have been presented with an exclusive Digital Gift Card for ASMI Haute Joaillerie. This stored credit voucher is ready for immediate acquisition of certified South Sea pearls, Zambian emeralds, and 22K gold heirloom jewels.`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Your Digital Gift Card: ${giftCardCode}</title>
    </head>
    <body style="margin: 0; padding: 24px; background-color: #070707; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e0d8;">
      <div style="max-width: 640px; margin: 0 auto; background-color: #12100d; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 10px 40px rgba(0,0,0,0.8); border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #000000 0%, #1a150e 100%); padding: 30px 24px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <div style="display: inline-block; padding: 4px 16px; background: rgba(212, 175, 55, 0.2); border: 1px solid #D4AF37; color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700; border-radius: 20px; margin-bottom: 12px;">
            🎁 DIGITAL STORE CREDIT VOUCHER
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 3px; font-family: Georgia, 'Times New Roman', serif;">ASMI HAUTE JOAILLERIE</h1>
          <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Master Atelier Vault &bull; Stored Value Token</p>
        </div>

        <div style="padding: 36px 30px;">
          <p style="font-size: 13px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px 0;">Presented With Distinction To</p>
          <h2 style="color: #ffffff; font-family: Georgia, serif; font-size: 22px; margin: 0 0 14px 0;">${recipientName}</h2>

          <p style="font-size: 14px; line-height: 1.7; color: #d0c8be; margin-bottom: 28px;">
            ${bespokeMsg}
          </p>

          <!-- Metallic Gold Digital Gift Card Graphic Container -->
          <div style="background: linear-gradient(135deg, #1c1813 0%, #2f2518 50%, #17130d 100%); border: 2px solid #D4AF37; border-radius: 12px; padding: 26px; box-shadow: 0 8px 30px rgba(212, 175, 55, 0.25); margin-bottom: 28px; position: relative;">
            
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td>
                  <span style="font-family: Georgia, serif; font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 2px;">ASMI</span>
                  <span style="font-size: 10px; color: #D4AF37; display: block; letter-spacing: 1.5px;">HAUTE JOAILLERIE</span>
                </td>
                <td style="text-align: right;">
                  <span style="display: inline-block; padding: 3px 10px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10B981; color: #10B981; font-size: 10px; font-weight: 700; border-radius: 12px; text-transform: uppercase;">
                    ● ACTIVE &amp; VERIFIED
                  </span>
                </td>
              </tr>
            </table>

            <div style="margin-bottom: 22px;">
              <span style="font-size: 11px; color: #a89f91; text-transform: uppercase; letter-spacing: 1.5px; display: block;">Voucher Credit Balance</span>
              <div style="font-family: Georgia, serif; font-size: 34px; font-weight: 800; color: #D4AF37; letter-spacing: 1px; margin-top: 2px;">
                ₹${balance.toLocaleString('en-IN')} <span style="font-size: 14px; font-weight: normal; color: #a89f91;">INR</span>
              </div>
            </div>

            <table style="width: 100%; border-top: 1px solid rgba(212, 175, 55, 0.3); padding-top: 14px;">
              <tr>
                <td>
                  <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; display: block;">Gift Card Number</span>
                  <strong style="font-family: 'Courier New', monospace; font-size: 16px; color: #ffffff; letter-spacing: 2px;">${giftCardCode}</strong>
                </td>
                <td style="text-align: right;">
                  <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; display: block;">Issued Date</span>
                  <strong style="font-size: 12px; color: #d0c8be;">${issuedDate}</strong>
                </td>
              </tr>
            </table>

          </div>

          <!-- 1-Click Redeem CTA Button -->
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${applyUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%); color: #070707; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; padding: 16px 36px; text-decoration: none; border-radius: 4px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);">
              💎 Redeem Gift Card in Atelier
            </a>
            <span style="display: block; font-size: 11px; color: #777; margin-top: 10px;">
              Or apply voucher code <strong style="color: #D4AF37;">${giftCardCode}</strong> in the checkout discount box.
            </span>
          </div>

          <!-- Redemption Notes -->
          <div style="background-color: #1a1610; border-left: 3px solid #D4AF37; padding: 12px 16px; font-size: 12px; color: #b8b0a2; line-height: 1.5; border-radius: 0 4px 4px 0;">
            <strong>Redemption Policy:</strong> This gift card balance never expires. It can be applied towards single or multiple purchases until the full value of ₹${balance.toLocaleString('en-IN')} has been redeemed.
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #070707; border-top: 1px solid rgba(212, 175, 55, 0.2); padding: 20px 32px; text-align: center; font-size: 11px; color: #777;">
          © 2026 ASMI Haute Joaillerie Atelier &bull; Master Vault Notification Engine &bull; Mumbai, India
        </div>

      </div>
    </body>
    </html>
  `;
}

function buildGiftCardEmailText(giftcard, patron, settings, customMsg) {
  const giftCardCode = giftcard.code || 'GIFT-ASMI-9160';
  const balance = giftcard.balance || 5000;
  const recipientName = giftcard.recipient || (patron ? patron.name : 'Valued Patron');
  const siteUrl = (settings.canonicalUrl || 'http://localhost:8000/').replace(/\/+$/, '');
  const applyUrl = `${siteUrl}/?giftcard=${encodeURIComponent(giftCardCode)}`;

  return `
================================================================================
ASMI HAUTE JOAILLERIE - DIGITAL GIFT CARD STORE CREDIT
================================================================================
Recipient : ${recipientName}
Balance   : ₹${balance.toLocaleString('en-IN')} INR
Card Code : ${giftCardCode}
Issued    : ${giftcard.issuedDate || 'Active'}

${customMsg || 'You have been presented with an exclusive Digital Gift Card for ASMI Haute Joaillerie.'}

HOW TO REDEEM:
--------------------------------------------------------------------------------
1. Visit: ${applyUrl}
2. The gift card credit of ₹${balance.toLocaleString('en-IN')} will be applied to your shopping session.
3. Or enter "${giftCardCode}" at checkout.

================================================================================
ASMI Haute Joaillerie Atelier • Heritage Gold Quadrant, Mumbai 400001
================================================================================
`;
}

function sendOrderNotificationEmail(order, isTest = false, callback = () => {}) {
  const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
  const targetEmail = (settings.orderNotificationEmail || 'orders@asmijewelry.com').trim();
  const enabled = settings.orderEmailEnabled !== false;

  if (!enabled && !isTest) {
    console.log('[ASMI Mailer] Order email notification skipped (disabled in settings).');
    const result = { success: false, skipped: true, reason: 'Order email notifications disabled in settings' };
    callback(null, result);
    return result;
  }

  const orderNum = order.orderNumber || order.id || `ASM-${Date.now()}`;
  const customerName = order.customerName || 'Valued Patron';
  const finalTotal = order.calculations?.finalTotal || 0;
  const subject = isTest
    ? `🔔 [TEST] ASMI Master Atelier Order Notification Dispatcher (Target: ${targetEmail})`
    : `🛎️ NEW ORDER RECEIVED: #${orderNum} - ₹${finalTotal.toLocaleString('en-IN')} - ${customerName}`;

  const htmlContent = buildOrderEmailHtml(order, settings);
  const textContent = buildOrderEmailText(order, settings);

  return dispatchEmailGeneric({
    to: targetEmail,
    subject: subject,
    html: htmlContent,
    text: textContent,
    type: 'order_notification',
    metadata: { orderNumber: orderNum, customerName, amountINR: finalTotal, isTest },
    settings: settings,
    callback: callback
  });
}

// -----------------------------------------------------------------------------
// PATRON OFFICIAL ORDER CONFIRMATION EMAIL DISPATCHERS
// -----------------------------------------------------------------------------
function buildPatronOrderConfirmationEmailHtml(order, settings) {
  const orderNum = order.orderNumber || order.id || `ASM-${Date.now()}`;
  const customerName = order.customerName || 'Valued Patron';
  const customerEmail = (order.customerEmail || 'patron@asmijewelry.com').trim();
  const customerPhone = order.customerPhone || order.shippingAddress?.phone || 'N/A';
  const dateStr = order.dateStr || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const paymentMode = order.gateway || 'Secure Online Payment';
  const paymentId = order.paymentId || order.authCode || 'N/A';
  const ship = order.shippingAddress || {};
  const fullAddress = [
    ship.street,
    ship.landmark,
    ship.city,
    ship.state,
    ship.pincode ? `PIN: ${ship.pincode}` : '',
    ship.country || 'India'
  ].filter(Boolean).join(', ') || order.city || 'Standard Delivery Address';

  const calc = order.calculations || {};
  const subtotal = calc.subtotal || 0;
  const discount = calc.discount || 0;
  const taxGST = calc.taxGST || 0;
  const finalTotal = calc.finalTotal || subtotal;

  let itemsHtml = '';
  if (Array.isArray(order.items) && order.items.length > 0) {
    order.items.forEach((item, idx) => {
      const name = item.customName || item.name || item.title || `Fine Jewel #${idx + 1}`;
      const qty = item.quantity || 1;
      const finish = item.selectedFinish || item.finish || '22K Gold';
      const size = item.selectedSize || item.size || 'Standard';
      const priceINR = item.customPriceINR !== undefined ? item.customPriceINR : (item.priceINR || 0);
      const lineTotal = priceINR * qty;

      itemsHtml += `
        <tr style="border-bottom: 1px solid #ECE7DE;">
          <td style="padding: 14px 10px; font-weight: 600; color: #1A1714; font-size: 13px;">
            ${name}
            <div style="font-size: 11px; color: #8C6E17; font-weight: normal; margin-top: 3px;">
              Finish: <strong>${finish}</strong> &bull; Size: <strong>${size}</strong> &bull; SKU: ${item.id || 'ASMI-SKU'}
            </div>
          </td>
          <td style="padding: 14px 10px; text-align: center; color: #555555; font-size: 13px;">${qty}</td>
          <td style="padding: 14px 10px; text-align: right; color: #555555; font-size: 13px;">₹${priceINR.toLocaleString('en-IN')}</td>
          <td style="padding: 14px 10px; text-align: right; font-weight: 700; color: #8C6E17; font-size: 14px;">₹${lineTotal.toLocaleString('en-IN')}</td>
        </tr>
      `;
    });
  } else {
    itemsHtml = '<tr><td colspan="4" style="padding: 16px; text-align: center; color: #777;">Fine handcrafted jewels listed in master archive.</td></tr>';
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Order Confirmed: #${orderNum} - ASMI Haute Joaillerie</title>
    </head>
    <body style="margin: 0; padding: 24px 12px; background-color: #F8F6F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2A241E; line-height: 1.5;">
      
      <div style="max-width: 660px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E8DFD0; border-top: 4px solid #D4AF37; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden;">
        
        <!-- Header & Crest -->
        <div style="background-color: #12100D; padding: 32px 28px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <div style="font-size: 10px; color: #D4AF37; letter-spacing: 0.28em; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
            HAUTE JOAILLERIE &bull; MASTER ATELIER
          </div>
          <h1 style="font-family: Georgia, serif; font-size: 26px; color: #FAF7F2; margin: 0; font-weight: normal; letter-spacing: 0.08em;">
            ASMI'S COLLECTION
          </h1>
          <div style="margin-top: 10px; display: inline-block; padding: 4px 14px; background: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; border-radius: 20px; color: #E5C368; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;">
            ✦ HEIRLOOM ORDER CONFIRMED ✦
          </div>
        </div>

        <!-- Greeting & Notification Hero -->
        <div style="padding: 32px 32px 20px 32px;">
          <h2 style="font-family: Georgia, serif; font-size: 20px; color: #1A1714; margin: 0 0 10px 0;">
            Esteemed Patron ${customerName},
          </h2>
          <p style="font-size: 14px; color: #4A4238; margin: 0 0 18px 0; line-height: 1.6;">
            Thank you for honoring us with your prestigious patronage. We are delighted to confirm that your bespoke fine jewelry order <strong>#${orderNum}</strong> has been officially confirmed and placed in our artisan crafting queue.
          </p>

          <!-- Order Summary Badge Grid -->
          <div style="background: #FAF8F5; border: 1px solid #EAE3D5; padding: 18px 20px; border-radius: 4px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #7A6F62; width: 40%;">Order Reference:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #1A1714; font-family: monospace; font-size: 14px;">#${orderNum}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Date &amp; Time:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #1A1714;">${dateStr}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Payment Gateway:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #10B981;">
                  ${paymentMode} &bull; <span style="font-family: monospace; font-size: 11px; color: #4A4238;">${paymentId}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Armored Courier:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #1A1714;">
                  BlueDart Armored Express Logistics (Air Transit)
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Estimated Delivery:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #8C6E17;">
                  10 &ndash; 12 Business Days (Complimentary Insured Delivery)
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Official Patron Email:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #1A1714;">${customerEmail}</td>
              </tr>
            </table>
          </div>

          <!-- Shipping Destination -->
          <div style="background: #FFFFFF; border: 1px solid #ECE7DE; padding: 18px 20px; border-radius: 4px; margin-bottom: 24px;">
            <div style="font-size: 11px; color: #8C6E17; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px;">
              ARMORED DELIVERY DESTINATION
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #1A1714; margin-bottom: 2px;">
              ${customerName}
            </div>
            <div style="font-size: 13px; color: #555555; line-height: 1.4;">
              ${fullAddress}<br/>
              Phone Contact: <strong>${customerPhone}</strong>
            </div>
          </div>

          <!-- Items Table -->
          <div style="margin-bottom: 24px;">
            <div style="font-size: 11px; color: #8C6E17; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;">
              ACQUIRED JEWELRY PIECES
            </div>
            <table style="width: 100%; border-collapse: collapse; background: #FFFFFF; border: 1px solid #ECE7DE;">
              <thead>
                <tr style="background-color: #12100D; color: #E5C368; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; text-align: left;">
                  <th style="padding: 10px;">Jewel Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <!-- Financial Breakdown -->
          <div style="background: #FAF8F5; border: 1px solid #EAE3D5; padding: 18px 20px; border-radius: 4px; margin-bottom: 28px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Bag Subtotal:</td>
                <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #1A1714;">₹${subtotal.toLocaleString('en-IN')}</td>
              </tr>
              ${discount > 0 ? `
              <tr>
                <td style="padding: 6px 0; color: #10B981;">Royal Privilege Privilege Voucher:</td>
                <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #10B981;">-₹${discount.toLocaleString('en-IN')}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Armored Insured Shipping:</td>
                <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #10B981;">COMPLIMENTARY (FREE)</td>
              </tr>
              ${taxGST > 0 ? `
              <tr>
                <td style="padding: 6px 0; color: #7A6F62;">Purity Inspection &amp; GST:</td>
                <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #1A1714;">₹${taxGST.toLocaleString('en-IN')}</td>
              </tr>
              ` : ''}
              <tr style="border-top: 1.5px solid #D4AF37;">
                <td style="padding: 10px 0 4px 0; font-family: Georgia, serif; font-size: 16px; font-weight: 700; color: #1A1714;">Total Settlement:</td>
                <td style="padding: 10px 0 4px 0; text-align: right; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #8C6E17;">₹${finalTotal.toLocaleString('en-IN')}</td>
              </tr>
            </table>
          </div>

          <!-- Heirloom Purity Guarantee & Lifetime Concierge -->
          <div style="background-color: #12100D; color: #FAF7F2; padding: 20px; border-radius: 4px; border-left: 4px solid #D4AF37; margin-bottom: 24px; font-size: 12px; line-height: 1.6;">
            <div style="color: #D4AF37; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">
              ✦ BIS 916 HALLMARK GUARANTEE &amp; LIFETIME CARE ✦
            </div>
            <div>
              &bull; <strong>Authenticity:</strong> Every piece comes with an authentic BIS 916 hallmarked laboratory certificate.<br/>
              &bull; <strong>Armored Security:</strong> Shipped in tamper-evident sealed velvet luxury cases with 100% transit insurance.<br/>
              &bull; <strong>Lifetime Care:</strong> Complimentary annual ultrasonic cleaning and setting checks for life at our Mumbai Atelier.<br/>
              &bull; <strong>Logistics Tracking:</strong> You will receive real-time dispatch updates as your jewel passes through each of our 5 inspection steps.
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #0E0C0A; padding: 24px; text-align: center; font-size: 11px; color: #8E8478; border-top: 1px solid #221F1B;">
          <div style="color: #D4AF37; font-weight: 600; margin-bottom: 4px;">ASMI HAUTE JOAILLERIE ATELIER</div>
          <div>Heritage Gold Quadrant, Colaba, Mumbai 400001, India</div>
          <div style="margin-top: 4px;">
            Concierge Hotline: <strong style="color: #FAF7F2;">+91 98765 43210</strong> &bull; Email: <a href="mailto:concierge@asmijewelry.com" style="color: #D4AF37; text-decoration: none;">concierge@asmijewelry.com</a>
          </div>
          <div style="margin-top: 10px; font-size: 10px; opacity: 0.7;">
            This official order confirmation was transmitted to your recognized patron account (${customerEmail}).
          </div>
        </div>

      </div>

    </body>
    </html>
  `;
}

function buildPatronOrderConfirmationEmailText(order, settings) {
  const orderNum = order.orderNumber || order.id || 'N/A';
  const customerName = order.customerName || 'Valued Patron';
  const customerEmail = (order.customerEmail || 'patron@asmijewelry.com').trim();
  const dateStr = order.dateStr || new Date().toLocaleDateString('en-IN');
  const calc = order.calculations || {};
  const finalTotal = calc.finalTotal || 0;

  return `
ASMI HAUTE JOAILLERIE - HEIRLOOM ORDER CONFIRMATION
===================================================

Dear Esteemed Patron ${customerName},

Thank you for choosing ASMI Haute Joaillerie. We are delighted to confirm that your bespoke fine jewelry order #${orderNum} has been officially confirmed and placed in our master artisan queue.

ORDER DETAILS:
- Order Reference: #${orderNum}
- Placed On: ${dateStr}
- Payment Mode: ${order.gateway || 'Secure Online'} (Ref: ${order.paymentId || order.authCode || 'N/A'})
- Courier: BlueDart Armored Express Logistics (Air Transit)
- Estimated Delivery: 10 - 12 Business Days (Complimentary Insured Delivery)
- Registered Patron Email: ${customerEmail}
- Grand Total: ₹${finalTotal.toLocaleString('en-IN')}

SHIPPING ADDRESS:
${customerName}
${[order.shippingAddress?.street, order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.pincode].filter(Boolean).join(', ')}
Phone: ${order.customerPhone || order.shippingAddress?.phone || 'N/A'}

PURITY & AUTHENTICITY ASSURANCE:
- 100% BIS 916 Hallmarked Gold & Certified Gemstones
- Tamper-proof luxury velvet vault packaging
- Full transit insurance included
- Complimentary lifetime cleaning and setting inspections

CONCIERGE ASSISTANCE:
Phone: +91 98765 43210
Email: concierge@asmijewelry.com
Flagship Boutique: Heritage Gold Quadrant, Colaba, Mumbai 400001
===================================================
`.trim();
}

function sendPatronOrderConfirmationEmail(order, isTest = false, callback = () => {}) {
  const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
  const patronEmail = (order.customerEmail || order.patronEmail || order.email || '').trim();

  // If no valid patron email is present or doesn't have '@', skip patron email safely
  if (!patronEmail || !patronEmail.includes('@')) {
    console.log('[ASMI Mailer] Patron confirmation email skipped: No valid customer email provided.');
    const result = { success: false, skipped: true, reason: 'No valid customer email on order' };
    callback(null, result);
    return result;
  }

  const orderNum = order.orderNumber || order.id || `ASM-${Date.now()}`;
  const customerName = order.customerName || 'Valued Patron';
  const finalTotal = order.calculations?.finalTotal || 0;

  const subject = `✨ ORDER CONFIRMED: #${orderNum} - ASMI Haute Joaillerie Heirloom Order Confirmation`;
  const htmlContent = buildPatronOrderConfirmationEmailHtml(order, settings);
  const textContent = buildPatronOrderConfirmationEmailText(order, settings);

  return dispatchEmailGeneric({
    to: patronEmail,
    subject: subject,
    html: htmlContent,
    text: textContent,
    type: 'patron_order_confirmation',
    metadata: { orderNumber: orderNum, customerName, patronEmail, amountINR: finalTotal, isTest },
    settings: settings,
    callback: (err, res) => {
      if (res) {
        console.log(`[ASMI Mailer] Patron confirmation email successfully queued for #${orderNum} to ${patronEmail}.`);
      }
      callback(err, res);
    }
  });
}

// -----------------------------------------------------------------------------
// ORDER ITEM & FULL ORDER CANCELLATION EMAIL DISPATCHERS
// -----------------------------------------------------------------------------
function buildAdminCancellationEmailHtml(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings) {
  const orderNum = order.orderNumber || order.id || 'N/A';
  const patronName = patronDetails?.name || order.customerName || 'Valued Patron';
  const patronEmail = patronDetails?.email || order.customerEmail || 'N/A';
  const patronPhone = patronDetails?.phone || order.customerPhone || order.shippingAddress?.phone || 'N/A';
  const patronTier = patronDetails?.tier || 'Royal Heirloom Patron';
  const patronMemberId = patronDetails?.memberId || order.patronMemberId || 'ASMI-VIP-9160';
  const ship = order.shippingAddress || {};
  const fullAddress = [
    ship.street,
    ship.landmark,
    ship.city,
    ship.state,
    ship.pincode ? `PIN: ${ship.pincode}` : '',
    ship.country || 'India'
  ].filter(Boolean).join(', ') || order.city || 'Standard Delivery Address';

  const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const orderPlacedDate = order.dateStr || 'Recent';
  const paymentMode = order.gateway || 'Online Payment';
  const paymentId = order.paymentId || order.authCode || 'N/A';
  const cancelReason = reason || 'Patron requested cancellation';
  const patronNotes = notes ? `<div style="margin-top: 6px; font-size: 13px; color: #555; background: #fff; padding: 8px 12px; border: 1px solid #e0d8cc; border-radius: 4px;"><strong>Patron Note:</strong> ${notes}</div>` : '';

  let itemRowsHtml = '';
  let refundTotal = 0;

  if (isFullOrder) {
    (order.items || []).forEach((it, idx) => {
      const name = it.customName || it.name || it.title || `Jewelry Piece #${idx + 1}`;
      const qty = it.quantity || 1;
      const finish = it.selectedFinish || it.finish || '22K Gold';
      const size = it.selectedSize || it.size || 'Standard';
      const priceINR = it.customPriceINR !== undefined ? it.customPriceINR : (it.priceINR || 0);
      const lineTotal = priceINR * qty;
      refundTotal += lineTotal;

      itemRowsHtml += `
        <tr style="border-bottom: 1px solid #f0e6d6;">
          <td style="padding: 12px 10px; font-weight: 600; color: #8B0000;">
            ${name}
            <div style="font-size: 11px; color: #777; font-weight: normal; margin-top: 2px;">
              Finish: <strong>${finish}</strong> | Size: <strong>${size}</strong> | SKU: ${it.id || 'ASMI-SKU'}
            </div>
          </td>
          <td style="padding: 12px 10px; text-align: center; color: #444;">${qty}</td>
          <td style="padding: 12px 10px; text-align: right; color: #444;">₹${priceINR.toLocaleString('en-IN')}</td>
          <td style="padding: 12px 10px; text-align: right; font-weight: 700; color: #DC2626;">₹${lineTotal.toLocaleString('en-IN')}</td>
        </tr>
      `;
    });
    if (order.calculations?.taxGST) {
      refundTotal += (order.calculations.taxGST || 0);
    }
  } else if (cancelledItem) {
    const name = cancelledItem.customName || cancelledItem.name || cancelledItem.title || 'Jewelry Piece';
    const qty = cancelledItem.quantity || 1;
    const finish = cancelledItem.selectedFinish || cancelledItem.finish || '22K Gold';
    const size = cancelledItem.selectedSize || cancelledItem.size || 'Standard';
    const priceINR = cancelledItem.customPriceINR !== undefined ? cancelledItem.customPriceINR : (cancelledItem.priceINR || 0);
    const lineTotal = priceINR * qty;
    refundTotal = lineTotal;

    itemRowsHtml = `
      <tr style="border-bottom: 1px solid #f0e6d6;">
        <td style="padding: 12px 10px; font-weight: 600; color: #8B0000;">
          ${name}
          <div style="font-size: 11px; color: #777; font-weight: normal; margin-top: 2px;">
            Finish: <strong>${finish}</strong> | Size: <strong>${size}</strong> | SKU: ${cancelledItem.id || 'ASMI-SKU'}
          </div>
        </td>
        <td style="padding: 12px 10px; text-align: center; color: #444;">${qty}</td>
        <td style="padding: 12px 10px; text-align: right; color: #444;">₹${priceINR.toLocaleString('en-IN')}</td>
        <td style="padding: 12px 10px; text-align: right; font-weight: 700; color: #DC2626;">₹${lineTotal.toLocaleString('en-IN')}</td>
      </tr>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>🚨 ORDER ITEM CANCELLATION: #${orderNum}</title>
    </head>
    <body style="margin: 0; padding: 24px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222;">
      <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border: 2px solid #DC2626; box-shadow: 0 6px 24px rgba(220, 38, 38, 0.15); border-radius: 6px; overflow: hidden;">
        
        <!-- Red Alert Header -->
        <div style="background: linear-gradient(135deg, #1f0808 0%, #3a0d0d 100%); padding: 28px 32px; border-bottom: 3px solid #DC2626; text-align: center;">
          <span style="display: inline-block; padding: 4px 16px; background: rgba(220, 38, 38, 0.25); border: 1px solid #DC2626; color: #FCA5A5; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-bottom: 10px; border-radius: 20px;">
            ⚠️ ORDER ITEM CANCELLATION NOTICE
          </span>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; font-family: Georgia, serif;">ASMI HAUTE JOAILLERIE</h1>
          <p style="color: #F87171; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;">Master Atelier Dispatch Alert &bull; Item Cancelled by Patron</p>
        </div>

        <!-- Cancellation Summary Banner -->
        <div style="background-color: #FEF2F2; padding: 18px 32px; border-bottom: 1px solid #FEE2E2;">
          <table style="width: 100%;">
            <tr>
              <td>
                <span style="font-size: 11px; color: #991B1B; text-transform: uppercase; letter-spacing: 1px; display: block; font-weight: 600;">Order Reference</span>
                <strong style="font-size: 18px; color: #DC2626; font-family: monospace;">#${orderNum}</strong>
                <span style="display: block; font-size: 11px; color: #666;">Placed: ${orderPlacedDate}</span>
              </td>
              <td style="text-align: right;">
                <span style="font-size: 11px; color: #991B1B; text-transform: uppercase; letter-spacing: 1px; display: block; font-weight: 600;">Cancelled At</span>
                <strong style="font-size: 13px; color: #333;">${dateStr}</strong>
                <span style="display: block; font-size: 11px; color: #DC2626; font-weight: 700;">Action: Halt Dispatch</span>
              </td>
            </tr>
          </table>
        </div>

        <div style="padding: 32px;">

          <!-- Patron Details Card -->
          <div style="background: #faf8f5; border: 1px solid #e7dfd3; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8C6E17; border-bottom: 1px solid #ded5c6; padding-bottom: 6px;">
              👤 Patron &amp; Delivery Logistics Profile
            </h3>
            <table style="width: 100%; font-size: 13px; line-height: 1.6;">
              <tr>
                <td style="width: 35%; color: #666; padding: 4px 0;">Patron Name:</td>
                <td style="width: 65%; font-weight: 700; color: #111;">${patronName}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">VIP Tier &amp; Member ID:</td>
                <td style="font-weight: 600; color: #8C6E17;">👑 ${patronTier} (${patronMemberId})</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Registered Email:</td>
                <td style="font-weight: 600; color: #111;"><a href="mailto:${patronEmail}" style="color: #1a0dab; text-decoration: none;">${patronEmail}</a></td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Contact Phone:</td>
                <td style="font-weight: 600; color: #111;"><a href="tel:${patronPhone}" style="color: #111; text-decoration: none;">${patronPhone}</a></td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0; vertical-align: top;">Shipping Address:</td>
                <td style="font-weight: 600; color: #333; vertical-align: top;">${fullAddress}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 4px 0;">Payment Method:</td>
                <td style="font-weight: 600; color: #10B981;">${paymentMode} (${paymentId})</td>
              </tr>
            </table>
          </div>

          <!-- Cancellation Reason Card -->
          <div style="background: #FFF5F5; border: 1.5px dashed #DC2626; border-radius: 4px; padding: 16px; margin-bottom: 24px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #991B1B; font-weight: 700; margin-bottom: 4px;">
              Reason for Cancellation Provided by Patron:
            </div>
            <div style="font-size: 15px; font-weight: 700; color: #991B1B;">
              ${cancelReason}
            </div>
            ${patronNotes}
          </div>

          <!-- Cancelled Items Table -->
          <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #111;">
            ❌ Cancelled Jewelry Item(s)
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background-color: #FEE2E2; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; color: #991B1B;">
                <th style="padding: 10px; text-align: left;">Piece Description</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Unit Price</th>
                <th style="padding: 10px; text-align: right;">Refundable Value</th>
              </tr>
            </thead>
            <tbody>
              ${itemRowsHtml}
            </tbody>
          </table>

          <!-- Admin Action Checklist -->
          <div style="background-color: #FAF8F5; border: 1px solid #E5DFD3; border-radius: 4px; padding: 16px; font-size: 12px; color: #555; line-height: 1.6; margin-bottom: 24px;">
            <strong style="color: #111; font-size: 13px; display: block; margin-bottom: 6px;">⚡ Master Atelier Action Protocol:</strong>
            1. <strong>Logistics:</strong> Remove cancelled item(s) from BlueDart armored shipment packing queue.<br/>
            2. <strong>Inventory:</strong> Return item stock count to available catalog inventory.<br/>
            3. <strong>Refund/Credit:</strong> Initiate refund of <strong>₹${refundTotal.toLocaleString('en-IN')}</strong> to the patron's original payment method (${paymentMode} / ${paymentId}) or issue store credit voucher.<br/>
            4. <strong>Confirmation:</strong> A confirmation email has been dispatched automatically to <strong>${patronEmail}</strong>.
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #1a1714; padding: 18px 32px; text-align: center; font-size: 11px; color: #999;">
          © 2026 ASMI Haute Joaillerie Atelier &bull; Master Vault Notification Engine &bull; Heritage Gold Quadrant, Mumbai 400001
        </div>

      </div>
    </body>
    </html>
  `;
}

function buildAdminCancellationEmailText(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings) {
  const orderNum = order.orderNumber || order.id || 'N/A';
  const patronName = patronDetails?.name || order.customerName || 'Valued Patron';
  const patronEmail = patronDetails?.email || order.customerEmail || 'N/A';
  const patronPhone = patronDetails?.phone || order.customerPhone || 'N/A';
  const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const paymentMode = order.gateway || 'Online Payment';
  const paymentId = order.paymentId || order.authCode || 'N/A';

  return `
================================================================================
ASMI HAUTE JOAILLERIE - ORDER ITEM CANCELLATION ALERT
================================================================================
Order Reference : #${orderNum}
Cancelled At    : ${dateStr}
Payment Mode    : ${paymentMode} (${paymentId})

PATRON DETAILS:
--------------------------------------------------------------------------------
Name            : ${patronName}
Email           : ${patronEmail}
Phone           : ${patronPhone}
VIP Tier        : ${patronDetails?.tier || 'Royal Heirloom Patron'}
Member ID       : ${patronDetails?.memberId || 'ASMI-VIP-9160'}

CANCELLATION DETAILS:
--------------------------------------------------------------------------------
Scope           : ${isFullOrder ? 'Full Order' : 'Single Item'}
Reason          : ${reason || 'Patron requested cancellation'}
Notes           : ${notes || 'None'}

ACTION REQUIRED:
1. Halt BlueDart armored transit packaging.
2. Return cancelled inventory stock.
3. Process refund or issue store credit voucher.
================================================================================
`;
}

function buildPatronCancellationEmailHtml(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings) {
  const orderNum = order.orderNumber || order.id || 'N/A';
  const patronName = patronDetails?.name || order.customerName || 'Valued Patron';
  const supportPhone = settings.supportPhone || settings.officialPhone || '+91 98765 43210';
  const supportEmail = settings.supportEmail || settings.officialEmail || 'concierge@asmijewelry.com';
  const siteUrl = (settings.canonicalUrl || 'http://localhost:8000/').replace(/\/+$/, '');
  const vaultUrl = `${siteUrl}/#vaultSection`;

  let itemDesc = '';
  let refundAmt = 0;
  if (isFullOrder) {
    itemDesc = `All jewelry pieces in Order #${orderNum}`;
    refundAmt = order.calculations?.finalTotal || 0;
  } else if (cancelledItem) {
    const name = cancelledItem.customName || cancelledItem.name || cancelledItem.title || 'Jewelry Piece';
    const finish = cancelledItem.selectedFinish || cancelledItem.finish || '22K Gold';
    const size = cancelledItem.selectedSize || cancelledItem.size || 'Standard';
    const priceINR = cancelledItem.customPriceINR !== undefined ? cancelledItem.customPriceINR : (cancelledItem.priceINR || 0);
    const qty = cancelledItem.quantity || 1;
    refundAmt = priceINR * qty;
    itemDesc = `${name} (${finish}, ${size}, Qty: ${qty})`;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Cancellation Confirmation: Order #${orderNum}</title>
    </head>
    <body style="margin: 0; padding: 24px; background-color: #0d0b07; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e0d8;">
      <div style="max-width: 640px; margin: 0 auto; background-color: #14110d; border: 1px solid rgba(212, 175, 55, 0.35); box-shadow: 0 10px 40px rgba(0,0,0,0.6); border-radius: 8px; overflow: hidden;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #070707 0%, #1e1912 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <div style="display: inline-block; padding: 4px 16px; background: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700; border-radius: 20px; margin-bottom: 12px;">
            ✦ CANCELLATION CONFIRMATION ✦
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 3px; font-family: Georgia, 'Times New Roman', serif;">ASMI HAUTE JOAILLERIE</h1>
          <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Atelier Private Client Salon &bull; Mumbai</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 36px 32px;">
          <p style="font-size: 13px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px 0;">Private Patron Notice</p>
          <h2 style="color: #ffffff; font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px 0;">Dear ${patronName},</h2>

          <p style="font-size: 14px; line-height: 1.7; color: #d0c8be; margin-bottom: 24px;">
            We confirm that your cancellation request for <strong>Order #${orderNum}</strong> has been successfully received and processed by our Master Atelier.
          </p>

          <!-- Cancelled Item Details Box -->
          <div style="background: #1c1813; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 11px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; font-weight: 700;">
              Cancelled Item Summary
            </div>
            <div style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">
              ${itemDesc}
            </div>
            ${reason ? `<div style="font-size: 12px; color: #a89f91; margin-bottom: 8px;"><strong>Reason:</strong> ${reason}</div>` : ''}
            <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 13px; color: #c7c4be;">Refundable Amount:</span>
              <strong style="font-size: 18px; color: #D4AF37; font-family: Georgia, serif;">₹${refundAmt.toLocaleString('en-IN')} INR</strong>
            </div>
          </div>

          <!-- Refund Protocol Details -->
          <div style="background: #18140f; border-left: 3px solid #10B981; padding: 14px 18px; border-radius: 0 6px 6px 0; font-size: 13px; color: #c5beaf; line-height: 1.6; margin-bottom: 28px;">
            <strong style="color: #10B981;">💳 Refund Protocol &amp; Timeline:</strong><br/>
            Your refund of <strong>₹${refundAmt.toLocaleString('en-IN')}</strong> will be credited directly to your original payment method (or UPI account) within <strong>2 to 4 business days</strong>. If you paid via Store Credit or Gift Card, the balance has been restored immediately.
          </div>

          <!-- Concierge Support Contact Card -->
          <div style="background: #191510; border: 1px dashed rgba(212, 175, 55, 0.4); border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 28px;">
            <span style="font-size: 11px; color: #D4AF37; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; display: block; margin-bottom: 8px;">
              👑 Atelier Master Concierge Support
            </span>
            <p style="font-size: 13px; color: #c7c4be; margin: 0 0 12px 0;">
              Need to alter a bespoke design, change necklace length, or speak with our master jewelers?
            </p>
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="tel:${supportPhone.replace(/\s+/g, '')}" style="display: inline-block; background: #261f14; border: 1px solid #D4AF37; color: #D4AF37; font-size: 12px; font-weight: 700; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                📞 Call: ${supportPhone}
              </a>
              <a href="mailto:${supportEmail}" style="display: inline-block; background: #261f14; border: 1px solid #D4AF37; color: #D4AF37; font-size: 12px; font-weight: 700; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                ✉️ Email: ${supportEmail}
              </a>
            </div>
          </div>

          <!-- Explore Vault Button -->
          <div style="text-align: center; margin-bottom: 16px;">
            <a href="${vaultUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%); color: #070707; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; padding: 14px 32px; text-decoration: none; border-radius: 4px;">
              💎 Explore Curated Vault Collection
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #070707; border-top: 1px solid rgba(212, 175, 55, 0.2); padding: 20px 32px; text-align: center; font-size: 11px; color: #777; line-height: 1.6;">
          © 2026 ASMI Haute Joaillerie Atelier &bull; Heritage Gold Quadrant, Mumbai 400001<br/>
          This cancellation confirmation was dispatched automatically to your registered patron account.
        </div>

      </div>
    </body>
    </html>
  `;
}

function buildPatronCancellationEmailText(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings) {
  const orderNum = order.orderNumber || order.id || 'N/A';
  const patronName = patronDetails?.name || order.customerName || 'Valued Patron';
  const supportPhone = settings.supportPhone || settings.officialPhone || '+91 98765 43210';
  const supportEmail = settings.supportEmail || settings.officialEmail || 'concierge@asmijewelry.com';

  return `
================================================================================
ASMI HAUTE JOAILLERIE - CANCELLATION CONFIRMATION
================================================================================
Dear ${patronName},

Your cancellation request for Order #${orderNum} has been processed.

REFUND NOTICE:
Your refund will be credited directly to your original payment method within
2 to 4 business days.

CONCIERGE & SUPPORT:
- Hotline : ${supportPhone}
- Email   : ${supportEmail}
- Atelier : Mumbai, Maharashtra

================================================================================
ASMI Haute Joaillerie Atelier • Heritage Gold Quadrant, Mumbai 400001
================================================================================
`;
}

function sendOrderCancellationEmails({ order, cancelledItem, reason, notes, patronDetails, isFullOrder = false }, callback = () => {}) {
  const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
  const adminTargetEmail = (settings.orderNotificationEmail || 'orders@asmijewelry.com').trim();
  const patronTargetEmail = (patronDetails?.email || order.customerEmail || '').trim();
  const orderNum = order.orderNumber || order.id || 'N/A';
  const patronName = patronDetails?.name || order.customerName || 'Valued Patron';

  const adminSubject = `🚨 [ORDER CANCELLATION] ${isFullOrder ? 'Full Order' : 'Item'} #${orderNum} Cancelled - ${patronName}`;
  const adminHtml = buildAdminCancellationEmailHtml(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings);
  const adminText = buildAdminCancellationEmailText(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings);

  // 1. Dispatch alert to Admin
  dispatchEmailGeneric({
    to: adminTargetEmail,
    subject: adminSubject,
    html: adminHtml,
    text: adminText,
    type: 'order_cancellation_admin',
    metadata: { orderNumber: orderNum, patronName, reason, isFullOrder },
    settings: settings,
    callback: (adminErr, adminRes) => {
      console.log(`[ASMI Mailer] Order #${orderNum} cancellation notification dispatched to Admin mailbox (${adminTargetEmail}).`);
    }
  });

  // 2. Dispatch confirmation to Patron (if valid email present)
  if (patronTargetEmail && patronTargetEmail.includes('@')) {
    const patronSubject = `✨ ASMI Haute Joaillerie: Confirmation of Cancellation - Order #${orderNum}`;
    const patronHtml = buildPatronCancellationEmailHtml(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings);
    const patronText = buildPatronCancellationEmailText(order, cancelledItem, reason, notes, patronDetails, isFullOrder, settings);

    dispatchEmailGeneric({
      to: patronTargetEmail,
      subject: patronSubject,
      html: patronHtml,
      text: patronText,
      type: 'order_cancellation_patron',
      metadata: { orderNumber: orderNum, patronName, patronEmail: patronTargetEmail },
      settings: settings,
      callback: (patronErr, patronRes) => {
        console.log(`[ASMI Mailer] Order #${orderNum} cancellation confirmation dispatched to Patron mailbox (${patronTargetEmail}).`);
        callback(null, { success: true, adminRes, patronRes });
      }
    });
  } else {
    callback(null, { success: true, note: 'Patron email missing, admin notified.' });
  }
}

// Helper to recursively extract base64 data URLs to actual image files on disk
function extractAndSaveBase64DataUrls(data, prefix = 'upload') {
  if (!data) return data;
  if (typeof data === 'string') {
    const match = data.match(/^data:image\/([a-zA-Z0-9\+\-]+);base64,(.+)$/);
    if (match) {
      try {
        const rawExt = match[1].toLowerCase();
        const ext = (rawExt === 'jpeg' || rawExt === 'jpg') ? 'jpg' : (rawExt === 'png' ? 'png' : (rawExt === 'webp' ? 'webp' : 'png'));
        const filename = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const filePath = path.join(ASSETS_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));
        return `assets/images/${filename}`;
      } catch (err) {
        console.error('[ASMI Server] Failed to save extracted base64 image:', err);
        return data;
      }
    }
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item, idx) => extractAndSaveBase64DataUrls(item, `${prefix}-${idx}`));
  }
  if (typeof data === 'object') {
    const cleaned = {};
    for (const key of Object.keys(data)) {
      cleaned[key] = extractAndSaveBase64DataUrls(data[key], `${prefix}-${key}`);
    }
    return cleaned;
  }
  return data;
}

// -----------------------------------------------------------------------------
// HTTP SERVER & API DISPATCHER
// -----------------------------------------------------------------------------
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-WP-Nonce, X-ASMI-Admin-Key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqHost = req.headers.host || 'localhost:8000';
  const parsedUrl = new URL(req.url, `http://${reqHost}`);
  const pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';

  // ---------------------------------------------------------------------------
  // REST API ENDPOINTS
  // ---------------------------------------------------------------------------
  
  // 1. Unified Sync Endpoint (GET /api/sync)
  if ((pathname === '/api/sync' || pathname === '/wp-json/asmi/v1/sync') && req.method === 'GET') {
    const payload = {
      success: true,
      data: {
        settings: getDbFile('settings.json', DEFAULT_SETTINGS),
        products: getDbFile('products.json', DEFAULT_PRODUCTS),
        coupons: getDbFile('coupons.json', DEFAULT_COUPONS),
        categories: getDbFile('categories.json', DEFAULT_CATEGORIES),
        orders: getDbFile('orders.json', DEFAULT_ORDERS),
        reviews: getDbFile('reviews.json', DEFAULT_REVIEWS),
        giftcards: getDbFile('giftcards.json', DEFAULT_GIFTCARDS),
        patrons: getDbFile('patrons.json', DEFAULT_PATRONS),
        supportChats: getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS)
      }
    };
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(JSON.stringify(payload));
    return;
  }

  // 2. Settings Endpoint (/api/settings or /wp-json/asmi/v1/settings)
  if (pathname === '/api/settings' || pathname === '/wp-json/asmi/v1/settings') {
    if (req.method === 'GET') {
      const data = getDbFile('settings.json', DEFAULT_SETTINGS);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        const cleanedBody = extractAndSaveBase64DataUrls(body, 'setting');
        const current = getDbFile('settings.json', DEFAULT_SETTINGS);
        const updated = { ...current, ...cleanedBody };
        saveDbFile('settings.json', updated);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.end(JSON.stringify({ success: true, message: 'Settings saved permanently to disk.', data: updated }));
      });
      return;
    }
  }

  // 3. Products Endpoint (/api/products or /wp-json/asmi/v1/products)
  if (pathname === '/api/products' || pathname === '/wp-json/asmi/v1/products') {
    if (req.method === 'GET') {
      const data = getDbFile('products.json', DEFAULT_PRODUCTS);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        const cleanedBody = extractAndSaveBase64DataUrls(body, 'prod');
        // If an array is passed, overwrite catalog completely. If single object, update/insert.
        let products = getDbFile('products.json', DEFAULT_PRODUCTS);
        if (Array.isArray(cleanedBody)) {
          products = cleanedBody;
        } else if (cleanedBody.id) {
          const idx = products.findIndex(p => p.id === cleanedBody.id);
          if (idx > -1) {
            products[idx] = { ...products[idx], ...cleanedBody };
          } else {
            products.unshift(cleanedBody);
          }
        }
        saveDbFile('products.json', products);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.end(JSON.stringify({ success: true, message: 'Product catalog updated permanently on disk.', data: products }));
      });
      return;
    }
  }

  // 3b. Delete Product Endpoint (DELETE /api/products/:id or POST /api/products/delete)
  if ((pathname.startsWith('/api/products/') || pathname.startsWith('/wp-json/asmi/v1/products/')) && req.method === 'DELETE') {
    const prodId = pathname.split('/').pop();
    let products = getDbFile('products.json', DEFAULT_PRODUCTS);
    products = products.filter(p => p.id !== prodId);
    saveDbFile('products.json', products);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(JSON.stringify({ success: true, message: `Product ${prodId} removed from disk.`, data: products }));
    return;
  }

  // 4. Coupons Endpoint (/api/coupons or /wp-json/asmi/v1/coupons)
  if (pathname === '/api/coupons' || pathname === '/wp-json/asmi/v1/coupons') {
    if (req.method === 'GET') {
      const data = getDbFile('coupons.json', DEFAULT_COUPONS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        saveDbFile('coupons.json', body);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Coupons updated permanently.' }));
      });
      return;
    }
  }

  // 5. Categories Endpoint (/api/categories or /wp-json/asmi/v1/categories)
  if (pathname === '/api/categories' || pathname === '/wp-json/asmi/v1/categories') {
    if (req.method === 'GET') {
      const data = getDbFile('categories.json', DEFAULT_CATEGORIES);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        saveDbFile('categories.json', body);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Categories updated permanently.' }));
      });
      return;
    }
  }

  // 6. Orders Endpoint (/api/orders or /wp-json/asmi/v1/orders)
  if (pathname === '/api/orders' || pathname === '/wp-json/asmi/v1/orders') {
    if (req.method === 'GET') {
      const data = getDbFile('orders.json', DEFAULT_ORDERS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        let orders = getDbFile('orders.json', DEFAULT_ORDERS);
        let isNewOrder = false;
        let targetOrder = null;

        if (Array.isArray(body)) {
          orders = body;
        } else if (body.orderNumber || body.id) {
          const idToMatch = body.orderNumber || body.id;
          const idx = orders.findIndex(o => (o.orderNumber === idToMatch || o.id === idToMatch));
          if (idx > -1) {
            orders[idx] = { ...orders[idx], ...body };
            targetOrder = orders[idx];
          } else {
            orders.unshift(body);
            targetOrder = body;
            isNewOrder = true;
          }
        }
        saveDbFile('orders.json', orders);

        // Auto-dispatch dual emails: Admin notification alert + Patron official confirmation email
        if (isNewOrder && targetOrder) {
          sendOrderNotificationEmail(targetOrder, false, (mailErr, mailRes) => {
            if (mailRes) {
              console.log(`[ASMI Mailer] Live admin order alert dispatched for #${targetOrder.orderNumber || targetOrder.id} to registered mailbox.`);
            }
          });

          sendPatronOrderConfirmationEmail(targetOrder, false, (patronErr, patronRes) => {
            if (patronRes) {
              console.log(`[ASMI Mailer] Live patron order confirmation email dispatched for #${targetOrder.orderNumber || targetOrder.id} to ${targetOrder.customerEmail || 'patron'}.`);
            }
          });
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Order saved permanently & email alerts queued for admin and patron.', data: orders }));
      });
      return;
    }
  }

  // 6a-2. Cancel Order Item / Full Order Endpoint (/api/cancel-order-item or /wp-json/asmi/v1/cancel-order-item)
  if ((pathname === '/api/cancel-order-item' || pathname === '/wp-json/asmi/v1/cancel-order-item' || pathname === '/api/cancel-order') && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || (!body.orderNumber && !body.orderId)) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Valid orderNumber required' }));
        return;
      }

      const orderNumber = body.orderNumber || body.orderId;
      const itemIndex = body.itemIndex;
      const itemId = body.itemId;
      const reason = body.reason || 'Patron requested cancellation';
      const notes = body.notes || '';
      const patronDetails = body.patronDetails || null;
      const isFullOrder = body.isFullOrder === true || itemIndex === undefined || itemIndex === null;

      let orders = getDbFile('orders.json', DEFAULT_ORDERS);
      const orderIdx = orders.findIndex(o => o.orderNumber === orderNumber || o.id === orderNumber);

      if (orderIdx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: `Order #${orderNumber} not found.` }));
        return;
      }

      const targetOrder = orders[orderIdx];
      let cancelledItemObj = null;

      if (isFullOrder || !targetOrder.items || targetOrder.items.length <= 1) {
        // Cancel entire order
        targetOrder.statusBadge = "Order Cancelled";
        targetOrder.currentStepIndex = 0;
        targetOrder.cancelled = true;
        targetOrder.cancelReason = reason;
        targetOrder.cancelNotes = notes;
        targetOrder.cancelledAt = new Date().toISOString();

        if (Array.isArray(targetOrder.items)) {
          targetOrder.items.forEach(it => {
            it.status = "Cancelled";
            it.cancelled = true;
            it.cancelReason = reason;
          });
        }
      } else {
        // Cancel specific item
        let itIdx = -1;
        if (typeof itemIndex === 'number' && targetOrder.items[itemIndex]) {
          itIdx = itemIndex;
        } else if (itemId) {
          itIdx = targetOrder.items.findIndex(it => it.id === itemId && !it.cancelled);
        }

        if (itIdx > -1) {
          cancelledItemObj = targetOrder.items[itIdx];
          cancelledItemObj.status = "Cancelled";
          cancelledItemObj.cancelled = true;
          cancelledItemObj.cancelReason = reason;
          cancelledItemObj.cancelNotes = notes;
          cancelledItemObj.cancelledAt = new Date().toISOString();

          // Check if all items are now cancelled
          const activeItems = targetOrder.items.filter(it => !it.cancelled);
          if (activeItems.length === 0) {
            targetOrder.statusBadge = "Order Cancelled";
            targetOrder.currentStepIndex = 0;
            targetOrder.cancelled = true;
          } else {
            targetOrder.statusBadge = "Partially Cancelled";
          }
        }
      }

      orders[orderIdx] = targetOrder;
      saveDbFile('orders.json', orders);

      // Trigger dual emails: to Admin and to Patron
      sendOrderCancellationEmails({
        order: targetOrder,
        cancelledItem: cancelledItemObj,
        reason: reason,
        notes: notes,
        patronDetails: patronDetails || {
          name: targetOrder.customerName,
          email: targetOrder.customerEmail,
          phone: targetOrder.customerPhone,
          tier: targetOrder.patronTier || 'Royal Heirloom Patron',
          memberId: targetOrder.patronMemberId || 'ASMI-VIP-9160'
        },
        isFullOrder: isFullOrder || targetOrder.cancelled
      }, (mailErr, mailRes) => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          message: 'Order cancellation successfully recorded on disk and email alerts dispatched to Admin and Patron.',
          order: targetOrder
        }));
      });
    });
    return;
  }

  // 6a-3. Customer Support & AI Concierge Chats (/api/support-chats or /wp-json/asmi/v1/support-chats)
  if (pathname === '/api/support-chats' || pathname === '/wp-json/asmi/v1/support-chats') {
    if (req.method === 'GET') {
      const chats = getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify(chats));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid chat payload' }));
          return;
        }

        let chats = getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);
        if (Array.isArray(body)) {
          chats = body;
        } else if (body.id) {
          const idx = chats.findIndex(c => c.id === body.id);
          if (idx > -1) {
            chats[idx] = { ...chats[idx], ...body, lastUpdated: new Date().toISOString() };
          } else {
            chats.unshift({ ...body, createdAt: body.createdAt || new Date().toISOString(), lastUpdated: new Date().toISOString() });
          }
        } else {
          const newChat = {
            id: `chat-${Date.now()}`,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            status: 'active',
            ...body
          };
          chats.unshift(newChat);
        }

        saveDbFile('support_chats.json', chats);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Support chat saved.', data: chats }));
      });
      return;
    }
  }

  // 6a-4. Admin Reply to Support Chat (/api/support-chats/reply)
  if (pathname === '/api/support-chats/reply' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.chatId || !body.message) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'chatId and message required' }));
        return;
      }

      let chats = getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);
      const chatIdx = chats.findIndex(c => c.id === body.chatId);

      if (chatIdx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Chat thread not found' }));
        return;
      }

      const msgText = typeof body.message === 'string' ? body.message : (body.message.text || '');
      const msgSender = typeof body.message === 'object' && body.message.sender ? body.message.sender : 'admin';
      const msgSenderName = typeof body.message === 'object' && body.message.senderName ? body.message.senderName : (body.senderName || 'Master Atelier Jeweler (Admin)');

      const msgObj = {
        id: `msg-${Date.now()}`,
        sender: msgSender,
        senderName: msgSenderName,
        text: msgText,
        timestamp: new Date().toISOString(),
        formattedTime: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      };

      if (!Array.isArray(chats[chatIdx].messages)) chats[chatIdx].messages = [];
      chats[chatIdx].messages.push(msgObj);
      chats[chatIdx].lastUpdated = new Date().toISOString();
      if (body.status) chats[chatIdx].status = body.status;

      saveDbFile('support_chats.json', chats);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, message: 'Reply recorded.', data: chats[chatIdx] }));
    });
    return;
  }

  // 6b. Explicit Send Order Notification Email (/api/send-order-email)
  if (pathname === '/api/send-order-email' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.order) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Order payload required' }));
        return;
      }
      sendOrderNotificationEmail(body.order, body.isTest === true, (mailErr, mailResult) => {
        // Also dispatch patron confirmation email
        sendPatronOrderConfirmationEmail(body.order, body.isTest === true, (patronErr, patronResult) => {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({
            success: true,
            message: 'Order notification email processed successfully for admin and patron.',
            data: { admin: mailResult, patron: patronResult }
          }));
        });
      });
    });
    return;
  }

  // 6c. Send Test Order Notification Email (/api/send-test-order-email)
  if (pathname === '/api/send-test-order-email' && req.method === 'POST') {
    readBody(req, (err, body) => {
      const sampleOrder = (body && body.order) ? body.order : {
        orderNumber: `ASM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        authCode: `BIS-916-TEST-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        paymentId: `RZP_TEST_${Date.now()}`,
        dateStr: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        customerName: "Her Highness Maharani Gayatri Devi",
        customerEmail: "maharani.gayatri@royalpalace.in",
        customerPhone: "+91 98200 12345",
        city: "Jaipur, Rajasthan",
        shippingAddress: {
          tag: "Royal Palace Residence",
          recipientName: "Her Highness Maharani Gayatri Devi",
          phone: "+91 98200 12345",
          street: "City Palace Heritage Pavilion, Grand Courtyard",
          landmark: "Near Hawa Mahal Gate 2",
          city: "Jaipur",
          state: "Rajasthan",
          pincode: "302002",
          country: "India"
        },
        gateway: "Razorpay (Verified Instant UPI)",
        items: [
          {
            id: "asmi-pr-001",
            customName: "Royal Zambian Emerald & South Sea Pearl Choker",
            quantity: 1,
            selectedFinish: "22K Pure Hallmark Gold",
            selectedSize: '16" Royal Choker',
            customPriceINR: 8999,
            customPriceUSD: 108
          },
          {
            id: "asmi-em-001",
            customName: "Imperial Basra Pearl Triple-Strand Heirloom Necklace",
            quantity: 1,
            selectedFinish: "Grade AAA Natural Luster",
            selectedSize: "Princess Length",
            customPriceINR: 7499,
            customPriceUSD: 90
          }
        ],
        calculations: {
          subtotal: 16498,
          discount: 1649,
          taxGST: 445,
          shippingFee: 0,
          finalTotal: 15294
        }
      };

      sendOrderNotificationEmail(sampleOrder, true, (mailErr, mailResult) => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          message: `Test order email notification dispatched to registered mailbox.`,
          data: mailResult
        }));
      });
    });
    return;
  }

  // 6d. Email Notification Audit Logs (/api/email-logs)
  if (pathname === '/api/email-logs' && req.method === 'GET') {
    const logs = getDbFile('email_notifications.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ success: true, data: logs }));
    return;
  }

  // 6e. Clear Email Logs (/api/clear-email-logs)
  if (pathname === '/api/clear-email-logs' && req.method === 'POST') {
    saveDbFile('email_notifications.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ success: true, message: 'Notification audit logs cleared.' }));
    return;
  }

  // 6f. Digital Gift Cards Endpoint (/api/giftcards or /wp-json/asmi/v1/giftcards)
  if (pathname === '/api/giftcards' || pathname === '/wp-json/asmi/v1/giftcards') {
    if (req.method === 'GET') {
      const data = getDbFile('giftcards.json', DEFAULT_GIFTCARDS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        let giftcards = getDbFile('giftcards.json', DEFAULT_GIFTCARDS);
        if (Array.isArray(body)) {
          giftcards = body;
        } else if (body.code) {
          const idx = giftcards.findIndex(g => g.code.toUpperCase() === body.code.toUpperCase());
          if (idx > -1) {
            giftcards[idx] = { ...giftcards[idx], ...body };
          } else {
            giftcards.unshift(body);
          }
        }
        saveDbFile('giftcards.json', giftcards);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Gift cards database updated.', data: giftcards }));
      });
      return;
    }
  }

  // 6g. Send Single Coupon Email to Registered Patron (/api/send-coupon-email)
  if (pathname === '/api/send-coupon-email' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.couponCode) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Coupon code required' }));
        return;
      }

      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
      const coupons = getDbFile('coupons.json', DEFAULT_COUPONS);
      const patrons = getDbFile('patrons.json', DEFAULT_PATRONS);

      const targetCoupon = coupons.find(c => c.code.toUpperCase() === body.couponCode.toUpperCase()) || {
        code: body.couponCode.toUpperCase(),
        type: body.couponType || 'percent',
        value: body.couponValue || 10,
        description: body.couponDesc || 'VIP Privilege Discount',
        active: true
      };

      // Find matching patron if available
      let matchedPatron = null;
      if (body.patronEmail) {
        matchedPatron = patrons.find(p => p.email && p.email.toLowerCase() === body.patronEmail.toLowerCase());
      } else if (body.patronId) {
        matchedPatron = patrons.find(p => p.id === body.patronId);
      }

      const recipientEmail = (body.patronEmail || matchedPatron?.email || settings.orderNotificationEmail || 'patron@luxury.com').trim();
      const recipientName = body.recipientName || matchedPatron?.name || 'Esteemed Patron';
      const patronObj = matchedPatron || { name: recipientName, tier: body.patronTier || 'Royal Heirloom Patron' };

      const subject = body.subject || `👑 Exclusive Privilege: ${targetCoupon.code} - ${targetCoupon.type === 'percent' ? `${targetCoupon.value}% OFF` : `₹${targetCoupon.value} FLAT`} | ASMI Haute Joaillerie`;
      const htmlContent = buildCouponEmailHtml(targetCoupon, patronObj, settings, body.customMessage);
      const textContent = buildCouponEmailText(targetCoupon, patronObj, settings, body.customMessage);

      dispatchEmailGeneric({
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
        text: textContent,
        type: 'coupon_dispatch',
        metadata: { couponCode: targetCoupon.code, recipientName, recipientEmail, discount: targetCoupon.value },
        settings: settings,
        callback: (mailErr, mailResult) => {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({
            success: true,
            message: `Coupon email dispatched to ${recipientName} (${recipientEmail}).`,
            data: mailResult
          }));
        }
      });
    });
    return;
  }

  // 6h. Send Gift Card Email to Patron (/api/send-giftcard-email)
  if (pathname === '/api/send-giftcard-email' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.giftCardCode) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Gift card code required' }));
        return;
      }

      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
      let giftcards = getDbFile('giftcards.json', DEFAULT_GIFTCARDS);
      const patrons = getDbFile('patrons.json', DEFAULT_PATRONS);

      let card = giftcards.find(g => g.code.toUpperCase() === body.giftCardCode.toUpperCase());
      if (!card) {
        card = {
          code: body.giftCardCode.toUpperCase(),
          balance: body.balance || 5000,
          recipient: body.recipientName || 'Valued Patron',
          active: true,
          issuedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        giftcards.unshift(card);
      }

      let matchedPatron = null;
      if (body.recipientEmail) {
        matchedPatron = patrons.find(p => p.email && p.email.toLowerCase() === body.recipientEmail.toLowerCase());
      }

      const recipientEmail = (body.recipientEmail || card.recipientEmail || matchedPatron?.email || settings.orderNotificationEmail || 'patron@luxury.com').trim();
      const recipientName = body.recipientName || card.recipient || matchedPatron?.name || 'Valued Patron';

      // Update gift card record with email and last dispatched
      card.recipientEmail = recipientEmail;
      card.recipient = recipientName;
      card.lastDispatched = Date.now();
      card.lastDispatchedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      saveDbFile('giftcards.json', giftcards);

      const subject = body.subject || `🎁 Your Digital Gift Card: ₹${(card.balance || 0).toLocaleString('en-IN')} Stored Credit | ASMI Haute Joaillerie`;
      const htmlContent = buildGiftCardEmailHtml(card, matchedPatron, settings, body.customMessage);
      const textContent = buildGiftCardEmailText(card, matchedPatron, settings, body.customMessage);

      dispatchEmailGeneric({
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
        text: textContent,
        type: 'giftcard_dispatch',
        metadata: { giftCardCode: card.code, recipientName, recipientEmail, balance: card.balance },
        settings: settings,
        callback: (mailErr, mailResult) => {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({
            success: true,
            message: `Gift card email dispatched to ${recipientName} (${recipientEmail}).`,
            data: { giftcard: card, emailResult: mailResult }
          }));
        }
      });
    });
    return;
  }

  // 6i. Issue New Gift Card & Dispatch Email in One Action (/api/issue-and-send-giftcard)
  if (pathname === '/api/issue-and-send-giftcard' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
        return;
      }

      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
      let giftcards = getDbFile('giftcards.json', DEFAULT_GIFTCARDS);
      const patrons = getDbFile('patrons.json', DEFAULT_PATRONS);

      const code = (body.code || `GIFT-ASMI-${Math.floor(1000 + Math.random() * 9000)}`).toUpperCase();
      const balance = parseInt(body.balance, 10) || 5000;
      const recipient = body.recipient || 'Valued Patron';
      const recipientEmail = (body.recipientEmail || '').trim();
      const issuedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

      const newGiftCard = {
        code,
        balance,
        recipient,
        recipientEmail,
        active: true,
        issuedDate,
        lastDispatched: Date.now(),
        lastDispatchedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      // Add to list or update existing
      const existingIdx = giftcards.findIndex(g => g.code === code);
      if (existingIdx > -1) {
        giftcards[existingIdx] = { ...giftcards[existingIdx], ...newGiftCard };
      } else {
        giftcards.unshift(newGiftCard);
      }
      saveDbFile('giftcards.json', giftcards);

      if (body.sendEmailImmediately && recipientEmail) {
        const matchedPatron = patrons.find(p => p.email && p.email.toLowerCase() === recipientEmail.toLowerCase());
        const subject = body.subject || `🎁 Your Digital Gift Card: ₹${balance.toLocaleString('en-IN')} Store Credit | ASMI Haute Joaillerie`;
        const htmlContent = buildGiftCardEmailHtml(newGiftCard, matchedPatron, settings, body.customMessage);
        const textContent = buildGiftCardEmailText(newGiftCard, matchedPatron, settings, body.customMessage);

        dispatchEmailGeneric({
          to: recipientEmail,
          subject: subject,
          html: htmlContent,
          text: textContent,
          type: 'giftcard_dispatch',
          metadata: { giftCardCode: code, recipient, recipientEmail, balance },
          settings: settings,
          callback: (mailErr, mailResult) => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({
              success: true,
              message: `Gift card ${code} issued and dispatched to ${recipient} (${recipientEmail}).`,
              data: { giftcard: newGiftCard, emailResult: mailResult }
            }));
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          message: `Gift card ${code} created successfully in database.`,
          data: { giftcard: newGiftCard }
        }));
      }
    });
    return;
  }

  // 6j. Bulk Email Campaign Dispatcher (/api/dispatch-campaign)
  // Sends a coupon or gift card campaign to all registered visitors/patrons
  if (pathname === '/api/dispatch-campaign' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.campaignType || !body.code) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'campaignType (coupon|giftcard) and code required' }));
        return;
      }

      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
      const patrons = getDbFile('patrons.json', DEFAULT_PATRONS);
      const targetAudience = body.targetAudience || 'all'; // 'all' | 'tier_royal' | 'custom'

      // Filter eligible patrons with valid email addresses
      let targetPatrons = patrons.filter(p => p.email && p.email.includes('@'));

      if (targetAudience === 'tier_royal') {
        targetPatrons = targetPatrons.filter(p => (p.tier || '').toLowerCase().includes('royal'));
      } else if (targetAudience === 'custom' && Array.isArray(body.customEmails) && body.customEmails.length > 0) {
        targetPatrons = body.customEmails.map(em => ({
          email: em,
          name: em.split('@')[0],
          tier: 'VIP Patron'
        }));
      }

      if (targetPatrons.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'No registered patrons with valid email addresses found for this campaign.' }));
        return;
      }

      const isCoupon = body.campaignType === 'coupon';
      let couponData = null;
      let giftcardData = null;

      if (isCoupon) {
        const coupons = getDbFile('coupons.json', DEFAULT_COUPONS);
        couponData = coupons.find(c => c.code.toUpperCase() === body.code.toUpperCase()) || {
          code: body.code.toUpperCase(),
          type: body.type || 'percent',
          value: body.value || 10,
          description: body.description || 'VIP Privilege Discount',
          active: true
        };
      } else {
        const giftcards = getDbFile('giftcards.json', DEFAULT_GIFTCARDS);
        giftcardData = giftcards.find(g => g.code.toUpperCase() === body.code.toUpperCase()) || {
          code: body.code.toUpperCase(),
          balance: body.balance || 5000,
          active: true,
          issuedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };
      }

      const dispatchedList = [];
      targetPatrons.forEach(patron => {
        const email = patron.email.trim();
        const subject = body.subject || (isCoupon
          ? `👑 VIP Privilege Invitation: ${couponData.code} (${couponData.type === 'percent' ? `${couponData.value}% OFF` : `₹${couponData.value} FLAT`}) | ASMI Haute Joaillerie`
          : `🎁 Your Digital Gift Card: ₹${(giftcardData.balance || 0).toLocaleString('en-IN')} Store Credit | ASMI Haute Joaillerie`);

        const html = isCoupon
          ? buildCouponEmailHtml(couponData, patron, settings, body.customMessage)
          : buildGiftCardEmailHtml({ ...giftcardData, recipient: patron.name }, patron, settings, body.customMessage);

        const text = isCoupon
          ? buildCouponEmailText(couponData, patron, settings, body.customMessage)
          : buildGiftCardEmailText({ ...giftcardData, recipient: patron.name }, patron, settings, body.customMessage);

        dispatchEmailGeneric({
          to: email,
          subject: subject,
          html: html,
          text: text,
          type: isCoupon ? 'coupon_broadcast' : 'giftcard_broadcast',
          metadata: {
            campaignCode: body.code,
            patronId: patron.id,
            patronName: patron.name,
            audience: targetAudience
          },
          settings: settings
        });

        dispatchedList.push({ name: patron.name, email: email, tier: patron.tier });
      });

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({
        success: true,
        message: `Campaign broadcast dispatched to ${dispatchedList.length} registered patron(s).`,
        count: dispatchedList.length,
        recipients: dispatchedList
      }));
    });
    return;
  }

  // 6k. Live Email Preview Endpoint (/api/preview-email)
  if (pathname === '/api/preview-email' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
        return;
      }

      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
      const templateType = body.templateType || 'coupon'; // 'coupon' | 'giftcard'

      if (templateType === 'coupon') {
        const couponObj = {
          code: body.code || 'ROYAL10',
          type: body.type || 'percent',
          value: body.value || 10,
          description: body.description || '10% VIP Privilege Discount',
          minOrder: body.minOrder || 0
        };
        const patronObj = {
          name: body.recipientName || 'Gayatri Roy',
          tier: body.patronTier || 'Royal Heirloom Patron'
        };
        const html = buildCouponEmailHtml(couponObj, patronObj, settings, body.customMessage);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, html }));
      } else {
        const giftcardObj = {
          code: body.code || 'GIFT-ASMI-5000',
          balance: body.balance || 5000,
          recipient: body.recipientName || 'Gayatri Roy',
          issuedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        const patronObj = {
          name: body.recipientName || 'Gayatri Roy',
          tier: body.patronTier || 'Royal Heirloom Patron'
        };
        const html = buildGiftCardEmailHtml(giftcardObj, patronObj, settings, body.customMessage);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, html }));
      }
    });
    return;
  }

  // 7. Reviews Endpoint (/api/reviews or /wp-json/asmi/v1/reviews)
  if (pathname === '/api/reviews' || pathname === '/wp-json/asmi/v1/reviews') {
    if (req.method === 'GET') {
      const data = getDbFile('reviews.json', DEFAULT_REVIEWS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        let reviews = getDbFile('reviews.json', DEFAULT_REVIEWS);
        if (Array.isArray(body)) {
          reviews = body;
        } else if (body.id || body.reviewerName) {
          if (body.id) {
            const idx = reviews.findIndex(r => r.id === body.id);
            if (idx > -1) {
              reviews[idx] = { ...reviews[idx], ...body };
            } else {
              reviews.unshift(body);
            }
          } else {
            const newRev = { id: `rev-${Date.now()}`, ...body };
            reviews.unshift(newRev);
          }
        }
        saveDbFile('reviews.json', reviews);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Reviews updated permanently on disk.', data: reviews }));
      });
      return;
    }
  }

  // 8. Image Upload Endpoint (/api/upload)
  if (pathname === '/api/upload' && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.dataUrl) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'dataUrl base64 string required' }));
        return;
      }
      try {
        const matches = body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid image base64 format' }));
          return;
        }
        const ext = matches[1].split('/')[1] || 'jpg';
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `upload-${Date.now()}.${ext}`;
        const savePath = path.join(ASSETS_DIR, filename);
        fs.writeFileSync(savePath, buffer);
        
        const relativeUrl = `assets/images/${filename}`;
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, url: relativeUrl, filename }));
      } catch (uploadErr) {
        console.error('Upload save error:', uploadErr);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Could not save uploaded image' }));
      }
    });
    return;
  }

  // 9. Patrons & Logistics Address Book Endpoint (/api/patrons or /wp-json/asmi/v1/patrons)
  if (pathname === '/api/patrons' || pathname === '/wp-json/asmi/v1/patrons') {
    if (req.method === 'GET') {
      const data = getDbFile('patrons.json', DEFAULT_PATRONS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }
        let patrons = getDbFile('patrons.json', DEFAULT_PATRONS);
        if (Array.isArray(body)) {
          patrons = body;
        } else if (body.id || body.email || body.phone) {
          const matchKey = body.id || body.email || body.phone;
          const idx = patrons.findIndex(p => p.id === body.id || (body.email && p.email === body.email) || (body.phone && p.phone === body.phone));
          if (idx > -1) {
            patrons[idx] = { ...patrons[idx], ...body };
          } else {
            patrons.unshift(body);
          }
        }
        saveDbFile('patrons.json', patrons);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Patrons data persisted permanently on disk.', data: patrons }));
      });
      return;
    }
  }

  // 10. Order Item & Full Order Cancellation Endpoint (/api/cancel-order-item or /wp-json/asmi/v1/cancel-order-item)
  if ((pathname === '/api/cancel-order-item' || pathname === '/wp-json/asmi/v1/cancel-order-item') && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.orderId) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'orderId is required' }));
        return;
      }

      const orders = getDbFile('orders.json', DEFAULT_ORDERS);
      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);
      const patrons = getDbFile('patrons.json', DEFAULT_PATRONS);

      const orderIdx = orders.findIndex(o => o.id === body.orderId || o.orderNumber === body.orderId);
      if (orderIdx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: `Order #${body.orderId} not found.` }));
        return;
      }

      const order = orders[orderIdx];
      const isFullOrder = !body.itemId || body.isFullOrder === true;
      let cancelledItem = null;

      if (isFullOrder) {
        order.status = 'cancelled';
        order.cancellationReason = body.reason || 'Patron requested full order cancellation';
        order.cancellationNotes = body.notes || '';
        order.cancelledAt = new Date().toISOString();
        if (Array.isArray(order.items)) {
          order.items.forEach(it => {
            it.status = 'cancelled';
            it.cancellationReason = order.cancellationReason;
          });
        }
      } else {
        if (!Array.isArray(order.items)) order.items = [];
        const itemIdx = order.items.findIndex(it => (it.id && it.id === body.itemId) || (it.customName && it.customName === body.itemId));
        if (itemIdx > -1) {
          order.items[itemIdx].status = 'cancelled';
          order.items[itemIdx].cancellationReason = body.reason || 'Patron cancelled item';
          order.items[itemIdx].cancellationNotes = body.notes || '';
          order.items[itemIdx].cancelledAt = new Date().toISOString();
          cancelledItem = order.items[itemIdx];
        }

        // Check if all items are cancelled
        const allCancelled = order.items.every(it => it.status === 'cancelled');
        if (allCancelled) {
          order.status = 'cancelled';
          order.cancellationReason = body.reason || 'All items cancelled';
          order.cancelledAt = new Date().toISOString();
        }
      }

      // Persist order update
      orders[orderIdx] = order;
      saveDbFile('orders.json', orders);

      // Identify patron profile
      let patronDetails = null;
      if (body.patronEmail || order.customerEmail) {
        const pEmail = (body.patronEmail || order.customerEmail).toLowerCase();
        patronDetails = patrons.find(p => p.email && p.email.toLowerCase() === pEmail);
      }
      if (!patronDetails) {
        patronDetails = {
          name: order.customerName || 'Valued Patron',
          email: order.customerEmail || body.patronEmail || '',
          phone: order.customerPhone || '',
          tier: 'Royal Heirloom Patron'
        };
      }

      // Dispatch automated dual emails to Admin & Patron
      sendOrderCancellationEmails({
        order,
        cancelledItem,
        reason: body.reason || 'Patron initiated cancellation',
        notes: body.notes || '',
        patronDetails,
        isFullOrder,
        settings,
        callback: (mailErr, mailResult) => {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({
            success: true,
            message: isFullOrder ? `Order #${order.orderNumber || order.id} cancelled. Dual emails dispatched.` : `Item cancelled from Order #${order.orderNumber || order.id}. Dual emails dispatched.`,
            data: {
              order,
              mailResult
            }
          }));
        }
      });
    });
    return;
  }

  // 11. Customer Support Chats Endpoint (/api/support-chats or /wp-json/asmi/v1/support-chats)
  if (pathname === '/api/support-chats' || pathname === '/wp-json/asmi/v1/support-chats') {
    if (req.method === 'GET') {
      const data = getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
    if (req.method === 'POST') {
      readBody(req, (err, body) => {
        if (err || !body) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
          return;
        }

        let chats = getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);
        if (Array.isArray(body)) {
          chats = body;
        } else if (body.id) {
          const idx = chats.findIndex(c => c.id === body.id);
          if (idx > -1) {
            chats[idx] = { ...chats[idx], ...body, lastUpdated: new Date().toISOString() };
          } else {
            chats.unshift({
              ...body,
              createdAt: body.createdAt || new Date().toISOString(),
              lastUpdated: new Date().toISOString()
            });
          }
        }
        saveDbFile('support_chats.json', chats);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: true, message: 'Support chat saved permanently.', data: chats }));
      });
      return;
    }
  }

  // 12. Support Chat Reply Endpoint (/api/support-chats/reply or /wp-json/asmi/v1/support-chats/reply)
  if ((pathname === '/api/support-chats/reply' || pathname === '/wp-json/asmi/v1/support-chats/reply') && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.chatId || !body.text) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'chatId and text required' }));
        return;
      }

      let chats = getDbFile('support_chats.json', DEFAULT_SUPPORT_CHATS);
      const chatIdx = chats.findIndex(c => c.id === body.chatId);
      if (chatIdx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Chat thread not found' }));
        return;
      }

      const sender = body.sender || 'admin';
      const senderName = body.senderName || (sender === 'admin' ? 'Master Atelier Jeweler (Admin)' : 'Royal Patron');
      const now = new Date();
      const newMsg = {
        id: 'msg-' + Date.now(),
        sender,
        senderName,
        text: body.text,
        timestamp: now.toISOString(),
        formattedTime: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      if (!Array.isArray(chats[chatIdx].messages)) {
        chats[chatIdx].messages = [];
      }
      chats[chatIdx].messages.push(newMsg);
      chats[chatIdx].lastUpdated = now.toISOString();
      if (body.status) {
        chats[chatIdx].status = body.status;
      }

      saveDbFile('support_chats.json', chats);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, message: 'Reply posted successfully.', data: chats[chatIdx] }));
    });
    return;
  }

  // 13. Factory Data Reset & Purge Endpoint (/api/reset-data)
  if ((pathname === '/api/reset-data' || pathname === '/wp-json/asmi/v1/reset-data') && req.method === 'POST') {
    readBody(req, (err, body) => {
      const scope = body?.scope || 'all'; // 'all' | 'orders' | 'chats' | 'reviews' | 'products'
      if (scope === 'orders' || scope === 'all') {
        saveDbFile('orders.json', []);
        saveDbFile('email_logs.json', []);
      }
      if (scope === 'chats' || scope === 'all') {
        saveDbFile('support_chats.json', []);
      }
      if (scope === 'reviews' || scope === 'all') {
        saveDbFile('reviews.json', []);
      }
      if (scope === 'products' || (scope === 'all' && body?.wipeProducts)) {
        saveDbFile('products.json', []);
      } else if (scope === 'all' && !body?.wipeProducts) {
        saveDbFile('products.json', DEFAULT_PRODUCTS);
      }
      if (scope === 'all') {
        saveDbFile('coupons.json', DEFAULT_COUPONS);
        saveDbFile('patrons.json', []);
        saveDbFile('custom_sections.json', []);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({
        success: true,
        message: `Database records purged successfully [Scope: ${scope}].`,
        scope
      }));
    });
    return;
  }

  // 14. Restore Baseline / Previous Settings Endpoint (/api/restore-settings)
  if ((pathname === '/api/restore-settings' || pathname === '/wp-json/asmi/v1/restore-settings') && req.method === 'POST') {
    readBody(req, (err, body) => {
      const restored = (body && body.settings) ? body.settings : DEFAULT_SETTINGS;
      saveDbFile('settings.json', restored);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({
        success: true,
        message: 'Previous version settings restored successfully.',
        data: restored
      }));
    });
    return;
  }

  // 15a. Genuine One-Time Passcode Dispatcher (/api/auth/send-otp)
  if ((pathname === '/api/auth/send-otp' || pathname === '/wp-json/asmi/v1/auth/send-otp') && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.target) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Target email or mobile number required.' }));
        return;
      }

      const type = (body.type === 'email') ? 'email' : 'phone';
      let target = body.target.trim();
      let normKey = '';
      let displayTarget = '';

      if (type === 'phone') {
        const rawPhone = target.replace(/[^0-9]/g, '');
        if (rawPhone.length < 10) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Please enter a valid 10-digit mobile number.' }));
          return;
        }
        const phone10 = rawPhone.length > 10 && rawPhone.startsWith('91') ? rawPhone.substring(2) : rawPhone;
        displayTarget = `+91 ${phone10.substring(0, 5)} ${phone10.substring(5)}`;
        normKey = `phone:${phone10}`;
      } else {
        const cleanEmail = target.toLowerCase();
        if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ success: false, message: 'Please enter a valid email address.' }));
          return;
        }
        displayTarget = cleanEmail;
        normKey = `email:${cleanEmail}`;
      }

      const customerName = (body.customerName || '').trim() || 'Valued Patron';
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

      ACTIVE_OTP_SESSIONS.set(normKey, {
        code,
        target: displayTarget,
        type,
        customerName,
        expiresAt,
        attempts: 0
      });

      console.log(`[ASMI Auth OTP] Generated genuine OTP for [${normKey}]: Expiring in 5 minutes.`);

      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);

      if (type === 'email') {
        sendOtpEmail({
          to: displayTarget,
          code,
          customerName,
          settings,
          callback: (mailErr, mailResult) => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({
              success: true,
              message: `A secure 4-digit verification passcode has been dispatched to ${displayTarget}.`,
              target: displayTarget,
              type: 'email'
            }));
          }
        });
      } else {
        sendOtpSms({
          to: displayTarget,
          code,
          customerName,
          settings,
          callback: (smsErr, smsResult) => {
            if (smsErr) {
              res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
              res.end(JSON.stringify({
                success: false,
                requiresGatewayConfig: smsResult?.requiresGatewayConfig === true,
                message: smsResult?.message || smsErr.message,
                target: displayTarget,
                type: 'phone'
              }));
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
              res.end(JSON.stringify({
                success: true,
                message: smsResult?.message || `A secure 4-digit verification passcode has been dispatched to ${displayTarget}.`,
                target: displayTarget,
                type: 'phone',
                routedToEmail: smsResult?.routedToEmail === true
              }));
            }
          }
        });
      }
    });
    return;
  }

  // 15b. Verify One-Time Passcode (/api/auth/verify-otp)
  if ((pathname === '/api/auth/verify-otp' || pathname === '/wp-json/asmi/v1/auth/verify-otp') && req.method === 'POST') {
    readBody(req, (err, body) => {
      if (err || !body || !body.target || !body.code) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Target and 4-digit verification code are required.' }));
        return;
      }

      const inputCode = String(body.code).trim();
      const rawTarget = body.target.trim();
      let normKey = '';

      if (rawTarget.includes('@')) {
        normKey = `email:${rawTarget.toLowerCase()}`;
      } else {
        const rawPhone = rawTarget.replace(/[^0-9]/g, '');
        const phone10 = rawPhone.length > 10 && rawPhone.startsWith('91') ? rawPhone.substring(2) : rawPhone;
        normKey = `phone:${phone10}`;
      }

      const session = ACTIVE_OTP_SESSIONS.get(normKey);
      if (!session) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'No active OTP verification session found. Please request a new passcode.' }));
        return;
      }

      if (Date.now() > session.expiresAt) {
        ACTIVE_OTP_SESSIONS.delete(normKey);
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Passcode expired (valid for 5 minutes). Please request a fresh OTP.' }));
        return;
      }

      session.attempts = (session.attempts || 0) + 1;
      if (session.attempts > 5) {
        ACTIVE_OTP_SESSIONS.delete(normKey);
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Maximum verification attempts exceeded. Please request a new code.' }));
        return;
      }

      if (session.code !== inputCode) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'The OTP passcode entered is incorrect. Please check again.' }));
        return;
      }

      // CODE MATCHED! Remove session
      ACTIVE_OTP_SESSIONS.delete(normKey);

      // Locate or create Patron record
      let patrons = getDbFile('patrons.json', DEFAULT_PATRONS);
      let patron = null;

      if (session.type === 'email') {
        patron = patrons.find(p => p.email && p.email.toLowerCase() === session.target.toLowerCase());
      } else {
        const pDigits = session.target.replace(/[^0-9]/g, '');
        patron = patrons.find(p => p.phone && p.phone.replace(/[^0-9]/g, '').includes(pDigits.slice(-10)));
      }

      if (patron) {
        patron.lastLogin = Date.now();
        if (session.customerName && session.customerName !== 'Valued Patron') {
          patron.name = session.customerName;
        }
        if (!patron.addresses || patron.addresses.length === 0) {
          patron.addresses = [{
            id: `addr_${Date.now()}`,
            tag: 'Primary Residence',
            recipientName: patron.name,
            phone: patron.phone || session.target,
            street: '402, Sea Face Promenade, Worli',
            landmark: 'Opposite Coastline Promenade',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400018',
            isDefault: true
          }];
        }
      } else {
        const isPhone = session.type === 'phone';
        patron = {
          id: `patron_${Date.now()}`,
          name: session.customerName || 'Valued Patron',
          email: isPhone ? '' : session.target,
          phone: isPhone ? session.target : '+91 98200 12345',
          tier: 'Royal Heirloom Patron',
          memberId: `ASMI-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          loginMethod: isPhone ? 'otp_phone' : 'otp_email',
          ordersCount: 0,
          totalSpentINR: 0,
          lastLogin: Date.now(),
          addresses: [
            {
              id: `addr_${Date.now()}`,
              tag: 'Primary Residence',
              recipientName: session.customerName || 'Valued Patron',
              phone: isPhone ? session.target : '+91 98200 12345',
              street: '402, Sea Face Promenade, Worli',
              landmark: 'Opposite Coastline Promenade',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400018',
              isDefault: true
            }
          ]
        };
        patrons.unshift(patron);
      }

      saveDbFile('patrons.json', patrons);

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({
        success: true,
        message: 'Passcode verified successfully. Welcome to ASMI Haute Joaillerie.',
        patron: patron,
        token: `asmi_token_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      }));
    });
    return;
  }

  // 15c. Test SMS Gateway Dispatch (/api/test-sms)
  if (pathname === '/api/test-sms' && req.method === 'POST') {
    readBody(req, (err, body) => {
      const testPhone = (body && body.testPhone) ? body.testPhone.trim() : '+91 98765 43210';
      const testCode = Math.floor(1000 + Math.random() * 9000).toString();
      const settings = getDbFile('settings.json', DEFAULT_SETTINGS);

      sendOtpSms({
        to: testPhone,
        code: testCode,
        customerName: 'Atelier Test Admin',
        settings,
        callback: (smsErr, smsResult) => {
          if (smsErr) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({
              success: false,
              message: smsResult?.message || smsErr.message,
              error: smsErr.message
            }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({
              success: true,
              message: `Live Test SMS successfully sent to ${testPhone} with passcode [${testCode}].`,
              data: smsResult
            }));
          }
        }
      });
    });
    return;
  }

  // 15d. SMS Logs API (/api/sms-logs)
  if (pathname === '/api/sms-logs' && req.method === 'GET') {
    const logs = getDbFile('sms_logs.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ success: true, data: logs }));
    return;
  }

  // 15e. Clear SMS Logs (/api/clear-sms-logs)
  if (pathname === '/api/clear-sms-logs' && req.method === 'POST') {
    saveDbFile('sms_logs.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ success: true, message: 'SMS audit log cleared.' }));
    return;
  }

  // ---------------------------------------------------------------------------
  // STATIC FILE SERVING
  // ---------------------------------------------------------------------------
  let safePath = path.normalize(decodeURIComponent(parsedUrl.pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback: If requesting an HTML route, serve index.html
      const fallbackPath = path.join(ROOT_DIR, 'index.html');
      fs.readFile(fallbackPath, (fbErr, content) => {
        if (fbErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isCompressible = /text|javascript|json|xml|svg/i.test(contentType);
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const shouldGzip = isCompressible && /\bgzip\b/i.test(acceptEncoding);

    const isCodeOrMarkup = (ext === '.html' || ext === '.css' || ext === '.js' || ext === '.svg' || ext === '.json');
    const cacheControl = isCodeOrMarkup ? 'no-cache, no-store, must-revalidate, max-age=0' : 'public, max-age=86400';

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Pragma': isCodeOrMarkup ? 'no-cache' : 'public',
      'Expires': isCodeOrMarkup ? '0' : '86400',
      'Vary': 'Accept-Encoding'
    };

    if (shouldGzip) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      const stream = fs.createReadStream(filePath);
      stream.pipe(zlib.createGzip({ level: 6 })).pipe(res);
    } else {
      res.writeHead(200, headers);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    }
  });
});

// Helper to buffer and parse JSON body
function readBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    // 50MB max body limit
    if (body.length > 50 * 1024 * 1024) {
      req.destroy();
    }
  });
  req.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      callback(null, parsed);
    } catch (e) {
      callback(e, null);
    }
  });
}

// -----------------------------------------------------------------------------
// START SERVER
// -----------------------------------------------------------------------------
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=============================================================`);
  console.log(`✨ ASMI Luxury Haute Joaillerie Server is Live!`);
  console.log(`🌐 Local URL:  http://localhost:${PORT}/`);
  console.log(`💾 JSON Database: ${DATA_DIR}`);
  console.log(`⚡ Dual Modes Active: Standalone Node & WordPress Sync Bridge`);
  console.log(`=============================================================\n`);
});
