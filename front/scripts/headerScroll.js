  function headerScroll () {
    const header = document.querySelector('header');
        
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Ajusta este valor según necesites
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
  }

  module.exports = headerScroll;
        