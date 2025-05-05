"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const {isLoggedIn,logout} = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const { updatedProduct, setUpdatedProduct } = useCart();

  //是否為登入
  useEffect(()=>{
    if(!isLoggedIn){
      router.push("/admin/login");
    }
  },[isLoggedIn]);

  //取得產品資料
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 當 updatedProduct 有變化時，自動更新該筆資料
  useEffect(() => {
    if (updatedProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setUpdatedProduct(null); // 清空 context，避免重複套用
    }
  }, [updatedProduct]);

  //管理員登出
  function handleLogout(){
    logout();
    router.push("/admin/login");
  }

  // function handleProductUpdate(updatedProduct) {
  //   setProducts((prev) =>
  //     prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  //   );
  // }

  //Delete Products
  async function handleDelete(id) {
    const confirmDelete = confirm("確定要刪除這個商品嗎？");
    if (!confirmDelete) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    // 更新畫面
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <div>
      <Link href="/products/">Go back to Products</Link>
      <h1>管理後台</h1>
      <button onClick={()=>handleLogout()}>登出</button>
      <br />
      <Link href="/admin/new">➕新增產品</Link>
      <ul>  
        {products.map((product) => (
          <li key={product.id}>
            <p>
              {product.name} - ${product.price}
            </p>
            <Link href={`/admin/edit/${product.id}`}>✏️編輯</Link>
            <button onClick={() => handleDelete(product.id)}>🗑️ 刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
