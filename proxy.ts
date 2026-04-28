/* Third-party imports. */
import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";

/* Project components. */
import { auth } from "@/lib/auth/auth";

/* Project components. */

/**
 * Middleware that runs before requests.
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  /* Get the session cookie. */
  const sessionCookie = await auth.api.getSession({
    headers: await headers(),
  });

  /* Check which route the user is trying to access. */
  const { pathname } = request.nextUrl;

  /**
   * Route protection.
   */
  /* Protect /app routes so that only logged-in users can access them. */
  if (pathname === "/" && !sessionCookie)
    return NextResponse.redirect(new URL("/auth", request.url));

  /* Protect auth routes so that only logged-out users can access them. */
  if (pathname === "/auth" && sessionCookie)
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
    "/cases/:path*",
    "/account/:path*",
    "/change-email/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password/:path*",
  ],
};
