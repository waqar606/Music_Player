// URL ENDPOINT http://localhost:3000/api/suggestion?q=faded

export async function GET(request: Request) {
  if (request.method === 'GET') {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("q");
    const res = await fetch(
      `https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=${url}`,
    );
    const str = await res.text();
    const arr = JSON.parse(str.substring(str.indexOf("["), str.indexOf("])") + 1));
    let suggestionsTuple: [string, number, number[]][] = [];
    if (Array.isArray(arr) && Array.isArray(arr.at(1))) {
      suggestionsTuple = arr.at(1);
    }
    const suggestions = suggestionsTuple.flatMap((suggestion) => suggestion).filter((suggestion) => typeof suggestion === "string");
    const suggestionss = String(suggestions);
    const suggestedArray = suggestionss.split(",")
    return new Response(JSON.stringify({ "data": suggestedArray }));
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}
