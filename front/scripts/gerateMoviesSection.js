const axios = require("axios");
let lastMovieId = "";
let player = null;
let globalStreamDetails = null;

// Función para cargar una película aleatoria
const loadRandomMovie = async () => {
    if (!lastMovieId && !globalStreamDetails) {  // Verificar si no hay datos ya presentes
        try {
            const response = await axios.get("http://localhost:3000/movies/Movie");
            const movies = response.data;

            // Seleccionar una película aleatoria
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];

            // Guardar los detalles de la película seleccionada
            globalStreamDetails = {
                title: randomMovie.title,
                genre: randomMovie.genre.join(", "),
                year: randomMovie.year,
                rate: randomMovie.rate,
                duration: randomMovie.duration,
                director: randomMovie.director,
                movieReview: randomMovie.movieReview,
            };

            // Renderizar los detalles de la película en el menu-container
            renderMovieDetails();

            // Obtener el tráiler de YouTube basado en el título de la película seleccionada
            generateTrailer(globalStreamDetails.title).then((id) => {
                lastMovieId = id;

                // Reproducir automáticamente el tráiler
                setupVideo(true);
            });

        } catch (error) {
            console.error("Error al obtener películas:", error.message);
        }
    } else {
        console.log("Ya hay datos presentes, no se cargará una película aleatoria.");
    }
};

// Recuperar el título desde localStorage y reproducir el tráiler si hay datos
function getDetailsFrom() {
    const storedMovieDetails = localStorage.getItem("selectedMovie");
    if (storedMovieDetails) {
        globalStreamDetails = JSON.parse(storedMovieDetails);

        // Generar tráiler basado en el título almacenado
        generateTrailer(globalStreamDetails.title).then((id) => {
            lastMovieId = id;

            // Reproducir automáticamente el tráiler
            setupVideo(true);
        });
        renderMovieDetails();

        // Borrar localstorage después de su uso 
        localStorage.removeItem("selectedMovie");
    } else {
        console.log("No se encontró ningún dato en localStorage.");
        loadRandomMovie();  // Si no hay datos en localStorage, cargar una película aleatoria
    }
}

const generateSectionMovie = async () => {
    try {
        const resp = await axios.get("http://localhost:3000/movies/Movie");
        generateMovies(resp.data);
    } catch (error) {
        console.error('Error al obtener películas:', error.message);
    }
};

// Función para renderizar los detalles de la película
function renderMovieDetails() {
    if (!globalStreamDetails) {
        console.error("No hay detalles de película para mostrar.");
        return;
    }

    const menuContainer = document.getElementById('menu-container');
    
    // Eliminar detalles de película previos
    const previousDetails = document.querySelector('.movie-details');
    if (previousDetails) {
        previousDetails.remove();
    }

    // Crear un contenedor para los nuevos detalles de la película
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'movie-details'; // Clase específica para detalles de la película

    const title = document.createElement('h3');
    title.textContent = globalStreamDetails.title;

    const director = document.createElement('p');
    director.textContent = `Director: ${globalStreamDetails.director}`;

    const duration = document.createElement('p');
    duration.textContent = `Duration: ${globalStreamDetails.duration}`;

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${globalStreamDetails.genre}`;

    const year = document.createElement('p');
    year.textContent = `Year: ${globalStreamDetails.year}`;

    const rate = document.createElement('p');
    rate.textContent = `Rating: ${globalStreamDetails.rate}`;

    const movieReview = document.createElement('p');
    movieReview.textContent = `Review: ${globalStreamDetails.movieReview}`;

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(director);
    detailsDiv.appendChild(duration);
    detailsDiv.appendChild(genre);
    detailsDiv.appendChild(year);
    detailsDiv.appendChild(rate);
    detailsDiv.appendChild(movieReview);

    // Añadir los detalles de la película después del logo
    menuContainer.appendChild(detailsDiv);
}

// Función para generar las tarjetas de películas
function generateMovies(arrayMovies) {
    arrayMovies.forEach((movie) => {
        const container = document.getElementById('cardsContainer');
        const card = document.createElement("div");
        card.className = "card-container";

        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        const img = document.createElement("img");
        img.src = movie.baner;
        img.alt = `poster of ${movie.title}`;
        cardFront.appendChild(img);

        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        const title = document.createElement("h3");
        title.textContent = movie.title;
        const year = document.createElement("p");
        year.textContent = `Year: ${movie.year}`;
        const director = document.createElement("p");
        director.textContent = `Director: ${movie.director}`;
        const duration = document.createElement("p");
        duration.textContent = `Duration: ${movie.duration}`;
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${movie.genre.join(", ")}`;
        const rate = document.createElement("p");
        rate.textContent = `Rating: ${movie.rate}`;

        cardBack.appendChild(title);
        cardBack.appendChild(year);
        cardBack.appendChild(director);
        cardBack.appendChild(duration);
        cardBack.appendChild(genre);
        cardBack.appendChild(rate);

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        container.appendChild(card);

        card.addEventListener("click", function () {
            const movieDetails = {
                title: movie.title,
                genre: movie.genre.join(", "),
                year: movie.year,
                rate: movie.rate,
                duration: movie.duration,
                director: movie.director,
                movieReview: movie.movieReview // Capturamos la reseña de la película
            };
        
            // Añadimos un console.log para ver todos los detalles en la consola
            
            globalStreamDetails = movieDetails;
            console.log("Detalles de la película capturados en el click:", globalStreamDetails);

            // Renderizar globalStreamDetails en movie-container
            renderMovieDetails();
        
            generateTrailer(movieDetails.title).then((id) => {
                lastMovieId = id;
        
                // Desplazar la página a la parte superior
                window.scrollTo({ top: 0, behavior: 'smooth' });

                console.log("El scroll se convirtió en 0");
        
                // Esperar un pequeño tiempo para asegurarse de que el scroll ha terminado
                setTimeout(() => {
                    setupVideo(true); // Pasar true para iniciar reproducción automática
                }, 300);  // Ajusta este valor según sea necesario
            });
        });        
    });
}

