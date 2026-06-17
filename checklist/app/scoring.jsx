/* ============================================================
   Motor de score — reativo, ponderado por impacto, honesto.
   `campo` = "sem" | "com" — permite calcular o estado ANTES
   (Sem Solutudo) e o estado DEPOIS (Com Solutudo) com a mesma
   máquina, conforme o modo global selecionado no topo.

   - qualidade do item: binária — o campo do modo está marcado (1) ou não (0)
   - delta = com && !sem  => o que a Solutudo entregou (prova de valor)
   - teto: item CRÍTICO não 100% limita o score àquele bloco a TETO_CRITICO
   - separa o que falta por NÓS vs por INSUMO DO CLIENTE
   As funções de pilar/geral recebem uma LISTA PLANA de itens
   (produtos + dados da empresa), para tirar a média de tudo.
   ============================================================ */

const TETO_CRITICO = 0.7;

// Binário e honesto: o campo do modo (sem/com) está marcado?
function qualidadeItem(item, campo) { return item[campo || "com"] ? 1 : 0; }

function ehDelta(item) { return item.com && !item.sem; }

// Agrega uma lista de itens em { pct, completos, total, delta, ... }
function agregar(itens, PESO, campo) {
  campo = campo || "com";
  let somaPeso = 0, somaQual = 0, delta = 0, criticoFuro = false;
  let pendNos = 0, pendCliente = 0, completos = 0;
  for (const item of itens) {
    const w = PESO[item.impacto] || 1;
    const q = qualidadeItem(item, campo);
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

// Score por pilar a partir de uma lista plana de itens.
function scorePorPilar(itens, PESO, PILARES, campo) {
  const out = {};
  for (const k of Object.keys(PILARES)) {
    out[k] = agregar(itens.filter((i) => i.pilar === k), PESO, campo);
  }
  return out;
}

// Score geral (média ponderada) de uma lista plana de itens.
function scoreGeral(itens, PESO, campo) {
  return agregar(itens, PESO, campo);
}

function pct(n) { return Math.round(n * 100); }

// Score da área de Avaliações (campos especiais: range + nota por estrelas).
function scoreAvaliacoes(itens, campo) {
  campo = campo || "com";
  let soma = 0, n = 0, completos = 0;
  for (const it of itens) {
    let q = 0;
    if (it.tipo === "range") {
      const i = it.opcoes.indexOf(it.valor[campo]);
      q = i <= 0 ? 0 : i / (it.opcoes.length - 1);
      if (i > 0) completos++;
    } else if (it.tipo === "rating") {
      const v = it.nota[campo] || 0;
      q = v / 5;
      if (v > 0) completos++;
    }
    soma += q; n++;
  }
  return { pct: n ? soma / n : 0, pctBruto: n ? soma / n : 0, criticoFuro: false, delta: 0, pendNos: 0, pendCliente: 0, completos, total: n };
}

window.SOL_SCORE = { qualidadeItem, ehDelta, agregar, scorePorPilar, scoreGeral, scoreAvaliacoes, pct, TETO_CRITICO };
