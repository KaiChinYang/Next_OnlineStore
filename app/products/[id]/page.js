export const dynamic = "force-dynamic"; //讓 Next.js 告訴 Vercel：「這個頁面是動態的，每次都重新 render！」

import Image from "next/image";
import CartButton from "@/app/components/CartButton";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ProductDetail({ params }) {
  //     // asynchronous access of `params.id`.
  //   const { id } = await params
  //   return <h1>Product ID: {id}</h1>;
  const { id } = await params;
  // const res = await fetch(`http://localhost:3000/api/products/${id}`);
  // const product = await res.json();
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (product.error) {
    return <h1>Product not found</h1>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        objectFit="cover"
        priority // 讓重要圖片優先加載
      />
      <CartButton product={product} />
      <p>
        <Link href={`/cart`}>To cart</Link>
      </p>
    </div>
  );
}
