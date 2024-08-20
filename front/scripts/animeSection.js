const axios = require("axios");
let lastAnimeId = "";
let player = null;
let globalAnimeDetails = null;

// Función para cargar una película aleatoria
const loadRandomMovie = async () => {
    if (!lastAnimeId && !globalAnimeDetails) {  // Verificar si no hay datos ya presentes
        try {
            const response = await axios.get("http://localhost:3000/movies/Animes");
            const animes = response.data;

            // Seleccionar una película aleatoria
            const randomAnime = animes[Math.floor(Math.random() * animes.length)];

            // Guardar los detalles de la película seleccionada
            globalAnimeDetails = {
                title: randomAnime.title,
                genre: randomAnime.genre.join(", "),
                year: randomAnime.year,
                rate: randomAnime.rate,
                duration: randomAnime.duration,
                director: randomAnime.director,
                movieReview: randomAnime.movieReview,
            };

            // Renderizar los detalles de la película en el menu-container
            renderAnimeDetails();

            // Obtener el tráiler de YouTube basado en el título de la película seleccionada
            generateTrailer(globalAnimeDetails.title).then((id) => {
                lastAnimeId = id;

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

function getDetailsFrom() {
    const storedMovieDetails = localStorage.getItem("selectedMovie");
    if (storedMovieDetails) {
        globalAnimeDetails = JSON.parse(storedMovieDetails);

        // Generar tráiler basado en el título almacenado
        generateTrailer(globalAnimeDetails.title).then((id) => {
            lastAnimeId = id;

            // Reproducir automáticamente el tráiler
            setupVideo(true);
        });
        renderAnimeDetails();

        // borrar localstorage despues de su uso 
        localStorage.removeItem("selectedMovie");
    } else {
        console.log("No se encontró ningún dato en localStorage.");
        loadRandomMovie();
    }
}


const generateSectionAnime = async () => {
    try {
        const resp = await axios.get("http://localhost:3000/movies/Animes");
        generateAnime(resp.data);
    } catch (error) {
        console.error('Error al obtener películas:', error.message);
    }
};

function renderAnimeDetails() {
    if (!globalAnimeDetails) {
        console.error("No hay detalles de película para mostrar.");
        return;
    }

    const menuContainer = document.getElementById('menu-container');
    
    // Eliminar detalles de película previos
    const previousDetails = document.querySelector('.anime-details');
    if (previousDetails) {
        previousDetails.remove();
    }

    // Crea un contenedor para los nuevos detalles de la película
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'anime-details'; // Clase específica para detalles de la película

    const title = document.createElement('h3');
    title.textContent = globalAnimeDetails.title;

    const director = document.createElement('p');
    director.textContent = `Director: ${globalAnimeDetails.director}`;

    const duration = document.createElement('p');
    duration.textContent = `Duration: ${globalAnimeDetails.duration}`;

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${globalAnimeDetails.genre}`;

    const year = document.createElement('p');
    year.textContent = `Year: ${globalAnimeDetails.year}`;

    const rate = document.createElement('p');
    rate.textContent = `Rating: ${globalAnimeDetails.rate}`;

    const movieReview = document.createElement('p');
    movieReview.textContent = `Review: ${globalAnimeDetails.movieReview}`;

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

function generateAnime(arrayAnimes) {
    arrayAnimes.forEach((anime) => {
        const container = document.getElementById('animesContainer');
        const card = document.createElement("div");
        card.className = "card-container";

        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        const img = document.createElement("img");
        img.src = anime.baner;
        img.alt = `poster of ${anime.title}`;
        cardFront.appendChild(img);

        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        const title = document.createElement("h3");
        title.textContent = anime.title;
        const year = document.createElement("p");
        year.textContent = `Year: ${anime.year}`;
        const director = document.createElement("p");
        director.textContent = `Director: ${anime.director}`;
        const duration = document.createElement("p");
        duration.textContent = `Duration: ${anime.duration}`;
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${anime.genre.join(", ")}`;
        const rate = document.createElement("p");
        rate.textContent = `Rating: ${anime.rate}`;

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
            const animeDetails = {
                title: anime.title,
                genre: anime.genre.join(", "),
                year: anime.year,
                rate: anime.rate,
                duration: anime.duration,
                director: anime.director,
                movieReview: anime.movieReview // Capturamos la reseña de la película
            };
        
            // Añadimos un console.log para ver todos los detalles en la consola
            
            globalAnimeDetails = animeDetails;
            console.log("Detalles de la película capturados en el click:", globalAnimeDetails);

            // renderisar globalMovieDetails en movie-container
            renderAnimeDetails();
        
            generateTrailer(animeDetails.title).then((id) => {
                lastAnimeId = id;
        
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
};

function extractYouTubeId(url) {
    let animeId;
    if (url.includes('youtu.be/')) {
        animeId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
        animeId = url.split('v=')[1].split('&')[0];
    }
    return animeId ? animeId : 'ID no encontrado';
}

const generateTrailer = async (title) => {
    const url = `http://localhost:3000/movies/trailers?title=${encodeURIComponent(title)}`;
    try {
        const response = await axios.get(url);
        const trailerUrl = response.data;
        let animeId = extractYouTubeId(trailerUrl);
        return animeId;
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
        if (!lastAnimeId) {
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
            videoId: lastAnimeId,
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

getDetailsFrom()

module.exports = {
    generateSectionAnime,
    setupVideo
};


