document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de Nutrición cargado correctamente.');
    
    let datos = [];
    if (window.recetasMockData && window.recetasMockData.recetas) {
        datos = window.recetasMockData.recetas;
    } else {
        datos = [
            { nombre: 'Ensalada César Saludable', calorias: 320 },
            { nombre: 'Salmón al Horno con Vegetales', calorias: 450 },
            { nombre: 'Bowl de Avena y Frutas', calorias: 280 },
            { nombre: 'Smoothie Verde Detox', calorias: 150 }
        ];
    }

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
            const nombre = item.nombre || item.titulo || 'Receta sin nombre';
            const calorias = item.calorias || 'N/A';
            const tarjetaHTML = `
                <div class="tarjeta-receta">
                    <h3>${nombre}</h3>
                    <div class="badge-calorias">
                        <span>${calorias}</span> kcal
                    </div>
                </div>
            `;
            contenedor.innerHTML += tarjetaHTML;
        });
    }

    function filtrar() {
        const texto = buscador.value.toLowerCase();
        const filtrados = datos.filter(item => {
            const nombre = item.nombre || item.titulo || '';
            return nombre.toLowerCase().includes(texto);
        });
        renderizarLista(filtrados);
    }

    if (buscador) {
        buscador.addEventListener('input', filtrar);
    }
    renderizarLista(datos);
});
