(function () {
  "use strict";

  const form = document.getElementById("lead-form");
  const submitBtn = form.querySelector(".btn-submit");
  const statusDiv = document.getElementById("form-status");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const btnText = submitBtn.textContent;

  function clearErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    if (!nameInput.value.trim()) {
      document.getElementById("name-error").textContent = "Please enter your name.";
      valid = false;
    }

    const email = emailInput.value.trim();
    if (!email) {
      document.getElementById("email-error").textContent = "Please enter your email.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("email-error").textContent = "Please enter a valid email.";
      valid = false;
    }

    return valid;
  }

  function showStatus(type, message) {
    statusDiv.textContent = message;
    statusDiv.className = type === "success" ? "status-success" : "status-error";
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusDiv.textContent = "";
    statusDiv.className = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.style.display = "none";
        showStatus(
          "success",
          "Thanks, we will inform you about the launch date soon."
        );
      } else {
        showStatus("error", "Something went wrong. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = btnText;
      }
    } catch {
      showStatus("error", "Network error. Please check your connection and try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = btnText;
    }
  });
})();
