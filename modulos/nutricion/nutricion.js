/**
 * Módulo de Nutrición
 * HU-01: Muestra información nutricional de recetas
 */
// Lógica del módulo de Nutrición
document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de Nutrición cargado correctamente.');
    
    let datos = [];
    if (window.recetasMockData && window.recetasMockData.recetas) {
        datos = window.recetasMockData.recetas;
    } else {
        datos = [
            { nombre: 'Receta 1', calorias: 250 },
            { nombre: 'Receta 2', calorias: 400 }
        ];
    }

    const contenedor = document.getElementById('lista-nutricion');
    const buscador = document.getElementById('buscador-nutricion');

    function renderizarLista(lista) {
        if (!contenedor) return;
        contenedor.innerHTML = '';
        lista.forEach(item => {
            contenedor.innerHTML += `<p>${item.nombre || item.titulo} - ${item.calorias || 'N/A'} kcal</p>`;
        });
    }

    function filtrar() {
        const texto = buscador.value.toLowerCase();
        const filtrados = datos.filter(item => 
            (item.nombre || item.titulo || '').toLowerCase().includes(texto)
        );
        renderizarLista(filtrados);
    }

    if (buscador) {
        buscador.addEventListener('input', filtrar);
    }

    renderizarLista(datos);
});
