const axios = require("axios");
const validation = require("./validation");

const postMovie = async () => {
  // Verifica si el checkbox de "acceptTerms" está marcado
  const acceptTerms = document.getElementById('aceptTerm').checked;
  if (!acceptTerms) {
    alert("You need complete the form."); // Mostrar alerta si no está marcado
    return; // Detener la ejecución de la función si no está marcado
  }

  try {
    const trailersValue = document.getElementById('trailers').value;
    if (!trailersValue) {
      alert("Please provide a trailer URL.");
      return;
    }
    
    const movie = {
      title: document.getElementById('title').value,
      director: document.getElementById('director').value,
      duration: document.getElementById('duration').value,
      rate: parseFloat(document.getElementById('rate').value),
      baner: document.getElementById('baner').value,
      section: document.getElementById('section').value,
      genre: document.getElementById('genre').value.split(/[\s,]+/).filter(Boolean),
      year: parseInt(document.getElementById('year').value),
      movieReview: document.getElementById('movieReview').value,
      trailers: trailersValue,
      acceptTerms: document.getElementById('aceptTerm').checked
    };

    console.log("Datos que se enviarán:", movie); 

    validation();
    const response = await axios.post("http://localhost:3000/movies", movie);
    
    console.log("Response of server:", response.data); 

    if (response.data === "Successfully submitted information") {
      alert('Form Successfully Submitted');
      cleanAllFields();
    } else {
      // alert('Hubo un problema en el envío');
    }
  } catch (error) {
    alert("you need complete the form")
  }
};

function cleanAllFields() {
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
  document.getElementById('message').textContent = "";
  document.getElementById('submit').disabled = false;
  document.getElementById('clean').disabled = false;
}

// Aquí configuramos los event listeners


module.exports = {
  postMovie,
  cleanAllFields
}
