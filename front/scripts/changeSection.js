function changeSection() {
  const divSections = document.getElementById("changeSection");
  const anotherSection = document.getElementById("categoryArrow");
  const sections = ["Section", "Movies", "Series", "Animes"];
  let currentIndex = 0;

  // Función para actualizar la sección mostrada
  function updateSection() {
    divSections.textContent = sections[currentIndex];
    currentIndex = (currentIndex + 1) % sections.length;
  }

  // Función para redirigir según la sección actual
  function enterSection() {
    const currentSection = divSections.textContent;

    if (currentSection === "Movies") {
      window.location.href = "movies.html";
    } else if (currentSection === "Series") {
      window.location.href = "series.html";
    } else if (currentSection === "Animes") {
      window.location.href = "animes.html";
    }
  }

  // Añadir el evento para cambiar la sección al hacer clic en `anotherSection`
  anotherSection.addEventListener("click", updateSection);

  // Añadir el evento para redirigir al hacer clic en `divSections`
  divSections.addEventListener("click", enterSection);

  // Inicializa con la primera sección
  updateSection();
}

module.exports = changeSection;
