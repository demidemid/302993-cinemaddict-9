import AbstractComponent from './abstract-component';

export default class FilmsBlock extends AbstractComponent {
  constructor(notEmpty) {
    super();
    this._notEmpty = notEmpty;
  }

  getTemplate() {
    return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        ${this._notEmpty ? `<div class="films-list__container films-list__container--main"></div>` : `<div class="no-result">
        There is no movies for your request.</div>`}
      </section>

      ${this._notEmpty ?
    `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container films-list__container--top-rated"></div>
      </section>

      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container films-list__container--most-commented"></div>
      </section>` : ``}
    </section>
    `.trim();
  }
}
