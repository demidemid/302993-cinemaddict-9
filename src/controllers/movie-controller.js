import {FilmCard, FilmDetailInfo} from "../components";
import {isEscapeKey, isCtrlEnter, Position, render} from "../utils";

export default class MovieController {
  constructor(container, filmMock, onDataChange, onChangeView) {
    this._container = container;
    this._filmMock = filmMock;
    this._filmCard = new FilmCard(filmMock);
    this._filmDetailInfo = new FilmDetailInfo(filmMock);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    const filmElement = this._filmCard.getElement();
    const filmDetailsElement = this._filmDetailInfo.getElement();
    const filmDetailsTextareaElement = filmDetailsElement.querySelector(`textarea`);

    const onEscKeyDown = () => {
      if (isEscapeKey) {
        this._container.replaceChild(filmElement, filmDetailsElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmElement
      .querySelectorAll(`.film-card__comments, .film-card__poster, .film-card__title`)
      .forEach(
          (element) => {
            element.addEventListener(`click`, () => {
              this._onChangeView();
              this._container.replaceChild(filmDetailsElement, filmElement);
              document.addEventListener(`keydown`, onEscKeyDown);
            });
          }
      );

    filmDetailsTextareaElement
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetailsTextareaElement
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    filmDetailsElement
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(filmElement, filmDetailsElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetailsTextareaElement
      .addEventListener(`keydown`, (evt) => {

        if (isCtrlEnter(evt)) {

          const formData = new FormData(filmDetailsElement.querySelector(`.film-details__inner`));
          const entry = {
            iconReactionImage: formData.get(`comment-emoji`),
            date: Date.now(),
            commentTexts: formData.get(`comment`),
          };

          this._onDataChange(entry, this._filmMock);
        }

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, filmElement, Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._filmDetailInfo.getElement())) {
      this._container.getElement().replaceChild(this._filmCard.getElement(), this._filmDetailInfo.getElement());
    }
  }
}

