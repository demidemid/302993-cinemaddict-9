import {
  getSearchTemplate,
  getMainNavigation,
  getFilmsBlockTemplate,
  createUserProfileTemplate,
  createSortItems,
  createShomMoreButtonTemplate,
  createFilmCardTemplate,
  createFilmDetailsTemplate
} from './index';

import {render} from './components/render';

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);

render(header, getSearchTemplate());
render(header, createUserProfileTemplate());

render(main, getMainNavigation());
render(main, createSortItems());
render(main, getFilmsBlockTemplate());

const filmList = main.querySelector(`.films-list`);
const filmAllList = filmList.querySelector(`.films-list__container--main`);
const filmTopRatedList = document.querySelector(`.films-list__container--top-rated`);
const filmMostCommentedList = document.querySelector(`.films-list__container--most-commented`);

new Array(5).fill(``).forEach(() => render(filmAllList, createFilmCardTemplate()));
render(filmList, createShomMoreButtonTemplate());
new Array(2).fill(``).forEach(() => render(filmTopRatedList, createFilmCardTemplate()));
new Array(2).fill(``).forEach(() => render(filmMostCommentedList, createFilmCardTemplate()));

render(body, createFilmDetailsTemplate());
