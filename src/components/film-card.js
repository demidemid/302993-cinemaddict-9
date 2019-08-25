export const getFilmCardTemplate = ({title, imageFileName, raiting, year, duration, genre, description, commentsCount}) => `
<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${raiting + `.0`}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${imageFileName.trim()}" alt="" class="film-card__poster">
  <p class="film-card__description">${Array.from(description).join(` `)}</p>
  <a class="film-card__comments">${commentsCount} ${commentsCount === 1 ? `comment` : `comments`}</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>`.trim();
