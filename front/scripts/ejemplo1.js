// const axios = require("axios");
// let lastMovieId = "";
// let player = null;

// const generateSectionMovie = async () => {
//     try {
//         const resp = await axios.get("http://localhost:3000/movies/Movie");
//         generateMovies(resp.data);
//     } catch (error) {
//         console.error('Error al obtener películas:', error.message);
//     }
// };

// function generateMovies(arrayMovies) {
//     arrayMovies.forEach((movie) => {
//         const container = document.getElementById('cardsContainer');
//         const card = document.createElement("div");
//         card.className = "card-container";

//         const cardFront = document.createElement("div");
//         cardFront.className = "card-front";
//         const img = document.createElement("img");
//         img.src = movie.baner;
//         img.alt = `poster of ${movie.title}`;
//         cardFront.appendChild(img);

//         const cardBack = document.createElement("div");
//         cardBack.className = "card-back";
//         const title = document.createElement("h3");
//         title.textContent = movie.title;
//         const year = document.createElement("p");
//         year.textContent = `Year: ${movie.year}`;
//         const director = document.createElement("p");
//         director.textContent = `Director: ${movie.director}`;
//         const duration = document.createElement("p");
//         duration.textContent = `Duration: ${movie.duration}`;
//         const genre = document.createElement("p");
//         genre.textContent = `Genre: ${movie.genre.join(", ")}`;
//         const rate = document.createElement("p");
//         rate.textContent = `Rating: ${movie.rate}`;

//         cardBack.appendChild(title);
//         cardBack.appendChild(year);
//         cardBack.appendChild(director);
//         cardBack.appendChild(duration);
//         cardBack.appendChild(genre);
//         cardBack.appendChild(rate);

//         card.appendChild(cardFront);
//         card.appendChild(cardBack);
//         container.appendChild(card);

//         card.addEventListener("click", function () {
//             const movieTitle = movie.title;
//             generateTrailer(movieTitle).then((id) => {
//                 lastMovieId = id;

//                 // Desplazar la página a la parte superior
//                 window.scrollTo({ top: 0, behavior: 'smooth' });

//                 // Esperar un pequeño tiempo para asegurarse de que el scroll ha terminado
//                 setTimeout(() => {
//                     setupVideo(true); // Pasar true para iniciar reproducción automática
//                 }, 300);  // Ajusta este valor según sea necesario
//             });
//         });
//     });
// }

// function extractYouTubeId(url) {
//     let movieId;
//     if (url.includes('youtu.be/')) {
//         movieId = url.split('youtu.be/')[1];
//     } else if (url.includes('youtube.com/watch?v=')) {
//         movieId = url.split('v=')[1].split('&')[0];
//     }
//     return movieId ? movieId : 'ID no encontrado';
// }

// const generateTrailer = async (title) => {
//     const url = `http://localhost:3000/movies/trailers?title=${encodeURIComponent(title)}`;
//     try {
//         const response = await axios.get(url);
//         const trailerUrl = response.data;
//         let movieId = extractYouTubeId(trailerUrl);
//         return movieId;
//     } catch (error) {
//         console.error("Error al traer el link", error);
//     }
// };

// function setupVideo(autoPlay = false) { // autoPlay es true si se debe iniciar automáticamente
//     const menuIcon = document.getElementById('menu-toggle');
//     const menuContainer = document.getElementById('menu-container');

//     if (typeof YT !== 'undefined' && YT.Player) {
//         createOrUpdatePlayer(autoPlay);
//     } else {
//         window.onYouTubeIframeAPIReady = () => createOrUpdatePlayer(autoPlay);
//     }

//     function createOrUpdatePlayer(autoPlay) {
//         if (!lastMovieId) {
//             console.error('lastMovieId no está definido');
//             return;
//         }

//         if (player) {
//             player.destroy(); // Destruir el reproductor anterior si existe
//         }

//         player = new YT.Player('main-video', {
//             videoId: lastMovieId,
//             playerVars: {
//                 'modestbranding': 1,
//                 'rel': 0,
//                 'controls': 0
//             },
//             events: {
//                 'onReady': function (event) {
//                     onPlayerReady(event, autoPlay); // Pasar autoPlay a onPlayerReady
//                 },
//                 'onStateChange': onPlayerStateChange
//             }
//         });
//     }

//     function onPlayerReady(event, autoPlay) {
//         if (autoPlay) {
//             player.playVideo(); // Reproducir automáticamente si autoPlay es true
//         }

