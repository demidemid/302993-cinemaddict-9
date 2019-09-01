export const render1 = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
