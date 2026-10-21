// Lógica pura de Nutrición (No toca el DOM)

export const datosMock = [
    { id: 1, nombre: 'Ensalada César Saludable', calorias: 320, tiempo: '15 min', dificultad: 'Fácil', imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop' },
    { id: 2, nombre: 'Salmón al Horno con Vegetales', calorias: 450, tiempo: '25 min', dificultad: 'Media', imagen: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop' },
    { id: 3, nombre: 'Bowl de Avena y Frutas', calorias: 280, tiempo: '10 min', dificultad: 'Fácil', imagen: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=600&auto=format&fit=crop' }
];

// Función pura de filtrado
export function filtrarRecetas(recetas, textoBusqueda) {
    if (!textoBusqueda) return recetas;
    const texto = textoBusqueda.toLowerCase();
    return recetas.filter(receta => receta.nombre.toLowerCase().includes(texto));
}
