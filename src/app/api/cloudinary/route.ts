import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    // Menggunakan new Promise untuk menangani hasil upload dari Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            return reject(error); // Menangani error jika ada
          }

          if (!result) {
            return reject(new Error("Cloudinary upload result is undefined")); // Menangani kasus result undefined
          }

          resolve(result); // Mengembalikan result yang valid
        })
        .end(buffer);
    });

    // Pastikan result tidak undefined dan memiliki secure_url
    if (!result || !result.secure_url) {
      throw new Error("Failed to upload file: no secure_url returned");
    }

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error: unknown) {
    // Menangani error jika terjadi
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
