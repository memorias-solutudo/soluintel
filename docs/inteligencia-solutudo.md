# Artefato — Inteligência Solutudo

Documento vivo do design da **inteligência** (o hub) e do **schema geral** que
alimenta os canais/produtos e o checklist. Cada bloco abaixo é um **card**.

Princípio: a inteligência é o hub que guarda o que vem do **briefing, transcrição
da reunião, Digisac e mídias do cliente**, normaliza em uma **base canônica
(fonte da verdade)** e **projeta o conteúdo por canal** (com nota + lacunas). O
checklist apenas **lê** status, notas e lacunas dessa base — sem digitar nada
duas vezes.

---

## Card — Sobre a Empresa 2.0

**O que é:** prompt de geração do "Sobre a Empresa" desenhado para o nosso schema.
Lê os fatos confirmados da base, escreve um "Sobre" canônico (a essência) e já
entrega as variações por canal — **Solutudo, Solusite, Google Meu Negócio** — e a
**extração da bio** das redes. Otimizado para os dois leitores ao mesmo tempo:
**Google (SEO local)** e **IA que cita negócios**.

**Substitui** o prompt atual da Solutudo, que: usava um insumo único e vago
("Compromisso"), focava em keyword-stuffing (densidade/cota de localização), tinha
tamanho/CTA fixos por canal, não tinha trava anti-invenção, vazava placeholders de
template e devolvia só prosa (sem estrutura nem nota).

### Prompt

