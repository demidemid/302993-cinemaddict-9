import {CardDisplay} from './data/enums';
import {getData} from "./data/mock";
import PageController from './controllers/page-controller';

const bodyElement = document.querySelector(`body`);

const filmMocks = new Array(CardDisplay.TOTAL)
  .fill(``)
  .map(getData);

const pageController = new PageController(bodyElement, filmMocks);
pageController.init();
