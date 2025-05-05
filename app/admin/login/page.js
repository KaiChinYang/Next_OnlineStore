"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const {login} = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e){
        e.preventDefault();

        const res = await fetch("/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password}),
        });

        if(res.ok){
            login();
            alert(`login success!`);
            router.push("/admin");
        } else{
            alert(`login failed!`);
        }
    }

    async function handleCreate(e) {
      e.preventDefault();

      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // login();
        alert(`create admin success!`);
        // router.push("/admin");
      } else {
        alert(`create admin failed!`);
      }
    }


  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>管理員登入頁面</h1>
        <input
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登入</button>
      </form>
      <form onSubmit={handleCreate}>
        <h1>創造測試</h1>
        <input
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">創建</button>
      </form>
    </div>
  );
}
