

export const datosMock = [
    { 
        id: 1, 
        nombre: 'Ensalada César Saludable', 
        descripcion: 'Lechuga fresca, crutones integrales, pollo a la parrilla y aderezo light.',
        calorias: 320, 
        tiempo: '15 min', 
        dificultad: 'Fácil', 
        imagen: 'https:
        etiquetas: ['Alto en Proteína', 'Bajo en Carbohidratos'],
        macros: { prot: '25g', carbs: '15g', grasas: '12g' }
    },
    { 
        id: 2, 
        nombre: 'Salmón al Horno con Vegetales', 
        descripcion: 'Filete de salmón fresco horneado con especias y mix de vegetales al vapor.',
        calorias: 450, 
        tiempo: '25 min', 
        dificultad: 'Media', 
        imagen: 'https:
        etiquetas: ['Omega 3', 'Sin Gluten'],
        macros: { prot: '35g', carbs: '20g', grasas: '22g' }
    },
    { 
        id: 3, 
        nombre: 'Bowl de Avena y Frutas', 
        descripcion: 'Avena cocida con leche de almendras, fresas, arándanos y semillas de chía.',
        calorias: 280, 
        tiempo: '10 min', 
        dificultad: 'Fácil', 
        imagen: 'https:
        etiquetas: ['Vegano', 'Alto en Fibra'],
        macros: { prot: '8g', carbs: '45g', grasas: '6g' }
    }
];


export function filtrarRecetas(recetas, textoBusqueda) {
    if (!textoBusqueda) return recetas;
    const texto = textoBusqueda.toLowerCase();
    return recetas.filter(receta => receta.nombre.toLowerCase().includes(texto));
}
