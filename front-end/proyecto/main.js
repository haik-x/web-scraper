document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');
    const mainMenu = document.getElementById('main-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const settingsButton = document.getElementById('settings-button');
    
    // Agrega la lógica para mostrar/ocultar el menú de hamburguesa
    menuToggle.addEventListener('click', function () {
        if (mainMenu.classList.contains('hidden')) {
            mainMenu.classList.remove('hidden');
        } else {
            mainMenu.classList.add('hidden');
        }
    });

    // Agrega la lógica para mostrar/ocultar el panel de ajustes
    settingsButton.addEventListener('click', function () {
        // Crear contenido dinámico para las opciones de ajustes
        const settingsContent = document.createElement('div');
        settingsContent.innerHTML = `
            <div id="frame">
                <h2>Opciones de Ajustes</h2>
                <ul id="ajustes">
                    <li><a href="#" id="edit-profile">Editar Perfil</a></li>
                    <li><a href="#" id="edit-friends">Editar Amigos</a></li>
                    <li><a href="#" id="edit-monitoring-options">Editar Opciones de Monitoreo</a></li>
                </ul>
            </div>
        `;

        // Agregar contenido al área principal
        content.innerHTML = '';
        content.appendChild(settingsContent);
    });

    // Agrega la lógica para las opciones de ajustes
    content.addEventListener('click', function (event) {
        if (event.target.id === 'edit-profile') {
            // Lógica para editar perfil
            content.innerHTML = '<h2>Editar Perfil</h2>';
        } else if (event.target.id === 'edit-friends') {
            // Lógica para editar amigos
            content.innerHTML = '<h2>Editar Amigos</h2>';
        } else if (event.target.id === 'edit-monitoring-options') {
            // Lógica para editar opciones de monitoreo
            content.innerHTML = '<h2>Editar Opciones de Monitoreo</h2>';
        }
    });
});
