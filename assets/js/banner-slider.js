import { fetchProductsOnce } from "./shoesApi.js";

export async function initBannerSlider() {
  const slider = document.querySelector(".banner-slider");
  if (!slider) {
    console.warn("⚠️ Không tìm thấy .banner-slider trong DOM");
    return;
  }

  const slidesContainer = slider.querySelector(".slides");
  const dotsContainer = slider.querySelector(".dots");

  // 🔹 1. Lấy dữ liệu banner từ Firebase
  const banners = await fetchProductsOnce("banner");
  if (!banners || banners.length === 0) {
    console.warn("⚠️ Không có dữ liệu banner trong Firebase");
    return;
  }

  slidesContainer.innerHTML = banners
    .map(
      (b) => `
        <div class="slide">
          <img src="${b.image}" alt="${b.title || "banner"}" class="banner-img" />
          <div class="banner-info">
            ${b.logo ? `<img src="${b.logo}" class="banner-logo" alt="logo" />` : ""}
            ${b.title ? `<h2 class="banner-title">${b.title}</h2>` : ""}
            ${b.path ? `<button class="banner-btn" data-path="${b.path}">Xem tại đây</button>` : ""}
          </div>
        </div>
      `
    )
    .join("");


  // 🔹 3. Render dots đúng theo số lượng banner
  dotsContainer.innerHTML = banners
    .map((_, i) => `<span class="dot ${i === 0 ? "active" : ""}"></span>`)
    .join("");

  // 🔹 4. Clone slide đầu & cuối
  const slides = slider.querySelectorAll(".slide");
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);

  // Lấy lại danh sách sau khi clone
  const allSlides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  const totalSlides = allSlides.length; // ✅ Khai báo ở đây để dùng trong các hàm bên dưới

  // 🔹 5. Thiết lập trạng thái ban đầu
  let currentIndex = 1;
  let interval;
  let startX = 0;
  let isDragging = false;

  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  function goToSlide(index, instant = false) {
    slidesContainer.style.transition = instant ? "none" : "transform 0.6s ease";
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    const realIndex =
      currentIndex === 0
        ? dots.length - 1
        : currentIndex === totalSlides - 1
        ? 0
        : currentIndex - 1;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === realIndex));
  }

  function nextSlide() {
    if (currentIndex >= totalSlides - 1) return;
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    if (currentIndex <= 0) return;
    goToSlide(currentIndex - 1);
  }

  slidesContainer.addEventListener("transitionend", () => {
    if (currentIndex === totalSlides - 1) goToSlide(1, true);
    if (currentIndex === 0) goToSlide(totalSlides - 2, true);
  });

  function startAutoSlide() {
    stopAutoSlide();
    interval = setInterval(nextSlide, 3000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index + 1);
      startAutoSlide();
    });
  });

  slidesContainer.addEventListener("mousedown", startDrag);
  slidesContainer.addEventListener("touchstart", startDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    stopAutoSlide();
  }

  slidesContainer.addEventListener("mousemove", onDrag);
  slidesContainer.addEventListener("touchmove", onDrag);

  function onDrag(e) {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = x - startX;
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(${
      -currentIndex * 100 + (diff / window.innerWidth) * 100
    }%)`;
  }

  slidesContainer.addEventListener("mouseup", endDrag);
  slidesContainer.addEventListener("mouseleave", endDrag);
  slidesContainer.addEventListener("touchend", endDrag);

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    else goToSlide(currentIndex);
    startAutoSlide();
  }
// 🔹 6. Bắt sự kiện “Xem tại đây” (nếu có)
slider.querySelectorAll(".banner-btn").forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    const path = e.target.dataset.path || "";
    if (!path) {
      console.warn("⚠️ Banner chưa có path, bỏ qua.");
      return;
    }

    const [categoryKey, categoryBrand] = path.split("/");
    const banner = banners[index]; // lấy banner tương ứng theo vị trí
    const categoryName = banner.title || categoryBrand || "Sản phẩm";

    // Import hàm hiển thị sản phẩm
    const { renderShoesCategory } = await import("./loadShoes.js");

    renderShoesCategory(categoryKey, categoryName, categoryBrand);
  });
});
  // 🔹 7. Khởi động slider
  goToSlide(currentIndex, true);
  startAutoSlide();
}