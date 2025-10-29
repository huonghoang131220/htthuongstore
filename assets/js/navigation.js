import { renderHome } from "./renderHome.js";
import { renderShoesCategory } from "./loadShoes.js";

export function setupNavigation() {
  // Bắt sự kiện click "Trang chủ"
  document.querySelectorAll('a[href="#"][data-page="home"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      renderHome();
      history.pushState({ page: "home" }, "", location.pathname);
    });
  });

  // Bắt sự kiện click danh mục trong menu hoặc footer
  document.querySelectorAll('a[data-category]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const categoryData = link.dataset.category;   // shoes / clothes / accessory
      const categoryName = link.textContent.trim(); // Giày dép / Quần áo / Phụ kiện

      import("./loadShoes.js").then(module => {
        module.renderShoesCategory(categoryData, categoryName);
      });

      history.pushState({ page: categoryData }, "", `#${categoryData}`);
      
      
    });
  });
}