//         menuIcon.addEventListener('click', function (event) {
//             if (window.scrollY === 0) {
//                 event.stopPropagation();
//                 menuContainer.classList.toggle('open');

//                 if (menuContainer.classList.contains('open')) {
//                     player.playVideo();
//                 } else {
//                     player.pauseVideo();
//                 }
//             }
//         });

//         document.addEventListener('scroll', function () {
//             if (window.scrollY > 0) {
//                 menuIcon.style.filter = 'brightness(0.5)';
//             } else {
//                 menuIcon.style.filter = 'brightness(1)';
//             }

//             if (menuContainer.classList.contains('open')) {
//                 menuContainer.classList.remove('open');
//                 player.pauseVideo();
//             }

//             const rect = player.getIframe().parentElement.getBoundingClientRect();
//             const isVisible = (
//                 rect.top >= 0 &&
//                 rect.left >= 0 &&
//                 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//                 rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//             );

//             if (!isVisible) {
//                 player.pauseVideo();
//             } else if (menuContainer.classList.contains('open')) {
//                 player.playVideo();
//             }
//         });

//         document.addEventListener('click', function (event) {
//             if (menuContainer.classList.contains('open') && !menuContainer.contains(event.target) && !menuIcon.contains(event.target)) {
//                 menuContainer.classList.remove('open');
//                 player.pauseVideo();
//             }
//         });
//     }

//     function onPlayerStateChange(event) {
//         if (event.data == YT.PlayerState.ENDED) {
//             console.log('El video ha terminado');
//         }
//     }
// }

// // Cargar la API de YouTube en el documento si aún no está cargada
// if (typeof YT === 'undefined') {
//     var tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// } else {
//     setupVideo();
// }


// // funcion para reproducir trailer 
// function setupVideo() {
//     const menuIcon = document.getElementById('menu-toggle');
//     const menuContainer = document.getElementById('menu-container');

//     // Inicializar la variable controlsEnable
//     let controlsEnable = 0;

//     // Crear el reproductor de YouTube
//     if (typeof YT !== 'undefined' && YT.Player) {
//         createPlayer();
//     } else {
//         // Esperar a que la API de YouTube esté lista si aún no lo está
//         window.onYouTubeIframeAPIReady = createPlayer;
//     }

//     function createPlayer() {
//         if (!lastMovieId) {
//             console.error('lastMovieId no está definido');
//             return;
//         }
//         var player = new YT.Player('main-video', {
//             videoId: lastMovieId,  //variable con el ID del video que se cargara
//             playerVars: {
//                 'modestbranding': 1,
//                 'rel': 0,
//                 'controls': controlsEnable
//             },
//             events: {
//                 'onReady': onPlayerReady,
//                 'onStateChange': onPlayerStateChange
//             }
//         });

//         function onPlayerReady(event) {
//             // El video está listo para ser controlado
//             menuIcon.addEventListener('click', function(event) {
//                 // Verificar si la posición de scroll es igual a 0
//                 if (window.scrollY === 0) {
//                     // Prevenir que el evento click del documento cierre inmediatamente el menú
//                     event.stopPropagation();
                    
//                     // Abrir o cerrar el menú
//                     menuContainer.classList.toggle('open');

//                     // Reproducir o pausar el video según el estado del menú
//                     if (menuContainer.classList.contains('open')) {
//                         player.playVideo();  // Reproducir el video
//                     } else {
//                         player.pauseVideo();  // Pausar el video
//                     }
//                 }
//             });            

//             // Agregar el evento scroll
//             document.addEventListener('scroll', function() {
//                 // Aplicar el estilo de brillo si el scroll no está en la parte superior
//                 if (window.scrollY > 0) {
//                     menuIcon.style.filter = 'brightness(0.5)';
//                 } else {
//                     // Remover el estilo de brillo si el scroll está en la parte superior
//                     menuIcon.style.filter = 'brightness(1)';
//                 }

//                 // Verificar si el menú está abierto
//                 if (menuContainer.classList.contains('open')) {
//                     // Cerrar el menú
//                     menuContainer.classList.remove('open');
                    
//                     // Pausar el video
//                     player.pauseVideo();
//                 }

//                 // Verificar si el video está visible en la ventana
//                 const rect = player.getIframe().parentElement.getBoundingClientRect();
//                 const isVisible = (
//                     rect.top >= 0 &&
//                     rect.left >= 0 &&
//                     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//                     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//                 );

