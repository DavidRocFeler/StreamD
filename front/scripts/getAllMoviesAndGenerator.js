const axios = require("axios");

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

            // Añadir elementos al dorso de la tarjeta
            cardBack.appendChild(title);
            cardBack.appendChild(year);
            cardBack.appendChild(director);
            cardBack.appendChild(duration);
            cardBack.appendChild(genre);
            cardBack.appendChild(rate);

            // Añadir el frente y el dorso principal de la tarjeta
            card.appendChild(cardFront);
            card.appendChild(cardBack);

            // Añadir la tarjeta al contenedor correspondiente
            container.appendChild(card);
        });
    });
}

// Exporta la función asíncrona
module.exports = getAllMOviesAndGenerator;
