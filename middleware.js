import { withAuth } from "next-auth/middleware";

// Protect every page except the sign-in page itself, the NextAuth API
// routes, and Next.js's internal/static assets. Anyone without a valid
// (allow-listed) session is redirected to our custom /signin page.
export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    "/((?!api/auth|signin|_next/static|_next/image|favicon.ico).*)",
  ],
};
