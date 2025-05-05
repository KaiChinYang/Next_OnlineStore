import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, password } = await req.json();

  // 如果帳號已存在就不新增
  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    return new Response("帳號已存在", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return Response.json({ success: true });
}
