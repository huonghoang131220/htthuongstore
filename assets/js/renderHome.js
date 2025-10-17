// renderHome.js
export function renderHome() {
  const main = document.getElementById("main-content");

  main.innerHTML = `
    <!-- Banner slider -->
    <section class="banner-slider">
      <div class="slides">
        <div class="slide">
          <img src="assets/images/bg_category.png" alt="Banner 1">
          <div class="overlay">
            <h2>KHÁCH HÀNG NÊN ĐỌC</h2>
            <p>- Địa chỉ: Tòa R2, Chung cư Florence 28 Trần Hữu Dực, Nam Từ Liêm, Hà Nội</p>
            <p>- Không hoàn hàng, liên hệ tư vấn trước khi đặt hàng</p>
            <p>- Đơn COD vui lòng cọc 100k - 200k và trả thêm 1.5% tổng giá trị</p>
          </div>
        </div>
        <div class="slide">
          <img src="assets/images/bg_category.png" alt="Banner 2">
          <div class="overlay center-text">
            <h2>Hương Store</h2>
          </div>
        </div>
      </div>
      <div class="dots">
        <span class="dot active"></span>
        <span class="dot"></span>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <h2>Danh mục nổi bật</h2>
      <p class="subtitle">Khám phá các danh mục sản phẩm phong phú của chúng tôi</p>
      <div class="category-list">
        <div class="category-item">
          <a href="#" class="category-link" data-category="shoes">
            <div class="category-image">
              <img src="assets/images/cat_shoese.png" alt="Giày thể thao">
            </div>
            <p class="category-title">GIÀY THỂ THAO</p>
          </a>
        </div>
        <div class="category-item">
          <div class="category-image">
            <img src="assets/images/cat_clothes.png" alt="Quần áo">
          </div>
          <p class="category-title">QUẦN ÁO</p>
        </div>
        <div class="category-item">
          <div class="category-image">
            <img src="assets/images/cat_bag.png" alt="Túi xách / Balo">
          </div>
          <p class="category-title">TÚI XÁCH/ BALO</p>
        </div>
        <div class="category-item">
          <div class="category-image">
            <img src="assets/images/cat_cosmetic.png" alt="Mỹ phẩm">
          </div>
          <p class="category-title">MỸ PHẨM</p>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact-section">
      <h2>Cần tư vấn sản phẩm?</h2>
      <p>Liên hệ với chúng tôi để được tư vấn miễn phí</p>
      <div class="buttons">
        <a href="https://zalo.me/0862475163" target="_blank" class="btn zalo-btn">
          <img src="assets/images/ic_zalo.png" alt="Zalo"> Zalo: 0862475163
        </a>
        <a href="https://m.me/yourpage" target="_blank" class="btn messenger-btn">
          <img src="assets/images/ic_face.png" alt="Messenger"> Chat Messenger
        </a>
      </div>
    </section>
  `;

  // Re-gắn sự kiện click category để SPA tiếp tục hoạt động
  document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const categoryName = link.dataset.category;
      import('./loadShoes.js').then(module => {
        module.renderShoesCategory(categoryName);
      });
    });
  });
}