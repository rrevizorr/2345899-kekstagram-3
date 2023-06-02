import { showAlert, closeImgUpload } from './imageUpload.js';
import { setEffect } from './imageEdit.js';

const imageForm = document.querySelector('.img-upload__form');
const comment = imageForm.querySelector('.text__description');
const sendUrl = 'https://27.javascript.pages.academy/kekstagram-simple';
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__text',
  successClass: 'img-upload__text--valid',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'form__error',
  errorTextTag: 'span'
});


function sendData(onSuccess, body) {
  let errorFlag = false;
  fetch(`${sendUrl}`, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess(response.json());
        showAlert(true);
      } else {
        errorFlag = true;
        showAlert(false);
      }
    })
    .then((data) => {
      onSuccess(data);
      if (!errorFlag) {
        document.querySelector('.img-upload__preview > img').src = 'img/upload-default-image.jpg';
        document.querySelector('.scale__control--value').value = 100;
        document.querySelector('.text__description').value = '';
        document.querySelector('.text__hashtags').value = '';
        setEffect('original', true);
      }
    })
    .catch(() => {
      errorFlag = true;
      showAlert(false);
    });
}

comment.addEventListener('change', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


imageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.querySelector('.img-upload__submit').disabled = true;
    sendData( () => {
      evt.target.querySelector('.img-upload__submit').disabled = false;
    },
    new FormData(evt.target)
    );
    closeImgUpload();
  }
});


