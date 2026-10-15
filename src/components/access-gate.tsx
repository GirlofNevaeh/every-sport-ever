import { Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { CookieNotice } from "@/components/cookie-notice";
import { Paywall } from "@/components/paywall";
import { checkAccess } from "@/lib/access";
import { readCookieChoice } from "@/lib/cookie-choice";

const TOKEN_KEY = "ese-access";

export function SiteShell() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const locked = path !== "/" && !open;

  useEffect(() => {
    if (readCookieChoice() === null) setCookieOpen(true);
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    let cancel = false;
    void checkAccess({ data: { token } })
      .then((result) => {
        if (cancel) return;
        if (result.ok) setOpen(true);
        else window.localStorage.removeItem(TOKEN_KEY);
      })
      .catch(() => {
        if (!cancel) window.localStorage.removeItem(TOKEN_KEY);
      });
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className={cookieOpen ? "pb-64 sm:pb-44" : undefined}>
      <SiteHeader />
      {locked ? (
        <Paywall
          onUnlocked={(token) => {
            window.localStorage.setItem(TOKEN_KEY, token);
            setOpen(true);
          }}
        />
      ) : (
        <Outlet />
      )}
      <SiteFooter onCookies={() => setCookieOpen(true)} />
      <CookieNotice open={cookieOpen} onClose={() => setCookieOpen(false)} />
    </div>
  );
}
