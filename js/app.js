// Nav
const navInput = document.querySelector('.nav__input');
const navPlaceholder = document.querySelector('.nav__placeholder');

navInput.addEventListener('input', () => {
  if (navInput.value === '') {
    navInput.classList.remove('bg-white');
    navPlaceholder.classList.remove('d-none');
  } else {
    navInput.classList.add('bg-white');
    navPlaceholder.classList.add('d-none');
  }
});

// Upload
const uploadBtn = document.querySelector('.nav .btn');

uploadBtn.addEventListener('click', () => {
  console.log('Show Upload Modal');
});
