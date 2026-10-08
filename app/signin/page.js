"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SignInCard() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="signin-card">
      <h1>廃校で学園祭</h1>
      <p>メンバーポータルにアクセスするには、許可されたGoogleアカウントでログインしてください。</p>
      <button
        className="google-button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Googleでログイン
      </button>
      {error && (
        <p className="error-text">
          このGoogleアカウントにはアクセス権がありません。管理者に確認してください。
        </p>
      )}
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="signin-screen">
      <Suspense fallback={null}>
        <SignInCard />
      </Suspense>
    </div>
  );
}
