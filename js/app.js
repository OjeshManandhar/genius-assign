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

// Image Grid
const images = [
  {
    src: './assets/images/dog-1.jpg',
    alt: 'Dog 1'
  },
  {
    src: './assets/images/dog-2.jpg',
    alt: 'Dog 2'
  },
  {
    src: './assets/images/dog-3.jpg',
    alt: 'Dog 3'
  },
  {
    src: './assets/images/dog-1.jpg',
    alt: 'Dog 4'
  },
  {
    src: './assets/images/dog-2.jpg',
    alt: 'Dog 5'
  },
  {
    src: './assets/images/dog-3.jpg',
    alt: 'Dog 6'
  }
];

const gridContainer = document.querySelector('#grid');

images.forEach((image, index) => {
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('grid__item-container');
  gridContainer.appendChild(itemContainer);

  const item = document.createElement('div');
  item.classList.add('grid__item');
  itemContainer.appendChild(item);

  const img = document.createElement('img');
  img.src = image.src;
  img.alt = image.alt;
  item.appendChild(img);

  const overlay = document.createElement('div');
  overlay.classList.add('grid__overlay');
  item.appendChild(overlay);

  const removeBtn = document.createElement('span');
  removeBtn.classList.add('icon-close-round');
  removeBtn.addEventListener('click', () => {
    console.log('Remove item:', image, index);
  });
  overlay.appendChild(removeBtn);

  setTimeout(() => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('grid__modal', 'd-none');

    const parentPos = itemContainer.getBoundingClientRect();
    modalContainer.style.top = parentPos.top + 'px';
    modalContainer.style.left = parentPos.left + 'px';
    modalContainer.style.width = parentPos.width + 'px';
    modalContainer.style.height = parentPos.height + 'px';

    modalContainer.addEventListener('click', e => {
      // Hide Modal

      e.stopPropagation();

      modalContainer.classList.remove('grid__modal--show');

      const parentPos = itemContainer.getBoundingClientRect();
      modalContainer.style.top = parentPos.top + 'px';
      modalContainer.style.left = parentPos.left + 'px';
      modalContainer.style.width = parentPos.width + 'px';
      modalContainer.style.height = parentPos.height + 'px';

      /**
       * Add d-none after transition is complete
       * time must be same as the transition time
       */
      setTimeout(() => {
        modalContainer.classList.add('d-none');
      }, 500);
    });

    itemContainer.appendChild(modalContainer);
  }, 0);

  itemContainer.addEventListener('click', e => {
    // Show Modal

    const modal = itemContainer.querySelector('.grid__modal');

    modal.classList.remove('d-none');

    setTimeout(() => {
      modal.classList.add('grid__modal--show');

      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = '100%';
      modal.style.height = '100%';
    }, 0);
  });
});

function adjustPosition() {
  /**
   * Adjust the positions of modal on resize and scroll
   */

  const items = document.querySelectorAll('.grid__item-container');

  items.forEach((item, index) => {
    const parentPos = item.getBoundingClientRect();
    const modal = item.querySelector('.grid__modal');

    if (!modal) return;

    if (!modal.classList.contains('grid__modal--show')) {
      modal.style.top = parentPos.top + 'px';
      modal.style.left = parentPos.left + 'px';
      modal.style.width = parentPos.width + 'px';
      modal.style.height = parentPos.height + 'px';
    }
  });
}

window.addEventListener('resize', adjustPosition);
window.addEventListener('scroll', adjustPosition);
