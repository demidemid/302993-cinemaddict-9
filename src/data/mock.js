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
  FILM_INFO
} from './data';

export const getData = () => ({
  totalRaiting: getRandomInt(MovieRaiting.MIN, MovieRaiting.MAX),
  runtime: getRandomItem(DURATIONS),
  filmInfo: {
    title: getRandomItem(TITLES),
    alternativeTitle: getRandomItem(TITLES),
    poster: getRandomItem(IMAGE_FILE_NAMES),
    description: new Set(getRandomlyReducedArray(DESCRIPTION, getRandomInt(ItemCountPerScope.MIN, ItemCountPerScope.MAX))),
    director: getRandomItem(FILM_INFO.names),
    actors: new Set(getRandomlyReducedArray(FILM_INFO.names, getRandomInt(ItemCountPerScope.MIN, ItemCountPerScope.MAX))),
    release: {
      countries: getRandomItem(FILM_INFO.countries),
      date: getRandomInt(1930, 2000),
    },
    genres: new Set(getRandomlyReducedArray(GENRES, Math.round(Math.random() * ItemCountPerScope.MAX))),
    writers: new Set(getRandomlyReducedArray(FILM_INFO.names, getRandomInt(ItemCountPerScope.MIN, ItemCountPerScope.MAX))),
    ageRaiting: getRandomItem(FILM_INFO.ageRaiting),
  },
  userDetails: {
    intoWatchList: getRandomBool(),
    isWatched: getRandomBool(),
    isFavorite: getRandomBool(),
    personalRaiting: getRandomInt(MovieRaiting.MIN, MovieRaiting.MAX),
  },
  comments: new Array(getRandomInt(CommentCountPerFilm.MIN, CommentCountPerFilm.MAX)).fill(``).map(getCommentsDate)
});

export const getCommentsDate = () => ({
  emotion: getRandomItem(FILM_INFO.emotion),
  userName: getRandomItem(FILM_INFO.userNames),
  date: getRandomItem(FILM_INFO.dates),
  commentTexts: getRandomItem(FILM_INFO.commentTexts)
});

export const films = new Array(CardDisplay.TOTAL).fill(``).map(getData);


const filterStats = films.reduce((stats, data) => {
  if (data.userDetails.intoWatchList) {
    stats.watchlist += 1;
  }
  if (data.userDetails.isWatched) {
    stats.watched += 1;
  }
  if (data.userDetails.isFavorite) {
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
