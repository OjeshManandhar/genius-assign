function getDeleteConfirmation(cb) {
  const confirm = document.querySelector('#confirmation');
  const btnTrue = document.querySelector('#confirmation #btn-true');
  const btnFalse = document.querySelector('#confirmation #btn-false');

  confirm.classList.remove('v-hidden');
  confirm.classList.add('confirmation--show');

  btnTrue.addEventListener('click', () => {
    cb(true);
    confirm.classList.add('v-hidden');
    confirm.classList.remove('confirmation--show');
  });

  btnFalse.addEventListener('click', () => {
    cb(false);
    confirm.classList.add('v-hidden');
    confirm.classList.remove('confirmation--show');
  });
}
