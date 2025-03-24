document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const navLinksContainer = document.querySelector(".nav-links");
    
    // Crear overlay dinámicamente
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  
    function activateNavLink() {
      let scrollPosition = window.scrollY + 150;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    }
  
    window.addEventListener("scroll", activateNavLink);
    activateNavLink();
  
    // Suavizar el scroll al hacer clic en los enlaces de navegación
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          });
        }
        // Cerrar el menú hamburguesa en móvil después de hacer clic
        if (window.innerWidth <= 768) {
          nav.classList.remove("active");
          navOverlay.classList.remove("active");
        }
      });
    });
  
    // Funcionalidad del menú hamburguesa
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      navOverlay.classList.toggle("active");
    });
  
    // Cerrar menú al hacer clic en el overlay
    navOverlay.addEventListener("click", function() {
      nav.classList.remove("active");
      this.classList.remove("active");
    });
  });