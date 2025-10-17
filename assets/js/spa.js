// assets/js/spa.js
import { renderHome } from "./renderHome.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  history.replaceState({ page: "home" }, "", location.pathname);

  window.addEventListener("popstate", e => {
    const state = e.state;
    if (!state || state.page === "home") {
      renderHome();
    } else {
      import('./loadShoes.js').then(module => {
        module.renderShoesCategory(state.page);
      });
    }
  });
});