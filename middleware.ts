import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Skip internal Next.js requests and static files
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if we are running locally or in production
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");

  let subdomain = "";
  if (isLocal) {
    const hostWithoutPort = host.split(":")[0];
    const parts = hostWithoutPort.split(".");
    if (parts.length === 2 && parts[1] === "localhost") {
      subdomain = parts[0];
    } else if (parts.length > 2) {
      subdomain = parts[0];
    }
  } else {
    const parts = host.split(".");
    if (parts.length >= 4) {
      subdomain = parts[0];
    } else if (parts.length === 3 && parts[0] === "dashboard") {
      subdomain = "dashboard";
    }
  }

  // Redirect /platform to /dashboard (or corresponding page)
  if (url.pathname === "/platform") {
    if (isLocal) {
      if (subdomain && subdomain !== "dashboard") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      } else {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    } else {
      if (subdomain === "") {
        // safevitals.in/platform -> dashboard.safevitals.in/
        const newUrl = new URL("https://dashboard.safevitals.in/");
        return NextResponse.redirect(newUrl);
      } else if (subdomain && subdomain !== "dashboard") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      } else {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  }

  // Rewrite subdomains to internal routes
  if (subdomain === "patient") {
    url.pathname = `/patient${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  if (subdomain === "doctor") {
    url.pathname = `/doctor${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  if (subdomain === "staff") {
    url.pathname = `/staff${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  if (subdomain === "dashboard") {
    url.pathname = `/dashboard${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for Next.js internals, API, and static assets
     */
    "/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*|robots.txt|sitemap.ts).*)",
  ],
};
