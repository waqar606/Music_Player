import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("q");

  if (!url) {
      return NextResponse.json({ data: "No URL" });
    }
    try {
      const info = await ytdl.getInfo(url.toString());
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      const audioFormat = ytdl.chooseFormat(audioFormats, { quality: 'highestaudio' });
  
      if (!audioFormat) {
          return new Response('Audio Not Found', { status: 405 });
      }
      return new Response(JSON.stringify({"status":"success","audioURL": audioFormat.url }));
    } catch (error) {
      return new Response('Audio Not Found', { status: 405 });
    }

}