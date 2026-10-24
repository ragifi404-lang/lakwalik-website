(() => {
  "use strict";
  const OWNER_WHATSAPP = "967715572404";
  const DOWNLOAD_URL = "https://github.com/ragifi404-lang/lakwalik-website/releases/download/v1.1.0/app-release.apk";
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const planSelect = form?.querySelector('[name="plan"]');
  const toast = document.querySelector("#toast");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
    });
    nav.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll('a[aria-label*="تحميل"], .footer-whatsapp[href*=".apk"]').forEach(a => {
    a.href = DOWNLOAD_URL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-plan]").forEach(a => a.addEventListener("click", () => {
    const requested = a.dataset.plan || "";
    if (!planSelect) return;
    if (requested.includes("3 أشهر")) planSelect.value = "اشتراك 3 أشهر";
    else if (requested.includes("سنوي")) planSelect.value = "اشتراك سنوي";
    else if (requested.includes("مدى العمر")) planSelect.value = "اشتراك مدى العمر";
    else if (requested.includes("مجانية")) planSelect.value = "النسخة المجانية";
    else planSelect.value = "النسخة المجانية";
  }));

  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get("name") || "").trim();
    const contact = String(fields.get("contact") || "").trim();
    const plan = String(fields.get("plan") || "استفسار عام");
    let payment = "أرجو توضيح رسوم الاشتراك وطريقة الدفع المتاحة.";

    if (plan === "اشتراك 3 أشهر") payment = "أرغب بالاشتراك لفترة 3 أشهر بسعر 1000 ريال يمني. أرجو تأكيد طريقة الدفع والتفعيل.";
    if (plan === "اشتراك سنوي") payment = "أرغب بالاشتراك السنوي بسعر 4000 ريال يمني. أرجو تأكيد طريقة الدفع والتفعيل.";
    if (plan === "اشتراك مدى العمر") payment = "أرغب بالاشتراك مدى العمر بسعر 10000 ريال يمني. أرجو تأكيد طريقة الدفع والتفعيل.";
    if (plan === "النسخة المجانية") payment = "أرغب بالحصول على النسخة المجانية ورابط التحميل المباشر.";

    const message = [
      "السلام عليكم، أرغب بالتواصل بخصوص تطبيق لك وعليك.",
      "الاسم: " + name,
      "وسيلة التواصل: " + contact,
      "الخطة المطلوبة: " + plan,
      payment,
      "أرجو إرشادي إلى الخطوات التالية."
    ].join("\n");

    if (status) status.textContent = "ستفتح رسالة جاهزة في واتساب؛ راجعها ثم اضغط إرسال.";
    window.open("https://wa.me/" + OWNER_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  });

  document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
})();
