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

function checkUserId(id) {
  if (id / 10 <= 1) {
    // singal digit
    if (id === 7) {
      return true;
    }

    return false;
  }

  let sum = 0;

  while (id) {
    sum += id % 10;
    id = Math.floor(id / 10);
  }

  return checkUserId(sum);
}

function uploadImage() {
  let isImageUploaded = false;

  const upload = document.querySelector('#upload');
  const error = upload.querySelector('.form__error');
  const closeBtn = upload.querySelector('.upload__close');
  const imgInput = upload.querySelector('input[type="file"]');
  const imgPreview = upload.querySelector('.form__preview img');
  const title = upload.querySelector('.form__input[name="title"]');
  const uploadImageBtn = upload.querySelector('.form__input--image');
  const secretId = upload.querySelector('.form__input[name="userId"]');
  const description = upload.querySelector('.form__input[name="description"]');

  function hideModal() {
    upload.classList.remove('modal--show');

    upload.removeEventListener('click', handleModalClick);
    document.removeEventListener('keydown', handleKeydown);
    closeBtn.removeEventListener('click', handleModalClick);
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
  closeBtn.addEventListener('click', handleModalClick);

  // For selecting image
  uploadImageBtn.addEventListener('click', () => {
    imgInput.click();
  });

  // Render image in Preview
  imgInput.addEventListener('change', () => {
    if (imgInput.files && imgInput.files[0]) {
      const file = imgInput.files[0];
      const reader = new FileReader();

      // check file is image or not
      if (file.type.split('/')[0] !== 'image') {
        error.innerText = 'Please upload an image';
        error.classList.remove('v-hidden');
        return;
      }

      // Uploaded file is image
      reader.onload = function () {
        // result is base64 string
        const result = reader.result;

        imgPreview.src = result;
        imgPreview.classList.remove('d-none');
        isImageUploaded = true;
      };

      reader.readAsDataURL(file);
    }
  });

  // Form submit
  upload.addEventListener('submit', e => {
    e.preventDefault();

    if (!isImageUploaded) {
      error.innerText = 'Please upload an image';
      error.classList.remove('v-hidden');
      return;
    }

    // Check userId
    if (!checkUserId(parseInt(secretId.value, 10))) {
      error.innerText = 'Invalid user Id';
      error.classList.remove('v-hidden');
      return;
    }

    // Save image
    console.log('Save image');
  });
}
