/**
 * ASMI - Client Reviews & Photo Gallery Management Module
 * Handles star ratings, comments, JPEG/PNG image uploads, universal display, and Wide Lightbox
 */

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

class ReviewsManager {
  constructor() {
    this.reviews = this.loadReviews();
    this.activeFilter = "all";
    this.selectedRating = 5;
    this.uploadedImageDataUrl = null;
  }

  loadReviews() {
    if (typeof asmi_wp_data !== "undefined" && asmi_wp_data.preloaded && Array.isArray(asmi_wp_data.preloaded.reviews)) {
      return asmi_wp_data.preloaded.reviews;
    }
    try {
      const saved = localStorage.getItem("asmi_reviews_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load reviews from localStorage", e);
    }

    try {
      if (typeof XMLHttpRequest !== "undefined") {
        const xhr = new XMLHttpRequest();
        const rawUrl = (typeof resolveAssetUrl === "function" ? resolveAssetUrl("data/reviews.json") : "data/reviews.json");
        const url = rawUrl + (rawUrl.includes("?") ? "&" : "?") + "_t=" + Date.now();
        xhr.open("GET", url, false);
        xhr.send(null);
        if (xhr.status === 200 || xhr.status === 0) {
          const parsed = JSON.parse(xhr.responseText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            try { localStorage.setItem("asmi_reviews_data", JSON.stringify(parsed)); } catch (err) {}
            return parsed;
          }
        }
      }
    } catch (xhrErr) {}

    return [...DEFAULT_REVIEWS];
  }

  saveReviews() {
    if (window.asmiSync) {
      window.asmiSync.save("reviews", this.reviews);
    } else {
      try {
        localStorage.setItem("asmi_reviews_data", JSON.stringify(this.reviews));
      } catch (e) {
        console.warn("Could not save reviews to localStorage", e);
      }
    }
  }

  getReviews(filter = this.activeFilter) {
    if (filter === "photos") {
      return this.reviews.filter(r => Boolean(r.photo));
    }
    if (filter === "5stars") {
      return this.reviews.filter(r => r.rating === 5);
    }
    if (filter === "pearls") {
      return this.reviews.filter(r => r.productId && r.productId.startsWith("asmi-pr"));
    }
    if (filter === "emeralds") {
      return this.reviews.filter(r => r.productId && r.productId.startsWith("asmi-em"));
    }
    return this.reviews;
  }

