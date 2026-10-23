import { datosMock, filtrarRecetas } from './nutricion.logica.js';

const contenedor = document.getElementById('lista-nutricion');
const buscador = document.getElementById('buscador-nutricion');
const errorMsg = document.getElementById('error-busqueda');
const contador = document.getElementById('contador-resultados');
const botonesObjetivo = document.querySelectorAll('.objetivo-btn');

let objetivoActual = 'todos';

function renderizarLista(lista) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    if (contador) contador.textContent = `Mostrando ${lista.length} receta(s) recomendada(s)`;

    if (lista.length === 0) {
        contenedor.innerHTML = `<div class="no-resultados">No hay recetas para esta meta o búsqueda.</div>`;
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
    const filtrados = filtrarRecetas(datosMock, texto, objetivoActual);
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

// Lógica de los botones de Objetivo (Bajar, Subir, Todos)
botonesObjetivo.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesObjetivo.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');
        objetivoActual = boton.dataset.objetivo;
        aplicarFiltros();
    });
});
