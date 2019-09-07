import AbstractComponent from "./absctract-component";

export default class MainNavigation extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return `
    <nav class="main-navigation">
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`.trim();
  }
}
