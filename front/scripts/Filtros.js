
  const genres = ['Genre', 'Action', 'Comedy', 'Gosth'];
  let currentGenreIndex = 0;
  let initializeGenre = false;
  
  const years = ['Year', '2000', '2010', '2020'];
  let currentYearIndex = 0;
  let initializeYear = false;
  
  const languages = ['Language', 'English', 'Spanish', 'German'];
  let currentLanguageIndex = 0;{
    currentGenreIndex = (currentGenreIndex + 1) % genres.length;
  }
  let initializeLanguages = false;
  
  const ages = ['Ages', '11-14', '14-16', '16+'];
  let currentAgesIndex = 0;
  let initializeAges = false;
  
  function changeGenre() {
    if (initializeGenre) {
      currentGenreIndex = (currentGenreIndex + 1) % genres.length;
    } else {
      initializeGenre = true;
    }
    console.log(`Changing genre to: ${genres[currentGenreIndex]}`);
    document.getElementById('genreDropdown').textContent = genres[currentGenreIndex];
  }

  function changeYear() {
    if (initializeYear) {
      currentYearIndex = (currentYearIndex + 1) % years.length;
    } else {
      initializeYear = true;
    }
    console.log(`Changing year to: ${years[currentYearIndex]}`);
    document.getElementById('yearDropdown').textContent = years[currentYearIndex];
  }

  function changeLanguage() {
    if (initializeLanguages) {
      currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
    } else {
      initializeLanguages = true;
    }
    console.log(`Changing language to: ${languages[currentLanguageIndex]}`);
    document.getElementById('languageDropdown').textContent = languages[currentLanguageIndex];
  }

  function changeAges() {
    if (initializeAges) {
      currentAgesIndex = (currentAgesIndex + 1) % ages.length;
    } else {
      initializeAges = true;
    }
    console.log(`Changing ages to: ${ages[currentAgesIndex]}`);
    document.getElementById('agesDropdown').textContent = ages[currentAgesIndex];
  }

  function applyFilters() {
    const selectedGenre = genres[currentGenreIndex];
    const selectedYear = years[currentYearIndex];
    const selectedLanguage = languages[currentLanguageIndex];
    const selectedAges = ages[currentAgesIndex];
    
    console.log(`Applying filters: Genre=${selectedGenre}, Year=${selectedYear}, Language=${selectedLanguage}, Ages=${selectedAges}`);

    // Aquí puedes agregar la lógica para filtrar las películas
    // Por ejemplo, actualizar el contenido del contenedor de tarjetas (cardsContainer)
  };

  function resetIndices () {
    currentAgesIndex = 0;
    currentYearIndex = 0;
    currentLanguageIndex = 0;
    currentGenreIndex = 0;
    initializeAges = false;
    initializeGenre = false;
    initializeLanguages = false;
    initializeYear = false;
  }

  module.exports = {
    changeGenre,
    changeYear,
    changeLanguage,
    changeAges,
    applyFilters,
    resetIndices
  }

  // asegurar de que las funciones estes disponibles globalmente
  if (typeof window !== 'undefined') {
    window.resetIndices = resetIndices;
    window.changeGenre = changeGenre;
    window.changeYear = changeYear;
    window.changeLanguage = changeLanguage;
    window.changeAges = changeAges;
    window.applyFilters = applyFilters;
  }