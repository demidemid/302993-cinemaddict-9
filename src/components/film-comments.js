export const getFilmCommentsTemplate = ({iconReactionImage, userName, date, commentTexts}) => `
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
</li>`.trim();


