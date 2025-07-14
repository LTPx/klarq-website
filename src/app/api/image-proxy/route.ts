// src/app/api/image-proxy/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl || !imageUrl.startsWith("http://167.71.1.127")) {
    return NextResponse.json({ error: "URL inválida" }, { status: 400 });
  }

  try {
    const imageResponse = await fetch(imageUrl);
    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await imageResponse.arrayBuffer();

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al servir la imagen" },
      { status: 500 }
    );
  }
}


