import { datosMock, filtrarRecetas } from './nutricion.logica.js';
import { NutricionStorage } from './nutricion.storage.js';

const contenedor = document.getElementById('lista-nutricion');
const buscador = document.getElementById('buscador-nutricion');
const errorMsg = document.getElementById('error-busqueda');
const contador = document.getElementById('contador-resultados');
const botonesFiltro = document.querySelectorAll('.filtro-btn');
const selectObjetivo = document.getElementById('select-objetivo');

let filtroActual = 'todas';
let objetivoActual = 'todos';

function renderizarLista(lista) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    if (contador) contador.textContent = `Mostrando ${lista.length} receta(s) recomendada(s)`;

    if (lista.length === 0) {
        contenedor.innerHTML = `<div class="no-resultados">No hay recetas para esta meta.</div>`;
        return;
    }

    lista.forEach((item, index) => {
        const etiquetasHTML = item.etiquetas.map(et => `<span class="etiqueta-dieta">${et}</span>`).join('');
        const animacionDelay = index * 0.1; 

        contenedor.innerHTML += `
            <div class="tarjeta-receta" style="animation-delay: ${animacionDelay}s">
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

function aplicarFiltros() {
    const texto = buscador.value;
    let filtrados = filtrarRecetas(datosMock, texto, objetivoActual);
    
    if (filtroActual !== 'todas') {
        filtrados = filtrados.filter(item => item.dificultad === filtroActual);
    }
    
    renderizarLista(filtrados);
}

if (buscador) {
    aplicarFiltros();

    buscador.addEventListener('input', (e) => {
        const texto = e.target.value;
        const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (!regexSoloLetras.test(texto)) {
            errorMsg.style.display = 'block';
            return; 
        } else {
            errorMsg.style.display = 'none';
        }
        aplicarFiltros();
    });
}

if (selectObjetivo) {
    selectObjetivo.addEventListener('change', (e) => {
        objetivoActual = e.target.value;
        aplicarFiltros();
    });
}

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');
        filtroActual = boton.dataset.filtro;
        aplicarFiltros();
    });
});
