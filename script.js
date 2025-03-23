document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  function activateNavLink() {
      let scrollPosition = window.scrollY + 150; // Ajuste del offset para compensar el header fijo

      sections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
              navLinks.forEach((link) => link.classList.remove("active"));
              document
                  .querySelector(`nav a[href="#${section.id}"]`)
                  .classList.add("active");
          }
      });
  }

  window.addEventListener("scroll", activateNavLink);
  activateNavLink(); // Para marcar correctamente al cargar la página

  // Suavizar el scroll al hacer clic en los enlaces de navegación
  navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
              window.scrollTo({
                  top: targetSection.offsetTop - 80, // Ajuste para compensar el header
                  behavior: "smooth",
              });
          }
      });
  });
});
