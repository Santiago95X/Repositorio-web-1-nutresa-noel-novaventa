document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header[data-layout="header"]');
    const sidebar = document.getElementById('sidebar-global');
    if (sidebar) {
        sidebar.innerHTML = `
            <div class="sidebar-logo">
                <h2>Sazón</h2>
                <span>NUTRESA DIGITAL</span>
            </div>
            <nav class="sidebar-nav">
                <p class="nav-label">RECETARIO Y COCINA</p>
                <a href="#" class="nav-item active"><span class="material-symbols-outlined">home</span> Inicio</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">shopping_bag</span> Catálogo</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">menu_book</span> Recetario</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">inventory_2</span> Mi despensa</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">nutrition</span> Nutrición</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">calendar_month</span> Planificador</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">groups</span> Comunidad</a>
                <a href="#" class="nav-item"><span class="material-symbols-outlined">campaign</span> Mercadeo</a>
            </nav>
            <div class="sidebar-puntos">
                <p>MIS PUNTOS</p>
                <h3>1.240 puntos · Nivel 2</h3>
            </div>
        `;
    }
    if (header) {
        header.innerHTML = `
            <div class="topbar-search">
                <span class="material-symbols-outlined">search</span>
                <input type="text" placeholder="Buscar recetas, productos o ingredientes...">
            </div>
            <div class="topbar-user">
                <span class="material-symbols-outlined">notifications</span>
                <div class="user-avatar">AB</div>
                <div class="user-info">
                    <span class="user-name">Nombre de usuario</span>
                    <span class="user-role">Rol</span>
                </div>
            </div>
        `;
    }
});
