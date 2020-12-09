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
  uploadImage((result, hideModal) => {
    if (result) {
      showMessageModal("Your dog's photo has been uploaded", hideModal);
    } else {
      showMessageModal("couldn't upload your dog's image", hideModal);
    }

    renderImages();
  })
);

// Image Grid
function showMain() {
  const message = document.querySelector('#message');
  message.innerText = 'Loading';
  message.classList.add('d-none');

  document.querySelector('#main').classList.remove('d-none');
}

function showMessage(msg) {
  document.querySelector('#main').classList.add('d-none');

  const message = document.querySelector('#message');
  message.innerText = msg;
  message.classList.remove('d-none');
}

function closeModal(e, item, modal) {
  e.stopPropagation();

  modal.classList.remove('grid__modal--show');

  const parentPos = item.getBoundingClientRect();
  modal.style.top = parentPos.top + 'px';
  modal.style.left = parentPos.left + 'px';
  modal.style.width = parentPos.width + 'px';
  modal.style.height = parentPos.height + 'px';

  /**
   * Add d-none after transition is complete
   * time must be same as the transition time
   */
  setTimeout(() => {
    modal.classList.add('d-none');
  }, 500);
}

function createModal(image, itemContainer) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('grid__modal', 'd-none');
  itemContainer.appendChild(modalContainer);

  const parentPos = itemContainer.getBoundingClientRect();
  modalContainer.style.top = parentPos.top + 'px';
  modalContainer.style.left = parentPos.left + 'px';
  modalContainer.style.width = parentPos.width + 'px';
  modalContainer.style.height = parentPos.height + 'px';

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContainer.appendChild(modalContent);

  const closeModalBtn = document.createElement('span');
  closeModalBtn.classList.add('icon-close-round', 'modal-content__close');
  modalContent.appendChild(closeModalBtn);

  const modalImage = document.createElement('img');
  modalImage.src = image.src;
  modalImage.alt = image.title;
  modalImage.classList.add('modal-content__img');
  modalContent.appendChild(modalImage);

  const modalInfo = document.createElement('div');
  modalInfo.classList.add('modal-content__info');
  modalContent.appendChild(modalInfo);

  const modalDescription = document.createElement('div');
  modalDescription.classList.add('modal-content__description');
  modalInfo.appendChild(modalDescription);

  const title = document.createElement('h4');
  title.innerText = image.title;
  modalDescription.appendChild(title);

  const description = document.createElement('p');
  description.innerText = image.description;
  modalDescription.appendChild(description);

  const modalPawFives = document.createElement('div');
  modalPawFives.classList.add('modal-content__paw-fives');
  modalInfo.appendChild(modalPawFives);

  const pawImg = document.createElement('img');
  pawImg.src = './assets/images/logo-line.png';
  modalPawFives.appendChild(pawImg);

  const pawCounts = document.createElement('div');
  pawCounts.innerHTML = 1234 + '<br />Paw-fives';
  modalPawFives.appendChild(pawCounts);

  // Hide Modal
  modalContainer.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      closeModal(e, itemContainer, modalContainer);
    }
  });
  closeModalBtn.addEventListener('click', e => {
    closeModal(e, itemContainer, modalContainer);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(e, itemContainer, modalContainer);
    }
  });
}

function renderImages() {
  puppyDB.puppies
    .toArray()
    .then(images => {
      if (images.length === 0) {
        showMessage('No posts');
        return;
      }

      showMain();

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
        // Delete Imapge
        removeBtn.addEventListener('click', e => {
          e.stopPropagation();

          deleteImage(image, (result, hideModal) => {
            if (result) {
              showMessageModal('Image deleted', hideModal);
            } else if (result === false) {
              showMessageModal("Couldn't delete image", hideModal);
            }

            renderImages();
          });
        });
        overlay.appendChild(removeBtn);

        // Create Modal
        setTimeout(() => createModal(image, itemContainer), 0);

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
    })
    .catch(err => {
      console.log('db.list error:', err);
      showMessage('An error occured');
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
