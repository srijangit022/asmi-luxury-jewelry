/**
 * ASMI - My Orders & 10-12 Days Package Tracking Module
 * Real-time 5-stage shipment milestones, dynamic delivery window calculations, and order persistence
 */

const DEFAULT_ORDERS = [
  {
    "orderNumber": "ASM-2026-520702",
    "authCode": "RZP-pay_TkYxxclQH8qvci",
    "paymentId": "pay_TkYxxclQH8qvci",
    "trackingId": "ASMI-BD-514018-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Cancelled",
    "currentStepIndex": 0,
    "placedTimestamp": 1791276719038,
    "dateStr": "October 6, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Razorpay Secure Gateway (CARD · pay_TkYxxclQH8qvci)",
    "items": [
      {
        "id": "asmi-em-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard",
        "cancelled": true,
        "status": "Cancelled",
        "cancelledAt": "2026-10-06T08:52:50.183Z",
        "cancellationReason": "Selected incorrect necklace length or gold finish",
        "cancelReason": "Changed mind regarding size, will order choker instead"
      }
    ],
    "calculations": {
      "subtotal": 4899,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 147,
      "finalTotal": 5046
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001",
    "isCancelled": true,
    "cancelled": true,
    "cancelReason": "Changed mind regarding size, will order choker instead",
    "cancelNotes": "Testing cancellation flow",
    "cancelledAt": "2026-10-06T10:14:12.043Z"
  },
  {
    "orderNumber": "ASM-2026-628909",
    "authCode": "RZP-RZP_SIM_1790968905234",
    "paymentId": "RZP_SIM_1790968905234",
    "trackingId": "ASMI-BD-911690-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790968908193,
    "dateStr": "October 3, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-pr-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 5899,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 177,
      "finalTotal": 6076
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001"
  },
  {
    "orderNumber": "ASM-2026-544882",
    "authCode": "RZP-RZP_SIM_1790968872702",
    "paymentId": "RZP_SIM_1790968872702",
    "trackingId": "ASMI-BD-529259-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790968875660,
    "dateStr": "October 3, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-em-001",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 8999,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 270,
      "finalTotal": 9269
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001"
  },
  {
    "orderNumber": "ASM-2026-425408",
    "authCode": "RZP-RZP_SIM_1790968557931",
    "paymentId": "RZP_SIM_1790968557931",
    "trackingId": "ASMI-BD-744788-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790968560890,
    "dateStr": "October 3, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-pr-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 5899,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 177,
      "finalTotal": 6076
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001"
  },
  {
    "orderNumber": "ASM-2026-496632",
    "authCode": "RZP-RZP_SIM_1790968462466",
    "paymentId": "RZP_SIM_1790968462466",
    "trackingId": "ASMI-BD-918664-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790968465423,
    "dateStr": "October 3, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-pr-001",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 6499,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 195,
      "finalTotal": 6694
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001"
  },
  {
    "orderNumber": "ASM-2026-797511",
    "authCode": "RZP-RZP_SIM_1790968235277",
    "paymentId": "RZP_SIM_1790968235277",
    "trackingId": "ASMI-BD-669370-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790968238239,
    "dateStr": "October 3, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-pl-001",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 7999,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 240,
      "finalTotal": 8239
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001"
  },
  {
    "orderNumber": "ASM-2026-240922",
    "authCode": "RZP-RZP_SIM_1790967405822",
    "paymentId": "RZP_SIM_1790967405822",
    "trackingId": "ASMI-BD-203339-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790967408782,
    "dateStr": "October 3, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "customerPhone": "+91 98200 12345",
    "city": "Mumbai",
    "shippingAddress": {
      "id": "addr_1790871561305",
      "tag": "Primary Residence",
      "recipientName": "Patron asmi",
      "phone": "+91 98200 12345",
      "street": "402, Sea Face Promenade, Marine Lines",
      "landmark": "Near Gateway Grand Promenade",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400020",
      "isDefault": true
    },
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-pr-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 5899,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 177,
      "finalTotal": 6076
    },
    "currency": "INR",
    "patronId": "patron_1790871561302",
    "patronMemberId": "ASMI-VIP-2001"
  },
  {
    "orderNumber": "ASM-2026-721059",
    "authCode": "BIS-916-Z80VF0",
    "trackingId": "ASMI-BD-285419-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790961124837,
    "dateStr": "October 2, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "city": "Mumbai",
    "gateway": "Instant UPI (Google Pay)",
    "items": [
      {
        "id": "asmi-pr-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 5899,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 177,
      "finalTotal": 6076
    }
  },
  {
    "orderNumber": "ASM-2026-280196",
    "authCode": "BIS-916-N8WU03",
    "trackingId": "ASMI-BD-634262-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790960537706,
    "dateStr": "October 2, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "city": "Mumbai",
    "gateway": "Instant UPI (PhonePe)",
    "items": [
      {
        "id": "asmi-pl-001",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 7999,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 240,
      "finalTotal": 8239
    }
  },
  {
    "orderNumber": "ASM-2026-157985",
    "authCode": "BIS-916-7RMO29",
    "trackingId": "ASMI-BD-643323-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790871593686,
    "dateStr": "October 1, 2026",
    "customerName": "Patron asmi",
    "customerEmail": "patron.asmi@gmail.com",
    "city": "Mumbai",
    "gateway": "UPI QR (Instant Verified)",
    "items": [
      {
        "id": "asmi-pr-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      },
      {
        "id": "asmi-pr-003",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 5799,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 174,
      "finalTotal": 5973
    }
  },
  {
    "orderNumber": "ASM-2026-112799",
    "authCode": "BIS-916-V67K5T",
    "trackingId": "ASMI-BD-319061-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
    "statusBadge": "Order Confirmed",
    "currentStepIndex": 1,
    "placedTimestamp": 1790868878448,
    "dateStr": "October 1, 2026",
    "customerName": "Aaryahi Roy",
    "customerEmail": "aaryahi.roy@luxury.com",
    "city": "Mumbai",
    "gateway": "UPI QR (Instant Verified)",
    "items": [
      {
        "id": "asmi-em-002",
        "quantity": 1,
        "selectedFinish": "Champagne Gold (22K)",
        "selectedSize": "Standard"
      }
    ],
    "calculations": {
      "subtotal": 4899,
      "discount": 0,
      "giftWrapFee": 0,
      "shippingFee": 0,
      "taxGST": 147,
      "finalTotal": 5046
    }
  },
  {
    "orderNumber": "ASM-2026-784109",
    "authCode": "BIS-916-PRL841",
    "trackingId": "ASMI-BD-894021-IN",
    "courier": "BlueDart Armored Express Logistics (Air Transit)",
    "currentLocation": "Mumbai International Airport Air Cargo Vault, Gate 4",
    "statusBadge": "Order Cancelled",
    "currentStepIndex": 0,
    "placedTimestamp": 1790670631287,
    "dateStr": "14 Sep 2026",
    "customerName": "Aaryahi Roy",
    "customerEmail": "aaryahi.roy@luxury.com",
    "city": "Mumbai, Maharashtra",
    "gateway": "UPI QR (Instant Verified)",
    "items": [
      {
        "id": "asmi-pr-001",
        "quantity": 1,
        "selectedFinish": "22K Champagne Gold",
        "selectedSize": "16\" Choker",
        "status": "Cancelled",
        "cancelled": true,
        "cancelReason": "Selected incorrect size / test"
      }
    ],
    "calculations": {
      "subtotal": 6499,
      "discount": 0,
      "taxGST": 195,
      "shippingFee": 0,
      "giftWrapFee": 150,
      "finalTotal": 6844
    },
    "cancelled": true,
    "cancelReason": "Selected incorrect size / test",
    "cancelNotes": "Requested exchange length",
    "cancelledAt": "2026-10-06T08:44:16.536Z"
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_ORDERS = DEFAULT_ORDERS;
}

class OrdersManager {
  constructor() {
    this.orders = this.loadOrders();
    this.activeTrackingOrder = null;
    if (typeof window !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.initMouseWheelScroll());
      } else {
        setTimeout(() => this.initMouseWheelScroll(), 50);
      }
    }
  }

  loadOrders() {
    if (typeof asmi_wp_data !== "undefined" && asmi_wp_data.preloaded && Array.isArray(asmi_wp_data.preloaded.orders) && asmi_wp_data.preloaded.orders.length > 0) {
      return asmi_wp_data.preloaded.orders;
    }
    try {
      const saved = localStorage.getItem("asmi_orders_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load orders from localStorage", e);
    }
    return [...DEFAULT_ORDERS];
  }

  saveOrders() {
    if (window.asmiSync) {
      window.asmiSync.save("orders", this.orders);
    } else {
      try {
        localStorage.setItem("asmi_orders_data", JSON.stringify(this.orders));
      } catch (e) {
        console.warn("Could not save orders to localStorage", e);
      }
    }
  }

  addOrder(orderData) {
    const timestamp = Date.now();
    const trackingId = `ASMI-BD-${Math.floor(100000 + Math.random() * 900000)}-IN`;
    
    const newOrder = {
      orderNumber: orderData.orderNumber,
      authCode: orderData.authCode,
      paymentId: orderData.paymentId || orderData.authCode,
      trackingId: trackingId,
      courier: "BlueDart Armored Express Logistics (Air Transit)",
      currentLocation: "ASMI Flagship Atelier & Vault, Colaba, Mumbai",
      statusBadge: "Order Confirmed",
      currentStepIndex: 1, // Step 1: Order Confirmed
      placedTimestamp: timestamp,
      dateStr: orderData.dateStr || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone || orderData.shippingAddress?.phone || "",
      city: orderData.city,
      shippingAddress: orderData.shippingAddress || null,
      gateway: orderData.gateway,
      items: orderData.items,
      calculations: orderData.calculations,
      currency: orderData.currency || "INR",
      patronId: orderData.patronId || null,
      patronMemberId: orderData.patronMemberId || "ASMI-VIP-9160"
    };

    this.orders.unshift(newOrder);
    this.saveOrders();

    // Trigger immediate order notification email dispatch
    try {
      const emailEndpoint = (window.asmiSync && typeof window.asmiSync.getApiUrl === "function")
        ? window.asmiSync.getApiUrl("send-order-email")
        : ((typeof asmi_wp_data !== "undefined" && asmi_wp_data.restUrl)
          ? asmi_wp_data.restUrl.replace(/\/+$/, "") + "/asmi/v1/send-order-email"
          : "/wp-json/asmi/v1/send-order-email");
      const emailHeaders = (window.asmiSync && typeof window.asmiSync.getHeaders === "function")
        ? window.asmiSync.getHeaders()
        : { "Content-Type": "application/json" };

      fetch(emailEndpoint, {
        method: "POST",
        headers: emailHeaders,
        body: JSON.stringify({ order: newOrder, isTest: false })
      }).then(r => r.json()).then(res => {
        if (res && res.success) {
          console.log("[ASMI Orders] Order alert email dispatched to registered merchant mailbox.");
        }
      }).catch(err => {
        console.warn("[ASMI Orders] Email notification async queue:", err);
      });
    } catch(e) {}

    return newOrder;
  }

  getDeliveryDates(placedTimestamp) {
    const baseDate = new Date(placedTimestamp || Date.now());
    const minDelivery = new Date(baseDate);
    minDelivery.setDate(baseDate.getDate() + 10);

    const maxDelivery = new Date(baseDate);
    maxDelivery.setDate(baseDate.getDate() + 12);

    const options = { day: "numeric", month: "short", year: "numeric" };
    return {
      minDateStr: minDelivery.toLocaleDateString("en-IN", options),
      maxDateStr: maxDelivery.toLocaleDateString("en-IN", options),
      spanLabel: "10 to 12 Business Days"
    };
  }

  getMilestones(order) {
    const delivery = this.getDeliveryDates(order.placedTimestamp);
    const placedDate = new Date(order.placedTimestamp);

    const d1 = new Date(placedDate);
    const d2 = new Date(placedDate); d2.setDate(placedDate.getDate() + 2);
    const d3 = new Date(placedDate); d3.setDate(placedDate.getDate() + 4);
    const d4 = new Date(placedDate); d4.setDate(placedDate.getDate() + 7);
    const d5 = new Date(placedDate); d5.setDate(placedDate.getDate() + 11);

    const fmt = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

    const stepIndex = order.currentStepIndex || 1;

    return [
      {
        step: 1,
        title: "Order Placed & Payment Confirmed",
        description: `Payment received via ${order.gateway}. Order recorded into master atelier register.`,
        date: fmt(d1),
        status: stepIndex >= 1 ? (stepIndex === 1 ? "current" : "completed") : "pending",
        icon: "fa-solid fa-receipt"
      },
      {
        step: 2,
        title: "Atelier Crafting & BIS Hallmark Certification",
        description: "Master jewelers inspect stone settings, pearl lustre, and issue the BIS 916 authenticity certificate.",
        date: fmt(d2),
        status: stepIndex >= 2 ? (stepIndex === 2 ? "current" : "completed") : "pending",
        icon: "fa-solid fa-certificate"
      },
      {
        step: 3,
        title: "Armored Velvet Boxing & Tamper-Proof Seal",
        description: "Jewelry secured in an insulated velvet case with serialized holographic security seal.",
        date: fmt(d3),
        status: stepIndex >= 3 ? (stepIndex === 3 ? "current" : "completed") : "pending",
        icon: "fa-solid fa-box-open"
      },
      {
        step: 4,
        title: "In Transit with BlueDart Armored Logistics",
        description: `Package en route via armored air transit. Current checkpoint: ${order.currentLocation}.`,
        date: fmt(d4),
        status: stepIndex >= 4 ? (stepIndex === 4 ? "current" : "completed") : "pending",
        icon: "fa-solid fa-plane-departure"
      },
      {
        step: 5,
        title: "Out for Delivery & Package Received",
        description: `Expected delivery within 10-12 days (${delivery.minDateStr} - ${delivery.maxDateStr}) with secure OTP verification.`,
        date: `${fmt(d5)} (Expected)`,
        status: stepIndex >= 5 ? "completed" : "pending",
        icon: "fa-solid fa-house-chimney-check"
      }
    ];
  }


  initMouseWheelScroll() {
    const normalizeDelta = (e) => {
      let delta = e.deltaY;
      if (e.deltaMode === 1) { // Line mode on Windows standard mouse wheel
        delta = e.deltaY * 40; // 3 lines * 40 = 120px standard notch
      } else if (e.deltaMode === 2) { // Page mode
        delta = e.deltaY * 500;
      }
      return delta;
    };

    const bindWheel = (backdropId, getTargetEl) => {
      const backdrop = document.getElementById(backdropId);
      if (!backdrop) return;
      if (backdrop._wheelBound || (backdrop.dataset && backdrop.dataset.wheelBound === "true")) return;
      backdrop._wheelBound = true;
      if (backdrop.dataset) backdrop.dataset.wheelBound = "true";

      backdrop.addEventListener("wheel", (e) => {
        if (!backdrop.classList.contains("active")) return;
        const target = getTargetEl();
        if (target) {
          if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
            const delta = normalizeDelta(e);
            target.scrollTop += delta;
            e.preventDefault();
          }
        }
      }, { passive: false });
    };

    bindWheel("ordersModalBackdrop", () => document.getElementById("ordersListContainer"));
    bindWheel("trackerModalBackdrop", () => {
      const b = document.getElementById("trackerModalBackdrop");
      return b ? (document.getElementById("trackerModalScrollContainer") || b.querySelector(".orders-modal-container > div:last-child")) : null;
    });
    bindWheel("orderCancelModalBackdrop", () => {
      const b = document.getElementById("orderCancelModalBackdrop");
      return b ? b.querySelector(".orders-modal-container > div:last-child") : null;
    });
  }

  openOrdersModal(targetOrderNumber = null) {
    this.initMouseWheelScroll();
    const modal = document.getElementById("ordersModalBackdrop");
    if (!modal) return;

    this.renderOrdersList();
    modal.classList.add("active");

    if (targetOrderNumber) {
      this.openPackageTracker(targetOrderNumber);
    }
  }

  closeOrdersModal() {
    const modal = document.getElementById("ordersModalBackdrop");
    if (modal) modal.classList.remove("active");
  }

  openCancelItemModal(orderNumber, itemId, itemIndex) {
    const order = this.orders.find(o => o.orderNumber === orderNumber);
    if (!order) return;
    const item = order.items[itemIndex] || order.items.find(i => i.id === itemId);
    if (!item) return;

    let prod = null;
    if (typeof PRODUCTS_DATA !== "undefined") {
      prod = PRODUCTS_DATA.find(p => p.id === item.id);
    }
    const name = prod ? prod.name : "ASMI Fine Jewelry";
    const rawImg = prod ? prod.image : "assets/images/pearl-necklace.jpg";
    const img = typeof resolveAssetUrl === 'function' ? resolveAssetUrl(rawImg) : rawImg;

    const modal = document.getElementById("orderCancelModalBackdrop");
    if (!modal) return;

    const summaryEl = document.getElementById("cancelItemSummary");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.85rem; padding: 0.85rem; background: var(--bg-surface-2); border: 1px solid var(--border-hairline); border-radius: 6px; margin-bottom: 1rem;">
          <img src="${img}" alt="${name}" style="width: 52px; height: 52px; object-fit: contain; background: var(--bg-plinth); border: 1px solid var(--border-color); padding: 2px;" />
          <div>
            <p style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.2rem;">${name}</p>
            <p class="label-micro" style="color: var(--gold-primary);">${item.selectedFinish} | Qty: ${item.quantity}</p>
            <p style="font-size: 0.725rem; color: var(--text-muted); margin-top: 0.2rem;">Order #${order.orderNumber} • Registered to ${order.customerEmail || 'Patron'}</p>
          </div>
        </div>
      `;
    }

    const orderNumInput = document.getElementById("cancelModalOrderNumber");
    const itemIdInput = document.getElementById("cancelModalItemId");
    const itemIdxInput = document.getElementById("cancelModalItemIndex");

    if (orderNumInput) orderNumInput.value = orderNumber;
    if (itemIdInput) itemIdInput.value = itemId;
    if (itemIdxInput) itemIdxInput.value = itemIndex;

    modal.classList.add("active");
  }

  closeCancelItemModal() {
    const modal = document.getElementById("orderCancelModalBackdrop");
    if (modal) modal.classList.remove("active");
  }

  async submitCancelItem(e) {
    if (e && e.preventDefault) e.preventDefault();

    const orderNumber = document.getElementById("cancelModalOrderNumber")?.value;
    const itemId = document.getElementById("cancelModalItemId")?.value;
    const itemIndex = parseInt(document.getElementById("cancelModalItemIndex")?.value || "0", 10);
    const reasonSelect = document.getElementById("cancelReasonSelect");
    const notesInput = document.getElementById("cancelReasonNotes");

    const reason = reasonSelect ? reasonSelect.value : "Customer Request";
    const notes = notesInput ? notesInput.value.trim() : "";

    const order = this.orders.find(o => o.orderNumber === orderNumber);
    if (!order) {
      alert("Order not found.");
      return;
    }

    const item = order.items[itemIndex];
    if (!item) {
      alert("Item not found in order.");
      return;
    }

    // Mark item as cancelled
    item.cancelled = true;
    item.status = "Cancelled";
    item.cancelledAt = new Date().toISOString();
    item.cancellationReason = reason + (notes ? ` (${notes})` : "");

    // Check if all items are cancelled
    const allCancelled = order.items.every(i => i.cancelled === true || i.status === "Cancelled");
    if (allCancelled) {
      order.statusBadge = "Cancelled";
      order.isCancelled = true;
    }

    this.saveOrders();
    this.renderOrdersList();
    this.closeCancelItemModal();

    // Call backend API to dispatch admin and patron cancellation emails
    try {
      const endpoint = (window.asmiSync && typeof window.asmiSync.getApiUrl === "function")
        ? window.asmiSync.getApiUrl("cancel-order-item")
        : ((typeof asmi_wp_data !== "undefined" && asmi_wp_data.restUrl)
          ? asmi_wp_data.restUrl.replace(/\/+$/, "") + "/asmi/v1/cancel-order-item"
          : "/wp-json/asmi/v1/cancel-order-item");
      const headers = (window.asmiSync && typeof window.asmiSync.getHeaders === "function")
        ? window.asmiSync.getHeaders()
        : { "Content-Type": "application/json" };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          itemId: item.id,
          itemIndex: itemIndex,
          reason: item.cancellationReason,
          notes: notes,
          patronEmail: order.customerEmail,
          patronName: order.customerName,
          order: order
        })
      });

      const data = await res.json();
      console.log("[ASMI Cancellation] Result:", data);
    } catch(err) {
      console.warn("[ASMI Cancellation] Backend dispatch notify:", err);
    }

    alert(`Item cancellation confirmed!\n\n• An alert email with all your patron details has been dispatched to the Master Atelier Admin.\n• A cancellation confirmation receipt has been sent to your registered email: ${order.customerEmail}.`);
  }

  renderOrdersList() {
    const listContainer = document.getElementById("ordersListContainer");
    if (!listContainer) return;

    if (this.orders.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
          <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--gold-primary); margin-bottom: 1rem; opacity: 0.6;"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.5rem;">No Orders Yet</h3>
          <p style="color: var(--text-muted); font-size: 0.8125rem; margin-bottom: 1.5rem;">Explore our curated collection of fine pearls and emerald heirlooms.</p>
          <button class="btn-primary" onclick="ordersManager.closeOrdersModal(); document.getElementById('vaultSection').scrollIntoView({behavior: 'smooth'});">
            Explore Vault Collection
          </button>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = this.orders.map(order => {
      const delivery = this.getDeliveryDates(order.placedTimestamp);
      const isOrderCancelled = order.statusBadge === "Cancelled" || order.isCancelled === true;
      
      let itemsHtml = "";
      order.items.forEach((it, index) => {
        let prod = null;
        if (typeof PRODUCTS_DATA !== "undefined") {
          prod = PRODUCTS_DATA.find(p => p.id === it.id);
        }
        const rawImg = prod ? prod.image : "assets/images/pearl-necklace.jpg";
        const img = typeof resolveAssetUrl === 'function' ? resolveAssetUrl(rawImg) : rawImg;
        const name = prod ? prod.name : "ASMI Haute Joaillerie";
        const isItemCancelled = it.cancelled === true || it.status === "Cancelled" || isOrderCancelled;

        itemsHtml += `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-top: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px dashed var(--border-hairline);">
            <div style="display: flex; align-items: center; gap: 0.75rem; min-width: 0;">
              <img src="${img}" alt="${name}" style="width: 50px; height: 50px; object-fit: contain; background: var(--bg-plinth); border: 1px solid var(--border-color); padding: 2px; border-radius: 4px; ${isItemCancelled ? 'filter: grayscale(80%); opacity: 0.7;' : ''}" />
              <div style="min-width: 0;">
                <p style="font-size: 0.8125rem; font-weight: 600; color: ${isItemCancelled ? 'var(--text-muted)' : 'var(--text-primary)'}; ${isItemCancelled ? 'text-decoration: line-through;' : ''}">
                  ${name}
                </p>
                <p class="label-micro" style="color: var(--gold-primary);">
                  ${it.selectedFinish} | Qty: ${it.quantity}
                </p>
                ${isItemCancelled && it.cancellationReason ? `
                  <p style="font-size: 0.7rem; color: #ef4444; margin-top: 0.2rem;">
                    <i class="fa-solid fa-ban"></i> Cancelled: ${it.cancellationReason}
                  </p>
                ` : ''}
              </div>
            </div>

            <div>
              ${isItemCancelled ? `
                <span class="order-item-badge-cancelled">
                  <i class="fa-solid fa-ban"></i> Cancelled
                </span>
              ` : `
                <button type="button" class="btn-cancel-item" onclick="ordersManager.openCancelItemModal('${order.orderNumber}', '${it.id}', ${index})" title="Cancel this item and notify admin/patron">
                  <i class="fa-solid fa-xmark"></i> Cancel Item
                </button>
              `}
            </div>
          </div>
        `;
      });

      return `
        <div class="order-card-box ${isOrderCancelled ? 'order-box-cancelled' : ''}">
          <div class="order-card-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="label-micro" style="color: var(--text-muted);">Order ID:</span>
                <span style="font-family: monospace; font-size: 0.875rem; font-weight: 700; color: var(--gold-primary);">${order.orderNumber}</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted);">
                Placed on ${order.dateStr} • ${order.city || 'India'}
              </p>
            </div>

            <div style="text-align: right;">
              <span class="order-status-pill ${isOrderCancelled ? 'status-cancelled' : (order.currentStepIndex >= 4 ? 'status-transit' : 'status-confirmed')}">
                <i class="fa-solid ${isOrderCancelled ? 'fa-ban' : 'fa-circle-dot'}"></i> ${isOrderCancelled ? 'Cancelled' : order.statusBadge}
              </span>
              <p style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--gold-primary); margin-top: 0.25rem;">
                ${(typeof formatPrice === 'function' ? formatPrice(order.calculations?.finalTotal || 0) : ('₹' + (order.calculations?.finalTotal || 0).toLocaleString('en-IN')))}
              </p>
            </div>
          </div>

          <!-- Items row with individual cancellation controls -->
          <div style="padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--border-hairline);">
            ${itemsHtml}
          </div>

          <!-- Delivery Window Banner (10-12 days) or Cancelled notice -->
          ${isOrderCancelled ? `
            <div class="order-cancelled-banner">
              <i class="fa-solid fa-shield-heart" style="color: #ef4444;"></i>
              <div style="flex: 1;">
                <p style="font-size: 0.75rem; font-weight: 600; color: #ef4444;">Order Items Cancelled & Refund Initiated</p>
                <p style="font-size: 0.7rem; color: var(--text-muted);">Cancellation receipt delivered to registered patron email. Admin notified.</p>
              </div>
              <button class="btn-secondary micro-btn" onclick="supportManager.openSupportModal('admin');">
                <i class="fa-solid fa-headset"></i> Support
              </button>
            </div>
          ` : `
            <div class="order-delivery-banner">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <i class="fa-solid fa-truck-fast" style="color: var(--gold-primary); font-size: 1rem;"></i>
                <div>
                  <p style="font-size: 0.75rem; font-weight: 600; color: var(--text-primary);">
                    Estimated Delivery Window (10 to 12 Days)
                  </p>
                  <p style="font-size: 0.7rem; color: var(--gold-primary); font-weight: 500;">
                    ${delivery.minDateStr} – ${delivery.maxDateStr}
                  </p>
                </div>
              </div>

              <span class="label-micro" style="color: var(--text-muted);">
                Carrier: BlueDart Armored Air
              </span>
            </div>
          `}

          <!-- Actions -->
          <div class="order-card-actions">
            ${!isOrderCancelled ? `
              <button class="btn-primary" style="padding: 0.55rem 1.15rem; font-size: 0.6875rem;" onclick="ordersManager.openPackageTracker('${order.orderNumber}')">
                <i class="fa-solid fa-route" style="margin-right: 0.35rem;"></i> Track Package (5 Steps)
              </button>
            ` : ''}
            <button class="btn-secondary" style="padding: 0.55rem 1.15rem; font-size: 0.6875rem;" onclick="supportManager.openSupportModal('ai')">
              <i class="fa-solid fa-comments" style="margin-right: 0.35rem;"></i> Need Help / Concierge
            </button>
            ${!isOrderCancelled ? `
              <button class="btn-secondary" style="padding: 0.55rem 1.15rem; font-size: 0.6875rem;" onclick="reviewsManager.openSubmitReviewModal('${order.items[0]?.id || 'asmi-pr-001'}', '${order.orderNumber}')">
                <i class="fa-solid fa-star" style="margin-right: 0.35rem;"></i> Write a Review
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  openPackageTracker(orderNumber) {
    this.initMouseWheelScroll();
    const order = this.orders.find(o => o.orderNumber === orderNumber) || this.orders[0];
    if (!order) return;

    this.activeTrackingOrder = order;
    const modal = document.getElementById("trackerModalBackdrop");
    if (!modal) return;

    const delivery = this.getDeliveryDates(order.placedTimestamp);
    const milestones = this.getMilestones(order);

    // Populate order summary in tracker
    const orderIdEl = document.getElementById("trk_orderId");
    const trkIdEl = document.getElementById("trk_trackingId");
    const courierEl = document.getElementById("trk_courier");
    const locEl = document.getElementById("trk_location");
    const dateRangeEl = document.getElementById("trk_deliverySpan");
    const stepsContainer = document.getElementById("trackerStepsContainer");

    if (orderIdEl) orderIdEl.textContent = order.orderNumber;
    if (trkIdEl) trkIdEl.textContent = order.trackingId;
    if (courierEl) courierEl.textContent = order.courier;
    if (locEl) locEl.textContent = order.currentLocation;
    if (dateRangeEl) dateRangeEl.textContent = `${delivery.minDateStr} – ${delivery.maxDateStr} (10 - 12 business days)`;

    if (stepsContainer) {
      stepsContainer.innerHTML = milestones.map((m, index) => {
        const isCompleted = m.status === "completed";
        const isCurrent = m.status === "current";
        const isPending = m.status === "pending";

        const dotClass = isCompleted ? "step-dot-completed" : isCurrent ? "step-dot-current" : "step-dot-pending";

        return `
          <div class="tracking-step-row ${dotClass}">
            <div class="tracking-step-indicator">
              <div class="tracking-dot">
                <i class="${isCompleted ? 'fa-solid fa-check' : m.icon}"></i>
              </div>
              ${index < milestones.length - 1 ? `<div class="tracking-line ${isCompleted ? 'line-completed' : ''}"></div>` : ''}
            </div>

            <div class="tracking-step-content">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
                <h4 style="font-size: 0.95rem; font-weight: 600; color: ${isPending ? 'var(--text-muted)' : 'var(--text-primary)'};">
                  ${m.step}. ${m.title}
                </h4>
                <span class="label-micro" style="color: ${isCurrent ? 'var(--gold-primary)' : 'var(--text-muted)'}; white-space: nowrap;">
                  ${m.date}
                </span>
              </div>
              <p style="font-size: 0.8125rem; color: ${isPending ? 'var(--text-muted)' : 'var(--text-secondary)'}; line-height: 1.5;">
                ${m.description}
              </p>
            </div>
          </div>
        `;
      }).join("");
    }

    modal.classList.add("active");
  }

  closePackageTracker() {
    const modal = document.getElementById("trackerModalBackdrop");
    if (modal) modal.classList.remove("active");
  }
}

// Global Instantiate
const ordersManager = new OrdersManager();
window.ordersManager = ordersManager;
