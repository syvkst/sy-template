import React from "react";
import "./i18n";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "@/routes/__root";
import { NotFound } from "@/components/errors/NotFound";

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  notFoundRoute,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
