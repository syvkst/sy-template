import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "@/main.css";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Row } from "@/components/ui/rowcol";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslation } from "react-i18next";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();
  const { t } = useTranslation();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storageKey="sy-ui-theme">
          <Row className="justify-between px-2 py-4">
            <Row className="gap-4">
              <Link
                to="/"
                activeProps={{
                  className: "font-bold",
                }}
                activeOptions={{ exact: true }}
              >
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    className={
                      isActive
                        ? "border border-purple-500"
                        : "border border-transparent"
                    }
                  >
                    {t("Koti")}
                  </Button>
                )}
              </Link>
              <Link
                to="/about"
                activeProps={{
                  className: "font-bold",
                }}
              >
                <Button variant="ghost">{t("Meistä")}</Button>
              </Link>
            </Row>
            <Row className="gap-4">
              <ModeToggle />
              <LanguageToggle />
            </Row>
          </Row>
          <Separator />
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
