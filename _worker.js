// Visual Impacto — public site proxy + direct catalog plan summary links.
const UPSTREAM = "https://visual-impacto-estudio.brunopentium.chatgpt.site";
const PLAN_DATA = {
  "piloto": {
    "name": "Piloto",
    "price": "R$ 197,00",
    "period": "3 conteúdos · pacote avulso",
    "description": "1 vídeo vertical + 1 post estático + 1 carrossel de até 5 páginas. Identidade visual e legenda sugerida para cada conteúdo.",
    "timing": "Prazo máximo: 48 horas corridas após o pagamento, respeitando o recebimento dos materiais necessários.",
    "url": "https://mpago.la/2f2uZwr"
  },
  "presenca": {
    "name": "Presença",
    "price": "R$ 397,00",
    "period": "8 conteúdos · plano mensal",
    "description": "2 vídeos verticais + 4 posts estáticos + 2 carrosséis de até 5 páginas cada. Identidade visual e legenda sugerida para cada conteúdo.",
    "timing": "Entregas distribuídas ao longo de um mês a partir do pagamento, conforme cronograma de produção.",
    "url": "https://mpago.la/34hHrC9"
  },
  "vitrine": {
    "name": "Vitrine",
    "price": "R$ 697,00",
    "period": "12 conteúdos · plano mensal",
    "description": "4 vídeos verticais + 6 posts estáticos + 2 carrosséis de até 5 páginas cada. Identidade visual e legenda sugerida para cada conteúdo.",
    "timing": "Entregas distribuídas ao longo de um mês a partir do pagamento, conforme cronograma de produção.",
    "url": "https://mpago.la/1VBafZa"
  },
  "destaque": {
    "name": "Destaque",
    "price": "R$ 1.197,00",
    "period": "20 conteúdos · plano mensal",
    "description": "8 vídeos verticais + 8 posts estáticos + 4 carrosséis de até 5 páginas cada. Identidade visual e legenda sugerida para cada conteúdo.",
    "timing": "Entregas distribuídas ao longo de um mês a partir do pagamento, conforme cronograma de produção.",
    "url": "https://mpago.la/31EqL"
  }
};

