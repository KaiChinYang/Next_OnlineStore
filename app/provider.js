import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CarContext";
export function Provider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
