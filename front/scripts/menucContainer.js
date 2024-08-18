let player = null; // Asegúrate de que `player` esté disponible para interactuar con el menú

function handleMenuToggle() {
    const menuIcon = document.getElementById('menu-toggle');
    const menuContainer = document.getElementById('menu-container');

    console.log("Click en menu-toggle detectado");

    if (window.scrollY === 0) {
        console.log("El scroll está en la parte superior (scrollY === 0)");

        menuContainer.classList.toggle('open');
        const isOpen = menuContainer.classList.contains('open');
        console.log(`Estado del menú después de toggle: ${isOpen ? 'Abierto' : 'Cerrado'}`);
        
        // Eliminada la lógica de reproducción de video al hacer click en el menú
    } else {
        console.log("El scroll no está en la parte superior, no se hará nada");
    }
}

function handleDocumentClick(event) {
    const menuContainer = document.getElementById('menu-container');
    const menuIcon = document.getElementById('menu-toggle');

    if (menuContainer.classList.contains('open') && !menuContainer.contains(event.target) && !menuIcon.contains(event.target)) {
        menuContainer.classList.remove('open');
        if (typeof player.pauseVideo === 'function') {
            player.pauseVideo();
        }
    }
}

function handleScroll() {
    const menuIcon = document.getElementById('menu-toggle');
    const menuContainer = document.getElementById('menu-container');

    if (window.scrollY > 0) {
        menuIcon.style.filter = 'brightness(0.5)';
    } else {
        menuIcon.style.filter = 'brightness(1)';
    }

    if (menuContainer.classList.contains('open')) {
        menuContainer.classList.remove('open');
        if (typeof player.pauseVideo === 'function') {
            player.pauseVideo();
        }
    }
}

// Asignar los eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-toggle');

    menuIcon.addEventListener('click', handleMenuToggle);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleDocumentClick);
});

module.exports = {
    handleMenuToggle,
    handleDocumentClick,
    handleScroll
};
