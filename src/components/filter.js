import AbstractComponent from "./abstract-component";

const createUrlAnchor = (name) => `#` + name.toLowerCase();
const normalizeName = (name) => name === `All` ? `All Movies` : name;

export default class Filter extends AbstractComponent {
  constructor({name, count = 0}) {
    super();
    this._name = name;
    this._count = count;
  }

  getTemplate() {
    return `
    <a href="${createUrlAnchor(this._name)}" class="main-navigation__item ${this._name === `All` ? `main-navigation__item--active` : ``}">${normalizeName(this._name)}
    ${this._name !== `All` ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}</a>
    `.trim();
  }
}
