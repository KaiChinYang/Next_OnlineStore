"use client";

import { useState } from "react";

export default function UploadImage({ value, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  async function handleImageUpload(e) {
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
      console.log(`data: ${data}`);
      onUploadComplete(data.imageUrl); // 傳回圖片網址給父元件
    } catch (error) {
      alert("上傳圖片失敗，請重新再試！");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
        // required
      />
      {uploading ? (
        <p>圖片上傳中</p>
      ) : value ? (
        <img src={value} alt="預覽圖片" width={150} />
      ) : (
        <h2>尚未上傳圖片</h2>
      )}
    </div>
  );
}
