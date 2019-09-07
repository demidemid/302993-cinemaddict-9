import {CardDisplay} from './data/enums';
import {getData} from "./data/mock";
import PageController from './components/page-controller';

const body = document.querySelector(`body`);

const filmMocks = new Array(CardDisplay.TOTAL)
  .fill(``)
  .map(getData);

const pageController = new PageController(body, filmMocks);
pageController.init();
