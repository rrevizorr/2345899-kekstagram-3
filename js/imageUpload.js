const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeImgUploadButton = document.querySelector('.img-upload__cancel');
const newImage = document.querySelector('.img-upload__preview > img');
const body = document.body;

function escapeKeyHandler(ev) {
  if (ev.key === 'Escape') {
    closeImgUpload();
  }
}

function closeImgUpload() {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyHandler);
}

function showAlert(isSuccess) {
  const templateName = isSuccess ? '#success' : '#error';
  const template = document.querySelector(templateName).content.cloneNode(true);
  const messageClass = isSuccess ? '.success' : '.error';
  const message = template.querySelector(messageClass);
  const button = template.querySelector(isSuccess ? '.success__button' : '.error__button');
  button.addEventListener('click', () => hideMessage(isSuccess));

  document.addEventListener('keydown', (evt) => onEscKeyPress(evt));
  document.addEventListener('click', (evt) => onDocumentClick(evt));
  document.body.append(message);
}

function hideMessage(isSuccess) {
  const message = document.querySelector(isSuccess ? '.success' : '.error');
  message.remove();
  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onDocumentClick);
}

function onEscKeyPress(evt) {
  if (evt.key === 'Escape') {
    const successMessage = document.querySelector('.success');
    const errorMessage = document.querySelector('.error');
    if (successMessage) {
      hideMessage(true);
    }
    if (errorMessage) {
      hideMessage(false);
    }
  }
}

function onDocumentClick(evt) {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');
  const successInner = document.querySelector('.success__inner');
  const errorInner = document.querySelector('.error__inner');
  if (successMessage && successMessage.contains(evt.target) && !successInner.contains(evt.target)) {
    hideMessage(true);
    return;
  }
  if (errorMessage && errorMessage.contains(evt.target) && !errorInner.contains(evt.target)) {
    hideMessage(false);
  }
}

function openImgUpload() {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeyHandler);
  newImage.src = window.URL.createObjectURL(fileInput.files[0]);
}

fileInput.addEventListener('change', openImgUpload);
closeImgUploadButton.addEventListener('click', closeImgUpload);

export { closeImgUpload, showAlert };
