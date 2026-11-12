// Visual Impacto: public Pages address for the current ChatGPT-hosted site.
// This lightweight reverse proxy preserves the live design and asset routes.
// It depends on the original site remaining published.
const UPSTREAM = "https://visual-impacto-estudio.brunopentium.chatgpt.site";


// Allow product catalog links to open the site's existing plan summary modal.
// No plan content or checkout is duplicated here; the source site remains authoritative.
const PLAN_KEYS = new Set(["piloto","presenca","vitrine","destaque"]);
const PLAN_DEEP_LINK_SCRIPT = "<script id=\"visual-impacto-plan-deep-link\">\n(function () {\n  var plan = new URLSearchParams(window.location.search).get(\"plano\");\n  var labels = { piloto: \"experimentar o piloto\", presenca: \"quero o presenca\", vitrine: \"quero o vitrine\", destaque: \"quero o destaque\" };\n  if (!Object.prototype.hasOwnProperty.call(labels, plan)) return;\n  function normalize(value) { return String(value || \"\").normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\").toLowerCase().trim(); }\n  var ticks = 0;\n  var finished = false;\n  function attempt() {\n    if (finished) return;\n    var checkout = document.getElementById(\"checkout\");\n    if ((checkout && checkout.hasAttribute(\"open\")) || (document.body && document.body.classList.contains(\"modal-open\"))) {\n      finished = true;\n      document.documentElement.dataset.viDeepLink = \"opened-\" + plan;\n      return;\n    }\n    var buttons = Array.prototype.slice.call(document.querySelectorAll(\"button\"));\n    var button = buttons.find(function (el) { return normalize(el.textContent).indexOf(labels[plan]) >= 0; });\n    if (button) {\n      button.click();\n      document.documentElement.dataset.viDeepLink = \"clicked-\" + plan;\n    }\n    if (++ticks >= 80) {\n      finished = true;\n      if (!button) document.documentElement.dataset.viDeepLink = \"button-not-found\";\n    }\n  }\n  var timer = window.setInterval(function () {\n    attempt();\n    if (finished) window.clearInterval(timer);\n  }, 350);\n  if (document.readyState === \"loading\") document.addEventListener(\"DOMContentLoaded\", attempt, {once: true});\n  else attempt();\n  window.addEventListener(\"load\", attempt, {once: true});\n})();\n</script>";

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
          html = html.replace(/<\/head>/i, PLAN_DEEP_LINK_SCRIPT + "</head>");
          if (!html.includes('id="visual-impacto-plan-deep-link"')) {
            html = html.replace(/<\/body>/i, PLAN_DEEP_LINK_SCRIPT + "</body>");
          }
          headers.set("x-visual-impacto-deep-link", "enabled");
          headers.set("cache-control", "no-store");
        }
        if (!PLAN_KEYS.has(incoming.searchParams.get("plano"))) headers.set("cache-control", "public, max-age=120");
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
