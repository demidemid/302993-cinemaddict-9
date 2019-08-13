export const filterElements = [
  {name: `Watchlist`, count: 13},
  {name: `History`, count: 4},
  {name: `Favorites`, count: 8}
];

export const createFilterTemplate = ({name, count = 0} = {}) => {
  const id = name.toLowerCase();
  return `<a href="${`#` + id}" class="main-navigation__item">
    ${name}
    <span class="main-navigation__item-count">${count}</span>
  </a>`;
};
