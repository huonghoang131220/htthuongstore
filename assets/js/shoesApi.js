import { db } from "./firebase-config.js";
import {
  ref,
  child,
  get,
  onValue,   // optional nếu muốn realtime
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const PATH = "shoes";

/** Theo dõi realtime (tuỳ chọn dùng thay cho fetchShoesOnce) */
export function subscribeShoes(callback) {
  return onValue(ref(db, PATH), (snap) => {
    const obj = snap.val() || {};
    const arr = Object.values(obj).sort((a,b) => (a.id ?? 0) - (b.id ?? 0));
    callback(arr);
  });
}
export async function fetchShoesOnce() {
  const snap = await get(child(ref(db), "shoes"));
  const obj = snap.val() || {};
  return Object.values(obj).sort((a,b) => (a.id ?? 0) - (b.id ?? 0));
}