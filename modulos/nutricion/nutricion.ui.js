console.log("Iniciando modulo de nutricion...");

document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('lista-nutricion');
    const buscador = document.getElementById('buscador-nutricion');
    const errorMsg = document.getElementById('error-busqueda');
    const contador = document.getElementById('contador-resultados');
    const botonesObjetivo = document.querySelectorAll('.objetivo-btn');

    let recetasGlobales = [];
    let objetivoActual = 'todos';

    function renderizarLista(lista) {
        if (!contenedor) return;
        contenedor.innerHTML = '';
        
        if (contador) contador.textContent = `Mostrando ${lista.length} receta(s)`;

        if (lista.length === 0) {
            contenedor.innerHTML = `<div class="no-resultados">No hay recetas que coincidan con tu búsqueda.</div>`;
            return;
        }

        lista.forEach((item, index) => {
            const animacionDelay = index * 0.1; 
            const etiquetasHTML = item.etiquetas ? item.etiquetas.map(et => `<span class="etiqueta-dieta">${et}</span>`).join('') : '';

            contenedor.innerHTML += `
                <div class="tarjeta-receta" style="animation-delay: ${animacionDelay}s">
                    <div class="tarjeta-imagen">
                        <img src="${item.imagen || 'https://via.placeholder.com/300'}" alt="${item.nombre}">
                        <span class="badge-dificultad">${item.dificultad || 'Fácil'}</span>
                    </div>
                    <div class="tarjeta-contenido">
                        <h3>${item.nombre}</h3>
                        <p class="tarjeta-descripcion">${item.descripcion || 'Sin descripción.'}</p>
                        <div class="etiquetas-container">${etiquetasHTML}</div>
                        <div class="tarjeta-detalles">
                            <span class="detalle"><span class="material-symbols-outlined">timer</span> ${item.tiempo || '15 min'}</span>
                            <span class="detalle calorias"><span class="material-symbols-outlined">local_fire_department</span> ${item.calorias || 0} kcal</span>
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
        const texto = buscador ? buscador.value.toLowerCase() : '';
        
        let filtrados = recetasGlobales.filter(receta => {
            const coincideTexto = receta.nombre.toLowerCase().includes(texto);
            let coincideObjetivo = true;
            if (objetivoActual !== 'todos') {
                coincideObjetivo = receta.tipo === objetivoActual;
            }
            return coincideTexto && coincideObjetivo;
        });
        
        renderizarLista(filtrados);
    }

    // Cargar desde la API
    try {
        recetasGlobales = await NutricionServicio.obtenerTodasLasRecetas();
        
        if (recetasGlobales.length === 0) {
            contenedor.innerHTML = `<div class="no-resultados"><p>No hay datos disponibles. Verifica la conexión con el servidor.</p></div>`;
            return;
        }
        
        renderizarLista(recetasGlobales);
    } catch (error) {
        console.error("Error al cargar recetas:", error);
        contenedor.innerHTML = `<div class="no-resultados"><p>Error de conexión con la API.</p></div>`;
    }

    if (buscador) {
        buscador.addEventListener('input', (e) => {
            const texto = e.target.value;
            const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
            
            if (!regexSoloLetras.test(texto)) {
                if (errorMsg) errorMsg.style.display = 'block';
                return; 
            } else {
                if (errorMsg) errorMsg.style.display = 'none';
            }
            aplicarFiltros();
        });
    }

    botonesObjetivo.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesObjetivo.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            objetivoActual = boton.dataset.objetivo;
            aplicarFiltros();
        });
    });
});
