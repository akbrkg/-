import GoogleProvider from "next-auth/providers/google";

// ALLOWED_EMAILS: comma-separated list of the Google account email
// addresses that are allowed to sign in, e.g.
//   ALLOWED_EMAILS=taro@gmail.com,hanako@gmail.com,shiyakusho-taro@city.example.jp
// Set this in .env.local for local development and in the Vercel
// project's Environment Variables for production. Add or remove an
// email there (and redeploy) to manage membership.
function getAllowedEmails() {
  return (process.env.ALLOWED_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    async signIn({ user }) {
      const allowed = getAllowedEmails();
      if (allowed.length === 0) {
        // Fail closed: if nobody is configured as allowed, nobody gets in.
        return false;
      }
      const email = (user?.email || "").toLowerCase();
      return allowed.includes(email);
    },
    async session({ session }) {
      return session;
    },
  },
};
