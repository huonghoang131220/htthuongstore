export function renderContact() {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <section class="contact-container">
      <div class="contact-left">
        <h2>Liên hệ với chúng tôi</h2>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.</p>

        <div class="contact-info">
          <div class="contact-item">
            <img src="assets/images/ic_location.png" alt="Địa chỉ">
            <div>
              <h4>Địa chỉ</h4>
              <p>26 Ngũ Sơn, Thạch Thất, Hà Nội</p>
            </div>
          </div>

          <div class="contact-item">
            <img src="assets/images/ic_phone.png" alt="Điện thoại">
            <div>
              <h4>Điện thoại</h4>
              <p><a href="tel:0367543039">0367543039</a></p>
            </div>
          </div>

          <div class="contact-item">
            <img src="assets/images/ic_lock.png" alt="Giờ làm việc">
            <div>
              <h4>Giờ làm việc</h4>
              <p>Thứ 2 – Chủ nhật: 8:00 – 21:00</p>
              <p>Tư vấn online 24/7</p>
            </div>
          </div>
        </div>

        <div class="contact-social">
          <h3>Kết nối với chúng tôi</h3>
      <div class="social-icons">
        <a href="https://www.facebook.com/hoangthi.thanhhuong.2k" target="_blank"><img src="assets/images/ic_face.png" alt="Facebook"></a>
        <a href="#" target="_blank"><img src="assets/images/ic_instagram.jpg" alt="Instagram"></a>
        <a href="https://zalo.me/0367543039" target="_blank"><img src="assets/images/ic_zalo.png" alt="Zalo"></a>
      </div>
      <a href="tel:0367543039" class="call-btn">📞 Gọi ngay</a>
        </div>
      </div>

      <div class="contact-right">
        <h2>Đặt hàng nhanh</h2>
        <p>Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và hỗ trợ bạn ngay.</p>

        <form id="contactForm" class="contact-form">
          <label>Họ và tên *</label>
          <input type="text" id="name" placeholder="Nhập họ và tên của bạn" required>

          <label>Số điện thoại *</label>
          <input type="tel" id="phone" placeholder="Nhập số điện thoại" required>

          <label>Sản phẩm quan tâm</label>
          <input type="text" id="product" placeholder="Tên sản phẩm hoặc loại sản phẩm">

          <label>Ghi chú</label>
          <textarea id="message" placeholder="Mô tả chi tiết nhu cầu của bạn..."></textarea>

          <div class="form-buttons">
            <button type="submit" class="btn primary">Gửi thông tin</button>
            <a href="https://zalo.me/0367543039" target="_blank" class="btn zalo">
              <img src="assets/images/ic_zalo.png" alt=""> Nhắn Zalo
            </a>
          </div>
                    <p id="status" class="form-status"></p>

        </form>
      </div>
    </section>
  `;

  // Gắn CSS nếu chưa có
  if (!document.getElementById("contact-css")) {
    const link = document.createElement("link");
    link.id = "contact-css";
    link.rel = "stylesheet";
    link.href = "assets/css/lienhe.css";
    document.head.appendChild(link);
  }
  // 👉 Script gửi thông tin đến Telegram
  const BOT_TOKEN = "8206268569:AAE8t0sIvwbRVb187SyEXOznM_FkQaD3OsE";
  const CHAT_ID = "1451702527";

  const form = document.getElementById("contactForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("status");

    const text = `📩 *Đơn hàng mới*\n\n👤 *Họ và tên:* ${name}\n📞 *Số điện thoại:* ${phone}\n🛍️ *Sản phẩm quan tâm:* ${product}\n💬 *Ghi chú:* ${message}`;

    status.innerText = "⏳ Đang gửi...";
    status.style.color = "#666";

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown"
        }),
      });

      if (res.ok) {
        status.innerText = "✅ Gửi thông tin thành công!";
        status.style.color = "green";
        form.reset();
      } else {
        status.innerText = "❌ Lỗi khi gửi thông tin.";
        status.style.color = "red";
      }
    } catch (err) {
      status.innerText = "⚠️ Không thể kết nối Telegram.";
      status.style.color = "orange";
    }
  });
}