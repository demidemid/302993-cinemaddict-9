import AbstractComponent from './abstract-component';

export default class FilmComment extends AbstractComponent {
  // constructor({emotion, commentTexts, userName, date}) {
  constructor(comments) {
    super();
    // this._emotion = emotion;
    // this._commentTexts = commentTexts;
    // this._userName = userName;
    // this._date = date;
    this._comments = comments;
  }

  getTemplate() {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${this._comments.emotion}" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${this._comments.commentTexts}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._comments.userName}</span>
        <span class="film-details__comment-day">${this._comments.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`.trim();
  }
}
