// URL ENDPOINT http://localhost:3000/api/search

import YTMusic from "ytmusic-api";

async function getSearchResult(query: string | null): Promise<string> {
    const args :string = String(query);
  const ytmusic = new YTMusic();
  await ytmusic.initialize();
  const songs = await ytmusic.searchSongs(args);
  return JSON.stringify(songs);
}


export async function GET(request:Request){
    if (request.method === 'GET') {
        const url = new URL(request.url);
        const queryParams = url.searchParams;
        const q :string|null = queryParams.get('q');
        const result = await getSearchResult(q)
        return new Response(result);
      } else {
        return new Response('Method Not Allowed', { status: 405 });
      }
}

