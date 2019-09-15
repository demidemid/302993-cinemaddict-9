import {DESCRIPTION, FILM_INFO} from '../data/data';
import {getPluralOfWord} from '../utils';
import AbstractComponent from './abstract-component';

const cutFileResolution = (name) => name.slice(0, name.indexOf(`.`));

export default class FilmDetailInfo extends AbstractComponent {
  constructor({totalRaiting, filmInfo, runtime, comments, userDetails}) {
    super();
    this._totalRaiting = totalRaiting;
    this._filmInfo = filmInfo;
    this._duration = runtime;
    this._comments = comments;
    this._userDetails = userDetails;
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
          <img class="film-details__poster-img" src="./images/posters/${this._filmInfo.poster}" alt="">
          <p class="film-details__age">${this._filmInfo.ageRaiting}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._filmInfo.alternativeTitle}</h3>
              <p class="film-details__title-original">Original: ${this._filmInfo.title}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._totalRaiting}.0</p>
              ${this._userDetails.isWatched ? `<p class="film-details__user-rating">Your rate ${this._userDetails.personalRaiting}</p>` : ``}
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${Array.from(this._filmInfo.writers).join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${Array.from(this._filmInfo.actors).join(`, `)}</td>
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
              <td class="film-details__cell">${this._filmInfo.release.countries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${Array.from(this._filmInfo.genres).map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
            </tr>
          </table>
          <p class="film-details__film-description">
            ${DESCRIPTION.join(` `)}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._userDetails.intoWatchList ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._userDetails.isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._userDetails.isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
      </div>
      ${this._userDetails.isWatched ? `
      <div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
                <button class="film-details__watched-reset" type="button">Undo</button>
            </div>

            <div class="film-details__user-score">
                <div class="film-details__user-rating-poster">
                    <img src="./images/posters/${this._filmInfo.poster}" alt="film-poster"
                        class="film-details__user-rating-img">
                </div>

                <section class="film-details__user-rating-inner">
                    <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

                    <p class="film-details__user-rating-feelings">How you feel it?</p>

                    <div class="film-details__user-rating-score">
                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1"
                            id="rating-1">
                        <label class="film-details__user-rating-label" for="rating-1">1</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2"
                            id="rating-2">
                        <label class="film-details__user-rating-label" for="rating-2">2</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3"
                            id="rating-3">
                        <label class="film-details__user-rating-label" for="rating-3">3</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4"
                            id="rating-4">
                        <label class="film-details__user-rating-label" for="rating-4">4</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5"
                            id="rating-5">
                        <label class="film-details__user-rating-label" for="rating-5">5</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6"
                            id="rating-6">
                        <label class="film-details__user-rating-label" for="rating-6">6</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7"
                            id="rating-7">
                        <label class="film-details__user-rating-label" for="rating-7">7</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8"
                            id="rating-8">
                        <label class="film-details__user-rating-label" for="rating-8">8</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9"
                            id="rating-9" checked>
                        <label class="film-details__user-rating-label" for="rating-9">9</label>

                    </div>
                </section>
            </div>
        </section>
      </div>` : ``}

      <div class="form-details__bottom-container">
        <div class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">${getPluralOfWord(this._comments.length, [`Comment`, `Comments`])}
            <span class="film-details__comments-count">${this._comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${Array.from(this._comments).map(({emotion, commentTexts, userName, date}) => `
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji">
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
            <div for="add-emoji" class="film-details__add-emoji-label">
              <img src="images/emoji/${FILM_INFO.emotion[0]}" width="55" height="55" alt="emoji">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${FILM_INFO.emotion.map((file) => `
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${cutFileResolution(file)}"
                value="${cutFileResolution(file)}" ${file === FILM_INFO.emotion[0] ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-${cutFileResolution(file)}">
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
