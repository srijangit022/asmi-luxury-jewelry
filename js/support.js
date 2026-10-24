/**
 * ASMI - Haute Joaillerie AI Concierge & Live Customer Support Module
 * Ultra-Luxury Atelier Aesthetic, Semantic Intent Processor, Interactive Inquiry Carousel,
 * Configurable Support Channels, and Real-Time Admin Dialogue.
 */

class SupportManager {
  constructor() {
    this.chats = this.loadChats();
    this.settings = this.loadSettings();
    this.activeTab = "ai"; // "ai" or "admin"
    this.currentChatId = null;
    this.aiChatHistory = [];
    this.pollingInterval = null;
    this.soundEnabled = true;

    this.initAiChatHistory();
  }

  loadSettings() {
    if (typeof asmi_wp_data !== "undefined" && asmi_wp_data.preloaded && asmi_wp_data.preloaded.settings) {
      return asmi_wp_data.preloaded.settings;
    }
    try {
      const s = localStorage.getItem("asmi_settings_data");
      if (s) return JSON.parse(s);
    } catch(e) {}
    return {
      supportPhone: "+91 98765 43210",
      supportEmail: "support@asmijewelry.com",
      supportWhatsapp: "+91 98765 43210",
      supportHours: "Mon - Sun: 9:00 AM - 10:00 PM IST",
      aiGreeting: "Namaste! Welcome to ASMI Haute Joaillerie Concierge. I am your personal AI jewelry advisor. How may I assist you with your orders, item cancellations, custom designs, or certificates today?",
      aiFallbackMsg: "I want to ensure your request is handled with utmost perfection. You can speak directly with our dedicated concierge specialists or chat with our master jeweler admin team below:"
    };
  }

  getSupportContact() {
    const s = this.loadSettings();
    return {
      phone: s.supportPhone || s.officialPhone || "+91 98765 43210",
      email: s.supportEmail || s.officialEmail || "support@asmijewelry.com",
      whatsapp: s.supportWhatsapp || s.officialWhatsapp || "+91 98765 43210",
      hours: s.supportHours || "Mon - Sun: 9:00 AM - 10:00 PM IST",
      aiGreeting: s.aiGreeting || "Namaste! Welcome to ASMI Haute Joaillerie Concierge. How may I assist you today?",
      aiFallbackMsg: s.aiFallbackMsg || "You can directly speak with our dedicated concierge specialists or leave a live message for our admin team:"
    };
  }

