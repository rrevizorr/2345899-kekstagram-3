function randomNumber (start, end) {
  if (start > end || start < 0) {
    throw new Error('Неверные входные данные');
  }

  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function checkMaxLength (str, maxLength) {
  return str.length <= maxLength;
}

export {randomNumber, checkMaxLength};
