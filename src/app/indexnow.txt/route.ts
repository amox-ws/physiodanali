// Serves the IndexNow key for verification (keyLocation = /indexnow.txt).
export const dynamic = "force-dynamic";

export function GET() {
  return new Response(process.env.INDEXNOW_KEY ?? "", {
    headers: { "Content-Type": "text/plain" },
  });
}
