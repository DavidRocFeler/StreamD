const axios = require("axios");
globalSection = null;

const getAllMOviesAndGenerator = async () => {
    try {
        console.log('Llamando a la API de películas...');
        const resp = await axios.get("http://localhost:3000/movies");
        console.log('Datos recibidos de la API:', resp.data);
        generateMovies(resp.data);  // Llama a la función para generar y distribuir las películas
    } catch (error) {
        console.log('Error al obtener películas:', error.message);
    } finally {
        console.log("termine");
    }
};

function generateMovies(arrayMovies) {
    // Obtener los contenedores donde se agregarán las películas
    const containers = [
        document.getElementById('cardsContainer'),
        document.getElementById('cardsContainer2'),
        document.getElementById('cardsContainer3'),
        document.getElementById('cardsContainer4'),
        document.getElementById('cardsContainer5')
    ];

    // Definir cuántas películas mostrar por contenedor
    const moviesPerContainer = 4;

    // Invertir el array para renderizar desde la última película registrada hacia la primera
    const reversedMovies = arrayMovies.slice().reverse();

    // Limpiar los contenedores antes de agregar nuevas tarjetas
    containers.forEach(container => {
        container.innerHTML = '';  // Vacía el contenido actual del contenedor
    });

    // Iterar sobre cada contenedor y añadir las películas correspondientes
    containers.forEach((container, index) => {
        // Calcular el inicio y el final de las películas para cada contenedor
        const start = index * moviesPerContainer;
        const end = start + moviesPerContainer;
        const moviesToRender = reversedMovies.slice(start, end);

        // Añadir cada película al contenedor correspondiente
        moviesToRender.forEach((movie) => {
            // Crear el contenedor principal de la tarjeta
            const card = document.createElement("div");
            card.className = "card-container";

            // Crear el frente de la tarjeta
            const cardFront = document.createElement("div");
            cardFront.className = "card-front";
            const img = document.createElement("img");
            img.src = movie.baner;
            img.alt = `poster of ${movie.title}`;
            cardFront.appendChild(img);

            // Crear el dorso de la tarjeta
            const cardBack = document.createElement("div");
            cardBack.className = "card-back";

            // Crear una imagen en la parte trasera con el mismo banner
            const backImg = document.createElement("img");
            backImg.src = movie.baner;  // Usa la misma imagen que en el frente
            backImg.alt = `poster of ${movie.title} - back`;
            backImg.style.filter = "brightness(20%) opacity(0.6)";  // Aplica el filtro
            backImg.style.transform = "rotateY(180deg)";  // Rota la imagen para el efecto de voltear
            backImg.style.width = "100%";  // Asegura que la imagen ocupe todo el contenedor

            // Añadir la imagen de fondo al dorso
            cardBack.appendChild(backImg);

            const title = document.createElement("h3");
            title.textContent = movie.title;
            const duration = document.createElement("p");
            duration.textContent = movie.duration;
            const genre = document.createElement("p");
            genre.textContent = movie.genre.join(", ");
            const year = document.createElement("h4");
            year.textContent = movie.year;
            const section = document.createElement("h6");
            section.textContent = movie.section;
            const rate = document.createElement("h6");
            rate.textContent = movie.rate;
            const director = document.createElement("h6");
            director.textContent = movie.director;
            const movieReview = document.createElement("h6");
            movieReview.textContent = movie.movieReview;

            // Añadir elementos al dorso de la tarjeta
            cardBack.appendChild(title);
            cardBack.appendChild(duration);
            cardBack.appendChild(genre);
            cardBack.appendChild(year);
            cardBack.appendChild(section);
            cardBack.appendChild(rate);
            cardBack.appendChild(director);
            cardBack.appendChild(movieReview);

            // Añadir el frente y el dorso principal de la tarjeta
            card.appendChild(cardFront);
            card.appendChild(cardBack);

            // Añadir la tarjeta al contenedor correspondiente
            container.appendChild(card);

            card.addEventListener("click", function () {
                const sectionCatch = {
                    section: movie.section
                };
                globalSection = sectionCatch

                const globalStreamDetails = {
                    title: movie.title,
                    genre: movie.genre.join(", "),
                    year: movie.year,
                    rate: movie.rate,
                    duration: movie.duration,
                    director: movie.director,
                    movieReview: movie.movieReview
                };
                 // almacena el titulo en localstorage
                 localStorage.setItem("selectedMovie", JSON.stringify(globalStreamDetails));

                redirectBasedOnSection();
            })
        });
    });
};

function redirectBasedOnSection() {
    if (globalSection && globalSection.section) {
        switch (globalSection.section) {
            case "Animes":
                window.location.pathname = "/pages/animes.html";
                break;
            case "Movie":
                window.location.pathname = "/pages/movies.html";
                break;
            case "Series":
                window.location.pathname = "/pages/series.html";
                break;
            default:
                console.log("Sección no reconocida:", globalSection.section);
                // Puedes agregar un redireccionamiento por defecto si lo necesitas
                // window.location.href = "default.html";
                break;
        }
    } else {
        console.log("globalSection no está definida o no tiene una propiedad 'section'.");
    }
}

// Exporta la función asíncrona
module.exports = getAllMOviesAndGenerator;