//                 // Pausar el video si no es visible
//                 if (!isVisible) {
//                     player.pauseVideo();
//                 } else if (menuContainer.classList.contains('open')) {
//                     // Reproducir el video si es visible y el menú está abierto
//                     player.playVideo();
//                 }
//             });

//             // Agregar el evento click al documento para cerrar el menú cuando se haga clic fuera
//             document.addEventListener('click', function(event) {
//                 // Verificar si el menú está abierto y si el clic fue fuera del contenedor del menú
//                 if (menuContainer.classList.contains('open') && !menuContainer.contains(event.target) && !menuIcon.contains(event.target)) {
//                     // Cerrar el menú
//                     menuContainer.classList.remove('open');
                    
//                     // Pausar el video
//                     player.pauseVideo();
//                 }
//             });
//         }

//         function onPlayerStateChange(event) {
//             if (event.data == YT.PlayerState.ENDED) {
//                 console.log('El video ha terminado');
//             }
//         }
//     }
// }

// // Cargar la API de YouTube en el documento si aún no está cargada
// if (typeof YT === 'undefined') {
//     var tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// } else {
//     // La API ya está cargada, inicializa el reproductor
//     setupVideo();
// }

// function setupVideo () {
//         const video = document.getElementById('main-video');
//         const menuIcon = document.getElementById('menu-toggle');
//         const menuContainer = document.getElementById('menu-container');
//         const logoInMenu = document.getElementById('logo-in-menu');
//         const videoDuration = video.duration;

//         // Mute the video initially
//         video.muted = true;
    
//         // Set video to start from the middle
//         video.addEventListener('loadedmetadata', () => {
//             video.currentTime = video.duration / 2;
//             video.play();
//         });

//         // Loop video every 2 minutes
//         setInterval(() => {
//             if (video.currentTime >= (video.duration / 2) + 120) {
//                 video.currentTime = video.duration / 2;
//             }
//         }, 1000);

//         // Observer options
//         const observerOptions = {
//             root: null,
//             threshold: 1.0 // The video should be fully visible
//         };

//         // Observer callback
//         const observerCallback = (entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.intersectionRatio === 1) {
//                     // Video is fully visible, enable menu icon and play video
//                     menuIcon.style.pointerEvents = 'auto';
//                     menuIcon.style.opacity = 1;
//                     video.play();
//                 } else {
//                     // Video is not fully visible, disable menu icon and pause video
//                     menuIcon.style.pointerEvents = 'none';
//                     menuIcon.style.opacity = 0.5;
//                     video.pause();
//                     menuContainer.classList.remove('open');
//                 }
//             });
//         };

//         // Intersection observer
//         const observer = new IntersectionObserver(observerCallback, observerOptions);
//         observer.observe(video.parentElement);

//         // Menu icon click event
//         menuIcon.addEventListener('click', (event) => {
//             event.stopPropagation();
//             menuContainer.classList.toggle('open');
//             video.muted = !menuContainer.classList.contains('open'); // Toggle mute based on menu state
//         });
    
//         // Close menu on document click
//         document.addEventListener('click', (event) => {
//             if (!menuContainer.contains(event.target) && !menuIcon.contains(event.target) && menuContainer.classList.contains('open')) {
//                 menuContainer.classList.remove('open');
//                 video.muted = true; // Mute the video
//             }
//         });

//         // Close menu on scroll and pause video
//         document.addEventListener('scroll', () => {
//             if (menuContainer.classList.contains('open')) {
//                 menuContainer.classList.remove('open');
//                 video.muted = true; // Mute the video
//             }
//             // Check if video is in view
//             const rect = video.parentElement.getBoundingClientRect();
//             const isVisible = (
//                 rect.top >= 0 &&
//                 rect.left >= 0 &&
//                 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//                 rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//             );

//             if (!isVisible) {
//                 video.pause();
//             } else if (menuContainer.classList.contains('open')) {
//                 video.play();
//             }
//         });

//         // Logo click event to restart video and enter fullscreen
//         logoInMenu.addEventListener('click', (event) => {
//             event.stopPropagation();
//             video.currentTime = 0; // Reset video to start
//             video.play(); // Play the video
        
//             // Enter fullscreen mode
//             if (video.requestFullscreen) {
//                 video.requestFullscreen();
//             } else if (video.mozRequestFullScreen) { // Firefox
//                 video.mozRequestFullScreen();
//             } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
//                 video.webkitRequestFullscreen();
//             } else if (video.msRequestFullscreen) { // IE/Edge
//                 video.msRequestFullscreen();
//             }
//             video.controls = true;
//         });
//     };

// module.exports = setupVideo;