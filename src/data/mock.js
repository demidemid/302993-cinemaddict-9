import {getRandomItem, getRandomInt, getRandomBool, getRandomlyReducedArray} from '../utils';

const TITLES = [`Made for Each Other`, `Popeye Meets Sinbad`, `Sagebrush Trail`, `Santa Claus Conquers The Martians`, `The Dance of Life`, `The Great Flamarion`, `The Man With The Golden Arm`, `12 Angry Men`, `Schindler's Lis`, `Pulp Fiction`, `The Lord of the Rings: The Return of the King`, `The Godfather: Part II`, `The Godfather `, `The Shawshank Redemption`, `Il buono, il brutto, il cattivo`];

const imageFileNames = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const DURATIONS = [`1h 59m`, `2h 30m`, `1h 37m`, `4h 15m`, `2h 15m`, `1h 46m`, `1h 55m`];

export const GENRES = [`Crime`, `Drama`, `Mystery`, `Thriller`, `Action`, `Comedy`, `Documentary`, `Adventure`, `Sci-Fi`, `Horror`, `Western`, `Biography`, `Fantasy`, `Musical`];

const MovieRaiting = {
  MIN: 6,
  MAX: 10,
};

const ItemsPerScope = {
  MIN: 1,
  MAX: 3,
};

const commentsCount = {
  MIN: 0,
  MAX: 20,
};

export const cardDisplay = {
  TOTAL: 5,
  PER_PAGE: 5,
};

export const TOP_COUNT = 2;

export const DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export const Credits = {
  names: [`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
  countries: [`USA`, `UK`, `Russia`],
  ageRaiting: [`0+`, `6+`, `12+`, `16+`, `18+`, `21+`],
  iconReactionImage: [`smile.png`, `sleeping.png`, `puke.png`, `angry.png`],
  commentTexts: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`],
  dates: [`Today`, `2 days ago`, `3 days ago`],
  userNames: [`Tim Macoveev`, `John Doe`]
};

// TODO: Credits.dates - пока так тупо оставлю, дальше напишу функцию которая будет обрабатывать даты, и возвращать строку, сколько минут, дней, месяцев прошло с публикации

export const getData = () => ({
  title: getRandomItem(TITLES),
  imageFileName: getRandomItem(imageFileNames),
  raiting: getRandomInt(MovieRaiting.MIN, MovieRaiting.MAX),
  year: getRandomInt(1930, 2000),
  duration: getRandomItem(DURATIONS),
  genres: new Set(getRandomlyReducedArray(GENRES, Math.round(Math.random() * ItemsPerScope.MAX))),
  description: new Set(getRandomlyReducedArray(DESCRIPTION, getRandomInt(ItemsPerScope.MIN, ItemsPerScope.MAX))),
  commentsCount: getRandomInt(commentsCount.MIN, commentsCount.MAX),
  intoWatchList: getRandomBool(),
  isWatched: getRandomBool(),
  isFavorite: getRandomBool(),
  credits: {
    director: getRandomItem(Credits.names),
    actors: new Set(getRandomlyReducedArray(Credits.names, getRandomInt(ItemsPerScope.MIN, ItemsPerScope.MAX))),
    writers: new Set(getRandomlyReducedArray(Credits.names, getRandomInt(ItemsPerScope.MIN, ItemsPerScope.MAX))),
    countries: getRandomItem(Credits.countries),
    ageRaiting: getRandomItem(Credits.ageRaiting),
  }
});

export const getCommentsDate = () => ({
  iconReactionImage: getRandomItem(Credits.iconReactionImage),
  userName: getRandomItem(Credits.userNames),
  date: getRandomItem(Credits.dates),
  commentTexts: getRandomItem(Credits.commentTexts)
});

export const cards = new Array(cardDisplay.TOTAL).fill(``).map(getData);
export const comments = new Array(cards[0].commentsCount).fill(``).map(getCommentsDate);

// TODO: переделать через трансдьюсеры
// https://github.com/htmlacademy-javascript/806047-keksobooking-17/blob/master/js/util/fp.js#L21-L41
// https://github.com/htmlacademy-javascript/806047-keksobooking-17/blob/master/js/ui/map/filter.js#L71-L78
export const filterElements = [
  {
    name: `Watchlist`,
    count: cards.reduce((acc, it) => {
      return it.intoWatchList ? ++acc : acc;
    }, 0)
  },
  {
    name: `History`,
    count: cards.reduce((acc, it) => {
      return it.isWatched ? ++acc : acc;
    }, 0)
  },
  {
    name: `Favorites`,
    count: cards.reduce((acc, it) => {
      return it.isFavorite ? ++acc : acc;
    }, 0)
  }
];
