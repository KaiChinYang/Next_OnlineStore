"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/app/context/CarContext";
import UploadImage from "@/app/components/UploadImage";


export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const { setUpdatedProduct } = useCart();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // 新增: 正在送出表單

  //取得產品資料
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setProduct((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));
    } catch (error) {
      alert("上傳圖片失敗，請重新再試！");
    } finally {
      setUploading(false);
    }
  };

  async function handleUpdate(e) {
    e.preventDefault();
    if (uploading) {
      alert("圖片尚未上傳完成，請稍後！");
      return;
    }
    setSubmitting(true);
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const updated = await res.json();
    setUpdatedProduct(updated);

    router.push("/admin");
  }

  return (
    <div>
      <h1>編輯產品</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
          disabled={submitting}
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: parseFloat(e.target.value) })
          }
          required
          disabled={submitting}
        />
        <UploadImage value={product.image} onUploadComplete = {(url)=>setProduct((prev)=>({...prev,image:url}) )}/>
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
          disabled={submitting || submitting}
        />
        {uploading ? (
          <p>圖片上傳中...</p>
        ) : product.image ? (
          <img src={product.image} alt="預覽圖片" width={150} />
        ) : (
          <h2>尚未上傳圖片</h2>
        )} */}
        <button type="submit" disabled={uploading || submitting}>
          {submitting ? "更新中..." : "更新產品"}
        </button>
      </form>
    </div>
  );
}
