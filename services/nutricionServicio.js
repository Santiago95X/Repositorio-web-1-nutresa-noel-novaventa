const NutricionServicio = {
    async obtenerTodasLasRecetas() {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/recetas`);
            if (!response.ok) throw new Error("Error al cargar recetas");
            return await response.json();
        } catch (error) {
            console.error("Fallo en la API:", error);
            return []; 
        }
    },
    async obtenerNutricionPorReceta(idReceta) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/nutricion/receta/${idReceta}`);
            if (!response.ok) return null; 
            return await response.json();
        } catch (error) {
            return null;
        }
    }
};
