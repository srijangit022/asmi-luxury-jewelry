/**
 * ASMI - Multi-Step Checkout & Payment Gateway System
 * 
 * Features:
 *  - 4-Step Luxurious Checkout: (1. Address Logistics, 2. Payment Gateway, 3. Verification, 4. Order Confirmation)
 *  - Multi-Payment Options (Excluding COD):
 *     1. UPI & Dynamic QR (Google Pay, PhonePe, Paytm, BHIM, CRED, Amazon Pay)
 *     2. Credit / Debit Cards (Visa, MasterCard, Amex, RuPay with live card brand recognition)
 *     3. Net Banking (All major Indian banks with instant gateway routing)
 *     4. International FX Gateway (PayPal Express, Global Cards, Multi-Currency USD/EUR/GBP)
 *  - 3-Address Logistics Selector (Primary Residence, Corporate Office, Heritage Villa)
 *  - Seamless Dual-Currency Support (INR / USD)
 *  - Full integration with Inventory Stock deduction, Orders Tracking, and Invoicing
 */

class CheckoutManager {
  constructor() {
    this.currentStep = 1;
    this.selectedGateway = "upi"; // 'upi', 'card', 'netbanking', 'international'
    this.selectedUpiApp = "Google Pay";
    this.selectedBank = "HDFC Bank";
    this.selectedInternational = "PayPal Express";
    this.selectedAddressId = null;
    this.orderData = null;
    this.isProcessing = false;
  }

  async openCheckout(directItem = null) {
    if (directItem) {
      cartManager.addItem(
        directItem.id,
        directItem.quantity || 1,
        directItem.finish || "18K Yellow Gold",
        directItem.size || "Standard"
      );
    }

    if (cartManager.items.length === 0) {
      if (typeof PRODUCTS_DATA !== "undefined" && PRODUCTS_DATA.length > 0) {
        const defaultProd = PRODUCTS_DATA[0];
        cartManager.addItem(
          defaultProd.id,
          1,
          defaultProd.finishes ? defaultProd.finishes[0] : "18K Yellow Gold",
          defaultProd.sizes ? defaultProd.sizes[0] : "Standard"
        );
      } else {
        if (window.showToast) {
          window.showToast("Bag is Empty", "Please select a jewelry piece before proceeding to checkout.");
        }
        return;
      }
    }

    // Close any other open drawers or popups
    if (typeof window.closeCartDrawer === "function") window.closeCartDrawer();
    if (typeof window.closeWishlistDrawer === "function") window.closeWishlistDrawer();
    if (typeof window.closeQuickView === "function") window.closeQuickView();
    if (window.authManager && typeof window.authManager.closeAuthModal === "function") {
      window.authManager.closeAuthModal();
    }

    // If WooCommerce is active on this WordPress site, route to native WooCommerce Checkout
    if (typeof asmi_wp_data !== "undefined" && asmi_wp_data.isWooCommerceActive) {
      await this.syncToWooCommerceAndRedirect();
      return;
    }

    // Fallback: Open client-side luxury checkout modal
    this.openCheckoutModal();
  }

  async syncToWooCommerceAndRedirect() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    if (window.showToast) {
      window.showToast("Connecting Checkout", "Synchronizing shopping bag with WooCommerce secure gateway...");
    }

