import { writeFile,readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";  //產生一個獨特的id
import path from "path";

export async function POST(req) {
  // 1. 取得上傳的 form data
  const formData = await req.formData(); // 解析傳入的 multipart/form-data，並回傳一個 FormData 物件。
  const file = formData.get("image"); //obj  取得圖片檔
  console.log("formData: ", formData);

  if (!file || typeof file === "string") {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer()); //將上傳的檔案轉換成ArrayBuffer(二進位)，並將之轉換成Node.js可操作的Buffer
  const fileExt = file.name.split(".").pop(); //副檔名
  const fileName = `${uuidv4()}.${fileExt}`;

  //process.cwd(): 取得目前專案的根目錄絕對路徑。
  const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

  await writeFile(uploadPath, buffer); //將 Buffer 寫入到剛組好的路徑中，完成檔案儲存。

  return new Response(JSON.stringify({ imageUrl: `/uploads/${fileName}` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}