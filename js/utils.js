function getDeleteConfirmation(cb) {
  const confirm = document.querySelector('#confirmation');
  const btnTrue = document.querySelector('#confirmation #btn-true');
  const btnFalse = document.querySelector('#confirmation #btn-false');

  function hideConfirmation() {
    confirm.classList.add('v-hidden');
    confirm.classList.remove('confirmation--show');

    btnTrue.removeEventListener('click', handleBtnClick);
    btnFalse.removeEventListener('click', handleBtnClick);
    document.removeEventListener('keydown', handleKeydown);
    confirm.removeEventListener('click', handleConfirmClick);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      cb(false);
      hideConfirmation();
    }
  }

  function handleConfirmClick(e) {
    if (e.target === e.currentTarget) {
      cb(false);
      hideConfirmation();
    }
  }

  function handleBtnClick(e) {
    const targetId = e.target.id;

    if (targetId === btnTrue.id) {
      cb(true);
    } else if (targetId === btnFalse.id) {
      cb(false);
    }

    hideConfirmation();
  }

  // Show confirmation
  confirm.classList.remove('v-hidden');
  confirm.classList.add('confirmation--show');

  btnTrue.addEventListener('click', handleBtnClick);
  btnFalse.addEventListener('click', handleBtnClick);
  document.addEventListener('keydown', handleKeydown);
  confirm.addEventListener('click', handleConfirmClick);
}
