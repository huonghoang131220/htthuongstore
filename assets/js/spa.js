// assets/js/spa.js
import { renderHome } from "./renderHome.js";
import { renderShoesCategory } from "./loadShoes.js";

function attachCategoryClicks() {
  // Link trong header/footer có data-category
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const categoryKey = link.dataset.category; // "shoes" | "clothes" | "accessory"
      const categoryName = link.textContent.trim();
      renderShoesCategory(categoryKey, categoryName,"");
      history.pushState({ page: categoryKey }, "", `#${categoryKey}`);
window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Link về trang chủ
  document.querySelectorAll('[data-page="home"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      renderHome();
      history.replaceState({ page: "home" }, "", location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

   // Link Liên hệ
  attachContactClick();

}

// Khi load trang
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  history.replaceState({ page: "home" }, "", location.pathname);
window.scrollTo({ top: 0, behavior: "smooth" });
  // Gắn sự kiện click sau khi render lần đầu
  attachCategoryClicks();

  // Xử lý nút Back / Forward
  window.addEventListener("popstate", e => {
    const state = e.state;

    if (!state || state.page === "home") {
      renderHome();
      attachCategoryClicks();
    } 
    else if (state.page === "contact") {
      import("./contact.js").then(module => {
        module.renderContact();
      });
    } 
    else if (state.page === "category") {
  import("./loadShoes.js").then(module => {
    module.renderShoesCategory(state.categoryKey, state.categoryName, state.brand || "");
  });
}
    else {
      import("./loadShoes.js").then(module => {
        module.renderShoesCategory(state.page, state.page,"");
      });
    }
  });
});

function attachContactClick() {
  document.querySelectorAll('[data-page="contact"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      import("./contact.js").then(module => {
        module.renderContact();
        history.pushState({ page: "contact" }, "", "#contact");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  });
}

// Cho phép gọi lại khi home được render lại (vì DOM thay đổi)
export { attachCategoryClicks };