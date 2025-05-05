import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  // const products = [
  //   { id: 1, name: "Apple", price: 10, image: "/Anco.jpg" },
  //   {
  //     id: 2,
  //     name: "Banana",
  //     price: 5,
  //     image:
  //       "https://i.epochtimes.com/assets/uploads/2017/05/Fotolia_81632784_Subscription_L-600x400.jpg",
  //   },
  //   { id: 3, name: "Cherry", price: 8, image: "/NoDoro.jpg" },
  // ];
  // return Response.json(products); // return products

  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return Response.json(products);
}

export async function POST(req) {
  const { name, price, image } = await req.json();
  const product = await prisma.product.create({
    data: {
      name,
      price,
      image,
    },
  });
  return Response.json(product);
}
