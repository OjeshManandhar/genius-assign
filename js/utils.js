function getDeleteConfirmation(cb) {
  Math.random() > 0.5 ? cb(true) : cb(false);
}
