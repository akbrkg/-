import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "廃校で学園祭 メンバーポータル",
  description: "メンバー専用ポータルサイト",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
