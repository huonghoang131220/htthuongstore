import { db } from "./firebase-config.js";
import {
  ref,
  child,
  get,
  onValue,   // optional nếu muốn realtime
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const PATH = "shoes";

export async function fetchProductsOnce(category) {
  const snap = await get(child(ref(db), category));
  const obj = snap.val() || {};
  return Object.values(obj).sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
}