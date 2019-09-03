import {
  Search,
  MainNavigation,
  FilmsBlock,
  UserProfile,
  Filter,
  SortFilms,
  ShowMoreButton,
  FilmCard,
  FilmDetails,
} from './components/';

import {render, unrender, Position, isEscapeKey} from './utils';
import {CardDisplay} from './data/enums';
import {TOP_COUNT} from './data/consts';
import {films, getData, filterElements} from "./data/mock";

const notEmpty = CardDisplay.TOTAL > 0;

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

// SEARCH & USER PROFILE

render(header, new Search().getElement(), Position.BEFOREEND);
render(header, new UserProfile().getElement(), Position.BEFOREEND);

// MAIN NAVIGATION & FILTRES

render(main, new MainNavigation().getElement(), Position.BEFOREEND);
const mainNav = main.querySelector(`.main-navigation`);

const renderFilter = (filterMock) => {
  const filter = new Filter(filterMock);
  render(mainNav, filter.getElement(), Position.AFTERBEGIN);
};

filterElements.reverse().forEach(renderFilter);

// SORT FILMS

render(main, new SortFilms().getElement(), Position.BEFOREEND);

// FILM ALL LIST BLOCK

render(main, new FilmsBlock(notEmpty).getElement(), Position.BEFOREEND);

const filmList = main.querySelector(`.films-list`);
const filmAllList = filmList.querySelector(`.films-list__container--main`);

const renderAdditionFilmCards = (place, arr, start, end) => {
  arr.slice(start, end).forEach((filmMock) => renderFilm(place, filmMock));
};

const getTaskQuantityParam = () => {
  let quantity = cardStat.leftToShow > CardDisplay.PER_PAGE ? CardDisplay.PER_PAGE : cardStat.leftToShow;

  cardStat.updateTaskStat(quantity);
  return quantity;
};

const renderFilm = (place, filmMock) => {
  const film = new FilmCard(filmMock);
  const filmDetails = new FilmDetails(filmMock);
  const filmElement = film.getElement();
  const filmDetailsElement = filmDetails.getElement();
  const filmDetailsElementTextarea = filmDetailsElement.querySelector(`textarea`);

  const onEscKeyDown = () => {
    if (isEscapeKey) {
      place.replaceChild(filmElement, filmDetailsElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmElement
    .querySelectorAll(`.film-card__comments, .film-card__poster, .film-card__title`)
    .forEach(
        (element) => {
          element.addEventListener(`click`, () => {
            place.replaceChild(filmDetailsElement, filmElement);
            document.addEventListener(`keydown`, onEscKeyDown);
          });
        }
    );

  filmDetailsElementTextarea
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  filmDetailsElementTextarea
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  filmDetailsElement
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => {
      place.replaceChild(filmElement, filmDetailsElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(place, filmElement, Position.BEFOREEND);
};

const filmMocks = new Array(CardDisplay.TOTAL)
  .fill(``)
  .map(getData);


renderAdditionFilmCards(filmAllList, filmMocks, cardStat.quantityCounter, getTaskQuantityParam());

// SHOW MORE BUTTON

if (cardStat.leftToShow > 0) {
  render(filmList, new ShowMoreButton().getElement(), Position.BEFOREEND);

  const onShowMoreButtonClick = () => {
    renderAdditionFilmCards(filmAllList, filmMocks, cardStat.quantityCounter, cardStat.quantityCounter + getTaskQuantityParam());

    if (cardStat.leftToShow === 0) {
      unrender(showMoreButton);
    }
  };

  const showMoreButton = document.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, onShowMoreButtonClick, {once: true});
}

// TOP RATED BLOCK
// TODO: пока что у top rated и most commented простая сортировка без дополнительных условий, позже доделаю в соответствие с ТХ

const filmTopRatedList = document.querySelector(`.films-list__container--top-rated`);
const topRatedCards = filmMocks.sort((a, b) => b.raiting - a.raiting);

renderAdditionFilmCards(filmTopRatedList, topRatedCards, 0, TOP_COUNT);

// MOST COMMENTED BLOCK

const filmMostCommentedList = document.querySelector(`.films-list__container--most-commented`);
const mostCommentedCards = filmMocks.sort((a, b) => b.comments.length - a.comments.length);
renderAdditionFilmCards(filmMostCommentedList, mostCommentedCards, 0, TOP_COUNT);
