import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SiteHeader from "./site-header";

const SECTIONS = [
  {
    heading: "最近入った方へ",
    links: [{ href: "/onboarding", label: "初期研修ページ" }],
  },
  {
    heading: "いろいろ困ったとき",
    links: [
      { href: "/faq", label: "ツールの使い方を知りたい" },
      { href: "/faq", label: "よくある質問" },
    ],
  },
  {
    heading: "参考になるものを見たい",
    links: [{ href: "/materials", label: "資料" }],
  },
  {
    heading: "会議に参加したい",
    links: [{ href: "/meeting", label: "会議" }],
  },
  {
    heading: "メンバーを紹介したい",
    links: [
      { href: "/members", label: "メンバー紹介" },
      { href: "/join", label: "入会" },
    ],
  },
];

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <SiteHeader />
      <main className="page">
        <h1>廃校で学園祭 メンバー専用ポータル</h1>
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <p className="section-title">{section.heading}</p>
            <div className="button-grid">
              {section.links.map((link) => (
                <a key={link.label} className="portal-button" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
