import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useEffect(() => {
    const w = window as Window & { __vwBooting?: boolean; __vw?: unknown };
    if (w.__vwBooting || w.__vw) return;
    w.__vwBooting = true;
    const url = new URL("game.html", document.baseURI);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load the arena");
        return res.text();
      })
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        doc.querySelectorAll("style").forEach((node) => {
          const style = document.createElement("style");
          style.textContent = node.textContent;
          document.head.appendChild(style);
        });
        const host = document.getElementById("vw-host");
        const root = doc.getElementById("vw");
        if (!host || !root) throw new Error("Arena markup missing");
        host.replaceChildren(document.importNode(root, true));
        doc.querySelectorAll("script").forEach((old) => {
          const script = document.createElement("script");
          script.textContent = old.textContent;
          document.body.appendChild(script);
        });
      })
      .catch((err: unknown) => {
        const host = document.getElementById("vw-host");
        if (host) {
          host.textContent = err instanceof Error ? err.message : "Could not load the arena";
        }
      });
  }, []);

  return (
    <main id="vw-host" className="min-h-dvh bg-bg font-sans text-fg">
      <p className="p-6 text-base">Loading Voidware arena…</p>
    </main>
  );
}