function extractYouTubeId(url) {
    let movieId;
    if (url.includes('youtu.be/')) {
        movieId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
        movieId = url.split('v=')[1].split('&')[0];
    }
    return movieId ? movieId : 'ID no encontrado';
}

const generateTrailer = async (title) => {
    const url = `http://localhost:3000/movies/trailers?title=${encodeURIComponent(title)}`;
    try {
        const response = await axios.get(url);
        const trailerUrl = response.data;
        let movieId = extractYouTubeId(trailerUrl);
        return movieId;
    } catch (error) {
        console.error("Error al traer el link", error);
    }
};

function setupVideo(autoPlay = true) { // autoPlay es true si se debe iniciar automáticamente
    // Remover cualquier evento anterior para evitar duplicados
    document.removeEventListener('scroll', handleScroll);

    if (typeof YT !== 'undefined' && YT.Player) {
        createOrUpdatePlayer(autoPlay);
    } else {
        window.onYouTubeIframeAPIReady = () => createOrUpdatePlayer(autoPlay);
    }

    function createOrUpdatePlayer(autoPlay) {
        if (!lastMovieId) {
            console.error('lastMovieId no está definido');
            return;
        }

        // Asegurarse de que el jugador está destruido antes de crear uno nuevo
        if (player) {
            try {
                player.destroy();
            } catch (err) {
                console.warn('Error al destruir el reproductor anterior:', err);
            }
        }

        player = new YT.Player('main-video', {
            videoId: lastMovieId,
            playerVars: {
                'modestbranding': 1,
                'rel': 0,
                'controls': 0
            },
            events: {
                'onReady': function (event) {
                    onPlayerReady(event, autoPlay); // Pasar autoPlay a onPlayerReady
                },
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event, autoPlay) {
        if (autoPlay) {
            player.playVideo(); // Reproducir automáticamente si autoPlay es true
        }

        // Re-asignar el evento de scroll
        document.addEventListener('scroll', handleScroll);
    }

    function handleScroll() {
        const rect = player.getIframe().parentElement.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isVisible) {
            if (typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
        } else {
            if (typeof player.playVideo === 'function') {
                player.playVideo();
            }
        }
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            console.log('El video ha terminado');
        }
    }
}

// Cargar la API de YouTube en el documento si aún no está cargada
if (typeof YT === 'undefined') {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
} else {
    setupVideo();
}

// Llamar a getTitleFrom para recuperar el título si existe
getDetailsFrom();

module.exports = {
    generateSectionMovie,
    setupVideo
};
