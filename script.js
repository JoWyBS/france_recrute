document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    
    // Crear overlay dinámicamente
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  
    // Función para activar enlace de navegación según scroll
    function activateNavLink() {
      let scrollPosition = window.scrollY + 150;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    }
  
    // Eventos de scroll
    window.addEventListener("scroll", activateNavLink);
    activateNavLink(); // Activar al cargar
  
    // Smooth scroll para enlaces
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
        // Cerrar menú en móvil
        if (window.innerWidth <= 768) {
          nav.classList.remove("active");
          navOverlay.classList.remove("active");
          document.body.style.overflow = 'auto'; // Restaurar scroll
        }
      });
    });
  
    // Toggle del menú hamburguesa
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      navOverlay.classList.toggle("active");
      this.innerHTML = nav.classList.contains("active") ? "&times;" : "&#9776;";
      document.body.style.overflow = nav.classList.contains("active") ? 'hidden' : 'auto';
    });
  
    // Cerrar menú al hacer clic en overlay
    navOverlay.addEventListener("click", function() {
      nav.classList.remove("active");
      this.classList.remove("active");
      document.body.style.overflow = 'auto';
    });
  
    // Cerrar menú al redimensionar a pantalla grande
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        nav.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = 'auto';
      }
    });
  });

// Añade esto al final de tu script.js
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const responseDiv = document.getElementById('formResponse');
    
    // Mostrar mensaje de "enviando"
    responseDiv.innerHTML = '<p>Enviando mensaje...</p>';
    responseDiv.style.display = 'block';
  
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        responseDiv.innerHTML = '<p style="color:green;">¡Mensaje enviado con éxito!</p>';
        form.reset();
      } else {
        // Mostrar detalles del error de Formspree
        console.error('Error de Formspree:', result);
        throw new Error(result.error || 'Error al enviar');
      }
    } catch (error) {
      console.error('Error:', error);
      responseDiv.innerHTML = `
        <p style="color:red;">
          Hubo un error al enviar el mensaje. Por favor, intenta de nuevo más tarde.<br>
          Si el problema persiste, contáctanos directamente a francerecrute.societe@gmail.com
        </p>
      `;
    }
  });