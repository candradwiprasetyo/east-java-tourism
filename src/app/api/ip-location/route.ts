export async function GET() {
  const res = await fetch("https://ipwho.is/");
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
