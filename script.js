document.addEventListener("DOMContentLoaded", () => {
  // Reveal animation
  const revealElements = document.querySelectorAll(
    ".mini-card, .founder-card, .skill-box, .tool-card, .service-panel, .price-card, .cta-box, .contact-form"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Formspree form handling
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    formMessage.textContent = "Sending message...";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formMessage.textContent = "Thanks! Your message has been sent successfully.";
        form.reset();
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      formMessage.textContent = "Network error. Please try again later.";
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  });
});