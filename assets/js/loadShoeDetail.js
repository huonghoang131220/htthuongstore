import { shoesData } from "./shoesData.js";
import { renderShoesCategory } from "./loadShoes.js";

export function renderShoeDetail(shoe,shoes) {
  const main = document.getElementById("main-content");
  // Thêm CSS cho trang detail nếu chưa có
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./assets/css/detailShoes.css";
document.head.appendChild(link);

const relatedShoes = shoes
console.log("brand:", shoe.brand, "relatedShoes:", relatedShoes);

  main.innerHTML = `
    <div class="page-detail">

      <nav class="breadcrumb">
        <a href="#" id="back-home">🏠 Trang chủ</a> › 
        <a href="#" id="back-category">${shoe.brand}</a> › 
        <span>${shoe.name}</span>
      </nav>

      <!-- PHẦN 1 -->
      <div class="detail-part1 container">
        <div class="left">
          <img src="${shoe.image}" alt="${shoe.name}" class="main-image">
        </div>
        <div class="right">
          <div class="title">${shoe.name}</div>
          <div class="price">${shoe.price.toLocaleString()} VND</div>

          <div class="sizes">
            <label class="sizes-title">Kích thước</label>
            <div class="sizes-list">
              ${[35,36,37,38,39,40].map(sz => `
                <button class="size-btn" data-size="${sz}" type="button">${sz}</button>
              `).join('')}
            </div>
          </div>

          <div class="actions">
            <a class="btn btn-messenger" href="https://www.facebook.com/messages/t/8110668508980679" target="_blank">
              <span class="icon">📩</span> Đặt hàng qua Messenger
            </a>
            <a class="btn btn-zalo" href="https://zalo.me/0367543039">
              <span class="icon">💬</span> Nhắn Zalo 0367543039
            </a>
          </div>

          <div class="stock">
            Tình trạng: <strong class="${shoe.status === 'Còn hàng' ? 'in-stock' : 'out-stock'}">${shoe.status}</strong>
          </div>
        </div>
      </div>

      <!-- PHẦN 2: ẢNH -->
      <div class="detail-part2 container">
        <h3>Hình ảnh sản phẩm</h3>
        <div class="gallery">
          ${shoe.images && shoe.images.length > 0
            ? shoe.images.map(img => `<img src="${img}" alt="${shoe.name}" class="gallery-img">`).join("")
            : "<p>Chưa có ảnh chi tiết.</p>"
          }
        </div>
      </div>

      <!-- PHẦN 3: SẢN PHẨM LIÊN QUAN -->
      <div class="detail-part2 container">
        <h3 class="related-title">Sản phẩm liên quan</h3>
        <div class="related-list" id="relatedList">
          ${relatedShoes.map(s => `
            <div class="related-card" data-id="${s.id}">
              <img src="${s.image}" alt="${s.name}">
              <h4>${s.name}</h4>
              <p class="price">${s.price.toLocaleString()} VND</p>
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;

// 3️⃣ Đổ danh sách sản phẩm liên quan
const relatedContainer = document.getElementById("relatedList");
relatedContainer.innerHTML = relatedShoes.map(s => `
  <div class="related-card" data-id="${s.id}">
    <img src="${s.image}" alt="${s.name}">
    <h4>${s.name}</h4>
    <p class="price">${s.price.toLocaleString()} VND</p>
  </div>
`).join("");

// 4️⃣ Click vào sản phẩm liên quan → mở chi tiết mới
relatedContainer.querySelectorAll(".related-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = parseInt(card.dataset.id);
    const shoeClicked = shoes.find(s => s.id === id);
    if (shoeClicked) renderShoeDetail(shoeClicked);
  });
});

  // Back về danh mục
  document.getElementById("back-category").addEventListener("click", e => {
    e.preventDefault();
    renderShoesCategory(shoe.brand); // quay lại list brand
    history.pushState({ page: shoe.brand }, "", `#${shoe.brand}`);
  });
  // (tùy chọn) add event để highlight size khi click
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  history.pushState({ page: "detail", shoeId: shoe.id }, "", `#shoe-${shoe.id}`);
}