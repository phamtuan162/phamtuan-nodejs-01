"use client";
import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("appSession")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}

export const config = {
  matcher: "/my-mindmap",
};
