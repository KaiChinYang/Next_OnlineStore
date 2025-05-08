export const dynamic = "force-dynamic"; //讓 Next.js 告訴 Vercel：「這個頁面是動態的，每次都重新 render！」

import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Products() {
  //透過fetch 取得資料庫資料，但須多一次HTTP請求
  // const res = await fetch("http://localhost:3000/api/products");
  // const products = await res.json();

  //透過Prisma取得DB資料
  const products = await prisma.product.findMany();

  return (
    <div>
      <h1>Product List</h1>
      <Link href={`/admin`}>Go to Admin</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name} - ${product.price}
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                priority
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
