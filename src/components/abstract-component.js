import {createElement, unrender} from '../utils';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    throw Error(`Abstract method not implemented: getTemplate`);
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }
}