```text
PAPEL
Você é o redator do "Sobre a Empresa" da Solutudo. Escreve textos institucionais
factuais, específicos e verificáveis a partir da BASE DE CONHECIMENTO do negócio.
O texto serve a dois leitores ao mesmo tempo: buscadores (SEO local no Google) e
modelos de IA que citam negócios. Não é copy genérica.

REGRAS INQUEBRÁVEIS (verdade primeiro)
- Use SOMENTE fatos presentes na entrada com confirmado=true. É proibido inventar
  diferenciais, anos, números, prêmios, certificações ou serviços.
- Cada afirmação precisa ser sustentada por um fato da entrada; liste os ids em
  "fatos_usados".
- Se faltar insumo para um trecho, NÃO preencha com genérico ("qualidade,
  excelência, compromisso"). Registre em "lacunas" o que falta e de quem é (nos|cliente).
- Sem superlativos não comprovados ("melhor", "líder", "nº 1") e sem itens de
  "claims_proibidos". Sem emoji. Português correto.

PRINCÍPIOS DE ESCRITA (valem para SEO e IA juntos)
- Entidade primeiro: a 1ª frase diz, sem ambiguidade, O QUE a empresa é +
  categoria + cidade/UF. Ex.: "A [Nome] é [categoria] em [cidade]/[UF] ...".
  Isso ancora tanto o Google quanto a IA.
- Frases atômicas e autossuficientes: um fato por frase, sem "isso/aquilo"
  dependente de contexto — é assim que a IA extrai e cita.
- Especificidade > volume: 1 diferencial concreto e verificável vale mais que 3
  adjetivos. Use serviços/termos reais e provas (tempo de mercado, especialidades,
  bairros atendidos).
- Localização natural (cidade + região/bairros), sem repetir por cota.
- Escaneável: parágrafos curtos; no site, pode usar subtítulos e listas.
- Compatível com schema.org/LocalBusiness: priorize fatos que mapeiam a
  propriedades (nome, categoria, área atendida, fundação, especialidades) — eles
  também alimentam o JSON-LD da página.
- Único e denso (sobrevive à indexação): cada descrição carrega fatos ESPECÍFICOS do
  negócio que a tornam distinta — nunca um molde onde só muda nome e cidade. Conteúdo
  fino/quase-duplicado é o que o Google desindexa em escala (scaled content abuse);
  densidade de fato próprio é o fosso que agregador de dado público não copia.
- Extraível fora de contexto: a IA lê o HTML cru e cita frase a frase — cada frase ancora
  a entidade. Categoria + cidade cedo (1a frase e ~250 primeiros caracteres) e no title/H1
  — o Bing, porta do ChatGPT, pondera esses sinais clássicos.

ENTRADA (JSON da base canônica)
{
  "entidade": { "nome","categoria","cidade","uf","area_atendida":[], "fundacao" },
  "fatos": [ { "id","campo","valor","origem","confianca","confirmado" } ],
  "servicos": [ { "nome","termo_busca","preco_ou_faixa" } ],
  "provas": [ "..." ],
  "tom_de_marca": "...",
  "claims_proibidos": [ "..." ]
}
Use apenas fatos com "confirmado": true.

TAREFA
Produza UM "Sobre" canônico (essência) e as variações por canal — todas com a
MESMA essência, mudando só forma e limite:
- essencia: 2 a 4 frases, a verdade-núcleo reutilizável.
- solutudo (perfil Destaque): 90 a 140 palavras; institucional e claro.
- solusite ("Sobre nós" do site): 150 a 250 palavras; pode ter 1 a 2 subtítulos
  e uma lista; CTA leve permitido só no final.
- google (descrição do Google Meu Negócio): até 750 caracteres, com o essencial
  nos ~250 primeiros (o que aparece antes do "Mais"); factual; SEM URL e SEM foco
  promocional (política do Google); sem telefone (campo próprio do perfil); foco
  no que é, no que oferece e onde atende.
- instagram_bio: extraia o essencial em até 150 caracteres: o que faz + cidade
  + 1 diferencial real; tom direto.

Para SEO do site/Google, gere também:
- seo.title: até 60 caracteres, com benefício real + cidade.
- seo.meta_description: até 155 caracteres, factual, com termo natural.
- seo.termos: termos reais usados (dos serviços e dúvidas), sem stuffing.

SAÍDA — responda SOMENTE com JSON válido neste formato:
{
  "essencia": "...",
  "por_canal": {
    "solutudo":      { "texto":"...", "fatos_usados":["f1","f3"] },
    "solusite":      { "texto":"...", "subtitulos":["..."], "fatos_usados":[...] },
    "google":        { "texto":"...", "caracteres":NNN, "fatos_usados":[...] },
    "instagram_bio": { "texto":"...", "caracteres":NNN }
  },
  "seo": { "title":"...", "meta_description":"...", "termos":["..."] },
  "lacunas": [ { "o_que":"...", "dono":"cliente|nos" } ],
  "claims_evitados": [ "..." ]
}
```

### Por que é diferente
- **Lê o schema, não um campo solto** — entra `fatos` com `confirmado/origem`,
  garantindo verdade e rastreabilidade.
- **Um texto, quatro saídas** — resolve o item de Consistência *"mesma essência,
  adaptada por canal"* de uma vez.
- **Respeita a regra de cada superfície** — Google ≤750, sem URL/foco promocional (política), sem telefone (boa prática);
  Solusite com subtítulo/lista/CTA; bio micro.
- **Otimizado para IA também** — entidade na 1ª frase + frases atômicas é o que faz
  um LLM citar o negócio corretamente, não só o Google rankear.
- **Saída encaixa no schema** — cada variação vai para
  `conteudo.descricao.por_canal[...]`; as `lacunas` viram pendências do checklist
  (com dono). A **nota** vem do prompt-avaliador irmão.

### Pendente / próximos
- Prompt-avaliador irmão (gera a `nota_geral` + diagnóstico que o card espelha).
- Fechar o **contrato de dados** (schema canônico completo + camada de briefing/
  reunião/Digisac/mídias com proveniência e confiança).
- Mapa *item do checklist → regra de derivação → dono da lacuna*.

---

## Card — Considerações de SEO + IA (server-render, 3 camadas, JSON-LD)

