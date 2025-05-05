"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadImage from "@/app/components/UploadImage";

export default function NewProduct() {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // 新增: 正在送出表單
  const router = useRouter();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("上傳成功，imageUrl:", data.imageUrl);
    // setImageUrl(data.imageUrl); // 存圖片路徑
    setProduct((prev) => ({ ...prev, image: data.imageUrl })); // 存圖片路徑
    setUploading(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!product.image) {
      alert("請先選擇圖片並上傳完成！");
      return;
    }
    setSubmitting(true);
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
      }),
    });
    router.push("/admin");
  }

  return (
    <div>
      <h1>新增產品</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="產品名稱"
          value={product.name}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <input
          type="number"
          placeholder="價格"
          value={product.price}
          onChange={(e) =>
            setProduct((pre) => ({ ...pre, price: e.target.value }))
          }
          required
        />
        <UploadImage
          value={product.image}
          onUploadComplete={(url) =>
            setProduct((prev) => ({ ...prev, image: url }))
          }
        />
        {/* <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUpload}
          required
        />
        {product.image ? (
          <img src={product.image} alt="預覽圖片" width={150} />
        ) : (
          <h2>尚未選擇圖片</h2>
        )} */}
        <button type="submit">新增</button>
      </form>
    </div>
  );
}
