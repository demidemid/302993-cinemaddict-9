import {FilmCard, FilmDetailInfo, FilmComment} from "../components";
import {isEscapeKey, isCtrlEnter, Position, render, getRandomItem, unrender} from "../utils";
import {FILM_INFO} from "../data/data";

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

  _getEntry() {
    return {
      filmInfo: {
        title: this._filmMock.filmInfo.title,
        alternativeTitle: this._filmMock.filmInfo.alternativeTitle,
        totalRaiting: this._filmMock.filmInfo.totalRaiting,
        poster: this._filmMock.filmInfo.poster,
        description: this._filmMock.filmInfo.description,
        director: this._filmMock.filmInfo.director,
        actors: this._filmMock.filmInfo.actors,
        runtime: this._filmMock.filmInfo.runtime,
        writers: this._filmMock.filmInfo.writers,
        release: {
          date: this._filmMock.filmInfo.release.date,
          countries: this._filmMock.filmInfo.release.countries,
        },
        genres: this._filmMock.filmInfo.genres,
        ageRating: this._filmMock.filmInfo.ageRating,
      },
      userDetails: {
        personalRaiting: this._filmMock.userDetails.personalRaiting,
        intoWatchList: this._filmMock.userDetails.intoWatchList,
        isWatched: this._filmMock.userDetails.isWatched,
        isFavorite: this._filmMock.userDetails.isFavorite,
      },
      comments: this._filmMock.comments,
    };
  }

  init() {
    const filmElement = this._filmCard.getElement();
    const filmDetailsElement = this._filmDetailInfo.getElement();
    const filmDetailsTextareaElement = filmDetailsElement.querySelector(`textarea`);

    const onEscKeyDown = () => {
      if (isEscapeKey) {
        unrender(filmDetailsElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmElement
      .querySelectorAll(`.film-card__comments, .film-card__poster, .film-card__title`)
      .forEach(
          (element) => {
            element.addEventListener(`click`, () => {
              this._onChangeView();
              const bodyElement = document.querySelector(`body`);
              render(bodyElement, filmDetailsElement, Position.BEFOREEND);
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
        unrender(filmDetailsElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetailsElement
      .querySelectorAll(`.film-details__emoji-label img`)
      .forEach(
          (element) => {
            element.addEventListener(`click`, (evt) => {
              filmDetailsElement.querySelector(`.film-details__add-emoji-label img`).src = evt.target.src;
            });
          }
      );

    filmDetailsTextareaElement
      .addEventListener(`keydown`, (evt) => {

        if (isCtrlEnter(evt)) {

          const entry = this._getEntry();
          const commentList = filmDetailsElement.querySelector(`.film-details__comments-list`);
          const formData = new FormData(filmDetailsElement.querySelector(`.film-details__inner`));

          const entryComment = {
            emotion: formData.get(`comment-emoji`) + `.png`,
            date: Date.now(),
            commentTexts: formData.get(`comment`),
            userName: getRandomItem(FILM_INFO.userNames),
          };

          entry.comments.push(entryComment);

          render(commentList, new FilmComment(entryComment).getElement(), Position.BEFOREEND);

          this._onDataChange(entry, this._filmMock);
        }

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, filmElement, Position.BEFOREEND);
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetailInfo.getElement())) {
      this._filmDetailInfo.removeElement();
    }
  }
}

