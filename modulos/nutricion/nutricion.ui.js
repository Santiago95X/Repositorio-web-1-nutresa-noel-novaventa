import { datosMock, filtrarRecetas } from './nutricion.logica.js';
import { NutricionStorage } from './nutricion.storage.js';

const contenedor = document.getElementById('lista-nutricion');
const buscador = document.getElementById('buscador-nutricion');
const errorMsg = document.getElementById('error-busqueda');
const contador = document.getElementById('contador-resultados');

function renderizarLista(lista) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    // Actualizar contador
    if (contador) {
        contador.textContent = `Mostrando ${lista.length} receta(s)`;
    }

    if (lista.length === 0) {
        contenedor.innerHTML = `<div class="no-resultados">No se encontraron recetas.</div>`;
        return;
    }

    lista.forEach(item => {
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
                    <div class="etiquetas-container">${etiquetasHTML}</div>
                    <div class="tarjeta-macros">
                        <div class="macro"><span class="valor">${item.macros.prot}</span><span class="label">Prot</span></div>
                        <div class="macro"><span class="valor">${item.macros.carbs}</span><span class="label">Carbs</span></div>
                        <div class="macro"><span class="valor">${item.macros.grasas}</span><span class="label">Grasas</span></div>
                    </div>
                    <div class="tarjeta-detalles">
                        <span class="detalle"><span class="material-symbols-outlined">timer</span> ${item.tiempo}</span>
                        <span class="detalle calorias"><span class="material-symbols-outlined">local_fire_department</span> ${item.calorias} kcal</span>
                    </div>
                    <button class="btn-ver-receta" onclick="window.location.href='detalle-receta.html?id=${item.id}'">
                        Ver Receta <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        `;
    });
}

if (buscador) {
    const ultima = NutricionStorage.obtenerUltimaBusqueda();
    if (ultima && ultima.ultimaBusqueda) {
        buscador.value = ultima.ultimaBusqueda;
        renderizarLista(filtrarRecetas(datosMock, buscador.value));
    } else {
        renderizarLista(datosMock);
    }

    buscador.addEventListener('input', (e) => {
        const texto = e.target.value;
        const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        
        if (!regexSoloLetras.test(texto)) {
            errorMsg.style.display = 'block';
            return; 
        } else {
            errorMsg.style.display = 'none';
        }
        NutricionStorage.guardarUltimaBusqueda(texto);
        renderizarLista(filtrarRecetas(datosMock, texto));
    });
}
