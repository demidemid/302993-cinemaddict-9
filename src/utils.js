export const getRandomBool = (chance = 0.5) => Math.random() > chance;

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomlyReducedArray = (arr, newLength) => {
  const arrCopy = arr.slice();
  return new Array(newLength).fill(``).map(() => arrCopy.splice(Math.random() * arrCopy.length - 1, 1)[0]);
};
