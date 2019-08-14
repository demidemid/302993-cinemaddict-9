import {
  getSearchTemplate,
  getMainNavigation,
  getFilmsBlockTemplate,
  getUserProfileTemplate,
  getSortItemsTemplate,
  getShomMoreButtonTemplate,
  getFilmCardTemplate,
  getFilmDetailsTemplate
} from './components/';

import {render} from './render';

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);

render(header, getSearchTemplate());
render(header, getUserProfileTemplate());

render(main, getMainNavigation());
render(main, getSortItemsTemplate());
render(main, getFilmsBlockTemplate());

const filmList = main.querySelector(`.films-list`);
const filmAllList = filmList.querySelector(`.films-list__container--main`);
const filmTopRatedList = document.querySelector(`.films-list__container--top-rated`);
const filmMostCommentedList = document.querySelector(`.films-list__container--most-commented`);

const generateMarkup = (num, generator) =>
  Array.from({length: num}, generator).join(`\n`);

const generateFilmMarkup = (num) =>
  generateMarkup(num, getFilmCardTemplate);

render(filmAllList, generateFilmMarkup(5));
render(filmTopRatedList, generateFilmMarkup(2));
render(filmMostCommentedList, generateFilmMarkup(2));

render(filmList, getShomMoreButtonTemplate());
render(body, getFilmDetailsTemplate());
