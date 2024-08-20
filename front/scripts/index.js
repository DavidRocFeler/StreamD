const changeSection = require("./changeSection");
const searchStream = require("./search");

document.addEventListener("DOMContentLoaded", changeSection)

document.addEventListener("DOMContentLoaded", () => {
  // si se localisa home ejecuta postMovies en Home.html
  if (window.location.href.includes("upload")) {
    const { postMovie, cleanAllFields } = require("./postMovies");

    const submitButton = document.getElementById("submit");
    const cleanButton = document.getElementById("clean");
    console.log("submitButton:", submitButton);
    console.log("cleanButton:", cleanButton);
    if (submitButton) {
      submitButton.addEventListener("click", postMovie);
    }
    if (cleanButton) {
      cleanButton.addEventListener("click", cleanAllFields);
    }

  } else if (!window.location.pathname.includes("movies")) {
    const getAllMOviesAndGenerator = require("./getAllMoviesAndGenerator");
    getAllMOviesAndGenerator();
  }
  searchStream();
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("series")) {
      const { changeGenre, changeYear, changeAges, changeLanguage, applyFilters, resetIndices } = require("./Filtros");
      const { generateSectionSerie, setupVideo } = require("./serieSection");
      const headerScroll = require("./headerScroll");


      generateSectionSerie();
      setupVideo();
      resetIndices();
      changeGenre();
      changeYear();
      changeAges();
      changeLanguage();
      applyFilters();
      headerScroll();
    } 
    else if (window.location.href.includes("animes")) {
      const { changeGenre, changeYear, changeAges, changeLanguage, applyFilters, resetIndices } = require("./Filtros");
      const {generateSectionAnime, setupVideo} = require("../scripts/animeSection")
      const headerScroll = require("./headerScroll");
      
      generateSectionAnime()
      setupVideo();
      resetIndices();
      changeGenre();
      changeYear();
      changeAges();
      changeLanguage();
      applyFilters();
      headerScroll();
    }
    else if (window.location.href.includes("movies")) {
      const { changeGenre, changeYear, changeAges, changeLanguage, applyFilters, resetIndices } = require("./Filtros");
      const headerScroll = require("./headerScroll");
      const { generateSectionMovie, setupVideo} = require("./gerateMoviesSection");
      
      generateSectionMovie();
      setupVideo();
      resetIndices();
      changeGenre();
      changeYear();
      changeAges();
      changeLanguage();
      applyFilters();
      headerScroll();
  
    // Ademas ejecuta getAllMovieAndGenerator en todos los demas archivos
    }
});

if(window.location.pathname.includes("movies")) {
  require("../scripts/menucContainer")
}

if(window.location.pathname.includes("animes")) {
  require("../scripts/menucContainer")
}

if(window.location.pathname.includes("series")) {
  require("../scripts/menucContainer")
}

