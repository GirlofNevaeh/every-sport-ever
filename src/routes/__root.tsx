import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { LocaleProvider, useI18n } from "@/i18n/locale";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Every Sport Ever" },
      { name: "description", content: "Fifty sports, short rules, fun facts, and 100 sports stars." },
      { name: "theme-color", content: "#1F7A3A" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <SiteHeader />
            <Outlet />
            <SiteFooter />
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: NotFound,
});

function NotFound() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-display text-4xl text-pitch">{t("That page is not here.")}</h1>
      <a href="/" className="mt-4 inline-flex h-12 items-center rounded-full bg-gold px-5 font-bold text-ink">
        {t("Home")}
      </a>
    </main>
  );
}
