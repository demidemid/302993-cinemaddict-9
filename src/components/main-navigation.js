import {filterElements, createFilterTemplate} from './filter';

export const getMainNavigation = () => {
  return `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  ${filterElements.map(createFilterTemplate).join(`\n`)}
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
</nav>`;
};
