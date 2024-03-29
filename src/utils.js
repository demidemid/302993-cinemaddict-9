export const getRandomBool = (chance = 0.5) => Math.random() > chance;

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomlyReducedArray = (arr, newLength) => {
  const arrCopy = arr.slice();
  return new Array(newLength).fill(``).map(() => arrCopy.splice(Math.random() * arrCopy.length - 1, 1)[0]);
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент
export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element !== null) {
    element.remove();
  }
};

const Key = {
  ESCAPE: `Escape`,
  ESCAPE_IE: `Esc`,
  ENTER: `Enter`,
};

export const isEscapeKey = ({key}) =>
  key === Key.ESCAPE || key === Key.ESCAPE_IE;

export const isCtrlEnter = (evt) =>
  evt.ctrlKey && evt.key === Key.ENTER;

export const getPluralOfWord = (number, arr) => {
  return number === 1 ? arr[0] : arr[1];
};
