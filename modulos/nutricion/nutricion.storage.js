
export const NutricionStorage = {
    guardarUltimaBusqueda: (texto) => {
        const data = { ultimaBusqueda: texto, fecha: new Date().toISOString() };
        localStorage.setItem('sazon_nutricion_busqueda', JSON.stringify(data));
    },
    obtenerUltimaBusqueda: () => {
        const data = localStorage.getItem('sazon_nutricion_busqueda');
        return data ? JSON.parse(data) : null;
    }
};
