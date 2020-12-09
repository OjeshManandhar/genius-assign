function getDeleteConfirmation(cb) {
  const confirm = document.querySelector('#confirmation');
  const btnTrue = document.querySelector('#confirmation #btn-true');
  const btnFalse = document.querySelector('#confirmation #btn-false');

  function hideModal() {
    confirm.classList.remove('modal--show');

    btnTrue.removeEventListener('click', handleBtnClick);
    btnFalse.removeEventListener('click', handleBtnClick);
    document.removeEventListener('keydown', handleKeydown);
    confirm.removeEventListener('click', handleModalClick);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      cb(false);
      hideModal();
    }
  }

  function handleModalClick(e) {
    if (e.target === e.currentTarget) {
      cb(false);
      hideModal();
    }
  }

  function handleBtnClick(e) {
    const targetId = e.target.id;

    if (targetId === btnTrue.id) {
      cb(true);
    } else if (targetId === btnFalse.id) {
      cb(false);
    }

    hideModal();
  }

  // Show Modal
  confirm.classList.add('modal--show');

  btnTrue.addEventListener('click', handleBtnClick);
  btnFalse.addEventListener('click', handleBtnClick);
  document.addEventListener('keydown', handleKeydown);
  confirm.addEventListener('click', handleModalClick);
}

function uploadImage() {
  const upload = document.querySelector('#upload');

  function hideModal() {
    upload.classList.remove('modal--show');

    upload.removeEventListener('click', handleModalClick);
    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      hideModal();
    }
  }

  function handleModalClick(e) {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  }

  // Show Modal
  upload.classList.add('modal--show');

  upload.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleKeydown);
}