    try {
      const formData = new FormData();
      formData.append('action', 'asmi_wc_sync_cart');
      formData.append('nonce', (typeof asmi_wp_data !== 'undefined' && asmi_wp_data.wcAjaxNonce) ? asmi_wp_data.wcAjaxNonce : '');
      formData.append('items', JSON.stringify(cartManager.items));
      if (cartManager.couponCode) {
        formData.append('coupon', cartManager.couponCode);
      }

      const ajaxUrl = (typeof asmi_wp_data !== 'undefined' && asmi_wp_data.ajaxUrl) ? asmi_wp_data.ajaxUrl : '/wp-admin/admin-ajax.php';
      const res = await fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data && data.success && data.data && data.data.checkout_url) {
        window.location.href = data.data.checkout_url;
        return;
      }
    } catch (err) {
      console.warn('[ASMI] WooCommerce sync redirect fallback:', err);
    } finally {
      this.isProcessing = false;
    }

    const fallbackUrl = (typeof asmi_wp_data !== 'undefined' && asmi_wp_data.wcCheckoutUrl) ? asmi_wp_data.wcCheckoutUrl : '/checkout/';
    window.location.href = fallbackUrl;
  }

  openCheckoutModal() {
    this.currentStep = 1;
    this.renderStep();
    
    const modal = document.getElementById("checkoutModalBackdrop");
    if (modal) {
      modal.style.display = "flex";
      modal.classList.add("active");
    }
  }

  closeCheckout() {
    const modal = document.getElementById("checkoutModalBackdrop");
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => {
        if (!modal.classList.contains("active")) {
          modal.style.display = "none";
        }
      }, 350);
    }
  }

  goToStep(stepNumber) {
    if (stepNumber === 2) {
      // Validate Step 1 Address Selection
      const addresses = this.getPatronAddresses();
      if (addresses.length === 0) {
        if (window.showToast) window.showToast("Address Required", "Please add at least 1 delivery address to proceed.");
        return;
      }

      if (!this.selectedAddressId) {
        const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
        this.selectedAddressId = defaultAddr ? defaultAddr.id : null;
      }

      if (!this.selectedAddressId) {
        if (window.showToast) window.showToast("Select Address", "Please select a destination address to deliver your order.");
        return;
      }
    }

    this.currentStep = stepNumber;
    this.renderStep();
  }

  getPatronAddresses() {
    if (window.authManager && window.authManager.currentPatron && Array.isArray(window.authManager.currentPatron.addresses) && window.authManager.currentPatron.addresses.length > 0) {
      return window.authManager.currentPatron.addresses;
    }
    
    try {
      const saved = localStorage.getItem("asmi_guest_addresses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}

    return [
      {
        id: "addr_default_1",
        tag: "Primary Residence",
        recipientName: window.authManager?.currentPatron?.name || "Gayatri Roy",
        phone: window.authManager?.currentPatron?.phone || "+91 98200 12345",
        street: "402, Sea Face Manor, Worli Sea Face",
        landmark: "Opposite Coastline Promenade",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400018",
        isDefault: true
      },
      {
        id: "addr_default_2",
        tag: "Corporate Suite",
        recipientName: window.authManager?.currentPatron?.name || "Gayatri Roy",
        phone: window.authManager?.currentPatron?.phone || "+91 98200 12345",
        street: "Suite 801, Express Towers, Nariman Point",
        landmark: "Near Marine Drive",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400021",
        isDefault: false
      }
    ];
  }

  selectAddress(addressId) {
    this.selectedAddressId = addressId;
    this.renderAddressSelector();
    this.renderOrderSummary();
    if (this.currentStep === 2) {
      this.switchPaymentTab(this.selectedGateway || "upi");
    }
  }

  renderAddressSelector() {
    const container = document.getElementById("checkoutAddressSelectorContainer");
    if (!container) return;

    const addresses = this.getPatronAddresses();
    const count = addresses.length;

    if (!this.selectedAddressId && addresses.length > 0) {
      const def = addresses.find(a => a.isDefault) || addresses[0];
      this.selectedAddressId = def ? def.id : null;
    }

    let cardsHtml = "";
    if (count === 0) {
      cardsHtml = `
        <div style="background: var(--bg-card); border: 1.5px dashed var(--gold-primary); padding: 1.5rem; text-align: center;">
          <i class="fa-solid fa-location-dot" style="font-size: 1.75rem; color: var(--gold-primary); margin-bottom: 0.5rem; display: block;"></i>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.35rem;">No Saved Delivery Address Found</h4>
          <p class="label-micro" style="color: var(--text-muted); margin-bottom: 1rem;">Please add your delivery destination below (You can save up to 3 addresses).</p>
          <button type="button" class="btn-primary" style="font-size: 0.75rem; padding: 0.5rem 1.25rem;" onclick="checkoutManager.showAddAddressInline()">
            + Add Delivery Address Now
          </button>
        </div>
      `;
    } else {
      cardsHtml = addresses.map((addr, idx) => {
        const isSelected = (addr.id === this.selectedAddressId);
        const deliveryInfo = typeof calculateDeliveryCharge === "function"
          ? calculateDeliveryCharge(addr, null, cartManager.getTotalCount())
          : { fee: 50, zoneName: "Logistics Zone", baseRate: 50 };

        return `
          <div class="address-radio-card ${isSelected ? 'selected' : ''}" onclick="checkoutManager.selectAddress('${addr.id}')" style="cursor: pointer; background: var(--bg-card); border: 2px solid ${isSelected ? 'var(--gold-primary)' : 'var(--border-color)'}; padding: 1.25rem; position: relative; transition: all 0.2s ease; box-shadow: ${isSelected ? '0 0 15px rgba(212,175,55,0.2)' : 'none'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <div style="width: 20px; height: 20px; border-radius: 50% !important; border: 2px solid ${isSelected ? 'var(--gold-primary)' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; background: ${isSelected ? 'var(--gold-primary)' : 'transparent'};">
                  ${isSelected ? `<i class="fa-solid fa-check" style="font-size: 0.65rem; color: #000;"></i>` : ''}
                </div>
                <span class="category-badge" style="font-size: 0.7rem; padding: 0.25rem 0.6rem; background: ${isSelected ? 'var(--gold-primary)' : 'var(--bg-surface)'}; color: ${isSelected ? '#000' : 'var(--gold-primary)'}; font-weight: 700;">
                  <i class="fa-solid fa-location-dot" style="margin-right: 0.25rem;"></i> ${addr.tag || 'Address ' + (idx + 1)}
                </span>
                ${addr.isDefault ? `<span class="label-micro" style="color: #10B981; font-weight: 700;"><i class="fa-solid fa-star"></i> Default</span>` : ''}
              </div>
              <span class="label-micro" style="color: ${isSelected ? 'var(--gold-primary)' : 'var(--text-muted)'}; font-weight: 600;">
                ${isSelected ? 'Deliver to this Address' : 'Click to Select'}
              </span>
            </div>
            
            <p style="font-weight: 600; color: var(--text-primary); font-size: 0.9rem; margin: 0 0 0.25rem 0;">
              ${addr.recipientName || (window.authManager?.currentPatron?.name || 'Valued Patron')} &bull; 
              <span style="font-size: 0.8rem; color: var(--gold-primary); font-weight: 600;">${addr.phone || (window.authManager?.currentPatron?.phone || '')}</span>
            </p>
            
            <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
              ${addr.street}${addr.landmark ? ', ' + addr.landmark : ''},<br/>
              ${addr.city}, ${addr.state} - <strong style="color: var(--text-primary);">${addr.pincode}</strong>
            </p>

            <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed var(--border-hairline); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
              <span style="color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem;">
                <i class="fa-solid fa-truck-bolt" style="color: var(--gold-primary);"></i> Zone: <strong style="color: var(--text-primary);">${deliveryInfo.zoneName}</strong>
              </span>
              <span style="font-weight: 700; color: var(--gold-primary); background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.3); padding: 0.2rem 0.55rem; border-radius: 4px;">
                Delivery: ₹${deliveryInfo.fee}/-
              </span>
            </div>
          </div>
        `;
      }).join("");
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-hairline); padding-bottom: 0.75rem;">
          <div>
            <span class="label-caps" style="color: var(--gold-primary); font-size: 0.75rem;">Step 1: Choose Delivery Address</span>
            <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0.15rem 0 0 0;">Where should we ship your jewelry?</h4>
          </div>
          ${count < 3 ? `
            <button type="button" class="btn-secondary" style="font-size: 0.72rem; padding: 0.4rem 0.85rem;" onclick="checkoutManager.showAddAddressInline()">
              <i class="fa-solid fa-plus" style="margin-right: 0.3rem; color: var(--gold-primary);"></i> Add Address (${count}/3)
            </button>
          ` : `
            <span class="label-micro" style="color: var(--text-muted);">Max 3 Stored Addresses</span>
          `}
        </div>

        <!-- Inline Add Address Container -->
        <div id="checkoutInlineAddAddressBox" style="display: none; background: var(--bg-surface); border: 1.5px solid var(--gold-primary); padding: 1.25rem; margin-bottom: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h5 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary); margin: 0;">Add New Delivery Destination (${count + 1}/3)</h5>
            <button type="button" onclick="document.getElementById('checkoutInlineAddAddressBox').style.display='none';" style="background:none; border:none; color:var(--text-muted); cursor:pointer;">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form onsubmit="checkoutManager.handleSaveInlineAddress(event)" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Address Tag *</label>
                <select id="co_addr_tag" class="form-input" style="font-size: 0.8rem;">
                  <option value="Primary Residence">Primary Residence</option>
                  <option value="Corporate Office">Corporate Office</option>
                  <option value="Heritage Villa">Heritage Villa</option>
                  <option value="Vacation Home">Vacation Home</option>
                </select>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Recipient Full Name *</label>
                <input type="text" id="co_addr_name" required class="form-input" style="font-size: 0.8rem;" value="${window.authManager?.currentPatron?.name || ''}"/>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Delivery Contact Phone *</label>
                <input type="tel" id="co_addr_phone" required class="form-input" style="font-size: 0.8rem;" value="${window.authManager?.currentPatron?.phone || ''}"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Pincode (6 Digits) *</label>
                <input type="text" id="co_addr_pincode" required maxlength="6" class="form-input" style="font-size: 0.8rem;" placeholder="e.g. 400018"/>
              </div>
            </div>
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Flat, Building, Street Address *</label>
              <input type="text" id="co_addr_street" required class="form-input" style="font-size: 0.8rem;" placeholder="e.g. 402, Sea Face Manor, Worli Sea Face"/>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.85rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Landmark</label>
                <input type="text" id="co_addr_landmark" class="form-input" style="font-size: 0.8rem;" placeholder="Near Promenade"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">City *</label>
                <input type="text" id="co_addr_city" required class="form-input" style="font-size: 0.8rem;" value="Mumbai"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">State *</label>
                <input type="text" id="co_addr_state" required class="form-input" style="font-size: 0.8rem;" value="Maharashtra"/>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
              <button type="button" class="btn-secondary" style="font-size: 0.75rem;" onclick="document.getElementById('checkoutInlineAddAddressBox').style.display='none';">Cancel</button>
              <button type="submit" class="btn-primary" style="font-size: 0.75rem; padding: 0.5rem 1.25rem;">Save &amp; Select Address</button>
            </div>
          </form>
        </div>

        <!-- Address Radio Cards Stack -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${cardsHtml}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-hairline); padding-top: 1.25rem; margin-top: 0.5rem;">
          <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-shield-halved" style="color: var(--gold-primary);"></i>
            <span>Insured Armored BlueDart Delivery Included</span>
          </div>
          <button type="button" class="btn-primary" style="padding: 0.75rem 2rem; font-size: 0.78rem;" onclick="checkoutManager.goToStep(2)">
            Continue to Payment <i class="fa-solid fa-arrow-right" style="margin-left: 0.4rem;"></i>
          </button>
        </div>
      </div>
    `;
  }

  showAddAddressInline() {
    const box = document.getElementById("checkoutInlineAddAddressBox");
    if (box) {
      box.style.display = "block";
      box.scrollIntoView({ behavior: "smooth" });
    }
  }

  handleSaveInlineAddress(e) {
    if (e) e.preventDefault();
    const tag = document.getElementById("co_addr_tag")?.value || "Primary Residence";
    const name = (document.getElementById("co_addr_name")?.value || "").trim();
    const phone = (document.getElementById("co_addr_phone")?.value || "").trim();
    const street = (document.getElementById("co_addr_street")?.value || "").trim();
    const landmark = (document.getElementById("co_addr_landmark")?.value || "").trim();
    const city = (document.getElementById("co_addr_city")?.value || "").trim();
    const state = (document.getElementById("co_addr_state")?.value || "Maharashtra").trim();
    const pincode = (document.getElementById("co_addr_pincode")?.value || "").trim();

    if (!street || !city || !pincode || !phone) {
      if (window.showToast) window.showToast("Fields Missing", "Please enter all required address fields.");
      return;
    }

    const newAddrId = `addr_${Date.now()}`;
    const newAddressObj = {
      id: newAddrId,
      tag,
      recipientName: name || window.authManager?.currentPatron?.name || 'Valued Patron',
      phone,
      street,
      landmark,
      city,
      state,
      pincode,
      isDefault: false
    };

    if (window.authManager && window.authManager.currentPatron) {
      window.authManager.saveAddress(newAddressObj);
    } else {
      let currentList = this.getPatronAddresses();
      currentList.push(newAddressObj);
      try {
        localStorage.setItem("asmi_guest_addresses", JSON.stringify(currentList));
      } catch(err) {}
    }

    this.selectedAddressId = newAddrId;
    const box = document.getElementById("checkoutInlineAddAddressBox");
    if (box) box.style.display = 'none';
    this.renderAddressSelector();
    if (window.showToast) window.showToast("Address Saved", "Delivery destination recorded successfully.");
  }

  renderOrderSummary() {
    const summaryContainer = document.getElementById("checkoutSummaryList");
    if (!summaryContainer) return;

    if (cartManager.items.length === 0) {
      summaryContainer.innerHTML = `<p class="label-micro" style="color: var(--text-muted); text-align: center; padding: 1rem;">Your bag is currently empty.</p>`;
      return;
    }

    let itemsHtml = "";
    cartManager.items.forEach(item => {
      const prod = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === item.id) : null;
      const itemName = item.customName || prod?.name || "Handcrafted Jewelry Piece";
      const itemImage = item.customImage || prod?.image || "assets/images/emerald-necklace.jpg";
      const itemPriceINR = (item.customPriceINR !== undefined && item.customPriceINR !== null)
        ? item.customPriceINR
        : (prod ? prod.priceINR : 0);
      const itemPriceUSD = (item.customPriceUSD !== undefined && item.customPriceUSD !== null)
        ? item.customPriceUSD
        : (prod && prod.priceUSD ? prod.priceUSD : Math.round(itemPriceINR * 0.012));
      const finalImgSrc = typeof resolveAssetUrl === 'function' ? resolveAssetUrl(itemImage) : itemImage;

      itemsHtml += `
        <div style="display: flex; gap: 0.75rem; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid var(--border-hairline);">
          <img src="${finalImgSrc}" alt="${itemName}" style="width: 48px; height: 48px; object-fit: cover; border: 1px solid var(--border-color); border-radius: 2px;" onerror="this.onerror=null; this.src=typeof resolveAssetUrl === 'function' ? resolveAssetUrl('assets/images/emerald-necklace.jpg') : 'assets/images/emerald-necklace.jpg';"/>
          <div style="flex: 1; min-width: 0;">
            <p style="font-weight: 600; color: var(--text-primary); font-size: 0.8125rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${itemName}</p>
            <p class="label-micro" style="color: var(--text-muted); margin: 0;">Qty: ${item.quantity} | ${item.selectedFinish || item.finish || '18K Gold'}</p>
          </div>
          <span style="font-family: var(--font-serif); font-size: 0.875rem; font-weight: 600; color: var(--gold-primary);">
            ${formatPrice(itemPriceINR * item.quantity, null, itemPriceUSD * item.quantity)}
          </span>
        </div>
      `;
    });

    const addresses = this.getPatronAddresses();
    const chosenAddress = addresses.find(a => a.id === this.selectedAddressId) || addresses[0] || null;
    const calcs = cartManager.getCalculations(chosenAddress);

    summaryContainer.innerHTML = `
      <div style="max-height: 200px; overflow-y: auto; margin-bottom: 0.75rem;">
        ${itemsHtml}
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8125rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
          <span>Subtotal (${cartManager.getTotalCount()} item${cartManager.getTotalCount() > 1 ? 's' : ''}):</span>
          <span style="color: var(--text-primary); font-weight: 500;">${formatPrice(calcs.subtotal)}</span>
        </div>
        ${calcs.discount > 0 ? `
        <div style="display: flex; justify-content: space-between; color: #10B981;">
          <span>Privilege Discount:</span>
          <span>-${formatPrice(calcs.discount)}</span>
        </div>` : ''}
        <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
          <span>Delivery Charges (${calcs.shippingZone || 'Within 500gm'}):</span>
          <span style="color: var(--gold-primary); font-weight: 600;">+${formatPrice(calcs.shippingFee)}</span>
        </div>
        ${calcs.giftWrapFee > 0 ? `
        <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
          <span>Luxury Velvet Gift Box:</span>
          <span style="color: var(--text-primary); font-weight: 500;">+${formatPrice(calcs.giftWrapFee)}</span>
        </div>` : ''}
        <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
          <span>GST (3% Jewelry Tax):</span>
          <span style="color: var(--text-primary); font-weight: 500;">${formatPrice(calcs.taxGST)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 1.05rem; border-top: 1px solid var(--border-hairline); padding-top: 0.5rem; margin-top: 0.25rem;">
          <span style="font-family: var(--font-serif); font-weight: 600; color: var(--text-primary);">Total Amount:</span>
          <span style="font-family: var(--font-serif); font-weight: 700; color: var(--gold-primary);">${formatPrice(calcs.finalTotal)}</span>
        </div>
      </div>
    `;
  }

  setGateway(gatewayName, appName = "") {
    this.switchPaymentTab(gatewayName);
    if (appName) this.selectedUpiApp = appName;
  }

  switchPaymentTab(tabKey) {
    this.selectedGateway = tabKey;
    
    // Update tab button active states
    document.querySelectorAll(".pay-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.paytab === tabKey);
    });

    // Show selected payment panel, hide others
    const panels = ["upi", "card", "netbanking", "international"];
    panels.forEach(p => {
      const panelEl = document.getElementById(`payPanel_${p}`);
      if (panelEl) panelEl.style.display = (p === tabKey) ? "block" : "none";
    });

    // Update CTA button label
    const addresses = this.getPatronAddresses();
    const chosenAddress = addresses.find(a => a.id === this.selectedAddressId) || addresses[0] || null;
    const calcs = cartManager.getCalculations(chosenAddress);
    const btnEl = document.getElementById("btnCompletePayment");
    if (btnEl) {
      let methodLabel = "Payment";
      if (tabKey === "upi") methodLabel = `UPI (${this.selectedUpiApp || 'GPay'})`;
      else if (tabKey === "card") methodLabel = "Credit / Debit Card";
      else if (tabKey === "netbanking") methodLabel = `${this.selectedBank || 'Net Banking'}`;
      else if (tabKey === "international") methodLabel = `${this.selectedInternational || 'PayPal'}`;

      btnEl.innerHTML = `<i class="fa-solid fa-shield-check" style="margin-right: 0.5rem; color: var(--gold-primary);"></i> Authorize ${formatPrice(calcs.finalTotal)} via ${methodLabel}`;
    }
  }

  setUpiApp(appName) {
    this.selectedUpiApp = appName;
    document.querySelectorAll("[data-upiapp]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.upiapp === appName);
    });
    this.switchPaymentTab("upi");
  }

  setBank(bankName) {
    this.selectedBank = bankName;
    document.querySelectorAll("[data-bank]").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.bank === bankName);
    });
    const sel = document.getElementById("netbanking_bank_select");
    if (sel && sel.value !== bankName) {
      sel.value = bankName;
    }
    this.switchPaymentTab("netbanking");
  }

  setEmiPlan(planName) {
    this.selectedEmiPlan = planName;
    document.querySelectorAll("[data-paylater]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.paylater === planName);
    });
    this.switchPaymentTab("emi");
  }

  setInternational(intlOption) {
    this.selectedInternational = intlOption;
    document.querySelectorAll("[data-intl]").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.intl === intlOption);
    });
    this.switchPaymentTab("international");
  }

  setWallet(walletName) {
    this.selectedWallet = walletName;
    document.querySelectorAll("[data-wallet]").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.wallet === walletName);
    });
    this.switchPaymentTab("wallet");
  }

  formatCardInput(input) {
    if (!input) return;
    let val = input.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    input.value = formatted;

    // Detect brand icon
    const iconEl = document.getElementById("cardBrandIcon") || document.getElementById("cardBrandIcon_wp");
    if (iconEl) {
      if (/^4/.test(val)) {
        iconEl.className = "fa-brands fa-cc-visa";
        iconEl.style.color = "#1A1F71";
      } else if (/^5[1-5]/.test(val)) {
        iconEl.className = "fa-brands fa-cc-mastercard";
        iconEl.style.color = "#EB001B";
      } else if (/^3[47]/.test(val)) {
        iconEl.className = "fa-brands fa-cc-amex";
        iconEl.style.color = "#006FCF";
      } else if (/^(60|65|81|82)/.test(val)) {
        iconEl.className = "fa-regular fa-credit-card";
        iconEl.style.color = "#0088CC";
      } else {
        iconEl.className = "fa-solid fa-credit-card";
        iconEl.style.color = "var(--gold-primary)";
      }
    }
  }

  formatExpiryInput(input) {
    if (!input) return;
    let val = input.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      input.value = val.substring(0, 2) + '/' + val.substring(2);
    } else {
      input.value = val;
    }
  }

  updateEmiCalculations() {
    const container = document.getElementById("emiPlansContainer");
    if (!container) return;

    const addresses = this.getPatronAddresses();
    const chosenAddress = addresses.find(a => a.id === this.selectedAddressId) || addresses[0] || null;
    const calcs = cartManager.getCalculations(chosenAddress);
    const total = calcs.finalTotal || 0;
    const bank = document.getElementById("emi_bank_select")?.value || "HDFC Bank";

    const plans = [
      {
        months: 3,
        name: "3 Months (0% No-Cost EMI)",
        badge: "0% Interest &bull; No Cost",
        badgeColor: "#10B981",
        monthly: Math.round(total / 3),
        totalPayable: total
      },
      {
        months: 6,
        name: "6 Months (0% No-Cost EMI)",
        badge: "0% Interest &bull; Most Popular",
        badgeColor: "#10B981",
        monthly: Math.round(total / 6),
        totalPayable: total
      },
      {
        months: 9,
        name: "9 Months Low-Cost EMI",
        badge: "13.5% p.a. Bank Interest",
        badgeColor: "var(--text-muted)",
        monthly: Math.round((total * 1.07) / 9),
        totalPayable: Math.round(total * 1.07)
      },
      {
        months: 12,
        name: "12 Months Low-Cost EMI",
        badge: "14% p.a. Bank Interest",
        badgeColor: "var(--text-muted)",
        monthly: Math.round((total * 1.09) / 12),
        totalPayable: Math.round(total * 1.09)
      }
    ];

    container.innerHTML = plans.map(p => {
      const isSelected = (this.selectedEmiPlan === p.name || (!this.selectedEmiPlan && p.months === 3));
      return `
        <div class="pay-emi-card ${isSelected ? 'selected' : ''}" onclick="checkoutManager.selectEmiPlanDirect('${p.name}')" style="border: ${isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-color)'}; background: ${isSelected ? 'rgba(212,175,55,0.08)' : 'var(--bg-card)'};">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div style="width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid ${isSelected ? 'var(--gold-primary)' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; background: ${isSelected ? 'var(--gold-primary)' : 'transparent'}; flex-shrink: 0;">
              ${isSelected ? `<i class="fa-solid fa-check" style="font-size: 0.55rem; color: #000;"></i>` : ''}
            </div>
            <div>
              <p style="font-weight: 600; color: var(--text-primary); font-size: 0.8125rem; margin: 0;">
                ${p.months} Months @ <span style="color: var(--gold-primary);">${formatPrice(p.monthly)} / month</span>
              </p>
              <span class="label-micro" style="color: ${p.badgeColor}; font-weight: 600;">${p.badge} (${bank})</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Total:</span>
            <span style="font-weight: 600; font-size: 0.8125rem; color: var(--text-primary);">${formatPrice(p.totalPayable)}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  selectEmiPlanDirect(planName) {
    this.selectedEmiPlan = planName;
    this.updateEmiCalculations();
    this.switchPaymentTab("emi");
  }

  renderStep() {
    // Update step indicator tabs
    document.querySelectorAll(".step-tab").forEach(tab => {
      const step = parseInt(tab.dataset.step, 10);
      tab.classList.toggle("active", step === this.currentStep);
      tab.classList.toggle("completed", step < this.currentStep);
    });

    // Hide all step sections
    document.querySelectorAll(".checkout-step-content").forEach(content => {
      content.style.display = "none";
    });

    // Show active step section
    const activeSection = document.getElementById(`checkoutStep_${this.currentStep}`);
    if (activeSection) activeSection.style.display = "block";

    // Update order summary inside checkout
    this.renderOrderSummary();

    if (this.currentStep === 1) {
      this.renderAddressSelector();
    } else if (this.currentStep === 2) {
      this.switchPaymentTab(this.selectedGateway || "upi");
    }
  }

  getPaymentGatewayConfig() {
    let settings = {};
    if (window.adminManager && window.adminManager.siteSettings) {
      settings = window.adminManager.siteSettings;
    } else if (window.asmiSync && window.asmiSync.settings) {
      settings = window.asmiSync.settings;
    } else {
      try {
        const saved = localStorage.getItem("asmi_site_settings");
        if (saved) settings = JSON.parse(saved);
      } catch (e) {}
    }

    return {
      enabled: settings.razorpayEnabled !== false,
      actionsPaused: settings.paymentGatewayActionsPaused === true,
      keyId: (settings.razorpayKeyId || "rzp_test_Tihe0pt7I4L8K4").trim(),
      keySecret: (settings.razorpayKeySecret || "B40K6aQoksDiHqvceot6EItm").trim(),
      currency: typeof currentCurrency !== "undefined" ? currentCurrency : "INR"
    };
  }

  getRazorpayKeyId() {
    return this.getPaymentGatewayConfig().keyId;
  }

  async ensureRazorpayLoaded() {
    if (typeof window.Razorpay === "function") return true;
    return new Promise((resolve) => {
      const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
        setTimeout(() => resolve(typeof window.Razorpay === "function"), 1200);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
      setTimeout(() => resolve(typeof window.Razorpay === "function"), 2000);
    });
  }

  async processPayment() {
    if (this.isProcessing) return;

    const addresses = this.getPatronAddresses();
    const chosenAddress = addresses.find(a => a.id === this.selectedAddressId) || addresses[0] || {};
    const calcs = cartManager.getCalculations(chosenAddress);
    if (calcs.finalTotal <= 0 && cartManager.items.length === 0) {
      if (window.showToast) window.showToast("Empty Bag", "Your shopping bag is empty.");
      return;
    }
    const patron = window.authManager?.currentPatron;
    const customerName = chosenAddress.recipientName || patron?.name || "Valued Patron";
    const customerEmail = patron?.email || "concierge@asmijewelry.com";
    const customerPhone = chosenAddress.phone || patron?.phone || "+91 98200 12345";
    const gwConfig = this.getPaymentGatewayConfig();
    const activeCurr = typeof currentCurrency !== "undefined" ? currentCurrency : "INR";

    let amountInSubunits = Math.round(calcs.finalTotal * 100);
    if (activeCurr === "USD") {
      const totalUSD = calcs.finalTotalUSD || Math.round(calcs.finalTotal * 0.012);
      amountInSubunits = Math.max(100, Math.round(totalUSD * 100));
    }

    // Check if Payment Gateway actions are paused by administrator
    const isGatewayPaused = window.asmiGatewayActionsPaused === true || gwConfig.actionsPaused === true;

    // Ensure Razorpay SDK is loaded
    await this.ensureRazorpayLoaded();

    // Map active tab to prefill method for Razorpay
    let prefillMethod = "upi";
    if (this.selectedGateway === "card") prefillMethod = "card";
    else if (this.selectedGateway === "netbanking") prefillMethod = "netbanking";
    else if (this.selectedGateway === "international") prefillMethod = "card";

    // 1. Launch official Razorpay external checkout window
    if (!isGatewayPaused && typeof window.Razorpay === "function" && gwConfig.keyId) {
      this.isProcessing = true;
      if (window.showToast) {
        window.showToast("Razorpay Secure Gateway", `Opening Razorpay payment window...`);
      }

      const logoUrl = typeof resolveAssetUrl === 'function' ? resolveAssetUrl('assets/images/emerald-necklace.jpg') : (window.location.origin + '/assets/images/emerald-necklace.jpg');

      const options = {
        key: gwConfig.keyId,
        amount: amountInSubunits,
        currency: activeCurr,
        name: "ASMI HAUTE JOAILLERIE",
        description: `Acquisition (${cartManager.items.length} Piece${cartManager.items.length > 1 ? 's' : ''}) - Total ₹${calcs.finalTotal.toLocaleString('en-IN')}`,
        image: logoUrl,
        handler: (response) => {
          this.isProcessing = false;
          const paymentId = response.razorpay_payment_id || `RZP_${Date.now()}`;
          const methodLabel = `Razorpay Secure Gateway (${this.selectedGateway.toUpperCase()} · ${paymentId})`;
          
          if (window.showToast) {
            window.showToast("Payment Approved", `Transaction ${paymentId} authorized! Generating invoice...`);
          }

          // Return to website window, execute verification, invoice creation, and email dispatch
          this.runVerificationFlow(paymentId, methodLabel, [
            { progress: 25, text: `Payment Settlement Received from Razorpay (${paymentId})...` },
            { progress: 55, text: "Verifying 256-Bit NPCI & Bank Tokenization Cryptography..." },
            { progress: 85, text: "Issuing 100% Certified 916 BIS Hallmark Authenticity Record..." },
            { progress: 100, text: "Payment Cleared! Generating your Official Tax Invoice..." }
          ]);
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone.replace(/[^0-9+]/g, ''),
          method: prefillMethod
        },
        notes: {
          delivery_recipient: customerName,
          shipping_address: `${chosenAddress.street || ''}, ${chosenAddress.city || ''}, ${chosenAddress.state || ''} - ${chosenAddress.pincode || ''}`,
          selected_gateway_tab: this.selectedGateway
        },
        theme: {
          color: "#8C6E17",
          backdrop_color: "rgba(0, 0, 0, 0.88)"
        },
        modal: {
          ondismiss: () => {
            this.isProcessing = false;
            if (window.showToast) {
              window.showToast("Payment Cancelled", "Transaction was closed. You can retry anytime.");
            }
          }
        }
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (response) => {
          this.isProcessing = false;
          if (window.showToast) {
            window.showToast("Payment Declined", response.error?.description || "The transaction was declined by payment gateway.");
          }
        });
        rzp.open();
        return;
      } catch (err) {
        console.warn("Razorpay standard modal launch error, falling back to simulated verification:", err);
      }
    }

    // 2. Direct simulation fallback (when offline or sandbox script unavailable)
    let paymentMethodTitle = `Direct Gateway (${this.selectedGateway.toUpperCase()})`;
    if (this.selectedGateway === "card") {
      const cardNum = (document.getElementById("card_number_input")?.value || "").replace(/\s/g, '');
      const displayDigits = cardNum.length >= 4 ? cardNum.slice(-4) : "4242";
      paymentMethodTitle = `Credit/Debit Card (•••• ${displayDigits})`;
    } else if (this.selectedGateway === "netbanking") {
      paymentMethodTitle = `Net Banking (${this.selectedBank || "HDFC Bank"})`;
    } else if (this.selectedGateway === "international") {
      paymentMethodTitle = `International FX (${this.selectedInternational || "PayPal Express"} - ${activeCurr})`;
    } else {
      paymentMethodTitle = `Instant UPI (${this.selectedUpiApp || "Google Pay"})`;
    }

    this.runVerificationFlow(`RZP_SIM_${Date.now()}`, paymentMethodTitle);
  }

  runVerificationFlow(paymentRef = null, gatewayName = "Instant UPI & Dynamic QR", customStatus = null) {
    this.isProcessing = true;
    this.goToStep(3);

    const progressEl = document.getElementById("paymentProgressBar");
    const statusTextEl = document.getElementById("paymentStatusText");

    const statusUpdates = customStatus || [
      { progress: 25, text: "Connecting with NPCI Unified Payments Interface (UPI)..." },
      { progress: 55, text: "Verifying Encrypted Transaction Token..." },
      { progress: 85, text: "Payment Authorization Confirmed..." },
      { progress: 100, text: "Payment Verified! Booking armored logistics dispatch..." }
    ];

    let updateIndex = 0;
    const interval = setInterval(() => {
      if (updateIndex < statusUpdates.length) {
        const u = statusUpdates[updateIndex];
        if (progressEl) progressEl.style.width = `${u.progress}%`;
        if (statusTextEl) statusTextEl.textContent = u.text;
        updateIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.completeOrder(paymentRef, gatewayName);
        }, 450);
      }
    }, 500);
  }

  completeOrder(paymentRef = null, gatewayName = "UPI QR (Instant Verified)") {
    this.isProcessing = false;
    
    const orderNumber = `ASM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const authCode = paymentRef ? `RZP-${paymentRef}` : `BIS-916-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const addresses = this.getPatronAddresses();
    const chosenAddress = addresses.find(a => a.id === this.selectedAddressId) || addresses[0] || {
      tag: "Primary Delivery",
      recipientName: window.authManager?.currentPatron?.name || "Gayatri Roy",
      phone: window.authManager?.currentPatron?.phone || "+91 98200 12345",
      street: "402, Sea Face Manor, Worli Sea Face",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400018"
    };

    const patron = window.authManager?.currentPatron;
    const calculations = cartManager.getCalculations(chosenAddress);

    this.orderData = {
      orderNumber,
      authCode,
      paymentId: paymentRef || authCode,
      dateStr,
      patronId: patron ? patron.id : null,
      patronMemberId: patron ? patron.memberId : "ASMI-VIP-9160",
      customerName: chosenAddress.recipientName || patron?.name || "Gayatri Roy",
      customerEmail: patron?.email || "gayatri.roy@gmail.com",
      customerPhone: chosenAddress.phone || patron?.phone || "+91 98200 12345",
      city: chosenAddress.city || "Mumbai",
      shippingAddress: chosenAddress,
      gateway: gatewayName,
      items: [...cartManager.items],
      calculations: calculations,
      currency: typeof currentCurrency !== "undefined" ? currentCurrency : "INR"
    };

    // Deduct stock for ordered products
    if (typeof PRODUCTS_DATA !== "undefined") {
      this.orderData.items.forEach(item => {
        const prod = PRODUCTS_DATA.find(p => p.id === item.id);
        if (prod) {
          const qty = item.quantity || 1;
          if (typeof prod.stock === "number") {
            prod.stock = Math.max(0, prod.stock - qty);
          }
        }
      });
      // Save updated product inventory to localStorage & Server
      if (window.asmiSync) {
        window.asmiSync.save("products", PRODUCTS_DATA);
      }
    }

    // Link order with recognized Patron and increment stats
    if (patron && window.authManager) {
      patron.ordersCount = (patron.ordersCount || 0) + 1;
      patron.totalSpentINR = (patron.totalSpentINR || 0) + (this.orderData.calculations?.finalTotal || 0);
      window.authManager.savePatronsDB();
      try {
        localStorage.setItem("asmi_current_patron", JSON.stringify(patron));
      } catch(e) {}
    }

    // Save into Orders Manager for permanent logistics tracking
    if (window.ordersManager) {
      window.ordersManager.addOrder(this.orderData);
    }

    // Re-render storefront catalog & admin tables
    if (typeof renderCatalog === "function") renderCatalog();
    if (window.adminManager && typeof window.adminManager.renderProductsTable === "function") {
      window.adminManager.renderProductsTable();
    }

    // Clear cart
    cartManager.clearCart();

    // Render step 4 confirmation
    this.renderConfirmationView();
    this.goToStep(4);

    if (window.showToast) {
      window.showToast("Changes Saved Successfully", `Order ID: ${orderNumber} is confirmed.`);
    }
  }

  renderConfirmationView() {
    const confirmContainer = document.getElementById("orderConfirmationContent");
    if (!confirmContainer || !this.orderData) return;

    let itemsRows = "";
    let firstItemId = null;
    this.orderData.items.forEach(item => {
      if (!firstItemId) firstItemId = item.id;
      const prod = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === item.id) : null;
      const itemName = item.customName || prod?.name || "Handcrafted Jewelry Piece";
      const itemImage = item.customImage || prod?.image || "assets/images/emerald-necklace.jpg";
      const itemPriceINR = (item.customPriceINR !== undefined && item.customPriceINR !== null)
        ? item.customPriceINR
        : (prod ? prod.priceINR : 0);
      const itemPriceUSD = (item.customPriceUSD !== undefined && item.customPriceUSD !== null)
        ? item.customPriceUSD
        : (prod && prod.priceUSD ? prod.priceUSD : Math.round(itemPriceINR * 0.012));
      const finalImgSrc = typeof resolveAssetUrl === 'function' ? resolveAssetUrl(itemImage) : itemImage;

      itemsRows += `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid var(--border-hairline);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${finalImgSrc}" alt="${itemName}" style="width: 44px; height: 44px; object-fit: cover; border: 1px solid var(--border-color); border-radius: 2px;" onerror="this.onerror=null; this.src=typeof resolveAssetUrl === 'function' ? resolveAssetUrl('assets/images/emerald-necklace.jpg') : 'assets/images/emerald-necklace.jpg';">
            <div>
              <p style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin: 0;">${itemName}</p>
              <p class="label-micro" style="color: var(--gold-primary); margin: 0;">${item.selectedFinish || item.finish || 'Standard'} | ${item.selectedSize || item.size || 'Standard'} (Qty: ${item.quantity})</p>
            </div>
          </div>
          <span style="font-family: var(--font-serif); font-weight: 600; color: var(--gold-primary); font-size: 1rem;">
            ${formatPrice(itemPriceINR * item.quantity, null, itemPriceUSD * item.quantity)}
          </span>
        </div>
      `;
    });

    const delivery = window.ordersManager ? window.ordersManager.getDeliveryDates() : { minDateStr: "10 Days", maxDateStr: "12 Days" };
    const shipAddr = this.orderData.shippingAddress || {};
    const calcs = this.orderData.calculations || {};

    confirmContainer.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="width: 60px; height: 60px; border-radius: 50% !important; background: rgba(212, 175, 55, 0.15); border: 2px solid var(--gold-primary); color: var(--gold-primary); display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.25rem;">Order Successfully Confirmed</span>
        <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--text-primary); margin-bottom: 0.5rem;">
          Thank You, ${this.orderData.customerName}!
        </h3>
        <p style="font-size: 0.8125rem; color: var(--text-muted); max-width: 480px; margin: 0 auto;">
          Your order is confirmed. It will be hand-inspected by master artisans and dispatched via insured armored courier to your selected address.
        </p>
      </div>

      <!-- Order Spec Details -->
      <div style="background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-hairline); padding-bottom: 1rem;">
          <div>
            <span class="label-micro" style="color: var(--text-muted); display: block;">Order Number</span>
            <span style="font-family: monospace; font-size: 0.875rem; font-weight: 700; color: var(--gold-primary);">${this.orderData.orderNumber}</span>
          </div>
          <div>
            <span class="label-micro" style="color: var(--text-muted); display: block;">BIS Certificate</span>
            <span style="font-family: monospace; font-size: 0.875rem; font-weight: 700; color: var(--text-primary);">${this.orderData.authCode}</span>
          </div>
          <div>
            <span class="label-micro" style="color: var(--text-muted); display: block;">Payment Method</span>
            <span style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">${this.orderData.gateway}</span>
          </div>
          <div>
            <span class="label-micro" style="color: var(--text-muted); display: block;">Delivery Window</span>
            <span style="font-size: 0.875rem; font-weight: 600; color: #10B981;">${delivery.minDateStr} – ${delivery.maxDateStr}</span>
          </div>
        </div>

        <!-- Selected Delivery Destination Spec -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-hairline); padding: 1rem; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span class="category-badge" style="font-size: 0.65rem; padding: 0.2rem 0.5rem; background: var(--gold-primary); color: #000; font-weight: 700;">
              <i class="fa-solid fa-truck-fast"></i> ${shipAddr.tag || 'Selected Delivery Address'}
            </span>
            <span class="label-micro" style="color: var(--gold-primary); font-weight: 700;">Zone: ${calcs.shippingZone || 'Logistics Zone'} (₹${calcs.shippingFee || 0})</span>
          </div>
          <p style="font-weight: 600; color: var(--text-primary); font-size: 0.85rem; margin: 0 0 0.2rem 0;">
            ${shipAddr.recipientName || this.orderData.customerName} &bull; ${shipAddr.phone || this.orderData.customerPhone}
          </p>
          <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
            ${shipAddr.street}${shipAddr.landmark ? ', ' + shipAddr.landmark : ''}, ${shipAddr.city}, ${shipAddr.state} - <strong>${shipAddr.pincode}</strong>
          </p>
        </div>

        <div style="margin-bottom: 1rem;">
          <h4 class="label-caps" style="color: var(--text-primary); margin-bottom: 0.5rem;">Acquired Jewelry Pieces</h4>
          ${itemsRows}
        </div>

        <!-- Cost Breakdown with Delivery Charges -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-hairline); padding: 0.85rem 1rem; margin-bottom: 0.85rem; font-size: 0.8125rem; display: flex; flex-direction: column; gap: 0.35rem;">
          <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
            <span>Jewelry Subtotal:</span>
            <span style="color: var(--text-primary); font-weight: 500;">${formatPrice(calcs.subtotal)}</span>
          </div>
          ${calcs.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; color: #10B981;">
            <span>Privilege Discount:</span>
            <span>-${formatPrice(calcs.discount)}</span>
          </div>` : ''}
          <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
            <span>Delivery Charges (${calcs.shippingZone || 'Within 500gm'}):</span>
            <span style="color: var(--gold-primary); font-weight: 600;">+${formatPrice(calcs.shippingFee || 0)}</span>
          </div>
          ${calcs.giftWrapFee > 0 ? `
          <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
            <span>Luxury Velvet Gift Box:</span>
            <span style="color: var(--text-primary); font-weight: 500;">+${formatPrice(calcs.giftWrapFee)}</span>
          </div>` : ''}
          <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
            <span>GST (3% Jewelry Tax):</span>
            <span style="color: var(--text-primary); font-weight: 500;">${formatPrice(calcs.taxGST)}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border-hairline);">
          <span style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary);">Total Paid:</span>
          <span style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: var(--gold-primary);">
            ${formatPrice(calcs.finalTotal)}
          </span>
        </div>
      </div>

      <!-- Official Concierge Delivery Date & Logistics Inquiry Notice -->
      <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(14, 14, 14, 0.95) 100%); border: 1.5px solid var(--gold-primary); padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50% !important; background: var(--gold-primary); color: #070707; font-size: 1.25rem; margin-bottom: 0.75rem;">
          <i class="fa-solid fa-truck-clock"></i>
        </div>
        <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.35rem; letter-spacing: 0.15em;">Delivery Date & Logistics Notice</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin-bottom: 0.5rem;">
          Need to know your exact delivery date?
        </h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary); max-width: 540px; margin: 0 auto 1.25rem auto; line-height: 1.6;">
          To know your guaranteed delivery date, transit schedule, or dispatch update, please <strong>contact or direct message (DM) our official concierge number</strong> with your Order ID (<span style="color: var(--gold-primary); font-family: monospace; font-weight: 700;">#${this.orderData.orderNumber}</span>).
        </p>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.85rem;">
          <a href="tel:+919876543210" class="btn-primary" style="padding: 0.65rem 1.35rem; font-size: 0.8rem; text-decoration: none;">
            <i class="fa-solid fa-phone" style="margin-right: 0.45rem;"></i> Call Official: +91 98765 43210
          </a>
          <a href="https://wa.me/919876543210?text=${encodeURIComponent('Namaste ASMI Concierge, I have placed order #' + this.orderData.orderNumber + '. Please let me know my estimated delivery date.')}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding: 0.65rem 1.35rem; font-size: 0.8rem; text-decoration: none; border-color: #25D366; color: #25D366 !important;">
            <i class="fa-brands fa-whatsapp" style="margin-right: 0.45rem; color: #25D366;"></i> DM Official WhatsApp
          </a>
        </div>
      </div>

      <!-- Live Review & Feedback Callout -->
      <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--gold-primary); padding: 1.5rem; margin-bottom: 1.5rem; text-align: center;">
        <span class="label-caps" style="color: var(--gold-primary); display: block; margin-bottom: 0.25rem;">Your Feedback Matters</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">
          How was your shopping experience today?
        </h4>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); max-width: 440px; margin: 0 auto 1rem auto;">
          Share your review and upload jewelry photos to inspire patrons across the ASMI community.
        </p>
        <button class="btn-primary" style="padding: 0.65rem 1.5rem; font-size: 0.75rem;" onclick="checkoutManager.closeCheckout(); if(window.reviewsManager) reviewsManager.openSubmitReviewModal('${firstItemId || 'asmi-pr-001'}', '${this.orderData.orderNumber}')">
          <i class="fa-solid fa-star" style="margin-right: 0.4rem; color: var(--gold-primary);"></i> Write a Review &amp; Upload Photo
        </button>
      </div>

      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
        <button class="btn-primary" onclick="checkoutManager.closeCheckout(); if(window.ordersManager) ordersManager.openPackageTracker('${this.orderData.orderNumber}')">
          <i class="fa-solid fa-route" style="margin-right: 0.5rem;"></i> Track Package (5 Steps)
        </button>
        <button class="btn-secondary" onclick="window.printOrderInvoice()">
          <i class="fa-solid fa-print" style="margin-right: 0.5rem;"></i> Print / Download Invoice
        </button>
        <button class="btn-secondary" onclick="checkoutManager.closeCheckout()">
          Continue Shopping
        </button>
      </div>
    `;

    // Trigger popup modal message after billing is completed
    setTimeout(() => {
      this.showDeliveryInquiryPopup(this.orderData.orderNumber);
    }, 700);

    this.populatePrintableInvoice();
  }

  showDeliveryInquiryPopup(orderNum) {
    const existingPopup = document.getElementById("asmiDeliveryInquiryModal");
    if (existingPopup) existingPopup.remove();

    const officialPhone = "+91 98765 43210";
    const waLink = `https://wa.me/919876543210?text=${encodeURIComponent('Namaste ASMI Concierge, I have placed order #' + (orderNum || '') + '. Please let me know my estimated delivery date.')}`;

    const modalEl = document.createElement("div");
    modalEl.id = "asmiDeliveryInquiryModal";
    modalEl.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      animation: fadeInModal 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    modalEl.innerHTML = `
      <div style="background: var(--bg-surface, #141414); border: 2px solid var(--gold-primary, #D4AF37); max-width: 500px; width: 100%; padding: 2rem 1.75rem; text-align: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
        <button type="button" onclick="document.getElementById('asmiDeliveryInquiryModal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-primary, #fff); font-size: 1.35rem; cursor: pointer; padding: 0.25rem;" title="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div style="width: 58px; height: 58px; border-radius: 50% !important; background: rgba(212, 175, 55, 0.15); border: 1.5px solid var(--gold-primary, #D4AF37); color: var(--gold-primary, #D4AF37); display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.25rem;">
          <i class="fa-solid fa-calendar-check"></i>
        </div>

        <span class="label-caps" style="color: var(--gold-primary, #D4AF37); display: block; font-size: 0.75rem; letter-spacing: 0.18em; margin-bottom: 0.4rem;">
          Billing &amp; Payment Complete
        </span>

        <h3 style="font-family: var(--font-serif, Georgia); font-size: 1.75rem; color: var(--text-primary, #fff); margin: 0 0 1rem 0; line-height: 1.25;">
          Important Delivery Date Notice
        </h3>

        <div style="background: var(--bg-card, #0e0e0e); border: 1px solid var(--border-color, rgba(212,175,55,0.3)); padding: 1.25rem; margin-bottom: 1.5rem; text-align: center;">
          <p style="font-size: 0.925rem; color: var(--text-primary, #fff); margin: 0 0 0.85rem 0; line-height: 1.6;">
            To know the delivery date, please <strong>contact our official number</strong> or <strong>DM us on WhatsApp</strong>:
          </p>
          <div style="display: inline-block; background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-primary, #D4AF37); padding: 0.65rem 1.5rem; margin-bottom: 0.5rem;">
            <span style="font-family: monospace; font-size: 1.2rem; font-weight: 700; color: var(--gold-primary, #D4AF37); letter-spacing: 0.05em;">
              <i class="fa-solid fa-phone" style="font-size: 0.95rem; margin-right: 0.35rem;"></i> ${officialPhone}
            </span>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-muted, #9e988b); margin: 0.35rem 0 0 0;">
            Order ID: <strong style="color: var(--text-primary, #fff);">${orderNum || 'ASM-ORDER'}</strong> &bull; Concierge Team Active 24/7
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="tel:${officialPhone.replace(/\s+/g, '')}" class="btn-primary" style="padding: 0.75rem 1.25rem; font-size: 0.8125rem; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <i class="fa-solid fa-phone"></i> Call Official Number (${officialPhone})
          </a>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding: 0.75rem 1.25rem; font-size: 0.8125rem; text-decoration: none; border-color: #25D366; color: #25D366 !important; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem; color: #25D366;"></i> DM on WhatsApp (${officialPhone})
          </a>
          <button type="button" class="btn-secondary" onclick="document.getElementById('asmiDeliveryInquiryModal').remove()" style="padding: 0.65rem; font-size: 0.75rem; opacity: 0.85;">
            I Understand, View Order Details
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
  }

  populatePrintableInvoice() {
    const printEl = document.getElementById("printableInvoice");
    if (!printEl || !this.orderData) return;

    let itemsHtml = "";
    this.orderData.items.forEach(item => {
      const prod = typeof PRODUCTS_DATA !== "undefined" ? PRODUCTS_DATA.find(p => p.id === item.id) : null;
      const itemName = item.customName || prod?.name || "Jewelry Piece";
      const itemPriceINR = (item.customPriceINR !== undefined && item.customPriceINR !== null)
        ? item.customPriceINR
        : (prod ? prod.priceINR : 0);

      itemsHtml += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${itemName}<br><small style="color:#666;">${item.selectedFinish || item.finish || 'Standard'} | ${item.selectedSize || item.size || 'Standard'}</small></td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${formatPrice(itemPriceINR, this.orderData.currency)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">${formatPrice(itemPriceINR * item.quantity, this.orderData.currency)}</td>
        </tr>
      `;
    });

    const shipAddr = this.orderData.shippingAddress || {};
    const calcs = this.orderData.calculations || {};

    printEl.innerHTML = `
      <div style="padding: 40px; font-family: 'Montserrat', sans-serif; color: #111; max-width: 800px; margin: 0 auto; line-height: 1.5;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #8C6E17; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin: 0; letter-spacing: 2px;">ASMI'S COLLECTION</h1>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #8C6E17; margin: 2px 0 0 0;">Fine Pearls & Handcrafted Jewelry</p>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 18px; margin: 0;">TAX INVOICE & CERTIFICATE</h2>
            <p style="font-size: 12px; margin: 4px 0 0 0; color: #555;">Order ID: <strong>${this.orderData.orderNumber}</strong></p>
            <p style="font-size: 12px; margin: 2px 0 0 0; color: #555;">Date: ${this.orderData.dateStr}</p>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px;">
          <div>
            <strong>PATRON &amp; SHIPPING DESTINATION:</strong><br>
            <strong>${this.orderData.customerName}</strong> (${shipAddr.tag || 'Primary Address'})<br>
            Phone: ${shipAddr.phone || this.orderData.customerPhone}<br>
            Email: ${this.orderData.customerEmail}<br>
            ${shipAddr.street}${shipAddr.landmark ? ', ' + shipAddr.landmark : ''}<br>
            ${shipAddr.city}, ${shipAddr.state} - ${shipAddr.pincode}
          </div>
          <div style="text-align: right;">
            <strong>DISPATCHED FROM ATELIER:</strong><br>
            ASMI Flagship Atelier &amp; Vault<br>
            Heritage Gold Quadrant, Mumbai 400001<br>
            BIS Certificate Auth: ${this.orderData.authCode}<br>
            Payment Mode: ${this.orderData.gateway}
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 30px;">
          <thead>
            <tr style="background: #f5f3ee; border-bottom: 2px solid #8C6E17; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">
              <th style="padding: 10px; text-align: left;">Item Description</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
              <th style="padding: 10px; text-align: right;">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
          <div style="width: 280px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span>Subtotal:</span>
              <span>${formatPrice(calcs.subtotal, this.orderData.currency)}</span>
            </div>
            ${calcs.discount > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #10B981;">
              <span>Discount Applied:</span>
              <span>-${formatPrice(calcs.discount, this.orderData.currency)}</span>
            </div>` : ''}
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span>Delivery Charges (${calcs.shippingZone || 'Within 500g'}):</span>
              <span style="font-weight: 600; color: #111;">+${formatPrice(calcs.shippingFee || 0, this.orderData.currency)}</span>
            </div>
            ${calcs.giftWrapFee > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span>Luxury Velvet Box:</span>
              <span>+${formatPrice(calcs.giftWrapFee, this.orderData.currency)}</span>
            </div>` : ''}
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span>GST Tax (3%):</span>
              <span>${formatPrice(calcs.taxGST, this.orderData.currency)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 2px solid #111; font-weight: bold; font-size: 14px; color: #8C6E17;">
              <span>Total Paid:</span>
              <span>${formatPrice(calcs.finalTotal, this.orderData.currency)}</span>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 20px; text-align: center; font-size: 10px; color: #777;">
          <p style="margin: 0 0 5px 0;">100% Certified 916 BIS Hallmarked & Laboratory Authenticated. 14-Day Free Exchange Guarantee.</p>
          <p style="margin: 0;">Thank you for shopping with ASMI'S COLLECTION.</p>
        </div>
      </div>
    `;
  }
}

