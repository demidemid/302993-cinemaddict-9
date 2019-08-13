export const filterElements = [
  {name: `Watchlist`, count: 13},
  {name: `History`, count: 4},
  {name: `Favorites`, count: 8}
];

export const getFilterTemplate = ({name, count = 0} = {}) => {
  const createUrlTemplate = () => `#` + name.toLowerCase();

  return `<a href="${createUrlTemplate}" class="main-navigation__item">
    ${name}
    <span class="main-navigation__item-count">${count}</span>
  </a>`;
};
