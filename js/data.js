import { randomNumber } from './util.js';
const photos = [];

for (let i = 1; i < 26; i++) {
  const photo = {
    id: i,
    url: `photos/${i}.jpg`,
    description: `Фото под номером ${i}!`,
    likes: randomNumber(15, 200),
    comments: randomNumber(0, 200)
  };
  photos.push(photo);
}

export { photos };
