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

uploadBtn.addEventListener('click', () =>
  uploadImage(image => {
    image.id = images.length;

    images.push(image);

    window.alert("Your dog's photo has been uploaded");

    renderImages();
  })
);

// Image Grid
const images = [
  {
    id: 1,
    src: './assets/images/dog-1.jpg',
    title: 'Dog 1',
    description: 'Dog 1'
  },
  {
    id: 2,
    src: './assets/images/dog-2.jpg',
    title: 'Dog 2',
    description: 'Dog 2'
  },
  {
    id: 3,
    src: './assets/images/dog-3.jpg',
    title: 'Dog 3',
    description: 'Dog 3'
  },
  {
    id: 4,
    src: './assets/images/dog-1.jpg',
    title: 'Dog 4',
    description: 'Dog 4'
  },
  {
    id: 5,
    src: './assets/images/dog-2.jpg',
    title: 'Dog 5',
    description: 'Dog 5'
  },
  {
    id: 6,
    src: './assets/images/dog-3.jpg',
    title: 'Dog 6',
    description: 'Dog 6'
  }
];

function createModal(itemContainer) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('grid__modal', 'd-none');
  itemContainer.appendChild(modalContainer);

  const parentPos = itemContainer.getBoundingClientRect();
  modalContainer.style.top = parentPos.top + 'px';
  modalContainer.style.left = parentPos.left + 'px';
  modalContainer.style.width = parentPos.width + 'px';
  modalContainer.style.height = parentPos.height + 'px';

  // Hide Modal
  modalContainer.addEventListener('click', e => {
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
}

function renderImages() {
  const gridContainer = document.querySelector('#grid');

  // Remove previous items
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Add new items
  images.forEach(image => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('grid__item-container');
    gridContainer.appendChild(itemContainer);

    const item = document.createElement('div');
    item.classList.add('grid__item');
    itemContainer.appendChild(item);

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.title;
    item.appendChild(img);

    const overlay = document.createElement('div');
    overlay.classList.add('grid__overlay');
    item.appendChild(overlay);

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('icon-close-round');
    removeBtn.addEventListener('click', e => {
      e.stopPropagation();

      getDeleteConfirmation(result => {
        if (result) {
          const index = images.findIndex(i => i.id === image.id);
          if (index !== -1) {
            images.splice(index, 1);
            renderImages();
          }
        }
      });
    });
    overlay.appendChild(removeBtn);

    // Create Modal
    setTimeout(() => createModal(itemContainer), 0);

    // Show Modal
    itemContainer.addEventListener('click', () => {
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
}

function adjustPosition() {
  /**
   * Adjust the positions of modal on resize and scroll
   */

  const items = document.querySelectorAll('.grid__item-container');

  items.forEach(item => {
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

renderImages();
