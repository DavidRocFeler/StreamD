function changeSection() {
  const divSections = document.getElementById("changeSection");
  const anotherSection = document.getElementById("categoryArrow");

  // Definir todas las secciones disponibles
  const sections = ["Section", "Movies", "Series", "Animes"];
  
  // Determinar el índice inicial basado en la página actual
  let currentIndex = 0;
  const currentPath = window.location.pathname;

  if (currentPath.includes("movies.html")) {
    currentIndex = sections.indexOf("Movies");
  } else if (currentPath.includes("animes.html")) {
    currentIndex = sections.indexOf("Animes");
  } else if (currentPath.includes("series.html")) {
    currentIndex = sections.indexOf("Series");
  } else {
    currentIndex = 0;  // Si estás en otra página, empieza por "Section"
  }

  // Inicializa el texto de la sección correcta al cargar la página
  divSections.textContent = sections[currentIndex];

  // Función para actualizar la sección mostrada (cambia el texto)
  function updateSection() {
    // Solo actualiza la sección si ya no estás en la sección correcta
    currentIndex = (currentIndex + 1) % sections.length;
    divSections.textContent = sections[currentIndex];
  }

  // Función para redirigir según la sección actual
  function enterSection() {
    const currentSection = divSections.textContent;

    if (currentSection === "Movies" && !currentPath.includes("movies.html")) {
      window.location.href = "movies.html";
    } else if (currentSection === "Series" && !currentPath.includes("series.html")) {
      window.location.href = "series.html";
    } else if (currentSection === "Animes" && !currentPath.includes("animes.html")) {
      window.location.href = "animes.html";
    }
  }

  // Añadir el evento para cambiar la sección al hacer clic en `anotherSection`
  anotherSection.addEventListener("click", updateSection);

  // Añadir el evento para redirigir al hacer clic en `divSections`
  divSections.addEventListener("click", enterSection);
}

module.exports = changeSection;
