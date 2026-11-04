import { datosMock } from './nutricion.logica.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('detalle-contenido');
    const urlParams = new URLSearchParams(window.location.search);
    const idReceta = parseInt(urlParams.get('id'));
    const receta = datosMock.find(r => r.id === idReceta);

    if (!receta) {
        contenedor.innerHTML = `<h2 style="text-align:center; padding: 2rem;">Receta no encontrada</h2>`;
        return;
    }

    const porcentajeCalorias = Math.round((receta.calorias / 2000) * 100);

    contenedor.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.nombre}">
        <div class="detalle-info">
            <h1>${receta.nombre}</h1>
            <p>${receta.descripcion}</p>
            <div class="detalle-badges">
                <span>🔥 ${receta.calorias} kcal</span>
                <span>⏱️ ${receta.tiempo}</span>
                <span>🥩 ${receta.macros.prot} Prot</span>
            </div>

            <div class="progreso-nutricional">
                <div class="progreso-texto">
                    <span>Aporte calórico diario (Base 2000 kcal)</span>
                    <strong>${porcentajeCalorias}%</strong>
                </div>
                <div class="barra-fondo">
                    <div class="barra-relleno" style="width: ${porcentajeCalorias}%;"></div>
                </div>
            </div>

            <div class="acciones-detalle">
                <button id="btn-guardar-despensa" class="btn-accion-primario">
                    <span class="material-symbols-outlined">add_shopping_cart</span> Añadir a mi Despensa
                </button>
            </div>
            <h3>Ingredientes e Instrucciones (Próximamente)</h3>
        </div>
    `;

    const btnGuardar = document.getElementById('btn-guardar-despensa');
    let despensa = JSON.parse(localStorage.getItem('sazon_despensa_usuario')) || [];
    
    // Actualizamos el Sidebar al cargar la página si ya hay cosas guardadas
    actualizarSidebarDespensa(despensa.length);

    if (despensa.includes(receta.nombre)) {
        btnGuardar.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Ya está en tu despensa`;
        btnGuardar.style.background = 'var(--verde-noche)';
        btnGuardar.style.color = '#ffffff';
        btnGuardar.disabled = true;
        btnGuardar.style.opacity = '0.7';
        btnGuardar.style.cursor = 'not-allowed';
    }

    btnGuardar.addEventListener('click', () => {
        if (!despensa.includes(receta.nombre)) {
            despensa.push(receta.nombre);
            localStorage.setItem('sazon_despensa_usuario', JSON.stringify(despensa));
            
            btnGuardar.innerHTML = `<span class="material-symbols-outlined">check_circle</span> ¡Añadido con éxito!`;
            btnGuardar.style.background = 'var(--lima)';
            btnGuardar.style.color = 'var(--verde-noche)';
            
            // Actualizamos el contador del Sidebar
            actualizarSidebarDespensa(despensa.length);
        }
    });

    // Función para buscar el botón del sidebar y cambiarle el texto
    function actualizarSidebarDespensa(cantidad) {
        const enlaceDespensa = document.querySelector('a.nav-item[href*="despensa"], a.nav-item:contains("Mi despensa")'); // Buscamos el enlace
        // Como no podemos usar :contains en querySelector nativo, hacemos un bucle:
        const enlaces = document.querySelectorAll('.sidebar-nav .nav-item');
        enlaces.forEach(enlace => {
            if (enlace.innerText.includes('Mi despensa')) {
                enlace.innerHTML = `<span class="material-symbols-outlined">inventory_2</span> Mi despensa (${cantidad})`;
            }
        });
    }
});
