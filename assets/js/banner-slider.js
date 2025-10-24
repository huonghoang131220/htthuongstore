document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".banner-slider .slides");
  const slides = document.querySelectorAll(".banner-slider .slide");
  const dots = document.querySelectorAll(".banner-slider .dot");
  let currentIndex = 1; // bắt đầu từ 1 (vì sẽ clone)
  let interval;
  let startX = 0;
  let isDragging = false;

  // Clone slide đầu & cuối
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);

  const allSlides = document.querySelectorAll(".banner-slider .slide");
  const totalSlides = allSlides.length;

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
    // Khi đến clone cuối → nhảy về slide đầu thật
    if (currentIndex === totalSlides - 1) {
      goToSlide(1, true);
    }
    // Khi đến clone đầu → nhảy về slide cuối thật
    if (currentIndex === 0) {
      goToSlide(totalSlides - 2, true);
    }
  });

  function startAutoSlide() {
    stopAutoSlide();
    interval = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  // Bấm dot
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index + 1);
      startAutoSlide();
    });
  });

  // Vuốt tay / chuột
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
    slidesContainer.style.transform = `translateX(${-currentIndex * 100 + diff / window.innerWidth * 100}%)`;
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

  //Khởi động
  goToSlide(currentIndex, true);
 startAutoSlide();
});