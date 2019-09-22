import AbstractComponent from "./abstract-component";
import {CardDisplay} from "../data/enums";
import {getPluralOfWord} from "../utils";

export default class FooterFilmCounter extends AbstractComponent {
  getTemplate() {
    return `<p>${CardDisplay.TOTAL} ${getPluralOfWord(CardDisplay.TOTAL, [`movie`, `movies`])} inside</p>`.trim();
  }
}
