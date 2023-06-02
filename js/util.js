function randomNumber (start, end) {
  if (start > end || start < 0) {
    throw new Error('Неверные входные данные');
  }

  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function checkMaxLength (str, maxLength) {
  return str.length <= maxLength;
}

function showError(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '35%';
  alertContainer.style.top = '10px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.fontFamily = 'Times New Roman';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';
  alertContainer.style.borderRadius = '5px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}


export { randomNumber, checkMaxLength, showError };
