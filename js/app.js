// Nav
const navInput = document.querySelector('.nav__input');
const navPlaceholder = document.querySelector('.nav__placeholder');

console.log(navInput, navPlaceholder);

navInput.addEventListener('input', () => {
  if (navInput.value === '') {
    navPlaceholder.classList.remove('d-none');
  } else {
    navPlaceholder.classList.add('d-none');
  }
});
