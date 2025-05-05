import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Apple",
  //     price: 10,
  //     description: "A fresh red apple",
  //     image: "/Anco.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Banana",
  //     price: 5,
  //     description: "A ripe banana",
  //     image:
  //       "https://i.epochtimes.com/assets/uploads/2017/05/Fotolia_81632784_Subscription_L-600x400.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Cherry",
  //     price: 8,
  //     description: "A sweet cherry",
  //     image: "/NoDoro.jpg",
  //   },
  // ];

  // const product = products.find((item) => item.id == params.id);
  // if (!product) {
  //   return Response.json({ error: "Products not found" }, { status: 404 });
  // }
  const item = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(item.id) },
  });

  return Response.json(product);
}

export async function PUT(req, { params }) {
  const item = await params;

  const data = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id: Number(item.id) },
    data,
  });
  return Response.json(updatedProduct);
}

export async function DELETE(req, { params }) {
  const deleted = await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return Response.json(deleted);
}
