import AbstractComponent from './abstract-component';
import {getPluralOfWord} from '../utils';

export default class FilmCard extends AbstractComponent {
  constructor({comments, filmInfo, userDetails}) {
    super();
    this._comments = comments;
    this._userDetails = userDetails;
    this._filmInfo = filmInfo;
  }

  getTemplate() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._filmInfo.title}</h3>
      <p class="film-card__rating">${this._filmInfo.totalRaiting}.0</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._filmInfo.release.date}</span>
        <span class="film-card__duration">${this._filmInfo.runtime}</span>
        <span class="film-card__genre">${Array.from(this._filmInfo.genres).slice(0, 1).join(``)}</span>
      </p>
      <img src="./images/posters/${this._filmInfo.poster.trim()}" alt="" class="film-card__poster">
      <p class="film-card__description">${Array.from(this._filmInfo.description).join(` `)}</p>
      <a class="film-card__comments">${this._comments.length} ${getPluralOfWord(this._comments.length, [`comment`, `comments`])}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._userDetails.intoWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._userDetails.isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" ${this._userDetails.isFavorite ? `film-card__controls-item--active` : ``}>Mark as favorite</button>
      </form>
    </article>`.trim();
  }
}

