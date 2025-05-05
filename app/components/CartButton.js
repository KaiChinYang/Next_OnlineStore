"use client"; // 這行告訴 Next.js 這個元件在客戶端執行

import { useCart } from "../context/CarContext";

export default function CartButton({ product }) {
  const { addToCart } = useCart(); // 確保這裡是 Client Component

  return <button onClick={() => addToCart(product)}>加入購物車</button>;
}
