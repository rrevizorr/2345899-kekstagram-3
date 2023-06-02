import { showError } from './util.js';

const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');
let photos;
const requestUrl= 'https://27.javascript.pages.academy/kekstagram-simple/data';
const request = fetch(requestUrl)
  .then((response) => {
    if (response.ok) {
      return response;
    } else {
      showError('Не удалось загрузить данные');
    }
  })
  .then((response) => response.json())
  .then((posts) => {
    photos = posts;
  })
  .catch(() => showError('Не удалось загрузить данные'));

async function displayPhotos() {
  await request;
  photos.forEach((photo) => {
    const newElement = pictureTemplate.cloneNode(true);

    newElement.querySelector('.picture__img').src = photo.url;
    newElement.querySelector('.picture__comments').textContent = photo.comments;
    newElement.querySelector('.picture__likes').textContent = photo.likes;

    fragment.appendChild(newElement);
  });

  pictures.appendChild(fragment);
}
displayPhotos();

