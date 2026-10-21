import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dl_oN5pa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	(0, import_react.useEffect)(() => {
		const w = window;
		if (w.__vwBooting || w.__vw) return;
		w.__vwBooting = true;
		const url = new URL("game.html", document.baseURI);
		fetch(url).then((res) => {
			if (!res.ok) throw new Error("Could not load the arena");
			return res.text();
		}).then((html) => {
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
		}).catch((err) => {
			const host = document.getElementById("vw-host");
			if (host) host.textContent = err instanceof Error ? err.message : "Could not load the arena";
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		id: "vw-host",
		className: "min-h-dvh bg-bg font-sans text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-6 text-base",
			children: "Loading Voidware arena…"
		})
	});
}
//#endregion
export { Home as component };
