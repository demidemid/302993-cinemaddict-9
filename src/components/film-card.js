export const getFilmCardTemplate = ({title, imageFileName, raiting, year, duration, genres, description, CommentCountPerFilm}) => `
<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${raiting + `.0`}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${Array.from(genres).slice(0, 1).join(``)}</span>
  </p>
  <img src="./images/posters/${imageFileName.trim()}" alt="" class="film-card__poster">
  <p class="film-card__description">${Array.from(description).join(` `)}</p>
  <a class="film-card__comments">${CommentCountPerFilm} ${CommentCountPerFilm === 1 ? `comment` : `comments`}</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>`.trim();
