import { photos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');


photos.forEach((photo) => {
  const newElement = pictureTemplate.cloneNode(true);

  newElement.querySelector('.picture__img').src = photo.url;
  newElement.querySelector('.picture__comments').textContent = photo.comments;
  newElement.querySelector('.picture__likes').textContent = photo.likes;

  fragment.appendChild(newElement);
});

pictures.appendChild(fragment);
