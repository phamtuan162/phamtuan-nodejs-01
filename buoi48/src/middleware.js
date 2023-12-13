import createMiddleware from "next-intl/middleware";

const i18n = {
  locales: ["en", "vn"],
  defaultLocale: "en",
};
export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export const config = {
  matcher: ["/", "/(vn|en)/:path*"],
};