  renderHomeReviews(filter = this.activeFilter) {
    this.activeFilter = filter;
    const grid = document.getElementById("homeReviewsGrid");
    const countEl = document.getElementById("reviewsCountBadge");
    const statsScoreEl = document.getElementById("reviewsAvgScore");
    if (!grid) return;

    // Update filter pill active states
    document.querySelectorAll(".review-filter-pill").forEach(pill => {
      pill.classList.toggle("active", pill.dataset.filter === filter);
    });

    const reviewsList = this.getReviews(filter);

    // Compute stats
    const totalCount = this.reviews.length;
    const avgScore = (this.reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1);

    if (countEl) countEl.textContent = `Based on ${totalCount} Verified Client Reviews`;
    if (statsScoreEl) statsScoreEl.textContent = `${avgScore} / 5.0`;

    if (reviewsList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
          <i class="fa-regular fa-comment-dots" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 1rem; opacity: 0.6;"></i>
          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">No Reviews in this Category</h4>
          <p style="color: var(--text-muted); font-size: 0.8125rem; margin-bottom: 1rem;">Be the first to share your experience with this collection.</p>
          <button class="btn-primary" onclick="reviewsManager.openSubmitReviewModal()">Write a Review</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = reviewsList.map(rev => {
      const starsHtml = Array.from({ length: 5 }, (_, i) => {
        return `<i class="fa-solid fa-star" style="color: ${i < rev.rating ? 'var(--gold-primary)' : 'rgba(255,255,255,0.2)'}; font-size: 0.8125rem;"></i>`;
      }).join("");

      const resolvedPhoto = rev.photo ? (typeof resolveAssetUrl === 'function' ? resolveAssetUrl(rev.photo) : rev.photo) : '';
      const photoThumbHtml = resolvedPhoto ? `
        <div class="review-photo-wrapper" onclick="reviewsManager.openPhotoLightbox('${encodeURIComponent(resolvedPhoto)}', '${encodeURIComponent(rev.productName || 'ASMI Masterpiece')}', '${encodeURIComponent(rev.reviewerName)}', ${rev.rating}, '${encodeURIComponent(rev.date)}')" title="Click to view full-size photo in wide view">
          <img src="${resolvedPhoto}" alt="${rev.productName || 'Customer jewelry photo'}" class="review-photo-thumb" loading="lazy" />
          <div class="review-photo-overlay">
            <i class="fa-solid fa-expand"></i>
            <span>Wide View</span>
          </div>
        </div>
      ` : '';

      return `
        <div class="review-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <div style="display: flex; gap: 0.2rem;">
              ${starsHtml}
            </div>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${rev.date}</span>
          </div>

          ${rev.productName ? `
            <span class="label-micro" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-gem" style="margin-right: 0.25rem;"></i> ${rev.productName}
            </span>
          ` : ''}

          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.5rem; line-height: 1.3;">
            "${rev.title}"
          </h4>

          <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; flex: 1;">
            ${rev.comment}
          </p>

          ${photoThumbHtml}

          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-hairline); padding-top: 0.85rem; margin-top: auto;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <div class="reviewer-avatar">
                ${rev.reviewerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p style="font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); line-height: 1.2;">
                  ${rev.reviewerName}
                </p>
                <p style="font-size: 0.6875rem; color: var(--text-muted);">
                  ${rev.city}
                </p>
              </div>
            </div>

            ${rev.verified ? `
              <span class="verified-buyer-pill" title="Verified Purchase from ASMI Atelier">
                <i class="fa-solid fa-circle-check"></i> Verified
              </span>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  openSubmitReviewModal(productId = null, orderNumber = null) {
    const modal = document.getElementById("reviewModalBackdrop");
    if (!modal) return;

    // Reset Form Fields
    this.selectedRating = 5;
    this.uploadedImageDataUrl = null;
    this.updateModalStars(5);

    const previewContainer = document.getElementById("uploadedPhotoPreview");
    if (previewContainer) {
      previewContainer.style.display = "none";
      previewContainer.innerHTML = "";
    }

    const fileInput = document.getElementById("reviewImageInput");
    if (fileInput) fileInput.value = "";

    const nameInput = document.getElementById("rev_name");
    const cityInput = document.getElementById("rev_city");
    const titleInput = document.getElementById("rev_title");
    const commentInput = document.getElementById("rev_comment");
    const prodSelect = document.getElementById("rev_product");

    if (nameInput) {
      nameInput.value = (window.authManager && window.authManager.currentPatron) 
        ? window.authManager.currentPatron.name 
        : "";
    }
    if (cityInput) cityInput.value = "";
    if (titleInput) titleInput.value = "";
    if (commentInput) commentInput.value = "";

    // Pre-populate product dropdown if available
    if (prodSelect && typeof PRODUCTS_DATA !== "undefined") {
      prodSelect.innerHTML = PRODUCTS_DATA.map(p => `
        <option value="${p.id}" ${p.id === productId ? 'selected' : ''}>
          ${p.name} (${formatPrice(p.priceINR, null, p.priceUSD)})
        </option>
      `).join("");
    }

    modal.classList.add("active");
  }

  closeSubmitReviewModal() {
    const modal = document.getElementById("reviewModalBackdrop");
    if (modal) modal.classList.remove("active");
  }

  setRating(ratingNumber) {
    this.selectedRating = ratingNumber;
    this.updateModalStars(ratingNumber);
  }

  updateModalStars(ratingNumber) {
    const starButtons = document.querySelectorAll(".star-picker-btn");
    starButtons.forEach(btn => {
      const val = parseInt(btn.dataset.value, 10);
      const icon = btn.querySelector("i");
      if (icon) {
        if (val <= ratingNumber) {
          icon.className = "fa-solid fa-star";
          icon.style.color = "var(--gold-primary)";
        } else {
          icon.className = "fa-regular fa-star";
          icon.style.color = "var(--text-muted)";
        }
      }
    });

    const ratingLabel = document.getElementById("starRatingLabel");
    if (ratingLabel) {
      const labels = [
        "Select your rating",
        "1 Star - Unsatisfied",
        "2 Stars - Fair Experience",
        "3 Stars - Good Quality",
        "4 Stars - Very Satisfied",
        "5 Stars - Exceptional Haute Joaillerie!"
      ];
      ratingLabel.textContent = labels[ratingNumber] || `${ratingNumber} Stars`;
    }
  }

  handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate image format
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      if (window.showToast) {
        window.showToast("Invalid Image", "Please upload a JPEG or PNG jewelry photo.");
      }
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      if (window.showToast) {
        window.showToast("File Too Large", "Please upload an image smaller than 10MB.");
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      this.uploadedImageDataUrl = event.target.result;
      const previewContainer = document.getElementById("uploadedPhotoPreview");
      if (previewContainer) {
        previewContainer.style.display = "block";
        previewContainer.innerHTML = `
          <div style="position: relative; display: inline-block;">
            <img src="${this.uploadedImageDataUrl}" alt="Uploaded preview" style="width: 90px; height: 90px; object-fit: cover; border: 1px solid var(--gold-primary); display: block;" />
            <button type="button" onclick="reviewsManager.removeUploadedImage()" style="position: absolute; top: -6px; right: -6px; background: #000; color: #fff; border: 1px solid #fff; width: 20px; height: 20px; border-radius: 50% !important; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.65rem;" title="Remove image">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `;
      }
      if (window.showToast) {
        window.showToast("Changes Saved Successfully", "Your jewelry photo was attached successfully.");
      }
    };
    reader.readAsDataURL(file);
  }

  removeUploadedImage() {
    this.uploadedImageDataUrl = null;
    const fileInput = document.getElementById("reviewImageInput");
    if (fileInput) fileInput.value = "";
    const previewContainer = document.getElementById("uploadedPhotoPreview");
    if (previewContainer) {
      previewContainer.innerHTML = "";
      previewContainer.style.display = "none";
    }
    if (window.showToast) {
      window.showToast("Changes Saved Successfully", "Uploaded photo removed.");
    }
  }

  handleReviewSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById("rev_name");
    const cityInput = document.getElementById("rev_city");
    const titleInput = document.getElementById("rev_title");
    const commentInput = document.getElementById("rev_comment");
    const prodSelect = document.getElementById("rev_product");

    const name = nameInput ? nameInput.value.trim() : "Verified Customer";
    const city = cityInput ? cityInput.value.trim() : "India";
    const title = titleInput ? titleInput.value.trim() : "Exquisite Jewelry!";
    const comment = commentInput ? commentInput.value.trim() : "";
    const prodId = prodSelect ? prodSelect.value : "asmi-pr-001";

    if (!comment) {
      if (window.showToast) window.showToast("Missing Feedback", "Please write your review comment.");
      return;
    }

    let prodName = "ASMI Haute Joaillerie";
    if (typeof PRODUCTS_DATA !== "undefined") {
      const found = PRODUCTS_DATA.find(p => p.id === prodId);
      if (found) prodName = found.name;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      productId: prodId,
      productName: prodName,
      reviewerName: name,
      city: city,
      rating: this.selectedRating || 5,
      date: "Just Now",
      title: title,
      comment: comment,
      verified: true,
      photo: this.uploadedImageDataUrl || null
    };

    // Prepend new review so it appears at the very top
    this.reviews.unshift(newReview);
    this.saveReviews();

    // Close modal
    this.closeSubmitReviewModal();

    // Re-render reviews section on home page
    this.renderHomeReviews("all");

    // Show luxury toast notification
    if (window.showToast) {
      window.showToast("Changes Saved Successfully", "Thank you! Your verified review and photo are now live.");
    }

    // Smooth scroll to reviews section
    const reviewsSec = document.getElementById("reviewsSection");
    if (reviewsSec) {
      reviewsSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  openPhotoLightbox(photoUrlEncoded, titleEncoded, reviewerEncoded, rating, dateEncoded) {
    const modal = document.getElementById("photoLightboxModal");
    const imgEl = document.getElementById("lightboxFullImage");
    const titleEl = document.getElementById("lightboxJewelTitle");
    const reviewerEl = document.getElementById("lightboxReviewer");
    const starsEl = document.getElementById("lightboxStars");
    const dateEl = document.getElementById("lightboxDate");
    if (!modal || !imgEl) return;

    const photoUrl = decodeURIComponent(photoUrlEncoded);
    const title = decodeURIComponent(titleEncoded);
    const reviewer = decodeURIComponent(reviewerEncoded);
    const date = decodeURIComponent(dateEncoded);

    imgEl.src = photoUrl;
    if (titleEl) titleEl.textContent = title;
    if (reviewerEl) reviewerEl.textContent = `Shared by ${reviewer}`;
    if (dateEl) dateEl.textContent = date;

    if (starsEl) {
      starsEl.innerHTML = Array.from({ length: 5 }, (_, i) => {
        return `<i class="fa-solid fa-star" style="color: ${i < rating ? 'var(--gold-primary)' : 'rgba(255,255,255,0.3)'};"></i>`;
      }).join("");
    }

    modal.classList.add("active");
  }

  closePhotoLightbox() {
    const modal = document.getElementById("photoLightboxModal");
    if (modal) modal.classList.remove("active");
  }
}

// Global Instantiate
const reviewsManager = new ReviewsManager();
window.reviewsManager = reviewsManager;
