import YTMusic from "ytmusic-api";

async function getSearchResult(query: string): Promise<string> {
  const ytmusic = new YTMusic();
  await ytmusic.initialize();
  const songs = await ytmusic.searchSongs(query);
  return JSON.stringify(songs);
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getSearchResult(params.id);
  return <div className="text-white">Search Result: {data}</div>;
}
