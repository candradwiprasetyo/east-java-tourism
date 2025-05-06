import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  const apiKey = process.env.SERPAPI_KEY; // Gunakan env, jangan hardcode
  const apiUrl = `https://serpapi.com/search?q=${query}&engine=google&tbm=isch&api_key=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const firstImage = data.images_results?.[0];
    return NextResponse.json(firstImage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from SerpApi" },
      { status: 500 }
    );
  }
}
