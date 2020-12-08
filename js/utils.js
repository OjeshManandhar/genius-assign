function getDeleteConfirmation(cb) {
  const confirm = document.querySelector('#confirmation');
  const btnTrue = document.querySelector('#confirmation #btn-true');
  const btnFalse = document.querySelector('#confirmation #btn-false');

  function handleKeydown(e) {
    console.log(e.key);
    if (e.key === 'Escape') {
      cb(false);
      hideConfirmation();
    }
  }

  function hideConfirmation() {
    confirm.classList.add('v-hidden');
    confirm.classList.remove('confirmation--show');
    document.removeEventListener('keydown', handleKeydown);
  }

  // Show confirmation
  confirm.classList.remove('v-hidden');
  confirm.classList.add('confirmation--show');
  document.addEventListener('keydown', handleKeydown);

  btnTrue.addEventListener('click', () => {
    cb(true);
    hideConfirmation();
  });

  btnFalse.addEventListener('click', () => {
    cb(false);
    hideConfirmation();
  });
}
