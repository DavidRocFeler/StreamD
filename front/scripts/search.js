function searchStream () {
    const searchIcon = document.getElementById('search-icon');
    const searchBox = document.getElementById('search-box');
    const movieSearch = document.getElementById('movie-search');
    const lupaHandler = document.getElementById('lupaHandler');
    
    // Función que maneja la apertura del cuadro de búsqueda
    function toggleSearchBox() {
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active')) {
        movieSearch.focus();
      }
    }
    
    // Añadir el evento click para el ícono de búsqueda
    searchIcon.addEventListener('click', toggleSearchBox);
    
    // Añadir el evento click para lupaHandler
    lupaHandler.addEventListener('click', toggleSearchBox);
    
    movieSearch.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        // Aquí puedes agregar la lógica para buscar la película
        console.log('Buscando: ' + this.value);
        // Implementa la función de búsqueda aquí
      }
    });
    
    // Cerrar el cuadro de búsqueda si se hace clic fuera de él
    document.addEventListener('click', function(e) {
      if (!searchBox.contains(e.target) && e.target !== searchIcon && e.target !== lupaHandler) {
        searchBox.classList.remove('active');
      }
    });
  };

module.exports = searchStream;
  
  
  