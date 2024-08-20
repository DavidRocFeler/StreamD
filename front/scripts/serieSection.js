const axios = require("axios");
let lastSerieId = "";
let player = null;
let globalSerieDetails = null;

// Función para cargar una película aleatoria
const loadRandomMovie = async () => {
    if (!lastSerieId && !globalSerieDetails) {  // Verificar si no hay datos ya presentes
        try {
            const response = await axios.get("http://localhost:3000/movies/Series");
            const series = response.data;

            // Seleccionar una película aleatoria
            const randomSerie = series[Math.floor(Math.random() * series.length)];

            // Guardar los detalles de la película seleccionada
            globalSerieDetails = {
                title: randomSerie.title,
                genre: randomSerie.genre.join(", "),
                year: randomSerie.year,
                rate: randomSerie.rate,
                duration: randomSerie.duration,
                director: randomSerie.director,
                movieReview: randomSerie.movieReview,
            };

            // Renderizar los detalles de la película en el menu-container
            renderSerieDetails();

            // Obtener el tráiler de YouTube basado en el título de la película seleccionada
            generateTrailer(globalSerieDetails.title).then((id) => {
                lastSerieId = id;

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
        globalSerieDetails = JSON.parse(storedMovieDetails);

        // Generar tráiler basado en el título almacenado
        generateTrailer(globalSerieDetails.title).then((id) => {
            lastSerieId = id;

            // Reproducir automáticamente el tráiler
            setupVideo(true);
        });
        renderSerieDetails();

        // borrar localstorage despues de su uso 
        localStorage.removeItem("selectedMovie");
    } else {
        console.log("No se encontró ningún dato en localStorage.");
        loadRandomMovie();
    }
}

const generateSectionSerie = async () => {
    try {
        const resp = await axios.get("http://localhost:3000/movies/Series");
        generateSerie(resp.data);
    } catch (error) {
        console.error('Error al obtener películas:', error.message);
    }
};

function renderSerieDetails() {
    if (!globalSerieDetails) {
        console.error("No hay detalles de película para mostrar.");
        return;
    }

    const menuContainer = document.getElementById('menu-container');
    
    // Eliminar detalles de película previos
    const previousDetails = document.querySelector('.serie-details');
    if (previousDetails) {
        previousDetails.remove();
    }

    // Crea un contenedor para los nuevos detalles de la película
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'serie-details'; // Clase específica para detalles de la película

    const title = document.createElement('h3');
    title.textContent = globalSerieDetails.title;

    const director = document.createElement('p');
    director.textContent = `Director: ${globalSerieDetails.director}`;

    const duration = document.createElement('p');
    duration.textContent = `Duration: ${globalSerieDetails.duration}`;

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${globalSerieDetails.genre}`;

    const year = document.createElement('p');
    year.textContent = `Year: ${globalSerieDetails.year}`;

    const rate = document.createElement('p');
    rate.textContent = `Rating: ${globalSerieDetails.rate}`;

    const movieReview = document.createElement('p');
    movieReview.textContent = `Review: ${globalSerieDetails.movieReview}`;

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

function generateSerie(arraySeries) {
    arraySeries.forEach((series) => {
        const container = document.getElementById('seriesContainer');
        const card = document.createElement("div");
        card.className = "card-container";

        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        const img = document.createElement("img");
        img.src = series.baner;
        img.alt = `poster of ${series.title}`;
        cardFront.appendChild(img);

        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        const title = document.createElement("h3");
        title.textContent = series.title;
        const year = document.createElement("p");
        year.textContent = `Year: ${series.year}`;
        const director = document.createElement("p");
        director.textContent = `Director: ${series.director}`;
        const duration = document.createElement("p");
        duration.textContent = `Duration: ${series.duration}`;
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${series.genre.join(", ")}`;
        const rate = document.createElement("p");
        rate.textContent = `Rating: ${series.rate}`;

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
            const serieDetails = {
                title: series.title,
                genre: series.genre.join(", "),
                year: series.year,
                rate: series.rate,
                duration: series.duration,
                director: series.director,
                movieReview: series.movieReview // Capturamos la reseña de la película
            };
        
            // Añadimos un console.log para ver todos los detalles en la consola
            
            globalSerieDetails = serieDetails;
            console.log("Detalles de la película capturados en el click:", globalSerieDetails);

            // renderisar globalMovieDetails en movie-container
            renderSerieDetails();
        
            generateTrailer(serieDetails.title).then((id) => {
                lastSerieId = id;
        
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
    let serieId;
    if (url.includes('youtu.be/')) {
        serieId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
        serieId = url.split('v=')[1].split('&')[0];
    }
    return serieId ? serieId : 'ID no encontrado';
}

const generateTrailer = async (title) => {
    const url = `http://localhost:3000/movies/trailers?title=${encodeURIComponent(title)}`;
    try {
        const response = await axios.get(url);
        const trailerUrl = response.data;
        let serieId = extractYouTubeId(trailerUrl);
        return serieId;
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
        if (!lastSerieId) {
            console.error('lastSerieId no está definido');
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
            videoId: lastSerieId,
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
    generateSectionSerie,
    setupVideo
};


