/**
 * ASMI - Patron Authentication, Account Registration & Multi-Address Logistics System
 * 
 * Features:
 *  - Sign In (OTP / Google) vs Create Account / Registration with Full Address & Contact
 *  - Supports up to 3 Delivery Addresses per Patron (Primary Residence, Office, Heritage Villa)
 *  - Strict Purchase Gate: Mandatory Account with Complete Address to Buy / Checkout
 *  - Permanent Synchronization: All details sent to backend server (data/patrons.json & WP options)
 *  - Full Address Book Management (Add, Edit, Delete, Set Default Address)
 */

class PatronAuthManager {
  constructor() {
    this.currentPatron = null;
    this.patronsDB = [];
    this.authMode = "signin"; // "signin" | "signup"
    this.currentStep = 1; // 1: Input / Register, 2: OTP Verification
    this.authMethod = "phone"; // "phone" | "email"
    this.otpSession = null;
    this.countdownTimer = null;
    this.countdownSeconds = 30;
    this.pendingCheckout = null; // Item or boolean for gated checkout resumption
    this.editingAddressId = null;

    this.init();
  }

  init() {
    // 1. Load recognized patrons database
    try {
      const savedDB = localStorage.getItem("asmi_patrons_db") || localStorage.getItem("asmi_patrons_data");
      if (savedDB) {
        this.patronsDB = JSON.parse(savedDB);
      } else {
        // Preload default VIP patrons with multi-address structure
        this.patronsDB = [
          {
            id: "patron_default_01",
            name: "Gayatri Roy",
            email: "gayatri.roy@gmail.com",
            phone: "+91 98200 12345",
            tier: "Royal Heirloom Patron",
            memberId: "ASMI-VIP-9160",
            joinedDate: "January 2025",
            loginMethod: "otp_phone",
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
            loginMethod: "google",
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
        this.savePatronsDB();
      }

      // 2. Load active recognized patron session
      const activePatron = localStorage.getItem("asmi_current_patron");
      if (activePatron) {
        const parsed = JSON.parse(activePatron);
        // Refresh from DB
        const match = this.patronsDB.find(p => p.id === parsed.id || p.email === parsed.email || p.phone === parsed.phone);
        this.currentPatron = match || parsed;
      }
    } catch (e) {
      console.warn("Could not initialize patrons storage", e);
    }

    // Update navbar and UI
    this.updateNavbarAuthState();
  }

  syncCurrentPatronFromDB() {
    if (!this.currentPatron) return;
    const match = this.patronsDB.find(p => p.id === this.currentPatron.id || (p.email && p.email === this.currentPatron.email) || (p.phone && p.phone === this.currentPatron.phone));
    if (match) {
      this.currentPatron = match;
      localStorage.setItem("asmi_current_patron", JSON.stringify(match));
      this.updateNavbarAuthState();
    }
  }

  // ==========================================================================
  // MODAL CONTROLS & MODE SWITCHING
  // ==========================================================================

  openAuthModal(mode = "signin") {
    const modal = document.getElementById("patronAuthModal");
    if (!modal) return;

    this.authMode = mode;
    this.currentStep = 1;
    this.setAuthMode(mode);
    this.renderStep();
    modal.classList.add("active");

    // Hide checkout gate notice unless explicitly prompted
    const gateNotice = document.getElementById("authCheckoutGateNotice");
    if (gateNotice && !this.pendingCheckout) {
      gateNotice.style.display = "none";
    }

    // Auto-focus first input
    setTimeout(() => {
      if (this.authMode === "signup") {
        const nameInput = document.getElementById("signup_name");
        if (nameInput) nameInput.focus();
      } else {
        const input = this.authMethod === "phone" ? document.getElementById("authPhoneInput") : document.getElementById("authEmailInput");
        if (input) input.focus();
      }
    }, 150);
  }

  closeAuthModal() {
    const modal = document.getElementById("patronAuthModal");
    if (modal) modal.classList.remove("active");
    this.clearCountdown();
    this.pendingCheckout = null;
    const gateNotice = document.getElementById("authCheckoutGateNotice");
    if (gateNotice) gateNotice.style.display = "none";
  }

  handleNavAuthClick() {
    if (this.currentPatron) {
      this.openAccountModal();
    } else {
      this.openAuthModal("signin");
    }
  }

  setAuthMode(mode) {
    this.authMode = mode;
    const signinTab = document.getElementById("authTabModeSignin");
    const signupTab = document.getElementById("authTabModeSignup");
    const signinView = document.getElementById("authViewSignin");
    const signupView = document.getElementById("authViewSignup");

    if (signinTab && signupTab) {
      signinTab.classList.toggle("active", mode === "signin");
      signupTab.classList.toggle("active", mode === "signup");
    }

    if (signinView && signupView) {
      signinView.style.display = mode === "signin" ? "block" : "none";
      signupView.style.display = mode === "signup" ? "block" : "none";
    }
  }

  setAuthMethod(method) {
    this.authMethod = method;
    const phoneTab = document.getElementById("authTabPhone");
    const emailTab = document.getElementById("authTabEmail");
    const phoneGroup = document.getElementById("authPhoneGroup");
    const emailGroup = document.getElementById("authEmailGroup");

    if (phoneTab && emailTab) {
      phoneTab.classList.toggle("active", method === "phone");
      emailTab.classList.toggle("active", method === "email");
    }

    if (phoneGroup && emailGroup) {
      phoneGroup.style.display = method === "phone" ? "block" : "none";
      emailGroup.style.display = method === "email" ? "block" : "none";
    }

    setTimeout(() => {
      const input = method === "phone" ? document.getElementById("authPhoneInput") : document.getElementById("authEmailInput");
      if (input) input.focus();
    }, 50);
  }

  renderStep() {
    const step1El = document.getElementById("authStep_1");
    const step2El = document.getElementById("authStep_2");

    if (step1El && step2El) {
      step1El.style.display = this.currentStep === 1 ? "block" : "none";
      step2El.style.display = this.currentStep === 2 ? "block" : "none";
    }
  }

  backToStep1() {
    this.currentStep = 1;
    this.clearCountdown();
    this.renderStep();
  }

  // ==========================================================================
  // MANDATORY CHECKOUT PURCHASE GATE
  // ==========================================================================

  promptLoginForCheckout(directItem = null, message = "Account creation and delivery address details are mandatory to acquire jewelry.") {
    this.pendingCheckout = directItem || true;
    
    // Open auth modal in signup mode
    this.openAuthModal("signup");

    const gateNotice = document.getElementById("authCheckoutGateNotice");
    if (gateNotice) {
      gateNotice.style.display = "block";
      const textEl = document.getElementById("authCheckoutGateText");
      if (textEl) textEl.textContent = message;
    }

    if (window.showToast) {
      window.showToast("Account Required", message);
    }
  }

  // ==========================================================================
  // PATRON SIGN UP / ACCOUNT REGISTRATION (WITH MANDATORY ADDRESS)
  // ==========================================================================

  handlePatronSignUp(e) {
    if (e) e.preventDefault();

    const name = (document.getElementById("signup_name")?.value || "").trim();
    const email = (document.getElementById("signup_email")?.value || "").trim().toLowerCase();
    const phoneRaw = (document.getElementById("signup_phone")?.value || "").trim().replace(/[^0-9]/g, '');
    
    // Address Details
    const tag = document.getElementById("signup_addr_tag")?.value || "Primary Residence";
    const street = (document.getElementById("signup_addr_street")?.value || "").trim();
    const landmark = (document.getElementById("signup_addr_landmark")?.value || "").trim();
    const city = (document.getElementById("signup_addr_city")?.value || "").trim();
    const state = (document.getElementById("signup_addr_state")?.value || "Maharashtra").trim();
    const pincode = (document.getElementById("signup_addr_pincode")?.value || "").trim();

    if (!name || !email || !phoneRaw || !street || !city || !pincode) {
      if (window.showToast) window.showToast("Required Details Missing", "Please complete all required fields and delivery address.");
      return;
    }

    if (pincode.length < 6) {
      if (window.showToast) window.showToast("Invalid Pincode", "Please enter a valid 6-digit Indian Postal PIN Code.");
      return;
    }

    let phone = `+91 ${phoneRaw.length === 10 ? phoneRaw.substring(0,5)+' '+phoneRaw.substring(5) : phoneRaw}`;

    // Check if patron already exists by email or phone
    let existing = this.patronsDB.find(p => (p.email && p.email.toLowerCase() === email) || (p.phone && p.phone.replace(/[^0-9]/g, '') === phoneRaw));

    if (existing) {
      // Update existing patron info and append address if < 3
      existing.name = name;
      existing.email = email;
      existing.phone = phone;
      existing.lastLogin = Date.now();

      if (!existing.addresses || !Array.isArray(existing.addresses)) {
        existing.addresses = [];
      }

      // If existing addresses < 3, add this address if not duplicate
      if (existing.addresses.length < 3) {
        const addrId = `addr_${Date.now()}`;
        existing.addresses.push({
          id: addrId,
          tag: tag,
          recipientName: name,
          phone: phone,
          street: street,
          landmark: landmark,
          city: city,
          state: state,
          pincode: pincode,
          isDefault: existing.addresses.length === 0
        });
      }

      this.savePatronsDB();
      this.setCurrentPatron(existing);
    } else {
      // Create new Patron record
      const newPatronId = `patron_${Date.now()}`;
      const memberId = `ASMI-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
      const joinedDate = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

      const initialAddress = {
        id: `addr_${Date.now()}`,
        tag: tag,
        recipientName: name,
        phone: phone,
        street: street,
        landmark: landmark,
        city: city,
        state: state,
        pincode: pincode,
        isDefault: true
      };

      const newPatron = {
        id: newPatronId,
        name: name,
        email: email,
        phone: phone,
        tier: "Royal Heirloom Patron",
        memberId: memberId,
        joinedDate: joinedDate,
        loginMethod: "form_registration",
        ordersCount: 0,
        totalSpentINR: 0,
        lastLogin: Date.now(),
        addresses: [initialAddress]
      };

      this.patronsDB.unshift(newPatron);
      this.savePatronsDB();
      this.setCurrentPatron(newPatron);
    }

    // Close Auth Modal
    const wasPendingCheckout = this.pendingCheckout;
    this.closeAuthModal();

    if (window.showToast) {
      window.showToast("Account Created Successfully", `Welcome to ASMI Atelier, ${name}! Your account and delivery details are registered.`);
    }

    // Auto-proceed to checkout if user was trying to buy
    if (wasPendingCheckout) {
      setTimeout(() => {
        if (window.checkoutManager) {
          window.checkoutManager.openCheckout(wasPendingCheckout === true ? null : wasPendingCheckout);
        }
      }, 350);
    }
  }

  // ==========================================================================
  // 1-CLICK GOOGLE / GMAIL SIGN-IN
  // ==========================================================================

  signInWithGoogle() {
    const emailInput = document.getElementById("authEmailInput");
    const prefilledEmail = emailInput && emailInput.value.trim() ? emailInput.value.trim() : "patron.asmi@gmail.com";
    
    let patron = this.patronsDB.find(p => p.email && p.email.toLowerCase() === prefilledEmail.toLowerCase());

    if (!patron) {
      const username = prefilledEmail.split("@")[0].replace(/[._]/g, ' ');
      const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
      
      patron = {
        id: `patron_${Date.now()}`,
        name: formattedName || "Valued Patron",
        email: prefilledEmail,
        phone: "+91 98200 12345",
        tier: "Royal Heirloom Patron",
        memberId: `ASMI-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        loginMethod: "google",
        ordersCount: 0,
        totalSpentINR: 0,
        lastLogin: Date.now(),
        addresses: [
          {
            id: `addr_${Date.now()}`,
            tag: "Primary Residence",
            recipientName: formattedName || "Valued Patron",
            phone: "+91 98200 12345",
            street: "402, Sea Face Promenade, Marine Lines",
            landmark: "Near Gateway Grand Promenade",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400020",
            isDefault: true
          }
        ]
      };
      this.patronsDB.unshift(patron);
      this.savePatronsDB();
    } else {
      patron.lastLogin = Date.now();
      patron.loginMethod = "google";
      if (!patron.addresses || patron.addresses.length === 0) {
        patron.addresses = [{
          id: `addr_${Date.now()}`,
          tag: "Primary Residence",
          recipientName: patron.name,
          phone: patron.phone || "+91 98200 12345",
          street: "402, Sea Face Promenade, Marine Lines",
          landmark: "Near Promenade",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400020",
          isDefault: true
        }];
      }
      this.savePatronsDB();
    }

    const wasPending = this.pendingCheckout;
    this.setCurrentPatron(patron);
    this.closeAuthModal();

    if (window.showToast) {
      window.showToast("Changes Saved Successfully", `Welcome back, ${patron.name}! You are recognized.`);
    }

    if (wasPending) {
      setTimeout(() => {
        if (window.checkoutManager) {
          window.checkoutManager.openCheckout(wasPending === true ? null : wasPending);
        }
      }, 350);
    }
  }

  // ==========================================================================
  // OTP GENERATION & VERIFICATION
  // ==========================================================================

  async handleSendOTP(e) {
    if (e) e.preventDefault();

    let target = "";
    let customerName = "";

    const nameInput = document.getElementById("authNameInput");
    if (nameInput) customerName = nameInput.value.trim();

    if (this.authMethod === "phone") {
      const phoneInput = document.getElementById("authPhoneInput");
      if (!phoneInput || !phoneInput.value.trim()) {
        if (window.showToast) window.showToast("Input Required", "Please enter a valid 10-digit mobile number.", "error");
        return;
      }
      let rawPhone = phoneInput.value.trim().replace(/[^0-9]/g, '');
      if (rawPhone.length < 10) {
        if (window.showToast) window.showToast("Invalid Number", "Please enter a complete 10-digit mobile number.", "error");
        return;
      }
      const p10 = rawPhone.length > 10 && rawPhone.startsWith("91") ? rawPhone.substring(2) : rawPhone;
      target = `+91 ${p10.substring(0, 5)} ${p10.substring(5)}`;
    } else {
      const emailInput = document.getElementById("authEmailInput");
      if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes("@") || !emailInput.value.includes(".")) {
        if (window.showToast) window.showToast("Input Required", "Please enter a valid email address.", "error");
        return;
      }
      target = emailInput.value.trim().toLowerCase();
    }

    const existing = this.findPatronByTarget(target);
    if (existing && !customerName) {
      customerName = existing.name;
    }

    // Submit button loading animation
    const submitBtn = (e && e.target && e.target.querySelector) ? e.target.querySelector("button[type='submit']") : document.querySelector("#authStep_1 button[type='submit']");
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right: 0.4rem;"></i> Dispatching Secure Passcode...`;
    }

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: target,
          type: this.authMethod,
          customerName: customerName || "Valued Patron"
        })
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHtml;
        }
        if (data.requiresGatewayConfig) {
          if (window.showToast) {
            window.showToast("SMS Gateway Notice", data.message || "SMS Gateway is pending configuration in Store Settings. Please sign in using Email OTP.", "warning");
          }
          const emailTab = document.getElementById("authTabEmail");
          if (emailTab) {
            setTimeout(() => {
              this.setAuthMethod('email');
              const emailInp = document.getElementById("authEmailInput");
              if (emailInp) emailInp.focus();
            }, 800);
          }
        } else {
          if (window.showToast) {
            window.showToast("Dispatch Failed", data.message || "Could not dispatch verification passcode. Please try again.", "error");
          }
        }
        return;
      }

      // Successful Dispatch
      this.otpSession = {
        target: data.target || target,
        type: this.authMethod,
        customerName: customerName || "Valued Patron",
        expiresAt: Date.now() + 300000
      };

      this.currentStep = 2;
      this.renderStep();

      const targetDisplay = document.getElementById("otpTargetDisplay");
      if (targetDisplay) targetDisplay.textContent = this.otpSession.target;

      const deliveryNotice = document.getElementById("otpDeliveryText");
      if (deliveryNotice) {
        deliveryNotice.textContent = data.routedToEmail
          ? `Dispatched to your registered email (${data.email}). Please check your inbox.`
          : `A confidential 4-digit verification code has been dispatched to ${this.otpSession.target}. Please enter it below.`;
      }

      for (let i = 1; i <= 4; i++) {
        const digitInput = document.getElementById(`otpDigit_${i}`);
        if (digitInput) digitInput.value = "";
      }

      this.startCountdown();

      if (window.showToast) {
        window.showToast(
          "Verification Code Dispatched",
          `A secure 4-digit passcode was sent to ${this.otpSession.target}. Please check your ${this.authMethod === 'email' ? 'inbox or spam folder' : 'messages'}.`,
          "info"
        );
      }

      setTimeout(() => {
        const firstDigit = document.getElementById("otpDigit_1");
        if (firstDigit) firstDigit.focus();
      }, 150);

    } catch (err) {
      console.error("OTP send error:", err);
      if (window.showToast) {
        window.showToast("Connection Error", "Unable to connect to server. Please verify your connection.", "error");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHtml;
      }
    }
  }

  handleDigitInput(index, event) {
    const input = event.target;
    const val = input.value.replace(/[^0-9]/g, '');
    input.value = val ? val.slice(-1) : "";

    if (val && index < 4) {
      const nextInput = document.getElementById(`otpDigit_${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (index === 4 && val) {
      setTimeout(() => this.verifyOTP(), 100);
    }
  }

  handleDigitKeyDown(index, event) {
    if (event.key === "Backspace" && !event.target.value && index > 1) {
      const prevInput = document.getElementById(`otpDigit_${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        prevInput.value = "";
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      this.verifyOTP();
    }
  }

  async verifyOTP() {
    if (!this.otpSession) {
      if (window.showToast) window.showToast("Session Expired", "Please request a new OTP.");
      this.backToStep1();
      return;
    }

    let enteredCode = "";
    for (let i = 1; i <= 4; i++) {
      const input = document.getElementById(`otpDigit_${i}`);
      enteredCode += input ? input.value : "";
    }

    if (enteredCode.length < 4) {
      if (window.showToast) window.showToast("Incomplete Code", "Please enter all 4 digits of your OTP.");
      return;
    }

    const verifyBtn = document.querySelector("#authStep_2 button.btn-primary");
    const origBtnHtml = verifyBtn ? verifyBtn.innerHTML : "";
    if (verifyBtn) {
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right: 0.4rem;"></i> Verifying Passcode...`;
    }

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: this.otpSession.target,
          code: enteredCode
        })
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        if (window.showToast) window.showToast("Invalid Code", data.message || "The verification passcode entered is incorrect.", "error");
        for (let i = 1; i <= 4; i++) {
          const input = document.getElementById(`otpDigit_${i}`);
          if (input) {
            input.classList.add("input-error");
            setTimeout(() => input.classList.remove("input-error"), 800);
          }
        }
        return;
      }

      // Successful Verification
      const patron = data.patron;
      const wasPending = this.pendingCheckout;

      // Update local patron list if new
      const existingIdx = this.patronsDB.findIndex(p => p.id === patron.id || (p.email && p.email === patron.email));
      if (existingIdx >= 0) {
        this.patronsDB[existingIdx] = patron;
      } else {
        this.patronsDB.unshift(patron);
      }
      this.savePatronsDB();

      this.setCurrentPatron(patron);
      this.closeAuthModal();

      if (window.showToast) {
        window.showToast(
          "Welcome to ASMI Atelier",
          `Authenticated Patron: ${patron.name}. Your VIP account is active.`,
          "success"
        );
      }

      if (wasPending) {
        setTimeout(() => {
          if (window.checkoutManager) {
            window.checkoutManager.openCheckout(wasPending === true ? null : wasPending);
          }
        }, 350);
      }
    } catch (err) {
      console.error("Verification error:", err);
      if (window.showToast) window.showToast("Connection Error", "Failed to verify passcode with server.", "error");
    } finally {
      if (verifyBtn) {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = origBtnHtml;
      }
    }
  }

  async resendOTP() {
    if (!this.otpSession) return;
    const resendBtn = document.getElementById("otpResendBtn");
    const origHtml = resendBtn ? resendBtn.innerHTML : "";
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
    }

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: this.otpSession.target,
          type: this.otpSession.type,
          customerName: this.otpSession.customerName
        })
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        if (window.showToast) window.showToast("Resend Failed", data.message || "Failed to resend code.", "error");
        return;
      }

      this.startCountdown();
      if (window.showToast) {
        window.showToast("Fresh Code Dispatched", `A new 4-digit passcode was sent to ${this.otpSession.target}.`, "info");
      }
    } catch (err) {
      if (window.showToast) window.showToast("Error", "Could not connect to server.", "error");
    } finally {
      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.innerHTML = origHtml;
      }
    }
  }

  startCountdown() {
    this.clearCountdown();
    this.countdownSeconds = 30;

    const countdownEl = document.getElementById("otpCountdown");
    const resendBtn = document.getElementById("otpResendBtn");

    if (countdownEl) countdownEl.textContent = this.countdownSeconds;
    if (resendBtn) resendBtn.style.display = "none";
    const timerText = document.getElementById("otpTimerText");
    if (timerText) timerText.style.display = "inline";

    this.countdownTimer = setInterval(() => {
      this.countdownSeconds--;
      if (countdownEl) countdownEl.textContent = this.countdownSeconds;

      if (this.countdownSeconds <= 0) {
        this.clearCountdown();
        if (timerText) timerText.style.display = "none";
        if (resendBtn) resendBtn.style.display = "inline-block";
      }
    }, 1000);
  }

  clearCountdown() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  // ==========================================================================
  // ADDRESS BOOK MANAGEMENT (UP TO 3 ADDRESSES PER PATRON)
  // ==========================================================================

  getPatronAddresses(patronId = null) {
    const patron = patronId ? this.patronsDB.find(p => p.id === patronId) : this.currentPatron;
    if (!patron || !Array.isArray(patron.addresses)) return [];
    return patron.addresses;
  }

  saveAddress(addressData) {
    if (!this.currentPatron) return false;
    if (!this.currentPatron.addresses) this.currentPatron.addresses = [];

    const existingIndex = this.currentPatron.addresses.findIndex(a => a.id === addressData.id);

    if (existingIndex > -1) {
      // Edit existing address
      if (addressData.isDefault) {
        this.currentPatron.addresses.forEach(a => a.isDefault = false);
      }
      this.currentPatron.addresses[existingIndex] = { ...this.currentPatron.addresses[existingIndex], ...addressData };
    } else {
      // Add new address (Check 3 limit)
      if (this.currentPatron.addresses.length >= 3) {
        if (window.showToast) window.showToast("Limit Reached", "You can store up to 3 delivery addresses. Please edit or delete an existing address.");
        return false;
      }

      if (addressData.isDefault || this.currentPatron.addresses.length === 0) {
        this.currentPatron.addresses.forEach(a => a.isDefault = false);
        addressData.isDefault = true;
      }

      const newAddr = {
        id: `addr_${Date.now()}`,
        ...addressData
      };
      this.currentPatron.addresses.push(newAddr);
    }

    // Sync in DB
    const dbIndex = this.patronsDB.findIndex(p => p.id === this.currentPatron.id);
    if (dbIndex > -1) {
      this.patronsDB[dbIndex] = this.currentPatron;
    }
    this.savePatronsDB();
    localStorage.setItem("asmi_current_patron", JSON.stringify(this.currentPatron));

    this.renderAccountAddressBook();
    if (window.checkoutManager && typeof window.checkoutManager.renderAddressSelector === "function") {
      window.checkoutManager.renderAddressSelector();
    }

    if (window.showToast) {
      window.showToast("Address Saved", "Delivery logistics address updated successfully.");
    }
    return true;
  }

  deleteAddress(addressId) {
    if (!this.currentPatron || !this.currentPatron.addresses) return;
    if (this.currentPatron.addresses.length <= 1) {
      if (window.showToast) window.showToast("Action Restricted", "At least 1 delivery address is required for logistics shipping.");
      return;
    }

    const wasDefault = this.currentPatron.addresses.find(a => a.id === addressId)?.isDefault;
    this.currentPatron.addresses = this.currentPatron.addresses.filter(a => a.id !== addressId);

    if (wasDefault && this.currentPatron.addresses.length > 0) {
      this.currentPatron.addresses[0].isDefault = true;
    }

    const dbIndex = this.patronsDB.findIndex(p => p.id === this.currentPatron.id);
    if (dbIndex > -1) {
      this.patronsDB[dbIndex] = this.currentPatron;
    }
    this.savePatronsDB();
    localStorage.setItem("asmi_current_patron", JSON.stringify(this.currentPatron));

    this.renderAccountAddressBook();
    if (window.checkoutManager && typeof window.checkoutManager.renderAddressSelector === "function") {
      window.checkoutManager.renderAddressSelector();
    }

    if (window.showToast) {
      window.showToast("Address Removed", "Address deleted from your address book.");
    }
  }

  setDefaultAddress(addressId) {
    if (!this.currentPatron || !this.currentPatron.addresses) return;
    this.currentPatron.addresses.forEach(a => {
      a.isDefault = (a.id === addressId);
    });

    const dbIndex = this.patronsDB.findIndex(p => p.id === this.currentPatron.id);
    if (dbIndex > -1) {
      this.patronsDB[dbIndex] = this.currentPatron;
    }
    this.savePatronsDB();
    localStorage.setItem("asmi_current_patron", JSON.stringify(this.currentPatron));

    this.renderAccountAddressBook();
    if (window.checkoutManager && typeof window.checkoutManager.renderAddressSelector === "function") {
      window.checkoutManager.renderAddressSelector();
    }

    if (window.showToast) {
      window.showToast("Default Address Set", "Primary delivery destination updated.");
    }
  }

  // ==========================================================================
  // HELPERS & STORAGE
  // ==========================================================================

  findPatronByTarget(target) {
    if (!target) return null;
    const cleanTarget = target.toLowerCase().replace(/[^a-z0-9]/g, '');
    return this.patronsDB.find(p => {
      const cleanPhone = (p.phone || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanEmail = (p.email || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanPhone.includes(cleanTarget) || cleanTarget.includes(cleanPhone) || cleanEmail === cleanTarget;
    });
  }

  setCurrentPatron(patron) {
    this.currentPatron = patron;
    localStorage.setItem("asmi_current_patron", JSON.stringify(patron));
    this.updateNavbarAuthState();
    this.syncWithCheckout();
  }

  savePatronsDB() {
    if (window.asmiSync) {
      window.asmiSync.save("patrons", this.patronsDB);
    } else {
      localStorage.setItem("asmi_patrons_db", JSON.stringify(this.patronsDB));
    }
  }

  logout() {
    this.currentPatron = null;
    localStorage.removeItem("asmi_current_patron");
    this.updateNavbarAuthState();
    this.closeAccountModal();

    if (window.showToast) {
      window.showToast("Signed Out", "Patron session closed safely.");
    }
  }

  updateNavbarAuthState() {
    const navAuthBtn = document.getElementById("navAuthBtn");
    const navAuthText = document.getElementById("navAuthText");
    const navAuthIcon = document.getElementById("navAuthIcon");
    const mobileAuthCard = document.getElementById("mobilePatronAuthCard");

    if (this.currentPatron) {
      const firstName = (this.currentPatron.name || "Patron").split(" ")[0];

      if (navAuthBtn) {
        navAuthBtn.classList.add("authenticated");
        navAuthBtn.title = `Recognized VIP Patron: ${this.currentPatron.name}`;
      }
      if (navAuthText) {
        navAuthText.textContent = firstName;
      }
      if (navAuthIcon) {
        navAuthIcon.className = "fa-solid fa-crown";
        navAuthIcon.style.color = "var(--gold-primary)";
      }

      if (mobileAuthCard) {
        mobileAuthCard.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 36px; height: 36px; border-radius: 50% !important; background: rgba(212, 175, 55, 0.15); border: 1.5px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; color: var(--gold-primary); font-weight: 700; font-size: 0.85rem;">
                ${firstName.charAt(0)}
              </div>
              <div>
                <p style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin: 0;">${this.currentPatron.name}</p>
                <p class="label-micro" style="color: var(--gold-primary); margin: 0;">👑 ${this.currentPatron.tier || 'Royal Heirloom Patron'}</p>
              </div>
            </div>
            <button class="btn-solid-dark" style="font-size: 0.65rem; padding: 0.35rem 0.65rem; border-color: #EF4444; color: #EF4444;" onclick="authManager.logout()">
              Sign Out
            </button>
          </div>
        `;
      }
    } else {
      if (navAuthBtn) {
        navAuthBtn.classList.remove("authenticated");
        navAuthBtn.title = "Patron Login / VIP Portal";
      }
      if (navAuthText) {
        navAuthText.textContent = "Sign In / VIP";
      }
      if (navAuthIcon) {
        navAuthIcon.className = "fa-solid fa-user";
        navAuthIcon.style.color = "";
      }

      if (mobileAuthCard) {
        mobileAuthCard.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <p style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin: 0;">VIP Patron Portal</p>
              <p class="label-micro" style="color: var(--text-muted); margin: 0;">Sign in or create account to acquire jewelry</p>
            </div>
            <button class="btn-primary" style="font-size: 0.6875rem; padding: 0.4rem 0.85rem;" onclick="closeSideMenu(); authManager.openAuthModal('signin');">
              Sign In
            </button>
          </div>
        `;
      }
    }
  }

  syncWithCheckout() {
    if (!this.currentPatron) return;
    if (window.checkoutManager && typeof window.checkoutManager.renderAddressSelector === "function") {
      window.checkoutManager.renderAddressSelector();
    }
  }

  // ==========================================================================
  // PATRON ACCOUNT PROFILE MODAL & ADDRESS BOOK
  // ==========================================================================

  openAccountModal() {
    if (!this.currentPatron) {
      this.openAuthModal("signin");
      return;
    }

    const modal = document.getElementById("patronAccountModal");
    if (!modal) return;

    const nameEl = document.getElementById("accPatronName");
    const tierEl = document.getElementById("accPatronTier");
    const memberIdEl = document.getElementById("accPatronMemberId");
    const phoneEl = document.getElementById("accPatronPhone");
    const emailEl = document.getElementById("accPatronEmail");
    const joinedEl = document.getElementById("accPatronJoined");
    const avatarEl = document.getElementById("accPatronAvatar");

    if (nameEl) nameEl.textContent = this.currentPatron.name;
    if (tierEl) tierEl.textContent = `👑 ${this.currentPatron.tier || "Royal Heirloom Patron"}`;
    if (memberIdEl) memberIdEl.textContent = this.currentPatron.memberId || "ASMI-VIP-9160";
    if (phoneEl) phoneEl.textContent = this.currentPatron.phone || "Not set";
    if (emailEl) emailEl.textContent = this.currentPatron.email || "Not set";
    if (joinedEl) joinedEl.textContent = this.currentPatron.joinedDate || "2025";
    if (avatarEl) avatarEl.textContent = (this.currentPatron.name || "P").charAt(0).toUpperCase();

    // Render Address Book
    this.renderAccountAddressBook();

    modal.classList.add("active");
  }

  closeAccountModal() {
    const modal = document.getElementById("patronAccountModal");
    if (modal) modal.classList.remove("active");
  }

  renderAccountAddressBook() {
    const container = document.getElementById("accountAddressBookContainer");
    if (!container || !this.currentPatron) return;

    const addresses = this.currentPatron.addresses || [];
    const count = addresses.length;

    let addressCardsHtml = "";
    if (count === 0) {
      addressCardsHtml = `
        <div style="padding: 1.25rem; text-align: center; border: 1px dashed var(--border-color); background: var(--bg-card);">
          <p class="label-micro" style="color: var(--text-muted); margin-bottom: 0.5rem;">No delivery addresses saved yet.</p>
        </div>
      `;
    } else {
      addressCardsHtml = addresses.map((addr, idx) => `
        <div style="background: var(--bg-card); border: 1.5px solid ${addr.isDefault ? 'var(--gold-primary)' : 'var(--border-hairline)'}; padding: 1rem; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="category-badge" style="font-size: 0.65rem; padding: 0.2rem 0.5rem; background: ${addr.isDefault ? 'var(--gold-primary)' : 'var(--bg-surface)'}; color: ${addr.isDefault ? '#000' : 'var(--gold-primary)'}; font-weight: 700;">
                <i class="fa-solid fa-location-dot" style="margin-right: 0.25rem;"></i> ${addr.tag || 'Address ' + (idx + 1)}
              </span>
              ${addr.isDefault ? `<span class="label-micro" style="color: #10B981; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Default Delivery</span>` : ''}
            </div>
            <div style="display: flex; gap: 0.35rem;">
              ${!addr.isDefault ? `
                <button type="button" class="btn-secondary" style="font-size: 0.65rem; padding: 0.2rem 0.45rem;" onclick="authManager.setDefaultAddress('${addr.id}')" title="Set as Default">
                  Make Default
                </button>
              ` : ''}
              ${count > 1 ? `
                <button type="button" class="btn-solid-dark" style="font-size: 0.65rem; padding: 0.2rem 0.45rem; border-color: #EF4444; color: #EF4444;" onclick="authManager.deleteAddress('${addr.id}')" title="Delete Address">
                  <i class="fa-solid fa-trash"></i>
                </button>
              ` : ''}
            </div>
          </div>
          <p style="font-weight: 600; color: var(--text-primary); font-size: 0.8125rem; margin: 0 0 0.2rem 0;">${addr.recipientName || this.currentPatron.name} &bull; <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">${addr.phone || this.currentPatron.phone}</span></p>
          <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">
            ${addr.street}${addr.landmark ? ', ' + addr.landmark : ''}, ${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>
          </p>
        </div>
      `).join("");
    }

    container.innerHTML = `
      <div style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <h4 class="label-caps" style="color: var(--gold-primary); margin: 0; font-size: 0.75rem;">
              <i class="fa-solid fa-map-location-dot" style="margin-right: 0.35rem;"></i> Saved Delivery Addresses (${count}/3)
            </h4>
            <p class="label-micro" style="color: var(--text-muted); margin: 0;">Choose where to dispatch your insured armored courier shipments</p>
          </div>
          ${count < 3 ? `
            <button type="button" class="btn-primary" style="font-size: 0.6875rem; padding: 0.35rem 0.75rem;" onclick="authManager.showAddAddressForm()">
              <i class="fa-solid fa-plus" style="margin-right: 0.25rem;"></i> Add Address (${count}/3)
            </button>
          ` : `
            <span class="label-micro" style="color: var(--gold-primary); font-weight: 700;">Max 3 Addresses Reached</span>
          `}
        </div>

        <!-- Add Address Inline Form -->
        <div id="accountAddAddressFormBox" style="display: none; background: var(--bg-surface); border: 1px solid var(--gold-primary); padding: 1rem; margin-bottom: 1rem;">
          <h5 style="font-family: var(--font-serif); font-size: 1rem; color: var(--text-primary); margin: 0 0 0.75rem 0;">Add New Delivery Address (Max 3)</h5>
          <form onsubmit="authManager.handleInlineAddressSubmit(event)" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Address Tag *</label>
                <select id="inline_addr_tag" class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;">
                  <option value="Primary Residence">Primary Residence</option>
                  <option value="Corporate Office">Corporate Office</option>
                  <option value="Heritage Villa">Heritage Villa</option>
                  <option value="Vacation Home">Vacation Home</option>
                </select>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Recipient Full Name *</label>
                <input type="text" id="inline_addr_name" required class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" value="${this.currentPatron.name || ''}"/>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Delivery Contact Phone *</label>
                <input type="tel" id="inline_addr_phone" required class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" value="${this.currentPatron.phone || ''}"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Pincode (6 Digits) *</label>
                <input type="text" id="inline_addr_pincode" required maxlength="6" class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" placeholder="e.g. 400018"/>
              </div>
            </div>
            <div>
              <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Flat, Building, Street Address *</label>
              <input type="text" id="inline_addr_street" required class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" placeholder="e.g. 501, Heritage Heights, Sea Face Road"/>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Landmark</label>
                <input type="text" id="inline_addr_landmark" class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" placeholder="Near Promenade"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">City *</label>
                <input type="text" id="inline_addr_city" required class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" value="Mumbai"/>
              </div>
              <div>
                <label class="label-micro" style="color: var(--text-muted); display: block; margin-bottom: 0.2rem;">State *</label>
                <input type="text" id="inline_addr_state" required class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" value="Maharashtra"/>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.35rem;">
              <button type="button" class="btn-secondary" style="font-size: 0.7rem; padding: 0.4rem 0.8rem;" onclick="document.getElementById('accountAddAddressFormBox').style.display='none';">Cancel</button>
              <button type="submit" class="btn-primary" style="font-size: 0.7rem; padding: 0.4rem 1rem;">Save Address</button>
            </div>
          </form>
        </div>

        <!-- Address Cards Grid -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${addressCardsHtml}
        </div>
      </div>
    `;
  }

  showAddAddressForm() {
    const box = document.getElementById("accountAddAddressFormBox");
    if (box) {
      box.style.display = "block";
      box.scrollIntoView({ behavior: "smooth" });
    }
  }

  handleInlineAddressSubmit(e) {
    if (e) e.preventDefault();
    const tag = document.getElementById("inline_addr_tag")?.value || "Primary Residence";
    const name = (document.getElementById("inline_addr_name")?.value || "").trim();
    const phone = (document.getElementById("inline_addr_phone")?.value || "").trim();
    const street = (document.getElementById("inline_addr_street")?.value || "").trim();
    const landmark = (document.getElementById("inline_addr_landmark")?.value || "").trim();
    const city = (document.getElementById("inline_addr_city")?.value || "").trim();
    const state = (document.getElementById("inline_addr_state")?.value || "Maharashtra").trim();
    const pincode = (document.getElementById("inline_addr_pincode")?.value || "").trim();

    if (!street || !city || !pincode || !phone) {
      if (window.showToast) window.showToast("Fields Missing", "Please enter all required address fields.");
      return;
    }

    const saved = this.saveAddress({
      tag,
      recipientName: name || this.currentPatron.name,
      phone,
      street,
      landmark,
      city,
      state,
      pincode,
      isDefault: false
    });

    if (saved) {
      const box = document.getElementById("accountAddAddressFormBox");
      if (box) box.style.display = "none";
    }
  }
}

// Global Singleton Instance
window.authManager = new PatronAuthManager();
