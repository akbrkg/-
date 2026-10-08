import SiteHeader from "./site-header";

export default function PageShell({ title, children }) {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <a className="back-link" href="/">
          ← ポータルトップへ戻る
        </a>
        <h1>{title}</h1>
        <div className="content-card">{children}</div>
      </main>
    </>
  );
}
