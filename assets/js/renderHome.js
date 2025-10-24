// renderHome.js
import { initBannerSlider } from "./banner-slider.js";

export function renderHome() {
  const main = document.getElementById("main-content");

  main.innerHTML = `
    <section class="banner-slider">
    <div class="slides">
      <!-- Slide 1 -->
      <div class="slide">
        <img src="assets/images/bg_category.png" alt="Banner 1">
        <div class="overlay">
          <h2>KHÁCH HÀNG NÊN ĐỌC</h2>
          <p>- Địa chỉ: 26 Ngũ Sơn, Thạch Thất, Hà Nội </p>
          <p>- Không hoàn hàng, liên hệ tư vấn trước khi đặt hàng</p>
          <p>- Đơn COD vui lòng cọc 100k - 200k và trả thêm 1.5% tổng giá trị</p>
        </div>
      </div>

      <!-- Slide 2 -->
      <div class="slide">
        <img src="assets/images/bg_category.png" alt="Banner 2">
        <div class="overlay center-text">
          <h2>Htt.Huong Store</h2>
        </div>
      </div>
    </div>

    <!-- Dots indicator -->
    <div class="dots">
      <span class="dot active"></span>
      <span class="dot"></span>
    </div>
  </section>

<section class="categories">
  <h2>Danh mục nổi bật</h2>
  <p class="subtitle">Khám phá các danh mục sản phẩm phong phú của chúng tôi</p>
  
  <div class="category-list">

      <div class="category-item">
      <a href="#" class="category-link" data-category="shoes">
        <div class="category-image">
          <img src="assets/images/cat_shoese.png" alt="Giày dép">
        </div>
        <p class="category-title">GIÀY DÉP</p>
      </a>
    </div>

    <div class="category-item">
          <a href="#" class="category-link" data-category="clothes">
      <div class="category-image">
        <img src="assets/images/cat_clothes.png" alt="Quần áo">
      </div>
      <p class="category-title">QUẦN ÁO</p>
      </a>
    </div>

    <div class="category-item">
     <a href="#" class="category-link" data-category="accessory">
      <div class="category-image">
        <img src="assets/images/cat_bag.png" alt="Phụ kiện">
      </div>
      <p class="category-title">PHỤ KIỆN</p>
    </a>
    </div>
  </div>
</section>

    <section class="contact-section">
     <h2>Cần tư vấn sản phẩm?</h2>
  <p>Liên hệ với chúng tôi để được tư vấn miễn phí</p>
  <div class="buttons">
    <a href="https://zalo.me/0367543039" target="_blank" class="btn zalo-btn">
      <img src="assets/images/ic_zalo.png" alt="Zalo"> 
      Zalo: 0367543039
    </a>
    <a href="https://www.facebook.com/messages/t/8110668508980679" target="_blank" class="btn messenger-btn">
      <img src="assets/images/ic_face.png" alt="Messenger"> 
      Chat Messenger
    </a>
  </div>
  `;
initBannerSlider();
  // Re-gắn sự kiện click category để SPA tiếp tục hoạt động
  document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const categoryName = link.querySelector('img').alt.trim();
      const categoryData = link.dataset.category; // "shoes", "clothes", "accessory"

      import('./loadShoes.js').then(module => {
        module.renderShoesCategory(categoryData,categoryName,"");
      });
    });
  });
  
}