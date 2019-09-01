import {
  getRandomItem,
  getRandomInt,
  getRandomBool,
  getRandomlyReducedArray
} from '../utils';

import {
  MovieRaiting,
  ItemCountPerScope,
  CommentCountPerFilm,
  CardDisplay
} from './enums';

import {
  TITLES,
  IMAGE_FILE_NAMES,
  DURATIONS,
  GENRES,
  DESCRIPTION,
  CREDITS
} from './data';

export const getData = () => ({
  title: getRandomItem(TITLES),
  imageFileName: getRandomItem(IMAGE_FILE_NAMES),
  raiting: getRandomInt(MovieRaiting.MIN, MovieRaiting.MAX),
  year: getRandomInt(1930, 2000),
  duration: getRandomItem(DURATIONS),
  genres: new Set(getRandomlyReducedArray(GENRES, Math.round(Math.random() * ItemCountPerScope.MAX))),
  description: new Set(getRandomlyReducedArray(DESCRIPTION, getRandomInt(ItemCountPerScope.MIN, ItemCountPerScope.MAX))),
  intoWatchList: getRandomBool(),
  isWatched: getRandomBool(),
  isFavorite: getRandomBool(),
  credits: {
    director: getRandomItem(CREDITS.names),
    actors: new Set(getRandomlyReducedArray(CREDITS.names, getRandomInt(ItemCountPerScope.MIN, ItemCountPerScope.MAX))),
    writers: new Set(getRandomlyReducedArray(CREDITS.names, getRandomInt(ItemCountPerScope.MIN, ItemCountPerScope.MAX))),
    countries: getRandomItem(CREDITS.countries),
    ageRaiting: getRandomItem(CREDITS.ageRaiting),
  },
  comments: new Set(new Array(getRandomInt(CommentCountPerFilm.MIN, CommentCountPerFilm.MAX)).fill(``).map(getCommentsDate))
});

export const getCommentsDate = () => ({
  iconReactionImage: getRandomItem(CREDITS.iconReactionImage),
  userName: getRandomItem(CREDITS.userNames),
  date: getRandomItem(CREDITS.dates),
  commentTexts: getRandomItem(CREDITS.commentTexts)
});

export const films = new Array(CardDisplay.TOTAL).fill(``).map(getData);

// console.log(films);


const filterStats = films.reduce((stats, {intoWatchList, isWatched, isFavorite}) => {
  if (intoWatchList) {
    stats.watchlist += 1;
  }
  if (isWatched) {
    stats.watched += 1;
  }
  if (isFavorite) {
    stats.favorite += 1;
  }
  return stats;
}, {watchlist: 0, watched: 0, favorite: 0});

export const filterElements = [
  {
    name: `All`
  },
  {
    name: `Watchlist`,
    count: filterStats.watchlist
  },
  {
    name: `History`,
    count: filterStats.watched
  },
  {
    name: `Favorites`,
    count: filterStats.favorite
  }
];
