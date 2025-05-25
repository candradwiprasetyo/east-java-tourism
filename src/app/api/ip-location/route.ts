export async function GET() {
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    const city = data.city || null;
    const region = data.region || null;
    const country = data.country || null;

    return new Response(JSON.stringify({ city, region, country }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching IP location:", error);
    return new Response(
      JSON.stringify({ city: null, region: null, country: null }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
