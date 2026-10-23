export const datosMock = [
    { 
        id: 1, nombre: 'Ensalada César Saludable', descripcion: 'Lechuga fresca, crutones integrales, pollo a la parrilla y aderezo light.',
        calorias: 320, tiempo: '15 min', dificultad: 'Fácil', 
        imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        etiquetas: ['Alto en Proteína', 'Bajo en Carbohidratos'],
        macros: { prot: '25g', carbs: '15g', grasas: '12g' },
        tipo: 'bajar' // Ideal para bajar de peso (bajas calorías, alta proteína)
    },
    { 
        id: 2, nombre: 'Salmón al Horno con Vegetales', descripcion: 'Filete de salmón fresco horneado con especias y mix de vegetales al vapor.',
        calorias: 450, tiempo: '25 min', dificultad: 'Media', 
        imagen: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        etiquetas: ['Omega 3', 'Sin Gluten'],
        macros: { prot: '35g', carbs: '20g', grasas: '22g' },
        tipo: 'mantener' // Equilibrado
    },
    { 
        id: 3, nombre: 'Bowl de Avena y Frutas', descripcion: 'Avena cocida con leche de almendras, fresas, arándanos y semillas de chía.',
        calorias: 280, tiempo: '10 min', dificultad: 'Fácil', 
        imagen: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=600&auto=format&fit=crop',
        etiquetas: ['Vegano', 'Alto en Fibra'],
        macros: { prot: '8g', carbs: '45g', grasas: '6g' },
        tipo: 'subir' // Ideal para subir de peso (buenos carbohidratos)
    }
];

export function filtrarRecetas(recetas, textoBusqueda, objetivo = 'todos') {
    let filtradas = recetas;
    
    if (objetivo !== 'todos') {
        filtradas = filtradas.filter(receta => receta.tipo === objetivo || receta.tipo === 'mantener');
    }
    
    if (!textoBusqueda) return filtradas;
    
    const texto = textoBusqueda.toLowerCase();
    return filtradas.filter(receta => receta.nombre.toLowerCase().includes(texto));
}
