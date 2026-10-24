/**
 * ASMI - Cart State & Management Module
 */

/**
 * Dynamic Delivery Charges Rate Calculator
 * Rate Rules (Within 500gm Base Weight):
 *  - Kolkata : ₹50/-
 *  - WB (West Bengal) : ₹60/-
 *  - Orissa, Bihar, Jharkhand : ₹70/-
 *  - Delhi, Mumbai, Chennai, Hyderabad, Bangalore : ₹90/-
 *  - Rest of India (Assam & Other States) : ₹110/-
 *  - NorthEast (Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim) : ₹120/-
 * Weight Multiplier:
 *  - <= 500g : 1x base fee
 *  - > 500g  : ceil(weight / 500) * base fee
 */
function calculateDeliveryCharge(address = null, totalWeightGm = null, itemCount = 1) {
  const weight = (totalWeightGm !== null && totalWeightGm !== undefined)
    ? totalWeightGm
    : Math.max(150, (itemCount || 1) * 120);

  const multiplier = weight <= 500 ? 1 : Math.ceil(weight / 500);

  if (!address) {
    return {
      fee: 50 * multiplier,
      baseRate: 50,
      zoneName: "Kolkata (Base Delivery)",
      rateDesc: "Kolkata (Within 500gm @ ₹50)",
      weightGm: weight,
      multiplier: multiplier
    };
  }

  const city = (address.city || "").toLowerCase().trim();
  const state = (address.state || "").toLowerCase().trim();
  const pincode = (address.pincode || "").toString().trim();

  // 1. Kolkata: city has Kolkata/Calcutta OR pincode starts with 700
  if (
    city.includes("kolkata") ||
    city.includes("calcutta") ||
    pincode.startsWith("700") ||
    (state.includes("bengal") && pincode.startsWith("700"))
  ) {
    return {
      fee: 50 * multiplier,
      baseRate: 50,
      zoneName: "Kolkata",
      rateDesc: `Kolkata (${multiplier > 1 ? `${weight}g · ${multiplier}x` : 'Within 500g'} @ ₹50)`,
      weightGm: weight,
      multiplier: multiplier
    };
  }

  // 2. NorthEast (Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim)
  if (
    state.includes("arunachal") ||
    state.includes("manipur") ||
    state.includes("meghalaya") ||
    state.includes("mizoram") ||
    state.includes("nagaland") ||
    state.includes("tripura") ||
    state.includes("sikkim") ||
    city.includes("itanagar") ||
    city.includes("imphal") ||
    city.includes("shillong") ||
    city.includes("aizawl") ||
    city.includes("kohima") ||
    city.includes("agartala") ||
    city.includes("gangtok") ||
    pincode.startsWith("790") ||
    pincode.startsWith("791") ||
    pincode.startsWith("792") ||
    pincode.startsWith("795") ||
    pincode.startsWith("793") ||
    pincode.startsWith("794") ||
    pincode.startsWith("796") ||
    pincode.startsWith("797") ||
    pincode.startsWith("799") ||
    pincode.startsWith("737")
  ) {
    let neName = "NorthEast";
    if (state.includes("sikkim") || city.includes("gangtok") || pincode.startsWith("737")) neName = "NorthEast (Sikkim)";
    else if (state.includes("meghalaya") || city.includes("shillong")) neName = "NorthEast (Meghalaya)";
    else if (state.includes("tripura") || city.includes("agartala")) neName = "NorthEast (Tripura)";
    else if (state.includes("manipur") || city.includes("imphal")) neName = "NorthEast (Manipur)";
    else if (state.includes("mizoram") || city.includes("aizawl")) neName = "NorthEast (Mizoram)";
    else if (state.includes("nagaland") || city.includes("kohima")) neName = "NorthEast (Nagaland)";
    else if (state.includes("arunachal") || city.includes("itanagar")) neName = "NorthEast (Arunachal)";

    return {
      fee: 120 * multiplier,
      baseRate: 120,
      zoneName: neName,
      rateDesc: `${neName} (${multiplier > 1 ? `${weight}g · ${multiplier}x` : 'Within 500g'} @ ₹120)`,
      weightGm: weight,
      multiplier: multiplier
    };
  }

  // 3. Orissa (Odisha), Bihar, Jharkhand
  if (
    state.includes("odisha") ||
    state.includes("orissa") ||
    state.includes("bihar") ||
    state.includes("jharkhand") ||
    city.includes("bhubaneswar") ||
    city.includes("cuttack") ||
    city.includes("puri") ||
    city.includes("patna") ||
    city.includes("gaya") ||
    city.includes("ranchi") ||
    city.includes("jamshedpur") ||
    pincode.startsWith("75") ||
    pincode.startsWith("76") ||
    pincode.startsWith("80") ||
    pincode.startsWith("81") ||
    pincode.startsWith("82") ||
    pincode.startsWith("83")
  ) {
    let zName = "Orissa, Bihar, Jharkhand";
    if (state.includes("odisha") || state.includes("orissa") || pincode.startsWith("75") || pincode.startsWith("76")) zName = "Orissa (Odisha)";
    else if (state.includes("bihar") || pincode.startsWith("80")) zName = "Bihar";
    else if (state.includes("jharkhand") || pincode.startsWith("83")) zName = "Jharkhand";

    return {
      fee: 70 * multiplier,
      baseRate: 70,
      zoneName: zName,
      rateDesc: `${zName} (${multiplier > 1 ? `${weight}g · ${multiplier}x` : 'Within 500g'} @ ₹70)`,
      weightGm: weight,
      multiplier: multiplier
    };
  }

  // 4. Specific Metros: Delhi, Mumbai, Chennai, Hyderabad, Bangalore
  if (
    city.includes("delhi") ||
    state.includes("delhi") ||
    city.includes("new delhi") ||
    city.includes("noida") ||
    city.includes("gurgaon") ||
    city.includes("gurugram") ||
    city.includes("mumbai") ||
    city.includes("bombay") ||
    city.includes("thane") ||
    city.includes("navi mumbai") ||
    city.includes("chennai") ||
    city.includes("madras") ||
    city.includes("hyderabad") ||
    city.includes("secunderabad") ||
    city.includes("bangalore") ||
    city.includes("bengaluru") ||
    pincode.startsWith("110") ||
    pincode.startsWith("400") ||
    pincode.startsWith("600") ||
    pincode.startsWith("500") ||
    pincode.startsWith("560")
  ) {
    let mName = "Delhi, Mumbai, Chennai, Hyderabad, Bangalore";
    if (city.includes("delhi") || state.includes("delhi") || pincode.startsWith("110")) mName = "Delhi";
    else if (city.includes("mumbai") || pincode.startsWith("400")) mName = "Mumbai";
    else if (city.includes("chennai") || pincode.startsWith("600")) mName = "Chennai";
    else if (city.includes("hyderabad") || pincode.startsWith("500")) mName = "Hyderabad";
    else if (city.includes("bangalore") || city.includes("bengaluru") || pincode.startsWith("560")) mName = "Bangalore";

    return {
      fee: 90 * multiplier,
      baseRate: 90,
      zoneName: mName,
      rateDesc: `${mName} (${multiplier > 1 ? `${weight}g · ${multiplier}x` : 'Within 500g'} @ ₹90)`,
      weightGm: weight,
      multiplier: multiplier
    };
  }

  // 5. West Bengal (WB - other than Kolkata)
  if (
    state === "wb" ||
    state.includes("west bengal") ||
    state.includes("bengal") ||
    pincode.startsWith("71") ||
    pincode.startsWith("72") ||
    pincode.startsWith("73") ||
    pincode.startsWith("74")
  ) {
    return {
      fee: 60 * multiplier,
      baseRate: 60,
      zoneName: "West Bengal (WB)",
      rateDesc: `WB (${multiplier > 1 ? `${weight}g · ${multiplier}x` : 'Within 500g'} @ ₹60)`,
      weightGm: weight,
      multiplier: multiplier
    };
  }

  // 6. Rest of India (Assam & Other States): ₹110
  let roiName = "Rest of India (Assam)";
  if (state.includes("assam") || city.includes("guwahati") || pincode.startsWith("78")) {
    roiName = "Rest of India (Assam)";
  } else if (state) {
    roiName = `Rest of India (${address.state})`;
  } else {
    roiName = "Rest of India";
  }

  return {
    fee: 110 * multiplier,
    baseRate: 110,
    zoneName: roiName,
    rateDesc: `${roiName} (${multiplier > 1 ? `${weight}g · ${multiplier}x` : 'Within 500g'} @ ₹110)`,
    weightGm: weight,
    multiplier: multiplier
  };
}

