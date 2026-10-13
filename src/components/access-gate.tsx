import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Paywall } from "@/components/paywall";
import { checkAccess } from "@/lib/access";

const TOKEN_KEY = "ese-access";

export function SiteShell() {
  const [open, setOpen] = useState(false);

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

  if (!open) {
    return (
      <Paywall
        onUnlocked={(token) => {
          window.localStorage.setItem(TOKEN_KEY, token);
          setOpen(true);
        }}
      />
    );
  }

  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
