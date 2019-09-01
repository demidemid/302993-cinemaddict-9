import {DESCRIPTION, CREDITS} from '../data/data';
import {createElement} from "../utils";

export class FilmDetails {
  constructor({title, imageFileName, raiting, credits, duration, genres, comments}) {
    this._title = title;
    this._imageFileName = imageFileName;
    this._raiting = raiting;
    this._credits = credits;
    this._duration = duration;
    this._genres = genres;
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
    <section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${this._imageFileName}" alt="">
          <p class="film-details__age">${this._credits.ageRaiting}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: ${this._title}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._raiting}.0</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._credits.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${Array.from(this._credits.writers).join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${Array.from(this._credits.actors).join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">30 March 1945</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._credits.countries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${Array.from(this._genres).map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
            </tr>
          </table>
          <p class="film-details__film-description">
            ${DESCRIPTION.join(` `)}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
      </div>
      <div class="form-details__bottom-container">
        <div class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">${this._comments.size === 1 ? `Comment` : `Comments`}
            <span class="film-details__comments-count">${this._comments.size}</span></h3>
          <ul class="film-details__comments-list">
            ${Array.from(this._comments).map(({iconReactionImage, commentTexts, userName, date}) => `
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${iconReactionImage}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${commentTexts}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${userName}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            `).join(``)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${Array.from(CREDITS.iconReactionImage).map((file) => `
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile"
                value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/${file}" width="30" height="30" alt="emoji">
              </label>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
    </section>
    `.trim();
  }
}
