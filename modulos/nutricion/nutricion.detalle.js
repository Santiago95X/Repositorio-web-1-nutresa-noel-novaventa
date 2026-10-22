import { datosMock } from './nutricion.logica.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('detalle-contenido');
    
    // Leer el ID desde la URL (URLParams exigido por el PDF)
    const urlParams = new URLSearchParams(window.location.search);
    const idReceta = parseInt(urlParams.get('id'));
    
    const receta = datosMock.find(r => r.id === idReceta);

    if (!receta) {
        contenedor.innerHTML = `<h2>Receta no encontrada</h2>`;
        return;
    }

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
            <div class="acciones-detalle">
                <button id="btn-guardar-despensa" class="btn-accion-primario">
                    <span class="material-symbols-outlined">add_shopping_cart</span> Añadir a mi Despensa
                </button>
            </div>
            <h3>Ingredientes e Instrucciones (Próximamente en HU-03)</h3>
        </div>
    `;

    // Lógica del botón de guardar en despensa (Simulado con LocalStorage)
    const btnGuardar = document.getElementById('btn-guardar-despensa');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', () => {
            // Guardamos el nombre de la receta en LocalStorage
            let despensa = JSON.parse(localStorage.getItem('sazon_despensa_usuario')) || [];
            if (!despensa.includes(receta.nombre)) {
                despensa.push(receta.nombre);
                localStorage.setItem('sazon_despensa_usuario', JSON.stringify(despensa));
                btnGuardar.innerHTML = `<span class="material-symbols-outlined">check_circle</span> ¡Añadido!`;
                btnGuardar.style.background = 'var(--lima)';
                btnGuardar.style.color = 'var(--verde-noche)';
            } else {
                alert('Esta receta ya está en tu despensa.');
            }
        });
    }
});
