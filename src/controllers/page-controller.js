import {
  FilmsBlock,
  Search,
  UserProfile,
  MainNavigation,
  Sort,
  Filter,
  ShowMoreButton,
  FooterFilmCounter,
} from "../components";

import {render, unrender, Position} from "../utils";
import {CardDisplay} from "../data/enums";
import {TOP_COUNT} from "../data/consts";
import {films, filterElements} from "../data/mock";
import MovieController from "./movie-controller";

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
    this._sort = new Sort();
    this._showMoreButton = new ShowMoreButton();
    this._footerFilmCounter = new FooterFilmCounter();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    this._renderHeader();
    this._renderMainMenu();
    this._renderMainFilmContent();
    this._renderTopRatedFilmContent();
    this._renderMostCommentedFilmContent();
    this._renderFooter();
  }

  _renderHeader() {
    const headerElement = this._container.querySelector(`.header`);

    render(headerElement, this._search.getElement(), Position.BEFOREEND);
    render(headerElement, this._userProfile.getElement(), Position.BEFOREEND);
  }

  _renderMainMenu() {
    const notEmpty = CardDisplay.TOTAL > 0;
    const mainElement = this._container.querySelector(`.main`);

    render(mainElement, this._mainNavigation.getElement(), Position.BEFOREEND);
    render(mainElement, this._sort.getElement(), Position.BEFOREEND);
    render(mainElement, new FilmsBlock(notEmpty).getElement(), Position.BEFOREEND);

    const mainNavigationElement = this._container.querySelector(`.main-navigation`);

    const renderFilter = (filterMock) => {
      render(mainNavigationElement, new Filter(filterMock).getElement(), Position.AFTERBEGIN);
    };

    filterElements.reverse().forEach(renderFilter);

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderMainFilmContent() {
    const allFilmsElement = this._container.querySelector(`.films-list__container--main`);

    this._renderAdditionFilmCards(allFilmsElement, this._filmCards, cardStat.quantityCounter, this._getTaskQuantityParam());
    this._renderShowMoreButtonElement(this._filmCards);
  }

  _renderTopRatedFilmContent() {
    const topRatedFilmsElement = this._container.querySelector(`.films-list__container--top-rated`);

    // TODO: пока что у top rated и most commented простая сортировка без дополнительных условий, позже доделаю в соответствие с ТХ
    const topRatedCards = this._filmCards.sort((a, b) => b.filmInfo.totalRaiting - a.filmInfo.totalRaiting);
    this._renderAdditionFilmCards(topRatedFilmsElement, topRatedCards, 0, TOP_COUNT);
  }

  _renderMostCommentedFilmContent() {
    const mostCommentedFilmsElement = this._container.querySelector(`.films-list__container--most-commented`);

    const mostCommentedCards = this._filmCards.sort((a, b) => b.comments.length - a.comments.length);
    this._renderAdditionFilmCards(mostCommentedFilmsElement, mostCommentedCards, 0, TOP_COUNT);
  }

  _renderAdditionFilmCards(container, arr, start, end) {
    arr.slice(start, end).forEach((filmMock) => this._renderFilms(container, filmMock));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._container.querySelectorAll(`.sort__button`).forEach((el) => {
      el.classList.remove(`sort__button--active`);
    });

    evt.target.classList.add(`sort__button--active`);

    const showMoreButtonElement = this._container.querySelector(`.films-list__show-more`);
    unrender(showMoreButtonElement);

    const allFilmsElement = this._container.querySelector(`.films-list__container--main`);
    allFilmsElement.innerHTML = ``;

    cardStat.quantityCounter = 0;
    cardStat.leftToShow = films.length;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDateFilms = this._filmCards.slice().sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        sortedByDateFilms.forEach((filmInfo) => {
          console.log(`sortedByDateFilms`, filmInfo.filmInfo.release.date);
        });
        this._renderAdditionFilmCards(allFilmsElement, sortedByDateFilms, cardStat.quantityCounter, this._getTaskQuantityParam());
        this._renderShowMoreButtonElement(sortedByDateFilms);
        break;
      case `rating`:
        const sortedByRatingFilms = this._filmCards.sort((a, b) => b.filmInfo.totalRaiting - a.filmInfo.totalRaiting);
        this._renderAdditionFilmCards(allFilmsElement, sortedByRatingFilms, cardStat.quantityCounter, this._getTaskQuantityParam());
        this._renderShowMoreButtonElement(sortedByRatingFilms);
        break;
      case `default`:
        this._renderMainFilmContent();
        break;
    }
  }

  _getTaskQuantityParam() {
    const quantity = cardStat.leftToShow > CardDisplay.PER_PAGE ? CardDisplay.PER_PAGE : cardStat.leftToShow;

    cardStat.updateTaskStat(quantity);
    return quantity;
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    const allFilmsElement = this._container.querySelector(`.films-list__container--main`);
    allFilmsElement.innerHTML = ``;

    cardStat.quantityCounter = 0;
    cardStat.leftToShow = films.length;

    console.log(`this._filmCards ДО`, this._filmCards);
    this._filmCards[this._filmCards.findIndex((it) => it === oldData)] = newData;
    console.log(`this._filmCards ПОСЛК`, this._filmCards);

    this._renderAdditionFilmCards(allFilmsElement, this._filmCards, cardStat.quantityCounter, this._getTaskQuantityParam());
  }

  _renderFilms(container, filmMock) {
    const movieController = new MovieController(container, filmMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _renderShowMoreButtonElement(arr) {
    // console.log(`------------- _renderShowMoreButtonElement ---------------`);
    // arr.forEach((filmInfo) => {
    //   console.log(`sortedByDateFilms`, filmInfo.filmInfo.release.date);
    // });
    // console.log(`----------------------------`);

    const filmListElement = this._container.querySelector(`.films-list`);
    const allFilmsElement = this._container.querySelector(`.films-list__container--main`);

    if (cardStat.leftToShow > 0) {
      render(filmListElement, this._showMoreButton.getElement(), Position.BEFOREEND);

      const onShowMoreButtonClick = () => {
        // console.log(`------------- onShowMoreButtonClick ---------------`);
        // arr.forEach((filmInfo) => {
        //    console.log(`sortedByDateFilms`, filmInfo.filmInfo.release.date);
        // });
        // console.log(`----------------------------`);
        this._renderAdditionFilmCards(allFilmsElement, arr, cardStat.quantityCounter, cardStat.quantityCounter + this._getTaskQuantityParam());

        if (cardStat.leftToShow === 0) {
          unrender(showMoreButtonElement);
        }
      };

      const showMoreButtonElement = filmListElement.querySelector(`.films-list__show-more`);
      showMoreButtonElement.addEventListener(`click`, onShowMoreButtonClick, {once: true});
    }
  }

  _renderFooter() {
    const footerStatisticksBlockElement = this._container.querySelector(`.footer__statistics`);
    render(footerStatisticksBlockElement, this._footerFilmCounter.getElement(), Position.BEFOREEND);
  }
}
