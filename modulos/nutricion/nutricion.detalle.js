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
        <img src="${receta.imagen}" alt="${receta.nombre}" class="detalle-img">
        <div class="detalle-info">
            <h1>${receta.nombre}</h1>
            <p>${receta.descripcion}</p>
            <div class="detalle-macros">
                <span>🔥 ${receta.calorias} kcal</span>
                <span>⏱️ ${receta.tiempo}</span>
                <span>🥩 ${receta.macros.prot} Prot</span>
            </div>
            <h3>Ingredientes e Instrucciones (Próximamente en HU-03)</h3>
        </div>
    `;
});
