import { withAuth } from "next-auth/middleware";

function middleware(req, res) {
  const isAuthenticated = req.nextauth?.token;

  if (!isAuthenticated) {
    return res.redirect("/api/auth/signin");
  }
}

export default withAuth(middleware);

export const config = {
  basePath: ["/my-mindmap"],
  matcher: "/my-mindmap/:path*",
};
