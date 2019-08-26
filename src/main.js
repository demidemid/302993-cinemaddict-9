import {
  getSearchTemplate,
  getMainNavigation,
  getFilmsBlockTemplate,
  getUserProfileTemplate,
  getSortItemsTemplate,
  getShomMoreButtonTemplate,
  getFilmCardTemplate,
  getFilmPopupTemplate,
  getFilmDetailsTemplate,
  getFilmCommentsTemplate,
} from './components/';

import {render} from './render';
import {CardDisplay} from './data/enums';
import {TOP_COUNT} from './data/consts';
import {films, comments} from "./data/mock";

const cardStat = {
  quantityCounter: 0,
  leftToShow: films.length,

  updateTaskStat(quantity) {
    this.quantityCounter += quantity;
    this.leftToShow -= quantity;
  },
};

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

const renderCards = (arr, place, start, end) => {
  render(place, arr.slice(start, end).map(getFilmCardTemplate).join(``));
};

const getTaskQuantityParam = () => {
  let quantity = cardStat.leftToShow > CardDisplay.PER_PAGE ? CardDisplay.PER_PAGE : cardStat.leftToShow;

  cardStat.updateTaskStat(quantity);
  return quantity;
};

renderCards(films, filmAllList, cardStat.quantityCounter, getTaskQuantityParam());

// pop-up deatails

const onCommentLinkClick = () => {
  render(body, getFilmPopupTemplate());

  const popupInfo = body.querySelector(`.form-details__top-container`);
  render(popupInfo, getFilmDetailsTemplate(films[0]));

  const popupDetailBlock = body.querySelector(`.film-details__comments-list`);
  const popupCloseButton = body.querySelector(`.film-details__close-btn`);
  const popup = body.querySelector(`.film-details`);

  render(popupDetailBlock, comments.map(getFilmCommentsTemplate).join(``));


  const onPopupCloseButtonClick = () => {
    popup.remove();
  };

  popupCloseButton.addEventListener(`click`, onPopupCloseButtonClick);
};

const commentLink = filmList.querySelector(`.film-card__comments`);
commentLink.addEventListener(`click`, onCommentLinkClick);

// show more

if (cardStat.leftToShow > 0) {
  render(filmList, getShomMoreButtonTemplate());

  const onShowMoreButtonClick = () => {
    renderCards(filmAllList, cardStat.quantityCounter, cardStat.quantityCounter + getTaskQuantityParam());

    if (cardStat.leftToShow === 0) {
      showMoreButton.remove();
    }
  };

  const showMoreButton = document.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, onShowMoreButtonClick, {once: true});
}

// top rated

const filmTopRatedList = document.querySelector(`.films-list__container--top-rated`);
const topRatedCards = films.sort((a, b) => b.raiting - a.raiting);
renderCards(topRatedCards, filmTopRatedList, 0, TOP_COUNT);

// most commented

const filmMostCommentedList = document.querySelector(`.films-list__container--most-commented`);
const mostCommentedCards = films.sort((a, b) => b.CommentCountPerFilm - a.CommentCountPerFilm);
renderCards(mostCommentedCards, filmMostCommentedList, 0, TOP_COUNT);

// TODO: пока что у top rated и most commented простая сортировка без дополнительных условий, позже доделаю в соответствие с ТХ
