export class ShoeModel {
  constructor(id, name, brand, price, status, image, images = [], description = "") {
    this.id = id;           // ID sản phẩm
    this.name = name;       // Tên sản phẩm
    this.brand = brand;     // Hãng (Nike, Puma,...)
    this.price = price;     // Giá (VD: 1950000)
    this.status = status;   // "Còn hàng" / "Hết hàng"
    this.image = image;     // Ảnh đại diện (thumbnail)
    this.images = images;   // 🟢 Danh sách ảnh chi tiết
    this.description = description; // (tuỳ chọn) Mô tả sản phẩm
  }
}