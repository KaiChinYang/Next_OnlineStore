import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, password } = await req.json();

  const admin = await prisma.admin.findUnique({
    where:{username},
  });

  if (!admin ) {
    return new Response("帳號或密碼錯誤", { status: 401 });
  } 

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if(!passwordMatch){
    return new Response("帳號或密碼錯誤",{status:401});
  }

  
  return Response.json({ success: true });
}
