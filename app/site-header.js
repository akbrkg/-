"use client";

import { useSession, signOut } from "next-auth/react";

export default function SiteHeader() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <header className="site-header">
      <a className="brand" href="/">
        廃校で学園祭 メンバーポータル
      </a>
      <div className="user-chip">
        {session.user?.image && (
          <img src={session.user.image} alt={session.user?.name || ""} />
        )}
        <span>{session.user?.name || session.user?.email}</span>
        <button className="signout-link" onClick={() => signOut()}>
          ログアウト
        </button>
      </div>
    </header>
  );
}