if (typeof window !== "undefined") {
  window.calculateDeliveryCharge = calculateDeliveryCharge;
}

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.couponCode = localStorage.getItem("asmi_coupon") || "";
    this.discountPercent = 0;
    this.discountFlat = 0;
    this.giftWrap = false;
    this.expressArmoredShipping = false;
    
    if (this.couponCode) {
      this.validateCoupon(this.couponCode, false);
    }

    if (typeof window !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          this.updateBadges();
          this.renderCartDrawer();
        });
      } else {
        setTimeout(() => {
          this.updateBadges();
          this.renderCartDrawer();
        }, 10);
      }
    }
  }

  loadCart() {
    try {
      const saved = localStorage.getItem("asmi_cart_items");
      return saved ? JSON.parse(saved) : [
        {
          id: "asmi-em-001",
          quantity: 1,
          selectedFinish: "Champagne Gold (22K)",
          selectedSize: '16" Choker Collar'
        }
      ];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem("asmi_cart_items", JSON.stringify(this.items));
    this.updateBadges();
    this.renderCartDrawer();
  }

  addItem(productId, quantity = 1, selectedFinish = "Champagne Gold (22K)", selectedSize = "Standard", customData = null) {
    const existingIndex = this.items.findIndex(
      item => item.id === productId && item.selectedFinish === selectedFinish && item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
      if (customData) {
        if (customData.customName) this.items[existingIndex].customName = customData.customName;
        if (customData.customImage) this.items[existingIndex].customImage = customData.customImage;
        if (customData.customPriceINR) this.items[existingIndex].customPriceINR = customData.customPriceINR;
        if (customData.customPriceUSD) this.items[existingIndex].customPriceUSD = customData.customPriceUSD;
      }
    } else {
      const productObj = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === productId) : null;
      const newItem = {
        id: productId,
        wcId: productObj?.wcId || (productObj?.id && String(productObj.id).startsWith('wc-') ? parseInt(String(productObj.id).replace('wc-', '')) : null),
        sku: productObj?.sku || null,
        quantity: quantity,
        selectedFinish: selectedFinish,
        selectedSize: selectedSize
      };
      if (customData) {
        if (customData.customName) newItem.customName = customData.customName;
        if (customData.customImage) newItem.customImage = customData.customImage;
        if (customData.customPriceINR) newItem.customPriceINR = customData.customPriceINR;
        if (customData.customPriceUSD) newItem.customPriceUSD = customData.customPriceUSD;
      }
      this.items.push(newItem);
    }

    this.saveCart();
    const product = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === productId) : null;
    const itemName = customData?.customName || product?.name || "Jewelry piece";
    if (window.showToast) {
      window.showToast("Added to Bag", `${itemName} is now in your shopping bag.`);
    }
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const removed = this.items.splice(index, 1)[0];
      this.saveCart();
      const product = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === removed.id) : null;
      const itemName = removed.customName || product?.name || "Jewelry piece";
      if (window.showToast) {
        window.showToast("Changes Saved Successfully", `${itemName} was removed from your bag.`);
      }
    }
  }

  updateQuantity(index, newQty) {
    if (index >= 0 && index < this.items.length) {
      if (newQty <= 0) {
        this.removeItem(index);
      } else {
        this.items[index].quantity = newQty;
        this.saveCart();
        if (window.showToast) {
          window.showToast("Changes Saved Successfully", "Shopping bag quantity updated.");
        }
      }
    }
  }

  clearCart() {
    this.items = [];
    this.couponCode = "";
    this.discountPercent = 0;
    this.discountFlat = 0;
    localStorage.removeItem("asmi_coupon");
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotalINR() {
    return this.items.reduce((sum, item) => {
      const prod = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === item.id) : null;
      const price = (item.customPriceINR !== undefined && item.customPriceINR !== null)
        ? item.customPriceINR
        : (prod ? prod.priceINR : 0);
      return sum + (price * item.quantity);
    }, 0);
  }

  getCalculations(targetAddress = null) {
    const subtotal = this.getSubtotalINR();
    let discount = 0;
    
    if (this.discountPercent > 0) {
      discount = Math.round(subtotal * (this.discountPercent / 100));
    } else if (this.discountFlat > 0) {
      discount = Math.min(this.discountFlat, subtotal);
    }

    const giftWrapFee = this.giftWrap ? 150 : 0;
    
    // Resolve destination address for live shipping calculation
    let address = targetAddress;
    if (!address && window.checkoutManager) {
      const addresses = typeof window.checkoutManager.getPatronAddresses === "function" ? window.checkoutManager.getPatronAddresses() : [];
      if (window.checkoutManager.selectedAddressId) {
        address = addresses.find(a => a.id === window.checkoutManager.selectedAddressId);
      }
      if (!address && addresses.length > 0) {
        address = addresses.find(a => a.isDefault) || addresses[0];
      }
    }

    const itemCount = this.getTotalCount();
    const delivery = calculateDeliveryCharge(address, null, itemCount);
    const shippingFee = delivery.fee;
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxGST = Math.round(taxableAmount * 0.03); // 3% GST on jewelry
    const finalTotal = taxableAmount + taxGST + giftWrapFee + shippingFee;

    return {
      subtotal,
      discount,
      giftWrapFee,
      shippingFee,
      shippingZone: delivery.zoneName,
      shippingRateDesc: delivery.rateDesc,
      shippingBaseRate: delivery.baseRate,
      shippingWeightGm: delivery.weightGm,
      shippingMultiplier: delivery.multiplier,
      taxGST,
      finalTotal
    };
  }

  validateCoupon(code, showFeedback = true) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) {
      this.discountPercent = 0;
      this.discountFlat = 0;
      this.couponCode = "";
      localStorage.removeItem("asmi_coupon");
      return { valid: false, message: "Please enter a valid discount code." };
    }

    // Check dynamic coupons from AdminManager or LocalStorage
    let couponsList = [];
    if (window.adminManager && Array.isArray(window.adminManager.coupons)) {
      couponsList = window.adminManager.coupons;
    } else {
      try {
        const saved = localStorage.getItem("asmi_coupons_data");
        if (saved) couponsList = JSON.parse(saved);
      } catch (e) {}
    }

    const matchedCoupon = couponsList.find(c => c.code.toUpperCase() === cleanCode && c.active !== false);

    if (matchedCoupon) {
      if (matchedCoupon.type === "percent") {
        this.discountPercent = matchedCoupon.value;
        this.discountFlat = 0;
      } else {
        this.discountFlat = matchedCoupon.value;
        this.discountPercent = 0;
      }
      this.couponCode = cleanCode;
      localStorage.setItem("asmi_coupon", cleanCode);
      if (showFeedback && window.showToast) {
        window.showToast("Changes Saved Successfully", `${matchedCoupon.description || 'Special Discount'} applied successfully!`);
      }
      return { valid: true, message: `${matchedCoupon.description || 'Discount Applied'}` };
    }

    // Check Gift Cards
    let giftCardsList = [];
    if (window.adminManager && Array.isArray(window.adminManager.giftcards)) {
      giftCardsList = window.adminManager.giftcards;
    } else {
      try {
        const saved = localStorage.getItem("asmi_giftcards_data");
        if (saved) giftCardsList = JSON.parse(saved);
      } catch (e) {}
    }

    const matchedGiftCard = giftCardsList.find(g => g.code.toUpperCase() === cleanCode && g.active !== false);
    if (matchedGiftCard) {
      this.discountFlat = matchedGiftCard.balance;
      this.discountPercent = 0;
      this.couponCode = cleanCode;
      localStorage.setItem("asmi_coupon", cleanCode);
      if (showFeedback && window.showToast) {
        window.showToast("Changes Saved Successfully", `Gift Card credit of ₹${matchedGiftCard.balance.toLocaleString('en-IN')} applied!`);
      }
      return { valid: true, message: `Gift Card credit applied.` };
    }

    // Built-in Fallbacks
    if (cleanCode === "ROYAL10") {
      this.discountPercent = 10;
      this.discountFlat = 0;
      this.couponCode = cleanCode;
      localStorage.setItem("asmi_coupon", cleanCode);
      if (showFeedback && window.showToast) {
        window.showToast("Changes Saved Successfully", "10% VIP Discount applied successfully!");
      }
      return { valid: true, message: "10% VIP Discount applied." };
    } else if (cleanCode === "ASMI500" || cleanCode === "ASMI2025") {
      this.discountFlat = 500;
      this.discountPercent = 0;
      this.couponCode = cleanCode;
      localStorage.setItem("asmi_coupon", cleanCode);
      if (showFeedback && window.showToast) {
        window.showToast("Changes Saved Successfully", "₹500 Special Discount applied!");
      }
      return { valid: true, message: "₹500 discount applied to your order." };
    } else if (cleanCode === "WELCOME") {
      this.discountFlat = 300;
      this.discountPercent = 0;
      this.couponCode = cleanCode;
      localStorage.setItem("asmi_coupon", cleanCode);
      if (showFeedback && window.showToast) {
        window.showToast("Changes Saved Successfully", "₹300 First Order Discount applied!");
      }
      return { valid: true, message: "₹300 discount applied." };
    } else {
      if (showFeedback && window.showToast) {
        window.showToast("Invalid Code", "Please check your promo code and try again.");
      }
      return { valid: false, message: "Invalid discount code." };
    }
  }

  updateBadges() {
    const total = this.getTotalCount();
    document.querySelectorAll(".cart-count-badge").forEach(badge => {
      badge.textContent = total;
      badge.style.display = total > 0 ? "flex" : "none";
    });
  }

  renderCartDrawer() {
    const listEl = document.getElementById("cartItemsList");
    const emptyEl = document.getElementById("cartEmptyState");
    const summaryEl = document.getElementById("cartSummarySection");
    
    if (!listEl) return;

    if (this.items.length === 0) {
      if (emptyEl) emptyEl.style.display = "block";
      listEl.innerHTML = "";
      if (summaryEl) summaryEl.style.display = "none";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";
    if (summaryEl) summaryEl.style.display = "block";

    let html = "";
    this.items.forEach((item, index) => {
      const product = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === item.id) : null;
      const itemName = item.customName || product?.name || "Handcrafted Jewelry Piece";
      const itemImage = item.customImage || product?.image || "assets/images/emerald-necklace.jpg";
      const itemPriceINR = (item.customPriceINR !== undefined && item.customPriceINR !== null)
        ? item.customPriceINR
        : (product ? product.priceINR : 0);
      const itemPriceUSD = (item.customPriceUSD !== undefined && item.customPriceUSD !== null)
        ? item.customPriceUSD
        : (product && product.priceUSD ? product.priceUSD : Math.round(itemPriceINR * 0.012));

      const itemTotalINR = itemPriceINR * item.quantity;
      const itemTotalUSD = itemPriceUSD * item.quantity;
      const finalImgSrc = typeof resolveAssetUrl === 'function' ? resolveAssetUrl(itemImage) : itemImage;

      html += `
        <div class="cart-item-row">
          <img src="${finalImgSrc}" alt="${itemName}" class="cart-item-thumb" onerror="this.onerror=null; this.src=typeof resolveAssetUrl === 'function' ? resolveAssetUrl('assets/images/emerald-necklace.jpg') : 'assets/images/emerald-necklace.jpg';">
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
              <h4 style="font-family: var(--font-serif); font-size: 1rem; color: var(--text-primary); line-height: 1.25; margin-bottom: 0.25rem;">
                ${itemName}
              </h4>
              <button onclick="cartManager.removeItem(${index})" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem;" title="Remove Item">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p class="label-micro" style="color: var(--gold-primary); margin-bottom: 0.25rem;">
              ${item.selectedFinish || 'Standard'} | ${item.selectedSize || 'Standard'}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <button class="cart-qty-btn" onclick="cartManager.updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <span style="font-size: 0.8125rem; font-weight: 600; width: 24px; text-align: center; color: var(--text-primary);">${item.quantity}</span>
                <button class="cart-qty-btn" onclick="cartManager.updateQuantity(${index}, ${item.quantity + 1})">+</button>
              </div>
              <p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--gold-primary); font-weight: 600;">
                ${formatPrice(itemTotalINR, null, itemTotalUSD)}
              </p>
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;

    // Update summary values
    const calcs = this.getCalculations();
    const subtotalEl = document.getElementById("cartSubtotalDisplay");
    const discountRow = document.getElementById("cartDiscountRow");
    const discountEl = document.getElementById("cartDiscountDisplay");
    const shippingEl = document.getElementById("cartShippingDisplay");
    const shippingLabelEl = document.getElementById("cartShippingLabel");
    const taxEl = document.getElementById("cartTaxDisplay");
    const totalEl = document.getElementById("cartTotalDisplay");

    if (subtotalEl) subtotalEl.textContent = formatPrice(calcs.subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(calcs.shippingFee);
    if (shippingLabelEl) {
      shippingLabelEl.textContent = `Delivery (${calcs.shippingZone || 'Within 500gm'}):`;
    }
    if (taxEl) taxEl.textContent = formatPrice(calcs.taxGST);
    if (totalEl) totalEl.textContent = formatPrice(calcs.finalTotal);

    if (discountRow && discountEl) {
      if (calcs.discount > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = `-${formatPrice(calcs.discount)}`;
      } else {
        discountRow.style.display = "none";
      }
    }
  }
}

// Global Cart Instance
const cartManager = new CartManager();
window.cartManager = cartManager;