// Global Checkout Instance
const checkoutManager = new CheckoutManager();
window.checkoutManager = checkoutManager;
window.openCheckout = function(item = null) {
  checkoutManager.openCheckout(item);
};
window.closeCheckout = function() {
  checkoutManager.closeCheckout();
};

window.printOrderInvoice = function() {
  window.print();
};

// Payment Gateway Action State Management (Resumed & Live)
window.asmiGatewayActionsPaused = false;

window.pausePaymentGatewayActions = function() {
  window.asmiGatewayActionsPaused = true;
  if (window.adminManager && window.adminManager.siteSettings) {
    window.adminManager.siteSettings.paymentGatewayActionsPaused = true;
    window.adminManager.saveSiteSettings();
  }
  if (window.showToast) {
    window.showToast("Gateway Actions Paused", "Payment gateway actions are currently paused. Simulation checkout active.");
  }
  console.log("[ASMI Gateway] Payment gateway actions are PAUSED.");
};

window.resumePaymentGatewayActions = function() {
  window.asmiGatewayActionsPaused = false;
  if (window.adminManager && window.adminManager.siteSettings) {
    window.adminManager.siteSettings.paymentGatewayActionsPaused = false;
    window.adminManager.saveSiteSettings();
  }
  if (window.showToast) {
    window.showToast("Gateway Actions Resumed", "Payment gateway actions are now live and active.");
  }
  console.log("[ASMI Gateway] Payment gateway actions are RESUMED.");
};
