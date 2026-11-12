// Visual Impacto: public Pages address for the current ChatGPT-hosted site.
// This lightweight reverse proxy preserves the live design and asset routes.
// It depends on the original site remaining published.
const UPSTREAM = "https://visual-impacto-estudio.brunopentium.chatgpt.site";


// Allow product catalog links to open the site's existing plan summary modal.
// No plan content or checkout is duplicated here; the source site remains authoritative.
const PLAN_KEYS = new Set(["piloto","presenca","vitrine","destaque"]);
const PLAN_DEEP_LINK_SCRIPT = "<script id=\"visual-impacto-plan-deep-link\">\n(() => {\n  const plan = new URLSearchParams(location.search).get(\"plano\");\n  const labels = {piloto:\"experimentar o piloto\",presenca:\"quero o presenca\",vitrine:\"quero o vitrine\",destaque:\"quero o destaque\"};\n  if (!Object.prototype.hasOwnProperty.call(labels, plan)) return;\n  const norm = value => (value || \"\").normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g,\"\").toLowerCase().trim();\n  let attempts = 0;\n  let timer;\n  const check = () => {\n    const opened = [...document.querySelectorAll(\"h1,h2,h3\")].some(el => norm(el.textContent).includes(\"vamos criar sua presenca\") && el.getClientRects().length > 0);\n    if (opened || ++attempts > 30) { clearInterval(timer); return; }\n    const button = [...document.querySelectorAll(\"button\")].find(el => norm(el.textContent).includes(labels[plan]));\n    if (button) button.click();\n  };\n  const start = () => setTimeout(() => { check(); timer = setInterval(check, 500); }, 600);\n  if (document.readyState === \"complete\") start();\n  else window.addEventListener(\"load\", start, {once:true});\n})();\n</script>";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }
    const target = new URL(incoming.pathname + incoming.search, UPSTREAM);
    try {
      const upstream = await fetch(target.toString(), {
        method: request.method,
        redirect: "follow",
        headers: {
          "Accept": request.headers.get("Accept") || "*/*",
          "Accept-Language": request.headers.get("Accept-Language") || "pt-BR"
        }
      });
      const headers = new Headers(upstream.headers);
      headers.delete("set-cookie");
      headers.delete("x-frame-options");
      headers.delete("content-security-policy");
      headers.delete("content-length");
      headers.delete("transfer-encoding");
      headers.delete("content-encoding");
      headers.set("x-visual-impacto-proxy", "cloudflare-pages");

      const contentType = headers.get("content-type") || "";
      if (request.method === "GET" && contentType.includes("text/html")) {
        let html = (await upstream.text()).split(UPSTREAM).join(incoming.origin);
        if (PLAN_KEYS.has(incoming.searchParams.get("plano"))) {
          html = html.replace(/<\/body>/i, PLAN_DEEP_LINK_SCRIPT + "</body>");
        }
        headers.set("cache-control", "public, max-age=120");
        return new Response(html, { status: upstream.status, headers });
      }
      return new Response(upstream.body, { status: upstream.status, headers });
    } catch (error) {
      return new Response("A Visual Impacto está temporariamente indisponível.", {
        status: 502,
        headers: {"content-type": "text/plain; charset=utf-8", "cache-control": "no-store"}
      });
    }
  }
};
