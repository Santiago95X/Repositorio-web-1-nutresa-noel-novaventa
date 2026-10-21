// Capa de Interfaz de Usuario (DOM)
import { datosMock, filtrarRecetas } from './nutricion.logica.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('lista-nutricion');
    const buscador = document.getElementById('buscador-nutricion');

    function renderizarLista(lista) {
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = `<div class="no-resultados">No se encontraron recetas con ese nombre.</div>`;
            return;
        }

        lista.forEach(item => {
            // Generar las etiquetas de dieta (badges)
            const etiquetasHTML = item.etiquetas.map(et => `<span class="etiqueta-dieta">${et}</span>`).join('');

            contenedor.innerHTML += `
                <div class="tarjeta-receta">
                    <div class="tarjeta-imagen">
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <span class="badge-dificultad">${item.dificultad}</span>
                    </div>
                    <div class="tarjeta-contenido">
                        <h3>${item.nombre}</h3>
                        <p class="tarjeta-descripcion">${item.descripcion}</p>
                        
                        <div class="etiquetas-container">
                            ${etiquetasHTML}
                        </div>

                        <div class="tarjeta-macros">
                            <div class="macro"><span class="valor">${item.macros.prot}</span><span class="label">Prot</span></div>
                            <div class="macro"><span class="valor">${item.macros.carbs}</span><span class="label">Carbs</span></div>
                            <div class="macro"><span class="valor">${item.macros.grasas}</span><span class="label">Grasas</span></div>
                        </div>

                        <div class="tarjeta-detalles">
                            <span class="detalle"><span class="material-symbols-outlined">timer</span> ${item.tiempo}</span>
                            <span class="detalle calorias"><span class="material-symbols-outlined">local_fire_department</span> ${item.calorias} kcal</span>
                        </div>
                        
                        <button class="btn-ver-receta">Ver Receta <span class="material-symbols-outlined">arrow_forward</span></button>
                    </div>
                </div>
            `;
        });
    }

    if (buscador) {
        buscador.addEventListener('input', (e) => {
            const filtrados = filtrarRecetas(datosMock, e.target.value);
            renderizarLista(filtrados);
        });
    }

    renderizarLista(datosMock);
});
