import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";
// import { useSession } from "next-auth/react";

// export function middleware(request) {
//   const { data: session } = useSession();

//   const reponse = NextResponse.next();
//   reponse.cookies.set("email");
//   const pathname = request.nextUrl.pathname;
//   // if (pathname === "/don-hang") {
//   //   return NextResponse.rewrite(new URL("/orders", request.url));
//   // }
//   if (session && pathname === "/auth") {
//     return NextResponse.redirect(new URL("/profile", request.url));
//   }
// }

export default createMiddleware({
  locales: ["en", "vn"],

  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(vn|en)/:path*"],
};
