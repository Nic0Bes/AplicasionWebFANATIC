// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Buscador
  const botonBuscar = document.querySelector('.header__search button');
  const inputBuscar = document.querySelector('.header__search input');

  botonBuscar.addEventListener('click', () => {
    const termino = inputBuscar.value.trim();
    if (!termino) {
      alert("Por favor ingresá un término de búsqueda.");
    } else {
      alert(`Buscando: ${termino}`);
      // En el futuro podrías usar: window.location.href = `/buscar?q=${termino}`;
    }
  });

  // Carrito
  const carrito = document.querySelector('.material-symbols-outlined');
  carrito?.addEventListener('click', () => {
    alert("Abriste el carrito. (Funcionalidad futura)");
  });

  // ModificarCuenta
  const ModifCuenta = document.querySelector('.modif_cuent');
  ModifCuenta?.addEventListener('click', () => {
    alert("Quisiste modificar la cuenta. (Funcionalidad futura)");
  });

  // MisCompras
  const MisCompras = document.querySelector('.mis_compr');
  MisCompras?.addEventListener('click', () => {
    alert("Quisiste ver las compras de la cuenta. (Funcionalidad futura)");
  });
  
  // Menú hamburguesa toggle
  const menuBtn = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav__list");

  menuBtn?.addEventListener("click", () => {
    navList.classList.toggle("mostrar-menu");
  });

  // Menú principal de Categorías
  const botonCategorias = document.querySelector('.nav__link');
  const submenuPrincipal = document.querySelector('.Categorias__submenu');
  
  // Buscar el label "Categorías" específicamente
  const labelCategorias = Array.from(document.querySelectorAll('.nav__link')).find(label => 
    label.textContent.trim() === 'Categorías'
  );
  
  labelCategorias?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle del submenú principal de categorías
    submenuPrincipal.classList.toggle('mostrar-submenu');
    
    // Cerrar submenús individuales cuando se cierra el principal
    if (!submenuPrincipal.classList.contains('mostrar-submenu')) {
      document.querySelectorAll('.Categoria__ul-Hombre, .Categoria__ul-Mujer, .Categoria__ul-Niños').forEach(menu => {
        menu.classList.remove('mostrar-submenu');
      });
    }
  });

  // Submenús individuales (Hombre, Mujer, Niños)
  const submenuLabels = document.querySelectorAll('.nav__linkeding');
  
  submenuLabels.forEach(label => {
    label.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Obtener el texto del label (Hombre, Mujer, Niños)
      const categoria = label.textContent.trim();
      
      // Mapear el texto a la clase CSS correspondiente
      const claseMap = {
        'Hombre': 'Categoria__ul-Hombre',
        'Mujer': 'Categoria__ul-Mujer', 
        'Niños': 'Categoria__ul-Niños'
      };
      
      const submenuClass = claseMap[categoria];
      if (submenuClass) {
        const submenu = document.querySelector(`.${submenuClass}`);
        if (submenu) {
          // Cerrar otros submenús individuales abiertos
          document.querySelectorAll('.Categoria__ul-Hombre, .Categoria__ul-Mujer, .Categoria__ul-Niños').forEach(menu => {
            if (menu !== submenu) {
              menu.classList.remove('mostrar-submenu');
            }
          });
          
          // Toggle del submenú actual
          submenu.classList.toggle('mostrar-submenu');
        }
      }
    });
  });

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", e => {
      e.preventDefault();
      const destino = document.querySelector(enlace.getAttribute("href"));
      destino?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Cerrar submenús al hacer clic fuera
  document.addEventListener('click', (e) => {
    // Si no se hace clic en ningún elemento del menú
    if (!e.target.closest('.nav__link') && 
        !e.target.closest('.nav__linkeding') && 
        !e.target.closest('.Categorias__submenu') &&
        !e.target.closest('.Categoria__ul-Hombre, .Categoria__ul-Mujer, .Categoria__ul-Niños')) {
      
      // Cerrar submenú principal
      submenuPrincipal?.classList.remove('mostrar-submenu');
      
      // Cerrar submenús individuales
      document.querySelectorAll('.Categoria__ul-Hombre, .Categoria__ul-Mujer, .Categoria__ul-Niños').forEach(menu => {
        menu.classList.remove('mostrar-submenu');
      });
    }
  });
});