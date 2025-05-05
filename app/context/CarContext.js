"use client";
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(null);

  function addToCart(product) {
    console.log("加入購物車:", cart);
    setCart((prev) => [...prev, product]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updatedProduct, setUpdatedProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
