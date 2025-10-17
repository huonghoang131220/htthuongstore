// Dùng ESM từ CDN Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// 👉 thay cấu hình của bạn (thêm cả databaseURL)
const firebaseConfig = {
    apiKey: "AIzaSyAKD5tVbfw0LlW_k79ZbHNBYCnZmRXr9vA",
    authDomain: "htthuongstore.firebaseapp.com",
    projectId: "htthuongstore",
    storageBucket: "htthuongstore.firebasestorage.app",
    messagingSenderId: "751738193889",
    appId: "1:751738193889:web:cb76e8dc1f4500e48374a0",
    measurementId: "G-3XF42728PB"
  };
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);