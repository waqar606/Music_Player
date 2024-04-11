// URL ENDPOINT http://localhost:3000/api/download
// example http://localhost:3000/api/download?q=4QGqFfhKWYo

import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("q");
  const responseHeaders = new Headers(response.headers);

  if (!url) {
    return NextResponse.json({ data: "No URL" });
  }

  const data = ytdl(url,{ filter: "audioonly" });

  return new Response(data as any, {
    headers: responseHeaders,
  });
}