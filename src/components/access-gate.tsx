import { Outlet } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/chrome";

export function SiteShell() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
