// Lógica del módulo de Nutrición
document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de Nutrición cargado correctamente.');
    
    // 1. Datos enriquecidos con imágenes de comida reales
    let datos = [
        { nombre: 'Ensalada César Saludable', calorias: 320, tiempo: '15 min', dificultad: 'Fácil', imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop' },
        { nombre: 'Salmón al Horno con Vegetales', calorias: 450, tiempo: '25 min', dificultad: 'Media', imagen: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop' },
        { nombre: 'Bowl de Avena y Frutas', calorias: 280, tiempo: '10 min', dificultad: 'Fácil', imagen: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=600&auto=format&fit=crop' },
    ];

    // Intentar leer mocks reales si existen y asignarles imagen
    if (window.recetasMockData && window.recetasMockData.recetas) {
        datos = window.recetasMockData.recetas.map((receta, index) => ({
            ...receta,
            nombre: receta.nombre || receta.titulo,
            calorias: receta.calorias || 'N/A',
            tiempo: receta.tiempo || '20 min',
            dificultad: receta.dificultad || 'Fácil',
            imagen: receta.imagen || datos[index % datos.length].imagen 
        }));
    }

    const contenedor = document.getElementById('lista-nutricion');
    const buscador = document.getElementById('buscador-nutricion');

    // 2. Renderizar Tarjetas con Imágenes
    function renderizarLista(lista) {
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = `<div class="no-resultados">No se encontraron recetas con ese nombre.</div>`;
            return;
        }

        lista.forEach(item => {
            const tarjetaHTML = `
                <div class="tarjeta-receta">
                    <div class="tarjeta-imagen">
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <span class="badge-dificultad">${item.dificultad}</span>
                    </div>
                    <div class="tarjeta-contenido">
                        <h3>${item.nombre}</h3>
                        <div class="tarjeta-detalles">
                            <span class="detalle">
                                <span class="material-symbols-outlined">timer</span> ${item.tiempo}
                            </span>
                            <span class="detalle calorias">
                                <span class="material-symbols-outlined">local_fire_department</span> ${item.calorias} kcal
                            </span>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += tarjetaHTML;
        });
    }

    // 3. Filtro del Buscador
    function filtrar() {
        const texto = buscador.value.toLowerCase();
        const filtrados = datos.filter(item => 
            item.nombre.toLowerCase().includes(texto)
        );
        renderizarLista(filtrados);
    }

    if (buscador) {
        buscador.addEventListener('input', filtrar);
    }
    renderizarLista(datos);
});
