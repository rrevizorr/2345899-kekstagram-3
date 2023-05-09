const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeImgUploadButton = document.querySelector('.img-upload__cancel');

function escapeKeyHandler(ev) {
  if (ev.key === 'Escape') {
    closeImgUpload();
  }
}

function closeImgUpload() {
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', escapeKeyHandler);
}

function openImgUpload() {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', escapeKeyHandler);
}

fileInput.addEventListener('change', openImgUpload);
closeImgUploadButton.addEventListener('click', closeImgUpload);
