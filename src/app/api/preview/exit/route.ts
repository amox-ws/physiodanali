import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Turns Draft Mode off and returns to the public articles list, so the admin
// doesn't keep seeing drafts while browsing the live site.
export async function GET(request: Request) {
  (await draftMode()).disable();
  const { searchParams } = new URL(request.url);
  redirect(searchParams.get("to") || "/articles");
}
