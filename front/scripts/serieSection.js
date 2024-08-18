const axios = require("axios");

const generateSectionSerie = async () => {
    try {
        console.log('Llamando a la API de películas...');
        const resp = await axios.get("http://localhost:3000/movies/Series");
        console.log('Datos recibidos de la API:', resp.data);
        generateSerie(resp.data);
    } catch (error) {
        console.log('Error al obtener series:', error.message);
    } finally {
        console.log("termine");
    }
};
    
    
        function generateSerie (arraySeries){
            arraySeries.forEach((series) => {
        //article
        const container = document.getElementById('seriesContainer');
        // Crear el contenedor principal de la tarjeta
        const card = document.createElement("div");
        card.className = "card-container";

        // Crear el frente de la tarjeta
        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        const img = document.createElement("img");
        img.src = series.baner;
        img.alt = `poster of ${series.title}`;
        cardFront.appendChild(img);

        // Crear el dorso de la tarjeta
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
        
        // Añadir la tarjeta al contenedor principal
        container.appendChild(card);
        });
    };

module.exports = generateSectionSerie;

