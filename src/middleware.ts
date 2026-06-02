import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const userAgent = request.headers.get("user-agent") || "";

  // 1. Exclude static assets, API routes, favicon, and the mobile path for testing
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/mobile")
  ) {
    return NextResponse.next();
  }

  const isMobileSubdomain = host.startsWith("mobile.");
  const hasDesktopParam = searchParams.get("desktop") === "true";
  const hasDesktopCookie = request.cookies.get("desktop_mode")?.value === "true";

  // 2. If visiting ?desktop=true on the desktop site, set cookie and allow desktop view
  if (hasDesktopParam && !isMobileSubdomain) {
    const response = NextResponse.next();
    // Set cookie to persist desktop mode choice
    response.cookies.set("desktop_mode", "true", { path: "/" });
    return response;
  }

  // 3. Subdomain rewrite logic:
  // If the user visits the mobile subdomain, serve the mobile page route `/mobile`.
  if (isMobileSubdomain) {
    const url = request.nextUrl.clone();
    url.pathname = "/mobile";
    const response = NextResponse.rewrite(url);
    response.headers.set("x-is-mobile", "true");

    // Clear desktop_mode override cookie if it exists when they access the mobile site
    if (request.cookies.has("desktop_mode")) {
      response.cookies.delete("desktop_mode");
    }
    return response;
  }

  // 4. Device detection & redirection logic:
  // Detect mobile user agents (excluding tablets like iPad or Android tablets)
  // Tablets contain "Android" but not "Mobile", or "iPad" / "Macintosh" (modern iPads).
  const isMobileUA = /iphone|ipod|android.*mobile|windows phone|blackberry|opera mini|iemobile/i.test(userAgent);

  // If mobile user visits desktop site, has not set desktop cookie, and didn't pass ?desktop=true
  if (isMobileUA && !hasDesktopCookie && !hasDesktopParam) {
    // Redirect to mobile subdomain
    const mobileUrl = new URL("/", "https://mobile.safevitals.in");
    searchParams.forEach((value, key) => {
      if (key !== "desktop") {
        mobileUrl.searchParams.set(key, value);
      }
    });
    return NextResponse.redirect(mobileUrl, 307);
  }

  // For desktops, tablets, or mobile users in desktop_mode
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
