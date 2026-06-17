/* ============================================================
   Motor de score — reativo, ponderado por impacto, honesto.
   Conceitos da spec §8:
   - qualidade do item: só conta se "com" estiver marcado E as 3
     lentes passarem (conteúdo/visual/autenticidade). Item marcado
     com conteúdo genérico = falha de qualidade, não entrega.
       com + 3 lentes  -> 1.0
       com + 2 lentes  -> ~0.66
       com + 1 lente   -> ~0.33
       sem "com"       -> 0
   - delta = com && !sem  => o que a Solutudo entregou (prova de valor)
   - teto: item CRÍTICO não 100% limita o score geral a TETO_CRITICO
   - separa o que falta por NÓS vs por INSUMO DO CLIENTE
   ============================================================ */

const TETO_CRITICO = 0.7;

// Binário e honesto: o item está entregue/feito (marcado) ou não.
function qualidadeItem(item) { return item.com ? 1 : 0; }

function ehDelta(item) { return item.com && !item.sem; }

// Agrega uma lista de itens em { pct, completos, total, delta, ... }
function agregar(itens, PESO) {
  let somaPeso = 0, somaQual = 0, delta = 0, criticoFuro = false;
  let pendNos = 0, pendCliente = 0, completos = 0;
  for (const item of itens) {
    const w = PESO[item.impacto] || 1;
    const q = qualidadeItem(item);
    somaPeso += w;
    somaQual += w * q;
    if (ehDelta(item)) delta++;
    if (q >= 0.999) completos++;
    if (item.critico && q < 0.999) criticoFuro = true;
    if (q < 0.999) {
      if (item.dono === "cliente") pendCliente++;
      else pendNos++;
    }
  }
  let pct = somaPeso ? somaQual / somaPeso : 0;
  const pctBruto = pct;
  if (criticoFuro) pct = Math.min(pct, TETO_CRITICO);
  return { pct, pctBruto, criticoFuro, delta, pendNos, pendCliente, completos, total: itens.length };
}

// Score por pilar a partir de todos os itens (todos os produtos).
function scorePorPilar(produtos, PESO, PILARES) {
  const out = {};
  for (const k of Object.keys(PILARES)) {
    const itens = [];
    produtos.forEach((p) => p.itens.forEach((i) => { if (i.pilar === k) itens.push(i); }));
    out[k] = agregar(itens, PESO);
  }
  return out;
}

function scoreGeral(produtos, PESO) {
  const todos = [];
  produtos.forEach((p) => p.itens.forEach((i) => todos.push(i)));
  return agregar(todos, PESO);
}

function pct(n) { return Math.round(n * 100); }

window.SOL_SCORE = { qualidadeItem, ehDelta, agregar, scorePorPilar, scoreGeral, pct, TETO_CRITICO };
