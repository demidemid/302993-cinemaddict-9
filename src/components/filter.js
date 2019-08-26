const createUrlAnchor = (name) => `#` + name.toLowerCase();

export const getFilterTemplate = ({name, count = 0}) => {
  return `
  <a href="${createUrlAnchor(name)}" class="main-navigation__item">
    ${name}
    <span class="main-navigation__item-count">${count}</span>
  </a>`.trim();
};
