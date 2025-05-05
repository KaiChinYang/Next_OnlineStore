//此檔案沒用到

"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function DeleteProduct() {
  const {id} = useParams();
  console.log('id: ',id);
  const router = useRouter();
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  useEffect(()=>{
    fetch(`/api/products/${id}`)
    .then( res=> res.json())
    .then(data=>setProduct(data));
  },[id]);
  async function handleDelete(params) {
    e.preventDefault();
    await fetch("/api/products/${id}", {
      method: "DELETE",
      header: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });
    router.push("/admin");
  }

  return (
    <div>
      <h1>刪除產品</h1>
    </div>
  );
}
