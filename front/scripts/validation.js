const validation = () => {
  const form = document.querySelector('.was-validated');
  const submitButton = document.getElementById('submit');
  const cleanButton = document.getElementById('clean');
  const inputs = form.querySelectorAll('input, textarea, select');
  const genreInput = document.getElementById("genre");
  const message = document.getElementById("message");

  // Función para verificar los géneros ingresados
  function submitClickInvalid() {
    document.getElementById("submit").addEventListener("click", function(event) {
      if (!validateGenres()) {
        event.preventDefault(); // Prevenir que el formulario se envíe si la validación falla
      }
    });
  }
  
  function validateGenres() {
    const genreInput = document.getElementById("genre"); // Asegúrate de obtener el input
    const genres = genreInput.value.split(/[\s,]+/).filter(Boolean);
    const message = document.getElementById("message"); // Asumiendo que tienes un elemento con este ID para mostrar mensajes
  
    if (genres.length == 0) {
      message.textContent = "You need enter genre ";
      return false;
    } else {
      message.textContent = "";
      return true;
    }
  }
  
  // Llamar a la función submitClickInvalid para asociar el evento
  submitClickInvalid();
  

  // Función para verificar si todos los campos están llenos
  function areAllFieldsFilled() {
    return Array.from(inputs).every(input => {
      if (input.type === 'checkbox') {
        return input.checked;
      }
      return input.value.trim() !== '';
    }) && validateGenres();
  }

  // Función para limpiar todos los campos
  function cleanAllFields() {
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });
    genres = [];
    message.textContent = "";
    submitButton.disabled = true; // Deshabilitar el botón de envío después de limpiar
    cleanButton.disabled = true; // Deshabilitar el botón de limpieza después de limpiar
  }

  // Habilitar/deshabilitar el botón de envío
  function toggleSubmitButton() {
    const allFieldsFilled = areAllFieldsFilled();
    submitButton.disabled = false;
    cleanButton.disabled = false;

  // Habilitar el botón de limpieza desde el inicio
  cleanButton.disabled = false;
  }
  // Agregar event listeners a todos los inputs
  inputs.forEach(input => {
    input.addEventListener('input', toggleSubmitButton);
  });

  // Event listener para el cambio en el campo de géneros
  genreInput.addEventListener('input', validateGenres);

  // Event listener para el envío del formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (areAllFieldsFilled()) {
      // Mostrar alerta de éxito
      alert('Form Successfully Submitted');
      // Limpiar todos los campos
      cleanAllFields();
    } else {
      //todos los campos son requerid
    }
  });

  // Event listener para el botón de limpieza
  cleanButton.addEventListener('click', cleanAllFields);

  // Verificar el estado inicial de los botones
  toggleSubmitButton();
};

module.exports = validation;
