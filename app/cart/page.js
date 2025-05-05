"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CarContext"
export default function CartPage() {
    const { cart } = useCart();
  return (
    <div>
      <h1>Shopping Cart </h1>
      <h2>
        <Link href={`/products`}>To Product list</Link>
      </h2>
      {cart.length == 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name}{" "}
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
              />{" "}
              ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
