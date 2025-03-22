// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Simulación de envío del formulario
    const contactForm = document.getElementById("contactForm");
    const formResponse = document.getElementById("formResponse");
  
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      formResponse.textContent =
        "¡Gracias por contactarnos! Pronto nos pondremos en contacto contigo para más detalles.";
      formResponse.style.color = "var(--blue-france)";
      contactForm.reset();
    });
  });
  
  
  