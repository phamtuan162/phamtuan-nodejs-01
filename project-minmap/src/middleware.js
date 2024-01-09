"use client";
import { NextResponse } from "next/server";
export function middleware(request) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}

export const config = {
  matcher: "/my-mindmap",
};
