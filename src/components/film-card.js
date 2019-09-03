import {createElement} from "../utils";

export default class FilmCard {
  constructor({title, imageFileName, raiting, year, duration, genres, description, comments}) {
    this._title = title;
    this._imageFileName = imageFileName;
    this._raiting = raiting;
    this._year = year;
    this._genres = genres;
    this._duration = duration;
    this._description = description;
    this._element = null;
    this._comments = comments;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._raiting}.0</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${Array.from(this._genres).slice(0, 1).join(``)}</span>
      </p>
      <img src="./images/posters/${this._imageFileName.trim()}" alt="" class="film-card__poster">
      <p class="film-card__description">${Array.from(this._description).join(` `)}</p>
      <a class="film-card__comments">${this._comments.length} ${this._comments.lenght === 1 ? `comment` : `comments`}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`.trim();
  }
}

