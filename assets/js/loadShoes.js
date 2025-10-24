import { renderHome } from "./renderHome.js"; // path đúng nếu cùng folder
import { renderShoeDetail } from "./loadShoeDetail.js";
import { fetchProductsOnce /* hoặc subscribeShoes */ } from "./shoesApi.js";


const fmtPrice = (n) => new Intl.NumberFormat("vi-VN").format(Number(n || 0)) + " VND";



// Nhận category làm tham số
export async function renderShoesCategory(categoryKey,categoryName,categoryBrand) {
  const main = document.getElementById("main-content");
  console.log("Category:", categoryKey, "--Brand:", categoryBrand,"---categoryName:",categoryName);


  main.innerHTML = `
  <div class="category-container">
   <div class="breadcrumb">
  <a href="#" id="back-home" class="breadcrumb-home">
    <img src="assets/images/ic_home.png" class="icon-home" alt="Trang chủ">
    <span>Trang chủ</span>
  </a>
  <span class="breadcrumb-separator">›</span>
  <span class="breadcrumb-current">${categoryName}</span>
</div>
    <section class="shoes-list" id="shoesList">
    <div class="loading">Đang tải...</div>
    </section>
     </div>
  `;

  // Back về home
  document.getElementById("back-home").addEventListener("click", e => {
    e.preventDefault();
    renderHome();
    history.pushState({ page: "home" }, "", location.pathname);
  });

  const container = document.getElementById("shoesList");


  let shoes = await fetchProductsOnce(categoryKey);

  if (!shoes.length) {
    container.innerHTML = `<p class="no-data">Không có sản phẩm nào trong danh mục này.</p>`;
    return;
  }
  if (categoryBrand) {
    shoes = shoes.filter(
      (s) => s.brand && s.brand.toLowerCase() === categoryBrand.toLowerCase()
    );
  }

  container.innerHTML = shoes.map(shoe => `
      <div class="shoe-card" data-id="${shoe.id}">
        <img src="${shoe.image}" alt="${shoe.name}" onerror="this.src='assets/images/image_placeholder.jpg'">
        <h4>${shoe.name}</h4>
        <p class="brand">${shoe.brand}</p>
        <p class="price">${fmtPrice(shoe.price)}</p>
        <p class="status ${shoe.status === "Còn hàng" ? "in-stock" : "out-stock"}">${shoe.status}</p>
      </div>
  `).join("");


 attachCardClicks(shoes);

  // 🟡 Thêm click để mở chi tiết sản phẩm
  document.querySelectorAll(".shoe-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id);
      const shoe = shoesData.find(s => s.id === id);
      if (shoe) renderShoeDetail(shoe,shoes);
    });
  });

  history.pushState({ page: categoryKey }, "", `#${categoryKey}`);
}
function attachCardClicks(shoes) {
  document.querySelectorAll(".shoe-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id, 10);
      const shoe = shoes.find(s => s.id === id);
      if (shoe) renderShoeDetail(shoe,shoes);
    });
  });
}