function renderSummary(planKey) {
  const p = PLAN_DATA[planKey];
  const revision = "Uma rodada de revisão por conteúdo (dentro do escopo original da postagem), com versão corrigida em até 48 horas corridas após recebermos a lista de ajustes. A espera por materiais ou retorno do cliente pausa o prazo da peça.";
  const exclusion = "Publicação e gestão das redes, anúncios, locução e recursos premium à parte.";
  const markup = [
    '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    '<meta name="robots" content="noindex,follow">',
    '<title>Plano ',p.name,' | Visual Impacto</title>',
    '<style>',
    '*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif}',
    'body{background:radial-gradient(ellipse at 50% 45%,#242018 0%,#090b0c 74%);color:#f5f5f5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px}',
    '.dialog{position:relative;width:min(100%,640px);background:#121212;border:1px solid #424242;border-radius:26px;padding:44px 36px 38px;box-shadow:0 16px 70px rgba(0,0,0,.6)}',
    '.eyebrow{color:#ffbe3e;font-size:12px;letter-spacing:2.1px;font-weight:800;text-transform:uppercase;margin-bottom:22px}',
    'h1{font-size:clamp(29px,6vw,43px);line-height:1.13;letter-spacing:-.03em;margin:0 26px 36px 0;font-weight:800}',
    '.close{position:absolute;right:25px;top:24px;color:#a6a6a6;font-size:30px;text-decoration:none;line-height:1}',
    '.plan{display:flex;gap:14px;justify-content:space-between;align-items:center;border:1px solid #4c3d1f;background:#251f12;border-radius:14px;padding:25px 23px;margin-bottom:38px}',
    '.plan-name{font-size:26px;font-weight:750;margin-bottom:10px}.plan-period{color:#acaaa4;font-size:15px}',
    '.price{font-weight:800;font-size:26px;white-space:nowrap;color:#ffbf3f}',
    '.section-title{font-size:18px;font-weight:750;margin-bottom:16px}',
    '.bodycopy{color:#aaa9a5;font-size:16px;line-height:1.62}.bodycopy p{margin:0 0 14px}',
    '.buy{display:flex;align-items:center;justify-content:center;gap:15px;text-decoration:none;text-align:center;background:#ffc23d;color:#17120c;font-size:27px;font-weight:800;border-radius:13px;min-height:90px;padding:18px 14px;margin-top:32px;box-shadow:0 12px 38px rgba(237,172,29,.15)}',
    '.mp{display:inline-block;background:#fff;color:#159ec1;border-radius:11px;padding:10px 13px;font-size:17px;line-height:1.1;white-space:nowrap}.disclaimer{font-size:13px;color:#96948e;line-height:1.55;text-align:center;margin:18px 8px 0}',
    '@media(max-width:520px){body{padding:14px 10px}.dialog{padding:38px 24px 30px;border-radius:22px}.plan{padding:18px 15px}.plan-name,.price{font-size:22px}.plan-period{font-size:13px}.bodycopy{font-size:15px}.buy{font-size:23px;min-height:78px}.mp{font-size:14px;padding:10px}}',
    '</style></head><body><main class="dialog" role="dialog" aria-modal="true" aria-labelledby="plan-title">',
    '<a class="close" href="/" aria-label="Fechar e voltar ao site">×</a>',
    '<div class="eyebrow">VISUAL IMPACTO / SEU PACOTE</div>',
    '<h1 id="plan-title">Vamos criar sua presença.</h1>',
    '<div class="plan"><div><div class="plan-name">',p.name,'</div><div class="plan-period">',p.period,'</div></div><div class="price">',p.price,'</div></div>',
    '<div class="section-title">O que você recebe</div>',
    '<div class="bodycopy"><p>',p.description,'</p><p>',p.timing,'</p><p>',revision,'</p><p>',exclusion,'</p></div>',
    '<a class="buy" href="',p.url,'" rel="noopener noreferrer">Assinar ↗ <span class="mp">com<br>Mercado Pago</span></a>',
    '<p class="disclaimer">Você será direcionado ao Mercado Pago, plataforma de pagamentos do grupo Mercado Livre. Seus dados de pagamento são informados diretamente no ambiente do Mercado Pago.</p>',
    '</main></body></html>'
  ].join("");
  return new Response(markup,{status:200,headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-visual-impacto-plan":"summary"}});
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if(request.method!=="GET" && request.method!=="HEAD") return new Response("Method Not Allowed",{status:405,headers:{Allow:"GET, HEAD"}});
    const planKey = incoming.searchParams.get("plano");
    if (request.method === "GET" && Object.prototype.hasOwnProperty.call(PLAN_DATA, planKey)) {
      return renderSummary(planKey);
    }
    const target = new URL(incoming.pathname + incoming.search,UPSTREAM);
    try {
      const upstream = await fetch(target.toString(),{
        method:request.method,
        redirect:"follow",
        headers:{"Accept":request.headers.get("Accept") || "*/*","Accept-Language":request.headers.get("Accept-Language") || "pt-BR"}
      });
      const headers = new Headers(upstream.headers);
      for(const name of ["set-cookie","x-frame-options","content-security-policy","content-length","transfer-encoding","content-encoding"]) headers.delete(name);
      headers.set("x-visual-impacto-proxy","cloudflare-pages");
      if (request.method === "GET" && (headers.get("content-type") || "").includes("text/html")) {
        const html = (await upstream.text()).split(UPSTREAM).join(incoming.origin);
        headers.set("cache-control","public, max-age=120");
        return new Response(html,{status:upstream.status,headers});
      }
      return new Response(upstream.body,{status:upstream.status,headers});
    } catch(error) {
      return new Response("A Visual Impacto está temporariamente indisponível.",{status:502,headers:{"content-type":"text/plain; charset=utf-8","cache-control":"no-store"}});
    }
  }
};
