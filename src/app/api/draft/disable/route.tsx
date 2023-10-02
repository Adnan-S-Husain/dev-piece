// route handler enabling draft mode
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  draftMode().disable();
  return Response.redirect(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL
        : "http://localhost:3000"
    }`
  );
}