  loadChats() {
    if (typeof asmi_wp_data !== "undefined" && asmi_wp_data.preloaded && Array.isArray(asmi_wp_data.preloaded.supportChats)) {
      return asmi_wp_data.preloaded.supportChats;
    }
    try {
      const saved = localStorage.getItem("asmi_support_chats");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch(e) {}
    return [];
  }

  saveChats() {
    if (window.asmiSync) {
      window.asmiSync.save("supportChats", this.chats);
    } else {
      try {
        localStorage.setItem("asmi_support_chats", JSON.stringify(this.chats));
      } catch(e) {}
    }
  }

  initAiChatHistory() {
    const contact = this.getSupportContact();
    this.aiChatHistory = [
      {
        id: "ai-msg-welcome",
        sender: "ai",
        text: `**Namaste & Welcome to ASMI Haute Joaillerie.**\n\nI am your dedicated **AI Concierge & Jewelry Specialist**. I can instantly help you with:\n\n• **Order & Item Cancellations:** Instant 1-click cancellations with automated admin & patron email receipts.\n• **Armored Tracking:** 10–12 business days BlueDart transit milestones.\n• **BIS 916 Hallmark:** Laser hallmarking & gemological certificates.\n• **Bespoke Tailoring:** Custom lengths, bridal pairings & extensions.\n\nSelect a quick topic below or type your inquiry anytime:`,
        timestamp: new Date().toISOString(),
        options: [
          "🚫 How do I cancel an ordered item?",
          "📦 Track my package (10-12 Days)",
          "📜 BIS 916 Hallmark & Certifications",
          "📏 Custom bridal sizing & length",
          "💬 Chat with Master Jeweler Admin"
        ]
      }
    ];
  }

  resetAiChat() {
    this.initAiChatHistory();
    this.renderAiMessages();
    this.playLuxuryChime(520, 0.08);
  }

  playLuxuryChime(freq = 660, duration = 0.06) {
    if (!this.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  }

  openSupportModal(initialTab = "ai") {
    const modal = document.getElementById("asmiSupportModal");
    if (!modal) return;
    this.activeTab = initialTab;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    this.updateSupportHeaderInfo();
    this.switchChatTab(this.activeTab);
    this.startLivePolling();
    this.playLuxuryChime(580, 0.08);

    // Auto focus input
    setTimeout(() => {
      if (initialTab === "ai") {
        const inp = document.getElementById("suppAiInput");
        if (inp) inp.focus();
      }
    }, 200);
  }

  closeSupportModal() {
    const modal = document.getElementById("asmiSupportModal");
    if (modal) modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  updateSupportHeaderInfo() {
    const contact = this.getSupportContact();
    const phoneEl = document.getElementById("suppHeaderPhone");
    const emailEl = document.getElementById("suppHeaderEmail");
    if (phoneEl) phoneEl.textContent = contact.phone;
    if (emailEl) emailEl.textContent = contact.email;
  }

  switchChatTab(tab) {
    this.activeTab = tab;
    const aiTabBtn = document.getElementById("suppTabAiBtn");
    const adminTabBtn = document.getElementById("suppTabAdminBtn");
    const aiView = document.getElementById("suppAiView");
    const adminView = document.getElementById("suppAdminView");

    if (aiTabBtn && adminTabBtn && aiView && adminView) {
      if (tab === "ai") {
        aiTabBtn.classList.add("active");
        adminTabBtn.classList.remove("active");
        aiView.style.display = "flex";
        adminView.style.display = "none";
        this.renderAiMessages();
      } else {
        adminTabBtn.classList.add("active");
        aiTabBtn.classList.remove("active");
        adminView.style.display = "flex";
        aiView.style.display = "none";
        this.renderAdminChatView();
      }
    }
  }

  // --- AI BOT INTELLIGENCE ENGINE ---
  sendAiMessage(customText = null) {
    const input = document.getElementById("suppAiInput");
    const text = (customText || (input ? input.value : "")).trim();
    if (!text) return;

    if (input && !customText) input.value = "";

    // Add Patron Message
    this.aiChatHistory.push({
      id: "usr-" + Date.now(),
      sender: "patron",
      text: text,
      timestamp: new Date().toISOString()
    });

    this.playLuxuryChime(480, 0.05);
    this.renderAiMessages();

    // Show Typing Indicator
    const chatBody = document.getElementById("suppAiMessagesBody");
    if (chatBody) {
      const typingEl = document.createElement("div");
      typingEl.id = "aiTypingIndicator";
      typingEl.className = "chat-bubble-row ai animate-fade-in";
      typingEl.innerHTML = `
        <div class="chat-avatar ai-avatar"><i class="fa-solid fa-gem"></i></div>
        <div class="chat-bubble ai-bubble typing-pulse">
          <span></span><span></span><span></span>
        </div>
      `;
      chatBody.appendChild(typingEl);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    setTimeout(() => {
      const typingIndicator = document.getElementById("aiTypingIndicator");
      if (typingIndicator) typingIndicator.remove();

      const aiResponse = this.processAiIntent(text);
      this.aiChatHistory.push(aiResponse);
      this.playLuxuryChime(720, 0.08);
      this.renderAiMessages();
    }, 550);
  }

  processAiIntent(query) {
    const q = query.toLowerCase();
    const contact = this.getSupportContact();

    // 1. Order Item & Full Order Cancellation
    if (q.includes("cancel") || q.includes("cancellation") || q.includes("cancel item") || q.includes("refund")) {
      return {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: `**Order & Item Cancellation Protocol:**\n\nYou have complete freedom to cancel any individual ordered piece or your complete order directly from your **"My Orders"** dashboard anytime before dispatch.\n\n• **Instant Dual Email Dispatch:** Upon cancellation, our Master Atelier Admin is immediately emailed with your patron specifics, and a cancellation confirmation receipt is delivered to your registered inbox.\n• **Automated Full Refund:** 100% full refund is credited back to your original payment mode (UPI / Cards / Net Banking) within 24 to 48 hours.\n\nWould you like to open your orders to cancel an item right now?`,
        actions: [
          {
            label: "Open My Orders & Cancel Items",
            icon: "fa-solid fa-box-open",
            onClick: "supportManager.closeSupportModal(); ordersManager.openOrdersModal();"
          },
          {
            label: "Chat Live with Master Jeweler Admin",
            icon: "fa-solid fa-user-tie",
            onClick: "supportManager.switchChatTab('admin');"
          }
        ],
        options: ["📦 Where is my package / Track order", "📜 BIS 916 Hallmark & Certifications", "📞 Contact Hotline Support"]
      };
    }

    // 2. Track Package / Delivery Window (10-12 Days)
    if (q.includes("track") || q.includes("delivery") || q.includes("where is my order") || q.includes("shipping") || q.includes("courier") || q.includes("bluedart") || q.includes("transit") || q.includes("days")) {
      return {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: `**Armored Logistics & Tracking (10 to 12 Business Days):**\n\nEvery ASMI heirloom is crafted with meticulous care and transported via **BlueDart Armored Air Logistics** inside an insulated velvet vault with serialized tamper-evident seals.\n\n• **Estimated Timeline:** 10 to 12 business days nationwide.\n• **Milestone Progression:** Track all 5 checkpoints (Order Placed ➔ BIS Hallmarking ➔ Velvet Boxing ➔ Air Transit ➔ Out for Delivery with OTP).`,
        actions: [
          {
            label: "Launch 5-Stage Package Tracker",
            icon: "fa-solid fa-route",
            onClick: "supportManager.closeSupportModal(); ordersManager.openOrdersModal();"
          }
        ],
        options: ["🚫 How do I cancel an ordered item?", "📜 BIS 916 Hallmark & Certifications", "📞 Contact Hotline Support"]
      };
    }

    // 3. Hallmark & Certification
    if (q.includes("hallmark") || q.includes("bis") || q.includes("gold") || q.includes("certificate") || q.includes("authentic") || q.includes("purity") || q.includes("22k") || q.includes("916")) {
      return {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: `**BIS 916 Hallmark & Authenticity Guarantee:**\n\n• **22K Gold Fineness:** Every gold jewel features official government laser hallmarking (BIS 916 hallmark stamp).\n• **Authentic Gemstones:** 100% natural South Sea pearls, certified Zambian & Colombian emeralds, and VVS1 sparkling stones.\n• **Physical Certificate:** Accompanied by an embossed Certificate of Authenticity with serialized QR verification in every luxury box.`,
        options: ["🚫 How do I cancel an ordered item?", "📦 Where is my package / Track order", "📏 Custom Bridal Sizing & Lengths"]
      };
    }

    // 4. Custom Sizing / Bespoke Bridal
    if (q.includes("size") || q.includes("length") || q.includes("custom") || q.includes("bridal") || q.includes("choker") || q.includes("bespoke") || q.includes("modify") || q.includes("chain")) {
      return {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: `**Bespoke Atelier Customization:**\n\nOur fourth-generation master jewelers tailor necklace lengths (14", 16", 18", 20", or 22" opera lengths), craft matching 22K gold extender chains, or customize bridal sets to match your exact wedding outfit palette.`,
        actions: [
          {
            label: "Send Customization Request to Admin",
            icon: "fa-solid fa-comments",
            onClick: "supportManager.switchChatTab('admin');"
          }
        ],
        options: ["🚫 How do I cancel an ordered item?", "📦 Where is my package / Track order", "📞 Contact Hotline Support"]
      };
    }

    // 5. Returns, Exchange & Buyback
    if (q.includes("return") || q.includes("exchange") || q.includes("buyback") || q.includes("warranty") || q.includes("care") || q.includes("cleaning")) {
      return {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: `**Lifetime Buyback & 7-Day Hassle-Free Exchange:**\n\n• **7-Day Exchange Window:** Complimentary doorstep insured pickup if you wish to exchange a piece for another design.\n• **Lifetime Buyback Guarantee:** Guaranteed lifetime trade-in and buyback on all authentic gold and certified gemstone heirlooms at prevailing market rates.\n• **Complimentary Lifetime Care:** Annual ultrasonic cleaning and setting checkups.`,
        options: ["🚫 How do I cancel an ordered item?", "💬 Chat with Master Jeweler Admin", "📞 Contact Hotline Support"]
      };
    }

    // 6. Request for Live Human / Admin / Contact Info
    if (q.includes("human") || q.includes("admin") || q.includes("live") || q.includes("agent") || q.includes("talk") || q.includes("call") || q.includes("phone") || q.includes("email") || q.includes("contact") || q.includes("speak")) {
      return {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: `**Direct Concierge & Admin Support:**\n\n${contact.aiFallbackMsg}`,
        fallbackCard: {
          phone: contact.phone,
          email: contact.email,
          whatsapp: contact.whatsapp,
          hours: contact.hours
        },
        actions: [
          {
            label: "Connect to Master Atelier Admin Live Chat",
            icon: "fa-solid fa-user-shield",
            onClick: "supportManager.switchChatTab('admin');"
          }
        ],
        options: ["🚫 How do I cancel an ordered item?", "📦 Where is my package / Track order", "📜 BIS 916 Hallmark & Certifications"]
      };
    }

    // 7. General Fallback with Configured Support Email & Phone
    return {
      id: "ai-" + Date.now(),
      sender: "ai",
      text: `To ensure your inquiry is resolved with the utmost precision, our master jeweler admin team is on standby to assist you directly:`,
      fallbackCard: {
        phone: contact.phone,
        email: contact.email,
        whatsapp: contact.whatsapp,
        hours: contact.hours
      },
      actions: [
        {
          label: "Live Chat with Master Jeweler Desk",
          icon: "fa-solid fa-comments",
          onClick: "supportManager.switchChatTab('admin');"
        }
      ],
      options: [
        "🚫 How do I cancel an ordered item?",
        "📦 Where is my package / Track order",
        "📜 BIS 916 Hallmark & Certifications",
        "📏 Custom Bridal Sizing & Lengths"
      ]
    };
  }

  renderAiMessages() {
    const chatBody = document.getElementById("suppAiMessagesBody");
    if (!chatBody) return;

    chatBody.innerHTML = this.aiChatHistory.map(msg => {
      if (msg.sender === "patron") {
        return `
          <div class="chat-bubble-row patron animate-slide-up">
            <div class="chat-bubble patron-bubble">
              <p>${this.escapeHtml(msg.text)}</p>
              <span class="chat-time">${this.formatTime(msg.timestamp)} <i class="fa-solid fa-check-double" style="font-size: 0.6rem; color: var(--gold-primary); margin-left: 2px;"></i></span>
            </div>
            <div class="chat-avatar patron-avatar"><i class="fa-solid fa-user"></i></div>
          </div>
        `;
      }

      // AI Response Bubble
      let actionsHtml = "";
      if (msg.actions && msg.actions.length > 0) {
        actionsHtml = `
          <div class="chat-action-buttons">
            ${msg.actions.map(act => `
              <button class="chat-action-btn" onclick="${act.onClick}">
                <i class="${act.icon}"></i> ${act.label}
                <i class="fa-solid fa-arrow-right" style="margin-left: auto; font-size: 0.65rem; opacity: 0.7;"></i>
              </button>
            `).join("")}
          </div>
        `;
      }

      let fallbackCardHtml = "";
      if (msg.fallbackCard) {
        const fc = msg.fallbackCard;
        fallbackCardHtml = `
          <div class="support-fallback-card">
            <div class="fallback-header">
              <div class="fallback-badge-icon"><i class="fa-solid fa-headset"></i></div>
              <div>
                <h5>Official Atelier Concierge Desk</h5>
                <p class="micro-note">${fc.hours}</p>
              </div>
            </div>
            <div class="fallback-details-grid">
              <a href="tel:${fc.phone.replace(/[^0-9+]/g, '')}" class="fallback-item">
                <div class="fallback-item-icon"><i class="fa-solid fa-phone"></i></div>
                <div style="flex: 1; min-width: 0;">
                  <span class="lbl">Hotline Phone</span>
                  <span class="val">${fc.phone}</span>
                </div>
                <span class="fallback-action-badge">Call Now</span>
              </a>
              <a href="mailto:${fc.email}" class="fallback-item">
                <div class="fallback-item-icon"><i class="fa-solid fa-envelope"></i></div>
                <div style="flex: 1; min-width: 0;">
                  <span class="lbl">Support Email</span>
                  <span class="val">${fc.email}</span>
                </div>
                <span class="fallback-action-badge">Email</span>
              </a>
              <a href="https://wa.me/${fc.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" class="fallback-item whatsapp">
                <div class="fallback-item-icon whatsapp"><i class="fa-brands fa-whatsapp"></i></div>
                <div style="flex: 1; min-width: 0;">
                  <span class="lbl">WhatsApp Concierge</span>
                  <span class="val">${fc.whatsapp}</span>
                </div>
                <span class="fallback-action-badge whatsapp">Chat</span>
              </a>
            </div>
          </div>
        `;
      }

      let chipsHtml = "";
      if (msg.options && msg.options.length > 0) {
        chipsHtml = `
          <div class="chat-chips-container">
            ${msg.options.map(opt => `
              <button class="chat-prompt-chip" onclick="supportManager.sendAiMessage('${opt.replace(/'/g, "\\'")}')">
                ${opt}
              </button>
            `).join("")}
          </div>
        `;
      }

      const formattedText = msg.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n•/g, '<br>•');

      return `
        <div class="chat-bubble-row ai animate-slide-up">
          <div class="chat-avatar ai-avatar"><i class="fa-solid fa-crown"></i></div>
          <div class="chat-bubble ai-bubble">
            <div class="ai-bubble-brand">
              <span>ASMI AI Concierge</span>
              <span class="ai-verified-pill"><i class="fa-solid fa-sparkles"></i> 24/7 Verified</span>
            </div>
            <div class="ai-bubble-content">${formattedText}</div>
            ${fallbackCardHtml}
            ${actionsHtml}
            ${chipsHtml}
            <span class="chat-time">${this.formatTime(msg.timestamp)}</span>
          </div>
        </div>
      `;
    }).join("");

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // --- LIVE ADMIN CHAT SYSTEM ---
  getCurrentPatronInfo() {
    let name = "Royal Patron";
    let email = "patron@asmijewelry.com";
    let phone = "+91 98765 00000";
    let patronId = null;

    if (window.patronManager && window.patronManager.currentPatron) {
      const p = window.patronManager.currentPatron;
      name = p.name || p.fullName || name;
      email = p.email || email;
      phone = p.phone || phone;
      patronId = p.id || null;
    } else {
      try {
        const stored = localStorage.getItem("asmi_patron_profile");
        if (stored) {
          const p = JSON.parse(stored);
          if (p.email) {
            name = p.name || name;
            email = p.email;
            phone = p.phone || phone;
          }
        }
      } catch(e) {}
    }

    return { name, email, phone, patronId };
  }

  getPatronActiveThread() {
    const patron = this.getCurrentPatronInfo();
    return this.chats.find(c => c.patronEmail.toLowerCase() === patron.email.toLowerCase()) || null;
  }

  renderAdminChatView() {
    const container = document.getElementById("suppAdminMessagesContainer");
    if (!container) return;

    const patron = this.getCurrentPatronInfo();
    let thread = this.getPatronActiveThread();

    if (!thread) {
      container.innerHTML = `
        <div class="admin-chat-start-view animate-fade-in">
          <div class="admin-chat-badge">
            <i class="fa-solid fa-shield-halved gold-icon"></i>
            <span>Verified Atelier Admin Channel</span>
          </div>
          <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin: 0.85rem 0 0.35rem;">
            Direct Dialogue with Master Jewelers
          </h4>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.55;">
            Send direct inquiries regarding bespoke bridal pieces, necklace length adjustments, and order cancellations. Our master jeweler admin team responds promptly.
          </p>

          <form id="startAdminThreadForm" onsubmit="event.preventDefault(); supportManager.startNewAdminThread();" class="admin-thread-form">
            <div class="form-group-row">
              <div class="form-group-col">
                <label>Your Full Name *</label>
                <input type="text" id="adminChatName" required value="${this.escapeHtml(patron.name !== 'Royal Patron' ? patron.name : '')}" placeholder="e.g., Ananya Sharma" class="modal-input" />
              </div>
              <div class="form-group-col">
                <label>Registered Email *</label>
                <input type="email" id="adminChatEmail" required value="${this.escapeHtml(patron.email !== 'patron@asmijewelry.com' ? patron.email : '')}" placeholder="e.g., ananya@gmail.com" class="modal-input" />
              </div>
            </div>
            <div class="form-group-col" style="margin-top: 0.75rem;">
              <label>Phone / WhatsApp Number (Optional)</label>
              <input type="tel" id="adminChatPhone" value="${this.escapeHtml(patron.phone !== '+91 98765 00000' ? patron.phone : '')}" placeholder="+91 98765 43210" class="modal-input" />
            </div>
            <div class="form-group-col" style="margin-top: 0.75rem;">
              <label>Inquiry Details / Message *</label>
              <textarea id="adminChatFirstMsg" required rows="3" placeholder="Describe your request regarding custom pieces, item cancellations, or certificates..." class="modal-input"></textarea>
            </div>
            <button type="submit" class="btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.85rem;">
              <i class="fa-solid fa-paper-plane" style="margin-right: 0.4rem;"></i> Start Conversation with Atelier Admin
            </button>
          </form>
        </div>
      `;
      return;
    }

    // Render Active Thread
    const messagesHtml = thread.messages.map(m => {
      const isPatron = m.sender === "patron";
      return `
        <div class="chat-bubble-row ${isPatron ? 'patron' : 'admin'} animate-slide-up">
          ${!isPatron ? `<div class="chat-avatar admin-avatar"><i class="fa-solid fa-crown"></i></div>` : ''}
          <div class="chat-bubble ${isPatron ? 'patron-bubble' : 'admin-bubble'}">
            <div class="chat-sender-name">${this.escapeHtml(m.senderName || (isPatron ? thread.patronName : 'Master Atelier Admin'))}</div>
            <p>${this.escapeHtml(m.text)}</p>
            <span class="chat-time">${m.formattedTime || this.formatTime(m.timestamp)}</span>
          </div>
          ${isPatron ? `<div class="chat-avatar patron-avatar"><i class="fa-solid fa-user"></i></div>` : ''}
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="admin-thread-header">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span class="status-indicator-dot online"></span>
          <div>
            <h5 style="margin: 0; font-size: 0.875rem; color: var(--text-primary); font-family: var(--font-serif);">${this.escapeHtml(thread.subject || 'Atelier Master Support')}</h5>
            <span class="micro-note" style="color: var(--gold-primary);">Ticket #${thread.id} • ${thread.status === 'active' ? 'Active Dialogue' : 'Resolved'}</span>
          </div>
        </div>
        <button class="btn-secondary micro-btn" onclick="supportManager.closeSupportModal(); ordersManager.openOrdersModal();">
          <i class="fa-solid fa-box"></i> View Orders
        </button>
      </div>

      <div class="admin-thread-messages-body" id="adminThreadScrollBody">
        ${messagesHtml}
      </div>

      <div class="admin-thread-composer">
        <input type="text" id="adminReplyInput" placeholder="Reply to Master Atelier Admin..." class="modal-input" onkeydown="if(event.key === 'Enter') supportManager.sendAdminReply();" />
        <button class="btn-primary composer-send-btn" onclick="supportManager.sendAdminReply();">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    `;

    const scrollBody = document.getElementById("adminThreadScrollBody");
    if (scrollBody) scrollBody.scrollTop = scrollBody.scrollHeight;
  }

  async startNewAdminThread() {
    const nameEl = document.getElementById("adminChatName");
    const emailEl = document.getElementById("adminChatEmail");
    const phoneEl = document.getElementById("adminChatPhone");
    const msgEl = document.getElementById("adminChatFirstMsg");

    if (!nameEl || !emailEl || !msgEl) return;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl ? phoneEl.value.trim() : "";
    const msg = msgEl.value.trim();

    if (!name || !email || !msg) {
      alert("Please fill in your name, email, and inquiry.");
      return;
    }

    const newThread = {
      id: "chat-" + Date.now(),
      patronName: name,
      patronEmail: email,
      patronPhone: phone,
      patronTier: "Privileged Patron",
      subject: "Patron Inquiry: " + msg.substring(0, 45) + (msg.length > 45 ? "..." : ""),
      status: "active",
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: [
        {
          id: "msg-" + Date.now(),
          sender: "patron",
          senderName: name,
          text: msg,
          timestamp: new Date().toISOString(),
          formattedTime: this.formatTime(new Date())
        }
      ]
    };

    this.chats.unshift(newThread);
    this.saveChats();
    this.playLuxuryChime(580, 0.08);

    // Sync with backend API
    try {
      const endpoint = (window.asmiSync && typeof window.asmiSync.getApiUrl === "function")
        ? window.asmiSync.getApiUrl("support-chats")
        : ((typeof asmi_wp_data !== "undefined" && asmi_wp_data.restUrl)
          ? asmi_wp_data.restUrl.replace(/\/+$/, "") + "/asmi/v1/support-chats"
          : "/api/support-chats");
      const headers = (window.asmiSync && typeof window.asmiSync.getHeaders === "function")
        ? window.asmiSync.getHeaders(true)
        : { "Content-Type": "application/json" };

      await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newThread)
      });
    } catch(e) {
      console.warn("Backend chat sync:", e);
    }

    // Auto simulated acknowledgment if first time
    setTimeout(() => {
      const t = this.chats.find(c => c.id === newThread.id);
      if (t && t.messages.length === 1) {
        t.messages.push({
          id: "msg-ack-" + Date.now(),
          sender: "admin",
          senderName: "Master Atelier Jeweler (Admin)",
          text: `Namaste ${name}. Your message has been received by our Master Atelier desk. An artisan is reviewing your inquiry and will reply shortly.`,
          timestamp: new Date().toISOString(),
          formattedTime: this.formatTime(new Date())
        });
        this.saveChats();
        this.playLuxuryChime(720, 0.08);
        this.renderAdminChatView();
      }
    }, 1200);

    this.renderAdminChatView();
  }

  async sendAdminReply() {
    const input = document.getElementById("adminReplyInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    const thread = this.getPatronActiveThread();
    if (!thread) return;

    const newMsg = {
      id: "msg-" + Date.now(),
      sender: "patron",
      senderName: thread.patronName,
      text: text,
      timestamp: new Date().toISOString(),
      formattedTime: this.formatTime(new Date())
    };

    thread.messages.push(newMsg);
    thread.lastUpdated = new Date().toISOString();
    this.saveChats();
    this.playLuxuryChime(480, 0.05);

    // Backend sync
    try {
      const endpoint = (window.asmiSync && typeof window.asmiSync.getApiUrl === "function")
        ? window.asmiSync.getApiUrl("support-chats/reply")
        : ((typeof asmi_wp_data !== "undefined" && asmi_wp_data.restUrl)
          ? asmi_wp_data.restUrl.replace(/\/+$/, "") + "/asmi/v1/support-chats/reply"
          : "/api/support-chats/reply");
      const headers = (window.asmiSync && typeof window.asmiSync.getHeaders === "function")
        ? window.asmiSync.getHeaders(true)
        : { "Content-Type": "application/json" };

      await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          chatId: thread.id,
          message: newMsg
        })
      });
    } catch(e) {}

