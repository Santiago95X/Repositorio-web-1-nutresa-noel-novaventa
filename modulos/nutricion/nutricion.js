// Lógica del módulo de Nutrición
document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de Nutrición cargado correctamente.');
    
    // Intentar leer datos desde recetas.js (mock global)
    let datos = [];
    if (window.recetasMockData && window.recetasMockData.recetas) {
        datos = window.recetasMockData.recetas;
    } else {
        datos = [
            { nombre: 'Receta 1', calorias: 250 },
            { nombre: 'Receta 2', calorias: 400 }
        ];
    }

    function renderizarLista(datos) {
        const contenedor = document.getElementById('lista-nutricion');
        if (!contenedor) return;
        
        contenedor.innerHTML = '';
        datos.forEach(item => {
            contenedor.innerHTML += `<p>${item.nombre || item.titulo} - ${item.calorias || 'N/A'} kcal</p>`;
        });
    }

    renderizarLista(datos);
});
