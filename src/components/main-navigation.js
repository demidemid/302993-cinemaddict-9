import {createElement} from "../utils";

export default class MainNavigation {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
    <nav class="main-navigation">
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`.trim();
  }
}