    this.renderAdminChatView();
  }

  startLivePolling() {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
    this.pollingInterval = setInterval(async () => {
      // FIREWALL & PERFORMANCE SAFEGUARD:
      // Only poll when the support modal is actively displayed and the user is on the admin tab
      const modal = document.getElementById("asmiSupportModal");
      if (!modal || !modal.classList.contains("active")) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
        return;
      }
      if (this.activeTab === "admin") {
        try {
          const endpoint = (window.asmiSync && typeof window.asmiSync.getApiUrl === "function")
            ? window.asmiSync.getApiUrl("support-chats")
            : ((typeof asmi_wp_data !== "undefined" && asmi_wp_data.restUrl)
              ? asmi_wp_data.restUrl.replace(/\/+$/, "") + "/asmi/v1/support-chats"
              : null);
          if (!endpoint) return;
          const headers = (window.asmiSync && typeof window.asmiSync.getHeaders === "function")
            ? window.asmiSync.getHeaders(false)
            : { "Accept": "application/json" };
          const res = await fetch(endpoint, { headers });
          if (!res.ok) return;
          const json = await res.json();
          const chatList = Array.isArray(json) ? json : (json && Array.isArray(json.data) ? json.data : null);
          if (Array.isArray(chatList)) {
            const oldLen = this.chats.reduce((acc, c) => acc + (c.messages?.length || 0), 0);
            this.chats = chatList;
            this.saveChats();
            const newLen = this.chats.reduce((acc, c) => acc + (c.messages?.length || 0), 0);
            if (newLen > oldLen) {
              this.playLuxuryChime(760, 0.08);
            }
            this.renderAdminChatView();
          }
        } catch(e) {}
      }
    }, 12000);
  }

  formatTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

// Global instance
const supportManager = new SupportManager();
window.supportManager = supportManager;
