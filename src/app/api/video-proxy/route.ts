// src/app/api/video-proxy/route.ts
import { NextRequest } from "next/server";
import http from "http";
import https from "https";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");

  if (!videoUrl || !videoUrl.startsWith("http://167.71.1.127")) {
    return new Response(JSON.stringify({ error: "URL inválida" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = videoUrl.startsWith("https") ? https : http;
  const range = req.headers.get("range") || "";

  return new Promise((resolve) => {
    const request = client.get(
      videoUrl,
      { headers: { Range: range } },
      (stream) => {
        const statusCode = stream.statusCode || 200;
        const headers = stream.headers;

        const contentType = headers["content-type"] || "video/mp4";

        const responseHeaders: Record<string, string> = {
          "Content-Type": contentType,
        };

        // Si es video con Range (streaming)
        if (range) {
          if (headers["content-length"]) {
            responseHeaders["Content-Length"] = headers["content-length"];
          }
          if (headers["content-range"]) {
            responseHeaders["Content-Range"] = headers["content-range"];
          }
          responseHeaders["Accept-Ranges"] = "bytes";
        }

        resolve(
          new Response(stream as any, {
            status: statusCode,
            headers: responseHeaders,
          })
        );
      }
    );

    request.on("error", (err) => {
      console.error("Error al servir el video:", err);
      resolve(
        new Response(JSON.stringify({ error: "Error al servir el video" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });
}
