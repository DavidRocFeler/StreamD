const axios = require("axios");
let lastMovieId = "";
let player = null;
let globalMovieDetails = null;

const generateSectionMovie = async () => {
    try {
        const resp = await axios.get("http://localhost:3000/movies/Movie");
        generateMovies(resp.data);
    } catch (error) {
        console.error('Error al obtener películas:', error.message);
    }
};

function renderMovieDetails() {
    if (!globalMovieDetails) {
        console.error("No hay detalles de película para mostrar.");
        return;
    }

    const menuContainer = document.getElementById('menu-container');
    
    // Eliminar detalles de película previos
    const previousDetails = document.querySelector('.movie-details');
    if (previousDetails) {
        previousDetails.remove();
    }

    // Crea un contenedor para los nuevos detalles de la película
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'movie-details'; // Clase específica para detalles de la película

    const title = document.createElement('h3');
    title.textContent = globalMovieDetails.title;

    const director = document.createElement('p');
    director.textContent = `Director: ${globalMovieDetails.director}`;

    const duration = document.createElement('p');
    duration.textContent = `Duration: ${globalMovieDetails.duration}`;

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${globalMovieDetails.genre}`;

    const year = document.createElement('p');
    year.textContent = `Year: ${globalMovieDetails.year}`;

    const rate = document.createElement('p');
    rate.textContent = `Rating: ${globalMovieDetails.rate}`;

    const movieReview = document.createElement('p');
    movieReview.textContent = `Review: ${globalMovieDetails.movieReview}`;

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
            
            globalMovieDetails = movieDetails;
            console.log("Detalles de la película capturados en el click:", globalMovieDetails);

            // renderisar globalMovieDetails en movie-container
            renderMovieDetails();
        
            generateTrailer(movieDetails.title).then((id) => {
                lastMovieId = id;
        
                // Desplazar la página a la parte superior
                window.scrollTo({ top: 0, behavior: 'smooth' });
        
                // Esperar un pequeño tiempo para asegurarse de que el scroll ha terminado
                setTimeout(() => {
                    setupVideo(true); // Pasar true para iniciar reproducción automática
                }, 300);  // Ajusta este valor según sea necesario
            });
        });        
    });
};

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

module.exports = {
    generateSectionMovie,
    setupVideo
};
