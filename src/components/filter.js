import {createElement} from "../utils";

const createUrlAnchor = (name) => `#` + name.toLowerCase();
const normalizeName = (name) => name === `All` ? `All Movies` : name;

export default class Filter {
  constructor({name, count = 0}) {
    this._name = name;
    this._count = count;
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
    <a href="${createUrlAnchor(this._name)}" class="main-navigation__item ${this._name === `All` ? `main-navigation__item--active` : ``}">${normalizeName(this._name)}
    ${this._name !== `All` ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}</a>
    `.trim();
  }
}