Fontes (analisados os DOIS documentos): (1) doc técnico do time de desenvolvimento
(Kimura, Rielo, Sonoda) — "recuperação de indexação e visibilidade (Google + IA)";
(2) doc de "recomendações de design — a página de detalhe". Jun/2026. Diagnóstico: a Solutudo perdeu ~17 mi de páginas indexadas
porque **conteúdo preso em JS/imagem é ilegível para Google e IA** (o ChatGPT-User
vê casca vazia; HTML estático lê ~94%, via JS ~23%). A busca por IA do ChatGPT roda
sobre o **índice do Bing** — estar indexado no Bing é pré-requisito.

**Regras que regem TODO conteúdo que a inteligência gera (não negociáveis):**

1. **Server-render.** Texto e JSON-LD vão no HTML servido, nunca injetados por JS.
   Teste: desligou o JS e sumiu? → errado.
2. **Texto é texto, não imagem.** Nome, telefone, endereço, horário, descrição =
   texto real selecionável. Telefone/WhatsApp **clicáveis** (`tel:` / `wa.me`),
   visíveis, sem "ver telefone".
3. **JSON-LD por `@type` específico** (Restaurant, Plumber, Dentist, GeneralContractor…
   fallback LocalBusiness) + **FAQPage** para o FAQ. Campos: name, legalName, taxID,
   telephone, address, geo, openingHoursSpecification, areaServed, knowsAbout,
   foundingDate. `dateModified` vai no nó **WebPage** do JSON-LD (é propriedade de
   CreativeWork, não de LocalBusiness). **`aggregateRating` só com avaliação real — nunca inventar.**
4. **3 camadas na página:** Consumo (contato) → Profundidade de dado (dossiê CNPJ/Receita)
   → Confiança (avaliações, selo, frescor, conteúdo do dono = nosso fosso).
5. **Frescor:** "Atualizado em DD/MM/AAAA" visível + `dateModified` + frescor no `<title>`;
   disparar **IndexNow** ao mudar (propaga ao Bing).
6. **Performance/mobile:** CSS crítico inline, lazy-load abaixo da dobra, cortar JS do
   núcleo (FCP < ~0,4s = muito mais citação); mobile-first, toque ≥44px, contraste ≥4,5:1.
7. **Indexação:** `meta-robots index,follow,max-snippet:-1,max-image-preview:large`;
   `canonical`; sitemap segmentado; `noindex`/consolidar cascas. Liberar bots: Bingbot,
   OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Google-Extended.

**Impacto no schema canônico:** a base canônica passa a precisar também de
`dossie_cnpj` (Receita: razão social, CNPJ, situação, abertura, porte, natureza,
CNAE principal+secundários, QSA, matriz/filiais) e de um bloco `entrega`
(server_rendered: true, json_ld por @type, dateModified, indexnow). A saída da
inteligência (descrição, FAQ) deve vir acompanhada do **JSON-LD pronto** para o
HTML servido — não só o texto.

**Impacto no prompt "Sobre a Empresa 2.0":** já ajustado — agora emite também
`json_ld` (com @type específico, sem aggregateRating inventado) e traz a regra de
ENTREGA server-rendered. Ver card "Sobre a Empresa 2.0".

---

## Card — Conferência (schema.org + Google + canais) · 17/07/2026

Validação das regras deste doc e do artefato contra schema.org, Google Search
Central e as políticas dos canais. **Confirmado:** obrigatórios `name`+`address`;
@type mais específico possível (marmoraria → `HomeAndConstructionBusiness`);
aggregateRating só real; FAQPage válido (rich results só gov/saúde desde ago/2023 —
a IA cita o conteúdo Q&A; a marcação ajuda o parsing); limites Instagram 150,
title ~60, meta 140–160. **Corrigido:** limite do Google Meu Negócio é **750**
caracteres (não 700), com o essencial nos ~250 primeiros; `dateModified` pertence
ao nó **WebPage**, não ao LocalBusiness; telefone fora da descrição do Google é
boa prática (não proibição) — URL e foco promocional é que são política.
