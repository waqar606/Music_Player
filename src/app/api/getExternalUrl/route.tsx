import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  if (!id || !title) {
    return NextResponse.json({ data: "No URL" });
  }
  try {
    const apiUrl = "https://cnvmp3.com/download_video.php";

    const bodyData = {
      formatValue: 1,
      quality: 4,
      title: title,
      url: `https://www.youtube.com/watch?v=${id}`,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ status: "success", audioURL: data.download_link })
    );
  } catch (error) {
    return new Response("Audio Not Found", { status: 405 });
  }
}
