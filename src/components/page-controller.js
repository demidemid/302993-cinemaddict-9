import {
  FilmsBlock,
  Search,
  UserProfile,
  MainNavigation,
  SortFilms,
  FilmCard,
  FilmDetails,
  Filter,
  ShowMoreButton,
} from "../components/";

import {render, unrender, Position, isEscapeKey} from "../utils";
import {CardDisplay} from "../data/enums";
import {TOP_COUNT} from "../data/consts";
import {films, filterElements} from "../data/mock";

const cardStat = {
  quantityCounter: 0,
  leftToShow: films.length,

  updateTaskStat(quantity) {
    this.quantityCounter += quantity;
    this.leftToShow -= quantity;
  },
};

export default class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._search = new Search();
    this._userProfile = new UserProfile();
    this._mainNavigation = new MainNavigation();
    this._sortFilms = new SortFilms();
    this._board = new FilmsBlock();
    this._showMoreButton = new ShowMoreButton();
  }

  init() {
    const HEADER = this._container.querySelector(`.header`);
    const MAIN = this._container.querySelector(`.main`);

    const notEmpty = CardDisplay.TOTAL > 0;

    render(HEADER, this._search.getElement(), Position.BEFOREEND);
    render(HEADER, this._userProfile.getElement(), Position.BEFOREEND);
    render(MAIN, this._mainNavigation.getElement(), Position.BEFOREEND);
    render(MAIN, this._sortFilms.getElement(), Position.BEFOREEND);
    render(MAIN, new FilmsBlock(notEmpty).getElement(), Position.BEFOREEND);

    const MAIN_NAVIGATION = MAIN.querySelector(`.main-navigation`);

    const renderFilter = (filterMock) => {
      render(MAIN_NAVIGATION, new Filter(filterMock).getElement(), Position.AFTERBEGIN);
    };

    filterElements.reverse().forEach(renderFilter);

    const FILM_LIST = MAIN.querySelector(`.films-list`);
    const ALL_FILMS_BLOCK = MAIN.querySelector(`.films-list__container--main`);
    const TOP_RATED_BLOCK = MAIN.querySelector(`.films-list__container--top-rated`);
    const MOST_COMMENTED_BLOCK = MAIN.querySelector(`.films-list__container--most-commented`);

    this._renderAdditionFilmCards(ALL_FILMS_BLOCK, this._filmCards, cardStat.quantityCounter, this._getTaskQuantityParam());

    if (cardStat.leftToShow > 0) {
      render(FILM_LIST, this._showMoreButton.getElement(), Position.BEFOREEND);

      const onShowMoreButtonClick = () => {
        this._renderAdditionFilmCards(ALL_FILMS_BLOCK, this._filmCards, cardStat.quantityCounter, cardStat.quantityCounter + this._getTaskQuantityParam());

        if (cardStat.leftToShow === 0) {
          unrender(SHOW_MORE_BUTTON);
        }
      };

      const SHOW_MORE_BUTTON = FILM_LIST.querySelector(`.films-list__show-more`);
      SHOW_MORE_BUTTON.addEventListener(`click`, onShowMoreButtonClick, {once: true});
    }

    // TOP RATED BLOCK
    // TODO: пока что у top rated и most commented простая сортировка без дополнительных условий, позже доделаю в соответствие с ТХ
    const topRatedCards = this._filmCards.sort((a, b) => b.raiting - a.raiting);
    this._renderAdditionFilmCards(TOP_RATED_BLOCK, topRatedCards, 0, TOP_COUNT);

    // MOST COMMENTED BLOCK
    const mostCommentedCards = this._filmCards.sort((a, b) => b.comments.length - a.comments.length);
    this._renderAdditionFilmCards(MOST_COMMENTED_BLOCK, mostCommentedCards, 0, TOP_COUNT);
  }

  _renderAdditionFilmCards(place, arr, start, end) {
    arr.slice(start, end).forEach((filmMock) => this._renderFilms(place, filmMock));
  }

  _getTaskQuantityParam() {
    let quantity = cardStat.leftToShow > CardDisplay.PER_PAGE ? CardDisplay.PER_PAGE : cardStat.leftToShow;

    cardStat.updateTaskStat(quantity);
    return quantity;
  }

  _renderFilms(place, filmMock) {
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
  }
}
