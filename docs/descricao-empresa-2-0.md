# Descrição da Empresa 2.0 — Dossiê completo para validação

> **⚠ Substituída pela [Descrição 3.0](descricao-empresa-3-0.md) em 22/07/2026** —
> após auditoria da revisão externa (spec 2.1). Este arquivo permanece como registro
> histórico e detalhe editorial; as regras vigentes são as da 3.0.

**Objetivo deste documento:** reunir num único lugar TUDO o que foi levantado, definido,
conferido e corrigido sobre a nova "Descrição da Empresa" (e o FAQ que a acompanha),
para validação externa antes de implementar na **página de detalhe de empresas
pagantes e gratuitas** cadastradas na Solutudo.

**Status:** definições fechadas e conferidas (schema.org, Google, políticas dos canais,
auditoria dos dois documentos internos). Pendências listadas na seção 13.

**Par visual:** artefato vivo em
`https://memorias-solutudo.github.io/soluintel/artefatos/sobre-empresa-new-rock/`
(abas Descrição / FAQ / Indexação). Documentos-irmãos: `docs/inteligencia-solutudo.md`
(fontes e porquês) e `docs/orientacoes-telas-solutudo.md` (régua de telas).

---

## 1 · Por que mudar (diagnóstico)

**O prompt atual da Solutudo** falha em pontos estruturais:
- usa um insumo único e vago ("Compromisso") em vez de fatos estruturados;
- foca em keyword-stuffing (densidade/cota de localização) — SEO de 2015;
- tamanho e CTA fixos por canal, ignorando a política de cada superfície;
- **não tem trava anti-invenção** (inventa diferenciais genéricos);
- vaza placeholders de template ("Polimento técnico" com maiúscula no meio da frase);
- devolve só prosa — sem estrutura, sem nota, sem lacunas, sem JSON-LD.

**O contexto que torna isso urgente** (dois documentos internos, auditados — seção 11):
- A Solutudo perdeu ~17 mi de páginas indexadas (≈45 → 28 mi, mar–jun/2026).
- Causa dominante: **conteúdo fino/quase-duplicado em escala** (páginas que só trocam
  nome e cidade) — exatamente o alvo dos spam updates do Google.
- Causa técnica: **conteúdo preso em JS/imagem é ilegível** para os crawlers de IA
  (nenhum executa JavaScript — leem o HTML cru).
- A busca do **ChatGPT roda sobre o índice do Bing** — estar no Bing é pré-requisito
  para existir na resposta da IA.

A descrição nova é desenhada para **4 leitores ao mesmo tempo**: pessoas, Google (SEO
local), Bing (porta do ChatGPT) e modelos de IA que citam negócios (GEO).

---

## 2 · Os 10 problemas do texto atual (caso de referência: New Rock Expresso)

| # | Trecho atual | Problema | Correção 2.0 |
|---|---|---|---|
| 1 | "nasceu no Rio de Janeiro… toda a cidade" | Localização genérica não posiciona | Bairros/zonas reais (Zona Sul, Barra, Recreio, Tijuca) |
| 2 | "restaurar superfícies nobres e devolver brilho…" | Propósito poético, não fato | O serviço real: lavagem, polimento, cristalização, restauração |
| 3 | "Desde o início" | Vago; tempo de mercado é prova | "Desde [ano real]" → vira `foundingDate` no schema |
| 4 | "Polimento técnico" | Slot de template vazando (maiúscula no meio) | Lista de serviços reais com termo de busca |
| 5 | "conhecimento prático, equipamentos profissionais e atenção aos detalhes" | Adjetivo vazio, cabe em qualquer empresa | Diferencial verificável (processo a seco, discos diamantados) |
| 6 | "métodos adequados a cada tipo de pedra" | Não nomeia nada | Nomear: mármore, granito, quartzo, porcelanato, granilite |
| 7 | "Rio de Janeiro" ×5 | Keyword stuffing | Cidade 1–2× natural + bairros |
| 8 | "processos seguros… durabilidade do resultado" | Promessa sem prova | Garantia concreta (N meses) |
| 9 | "respostas rápidas e soluções sob medida" | Genérico | Prazo mensurável (orçamento grátis, visita em 24h) |
| 10 | (ausente) | Zero prova social | Nº de obras / anos de experiência |

---

## 3 · Definições e princípios da Descrição 2.0

### 3.1 Verdade primeiro (regras inquebráveis)
1. Usar **somente fatos com `confirmado: true`** na base canônica. Proibido inventar
   anos, números, prêmios, certificações, serviços, bairros ou diferenciais.
2. Cada afirmação sustentada por um fato rastreável (`fatos_usados` na saída).
3. Faltou insumo? **Não preencher com genérico** ("qualidade, excelência,
   compromisso"). Registrar em `lacunas` com dono (`nos` | `cliente`).
4. Sem superlativos não comprovados ("melhor", "líder", "nº 1"); sem itens de
   `claims_proibidos`; sem emoji (exceto bio do Instagram); português correto.
5. **Nota/avaliação (`aggregateRating`) só com avaliação real** — nunca inventar
   (Google e IA detectam; alvo direto dos spam updates).

### 3.2 Princípios de escrita (servem a SEO e IA ao mesmo tempo)
1. **Entidade primeiro:** a 1ª frase diz, sem ambiguidade, O QUE a empresa é +
   categoria + cidade/UF. É a âncora do Google e da IA.
2. **Frases atômicas e autossuficientes:** um fato por frase, sem "isso/aquilo"
   dependente de contexto — é assim que a IA extrai e cita.
3. **Especificidade > volume:** 1 diferencial concreto e verificável vale mais que
   3 adjetivos.
4. **Localização natural:** cidade 1–2× + bairros/zonas reais; nada de cota.
5. **Único e denso (anti-desindexação):** cada descrição carrega fatos ESPECÍFICOS
   do negócio que a tornam distinta — nunca um molde onde só muda nome e cidade.
   Conteúdo fino/quase-duplicado é o que o Google desindexa em escala; densidade de
   fato próprio é o fosso que agregador de dado público não copia.
6. **Extraível fora de contexto (GEO/Bing):** a IA lê o HTML cru e cita frase a
   frase — cada frase ancora a entidade ou é inequívoca sozinha. Categoria + cidade
   aparecem cedo (1ª frase e ~250 primeiros caracteres) e no title/H1.
7. **Escaneável:** parágrafos curtos; no texto longo, subtítulos e listas.
8. **Compatível com schema.org:** priorizar fatos que mapeiam a propriedades
   (nome, categoria, área atendida, fundação, serviços) — alimentam o JSON-LD.
9. **Datação durável no texto:** "desde [ano]" (não "novo em 2024", que apodrece).
   O frescor datado ("Atualizado em") pertence à página, não ao texto.

### 3.3 Estrutura obrigatória da descrição completa
1. **Abertura** (1 parágrafo): entidade + categoria + cidade + área atendida +
   "desde [ano]" + benefício nas superfícies/aplicações reais + público.
2. **"O que fazemos":** materiais/produtos + LISTA de serviços no formato
   "Nome do serviço: o que resolve" (1 linha por serviço).
3. **"Como trabalhamos":** processo/equipamento real e vantagens práticas;
   avaliação/visita antes do orçamento; cuidado com o material.
4. **"Por que a [Empresa]":** lista com 3–4 provas — orçamento + prazo de visita;
   garantia + manutenção; equipe + prova social (anos/obras); atendimento/proximidade.
5. **CTA** (1 frase): curto e específico ao serviço, citando 2–3 aplicações reais.

---

## 4 · Saídas por canal (mesma essência, forma adaptada)

| Canal | Regra (conferida contra a política real de cada superfície) |
|---|---|
| **Solutudo (Destaque)** | Descrição completa, com subtítulos e listas |
| **Solusite ("Sobre nós")** | MESMO texto da Solutudo + title SEO ≤60 + meta description ≤155 |
| **Google Meu Negócio** | Até **750** caracteres; o **essencial nos ~250 primeiros** (o que aparece antes do "Mais"); factual; **sem URL e sem foco promocional** (política); **sem telefone** (boa prática — tem campo próprio no perfil) |
| **Instagram (bio)** | Até **150** caracteres (contagem exata, sem folga); COM emojis; quebras de linha (1 ideia por linha) |
| **SEO (site)** | `title` ≤60 caracteres (benefício + cidade); `meta_description` ≤155, factual |
| **JSON-LD** | Sai JUNTO com o texto (seção 10) — a descrição alimenta as propriedades |

---

## 5 · Base canônica: entrada e lacunas

### 5.1 Entrada do gerador (JSON)
```json
{
  "empresa": "...", "categoria": "...", "cidade": "...", "uf": "...",
  "area_atendida": ["bairros/regiões reais"],
  "fundacao": "ano ou null",
  "superficies_ou_aplicacoes": ["onde o serviço é aplicado"],
  "fatos": [ { "id", "campo", "valor", "origem", "confianca", "confirmado" } ],
  "servicos": [ { "nome", "o_que_resolve", "preco_ou_faixa" } ],
  "materiais_ou_produtos": ["..."],
  "diferenciais": ["concretos: processo, equipamento, garantia, prazo..."],
  "provas": ["tempo de mercado, nº de obras, prêmios..."],
  "atendimento": ["orçamento, visita, prazo, proximidade..."],
  "tom_de_marca": "...",
  "claims_proibidos": ["..."]
}
```
Origem dos fatos: briefing, transcrição da reunião, Digisac, mídias do cliente,
Receita Federal (dossiê CNPJ), Google Places — sempre com proveniência e confiança.

### 5.2 Status do schema no caso New Rock (temos × falta × dono)

| Campo | Status | O que falta | Dono |
|---|---|---|---|
| entidade.nome | Parcial | Travar nome exato (varia "Expresso" × "Marmoraria") — NAP | nós + cliente |
| entidade.categoria | Temos | — | — |
| entidade.local | Temos | — | — |
| publico | Temos | — | — |
| entidade.fundacao | **Falta** | Ano de início | cliente |
| area_atendida | Parcial | Bairros/zonas reais | cliente |
| servicos[] | Parcial | Lista real + termo de busca + preço/faixa | cliente + nós |
| materiais | Parcial | Nomear (mármore, granito, quartzo…) | cliente |
| diferenciais | Parcial | Algo verificável (processo, garantia, prazo) | cliente |
| provas[] | **Falta** | Tempo de mercado, nº de obras, avaliações | cliente |
| tom_de_marca | **Falta** | Definir | nós |
| por_canal + seo | **Falta** | Variações + title + meta | nós |

**Regra:** cada lacuna vira pendência do checklist, com dono. A descrição publica
com o que está confirmado; a lacuna NÃO é preenchida com invenção.

---

## 6 · O prompt gerador (íntegra — genérico, qualquer segmento)

```text
PAPEL
Você é o redator de "Sobre a Empresa" da Solutudo. A partir dos DADOS REAIS de um negócio
local (qualquer segmento), produz a descrição institucional e suas versões por canal. O
texto serve a dois leitores ao mesmo tempo: buscadores (SEO local) e modelos de IA que
citam negócios. Não é copy genérica.

REGRAS INQUEBRÁVEIS (verdade primeiro)
- Use SOMENTE fatos da entrada com "confirmado": true. É proibido inventar anos, números,
  prêmios, certificações, serviços, bairros ou diferenciais.
- Cada afirmação deve ser sustentada por um fato; registre os ids em "fatos_usados".
- Se faltar insumo, NÃO preencha com genérico ("qualidade, excelência, compromisso,
  atenção aos detalhes"). Registre em "lacunas" o que falta e de quem é (nos | cliente).
- Sem superlativos não comprovados ("melhor", "líder", "nº 1") e sem itens de
  "claims_proibidos". Sem emoji (exceto na bio do Instagram). Português correto.
- aggregateRating / nota só com avaliação REAL — nunca inventar (Google e IA detectam).

PRINCÍPIOS (valem para SEO e IA ao mesmo tempo)
- Entidade primeiro: a 1a frase diz, sem ambiguidade, O QUE a empresa é + categoria +
  cidade/UF. Ex.: "A [Empresa] é [categoria] em [cidade]/[UF] ...".
- Frases atômicas e autossuficientes (um fato por frase) — é assim que a IA extrai e cita.
- Especificidade > volume: 1 diferencial concreto e verificável vale mais que 3 adjetivos.
- Localização natural (cidade + bairros/região), sem repetir por cota (nada de stuffing).
- Escaneável: parágrafos curtos; no "Sobre" longo, use subtítulos e listas.
- Compatível com schema.org/LocalBusiness: priorize fatos que mapeiam a propriedades
  (nome, categoria, área atendida, fundação, serviços) — eles também alimentam o JSON-LD.
- Único e denso (sobrevive à indexação): cada descrição carrega fatos ESPECÍFICOS do
  negócio (serviços, bairros, provas reais) que a tornam distinta — nunca um molde onde só
  muda nome e cidade. Conteúdo fino/quase-duplicado é o que o Google desindexa em escala;
  densidade de fato próprio é o fosso que agregador de dado público não copia.
- Extraível fora de contexto: a IA lê o HTML cru e cita frase a frase — cada frase ancora a
  entidade ou é inequívoca sozinha. Categoria + cidade aparecem cedo (1a frase e nos ~250
  primeiros caracteres) e no title/H1 — é o que o Bing (porta do ChatGPT) mais pondera.

ENTRADA (JSON da base canônica do cliente)
{
  "empresa": "...", "categoria": "...", "cidade": "...", "uf": "...",
  "area_atendida": ["bairros/regiões reais"],
  "fundacao": "ano ou null",
  "superficies_ou_aplicacoes": ["onde o serviço é aplicado: pisos, bancadas, fachadas..."],
  "fatos": [ { "id", "campo", "valor", "origem", "confianca", "confirmado" } ],
  "servicos": [ { "nome", "o_que_resolve", "preco_ou_faixa" } ],
  "materiais_ou_produtos": ["..."],
  "diferenciais": ["concretos: processo, equipamento, garantia, prazo, equipe própria..."],
  "provas": ["tempo de mercado, nº de obras/clientes, prêmios, certificações..."],
  "atendimento": ["orçamento, visita, prazo, formas de contato, proximidade..."],
  "tom_de_marca": "...",
  "claims_proibidos": ["..."]
}
Use apenas fatos com "confirmado": true. Onde faltar, gere lacuna em vez de inventar.

TAREFA — gere UMA essência e as versões por canal, todas com a MESMA essência:
- essencia: 2 a 4 frases (a verdade-núcleo reutilizável).
- descricao_completa (Solutudo e Solusite usam o MESMO texto). Estrutura OBRIGATÓRIA,
  nesta ordem e com estes subtítulos:
  1) Abertura (1 parágrafo): entidade + categoria + cidade + área atendida + "desde [ano]".
     Em seguida, na mesma abertura, diga o BENEFÍCIO entregue nas SUPERFÍCIES/APLICAÇÕES
     reais (ex.: "devolvemos brilho, proteção e durabilidade a pisos, bancadas, fachadas...")
     e para qual PÚBLICO (residências, comércios, condomínios).
  2) Subtítulo "O que fazemos": cite materiais/produtos e traga uma LISTA de serviços —
     cada item no formato "Nome do serviço: o que resolve" (1 linha por serviço).
  3) Subtítulo "Como trabalhamos": descreva o PROCESSO/equipamento real e suas vantagens
     práticas (ex.: menos poeira, uso no mesmo dia, sem obra suja — quando houver fato),
     mencione a avaliação/visita (gratuita, se for o caso) antes do orçamento e o cuidado
     com o material (sem produtos agressivos).
  4) Subtítulo "Por que a [Empresa]": LISTA com 3 a 4 itens cobrindo, quando houver fato:
     orçamento + prazo de visita; garantia/prazo + manutenção; equipe + prova social
     (anos/obras); e atendimento/proximidade.
  5) CTA (1 frase): curto e ESPECÍFICO ao serviço, citando 2–3 aplicações reais
     (ex.: "renovar uma bancada, recuperar o piso da sala ou tratar a fachada").
- google (Google Meu Negócio): até 750 caracteres; o ESSENCIAL nos ~250 primeiros (é o
  que aparece antes do "Mais"); factual; SEM URL e SEM foco promocional (política do
  Google); sem telefone (vai no campo próprio do perfil); o que é, o que oferece, onde atende.
- instagram_bio: até 150 caracteres; COM emojis e quebras de linha (1 ideia por linha);
  o que faz + cidade/bairros + 1 diferencial + chamada curta.
- seo: title até 60 caracteres (benefício + cidade) e meta_description até 155 (factual,
  com termo natural).
- json_ld: gere o JSON-LD da empresa com o @type ESPECÍFICO da categoria (ex.: Restaurant,
  Plumber, Dentist, GeneralContractor, HomeAndConstructionBusiness; fallback LocalBusiness),
  com name, telephone (tel:), address, geo, openingHoursSpecification, areaServed e
  foundingDate. dateModified NÃO vai no LocalBusiness: pertence ao nó WebPage do JSON-LD
  (a página que contém a entidade). aggregateRating SÓ se houver avaliação real. O FAQ usa
  um FAQPage à parte.

EXEMPLO DE SAÍDA (formato de referência — empresa FICTÍCIA, não copie o conteúdo, só o formato):
"descricao_completa":
"A VerdeVivo Paisagismo é uma empresa de paisagismo e jardinagem em Campinas/SP, com
atuação no Cambuí, Taquaral e Barão Geraldo. Desde 2016, criamos e mantemos jardins —
canteiros, gramados, vasos e áreas externas — para residências, condomínios e empresas.

O que fazemos
Cuidamos do jardim do projeto à manutenção:
- Projeto paisagístico: planeja canteiros, espécies e iluminação.
- Implantação: prepara o solo, planta e instala grama e forrações.
- Manutenção mensal: poda, aduba, controla pragas e limpa.
- Irrigação automatizada: instala e ajusta o sistema.

Como trabalhamos
Fazemos uma visita técnica gratuita para entender o espaço antes do orçamento e
entregamos um plano com espécies adequadas ao clima da cidade. A manutenção segue um
cronograma fixo, com a mesma equipe a cada visita.

Por que a VerdeVivo
- Orçamento sem custo e visita técnica em até 48h.
- Contrato de manutenção mensal com cronograma e relatório por visita.
- Equipe própria, com mais de 8 anos de experiência e mais de 300 jardins entregues.
- Atendimento próximo, com soluções sob medida para cada espaço.

Precisa criar um jardim do zero, renovar canteiros ou manter a área externa do condomínio?
Fale com a VerdeVivo e agende sua visita gratuita."

ENTREGA (técnico, inegociável): o texto e o JSON-LD vão no HTML SERVIDO (server-rendered),
nunca injetados por JS — senão Google e o ChatGPT leem uma casca vazia. Texto é texto real
(não imagem); telefone e WhatsApp clicáveis (tel: / wa.me), sempre visíveis.

SAÍDA — responda SOMENTE com JSON válido neste formato:
{
  "essencia": "...",
  "descricao_completa": "...(texto com subtítulos e listas)...",
  "por_canal": {
    "google": { "texto": "...", "caracteres": N },
    "instagram_bio": { "texto": "...", "caracteres": N }
  },
  "seo": { "title": "...", "meta_description": "..." },
  "json_ld": { "@type": "tipo específico ou LocalBusiness", "name": "...", "telephone": "...", "address": {}, "areaServed": [], "foundingDate": "..." },
  "json_ld_webpage": { "@type": "WebPage", "dateModified": "..." },
  "fatos_usados": ["..."],
  "lacunas": [ { "o_que": "...", "dono": "cliente | nos" } ],
  "claims_evitados": ["..."]
}
```

---

## 7 · Prova de execução (New Rock — números simulados, a confirmar)

**Entrada:** base canônica da New Rock com fundação 2014, área Zona Sul/Barra/
Recreio/Tijuca, 4 serviços, 5 materiais, polimento a seco, avaliação grátis,
garantia 6 meses, +10 anos, +1.200 obras, visita em 24h.

**essencia:**
> A New Rock Expresso é especializada em lavagem, polimento, cristalização e
> restauração de mármores e granitos no Rio de Janeiro. Atua desde 2014, com equipe
> própria, atendendo residências, comércios e condomínios na Zona Sul, Barra,
> Recreio e Tijuca.

**descricao_completa (Solutudo = Solusite):**
> A New Rock Expresso é uma empresa especializada em lavagem, polimento,
> cristalização e restauração de mármores e granitos, com sede no Rio de Janeiro e
> atuação em Zona Sul, Barra da Tijuca, Recreio e Tijuca. Desde 2014, devolvemos
> brilho, proteção e durabilidade a pisos, bancadas, escadas, soleiras e fachadas
> de pedra — em residências, comércios e condomínios.
>
> **O que fazemos** — Trabalhamos com os principais materiais do mercado — mármore,
> granito, quartzo, porcelanato e granilite — aplicando o método certo para cada pedra:
> - Polimento e lustro: recupera o brilho original, remove riscos superficiais e marcas de uso.
> - Cristalização: cria uma camada de proteção que prolonga o brilho e facilita a limpeza.
> - Impermeabilização: reduz a porosidade e protege contra manchas de água, óleo e vinho.
> - Restauração: corrige desgaste, manchas profundas, juntas abertas e pequenas quebras.
>
> **Como trabalhamos** — Usamos polimento a seco com discos diamantados, o que reduz
> a poeira e, na maioria dos casos, permite usar o ambiente no mesmo dia, sem obra
> suja. Antes de qualquer orçamento, fazemos uma avaliação técnica gratuita da
> superfície para definir o tratamento adequado e o resultado esperado — sempre
> respeitando o material, sem produtos agressivos.
>
> **Por que a New Rock** — Orçamento sem custo e visita técnica em até 24h ·
> Garantia de 6 meses no resultado, com guia de manutenção · Equipe própria e
> treinada, com mais de 10 anos de experiência e +1.200 obras realizadas no Rio ·
> Atendimento rápido pela proximidade regional.
>
> Precisa renovar uma bancada, recuperar o piso da sala ou tratar o mármore do hall
> do condomínio? Fale com a New Rock Expresso e agende sua avaliação gratuita.

**google (≈530 de 750 caracteres · essencial nos ~250 primeiros):**
> A New Rock Expresso é especializada em lavagem, polimento, cristalização,
> impermeabilização e restauração de mármores e granitos no Rio de Janeiro. Atua na
> Zona Sul, Barra da Tijuca, Recreio e Tijuca, atendendo residências, comércios e
> condomínios. Trabalha com mármore, granito, quartzo, porcelanato e granilite,
> usando polimento a seco com discos diamantados — menos poeira e ambiente liberado
> no mesmo dia. Faz avaliação técnica gratuita antes do orçamento. Atua desde 2014,
> com equipe própria e mais de 1.200 obras realizadas.

**instagram_bio (150/150 — exatamente no limite):**
> 💎 Polimento & restauração de mármore e granito
> 📍 Rio de Janeiro — Zona Sul, Barra e Tijuca
> ✨ Avaliação grátis • brilho que dura
> 🗓️ Orçamento em 24h

**seo.title (59):** Polimento de Mármore e Granito no Rio de Janeiro | New Rock
**seo.meta_description (136):** Polimento, cristalização e restauração de mármores e
granitos no Rio — Zona Sul, Barra e Tijuca. Avaliação grátis e garantia de 6 meses.

**Validação da saída contra as regras:** entidade na 1ª frase ✓ · "Rio" 2× (sem
stuffing) ✓ · frases atômicas ✓ · zero invenção (simulados marcados como lacuna) ✓ ·
todos os limites de canal respeitados ✓.

---

## 8 · FAQ — regras e base de perguntas

### 8.1 Regras
- Perguntas vêm de **dúvidas reais (Digisac)** + padrão do nicho.
- **Resposta ancorada em fato**; falta de dado vira lacuna com dono — nunca invenção.
- **Resposta-primeiro:** a 1ª frase responde direto (é o que voz, IA e PAA extraem);
  detalhe depois. Cada resposta é autossuficiente e citável sozinha.
- Marcar com **FAQPage** no JSON-LD. Nota honesta: rich results de FAQ morreram para
  empresas comuns (ago/2023) — o valor hoje é IA, PAA, voz e conversão na página; a
  marcação ajuda o parsing, o conteúdo limpo é o que a IA cita. Manter os dois.

### 8.2 Eixos que o FAQ deve cobrir (com a finalidade de cada um)

| Pergunta-tipo | Finalidade principal |
|---|---|
| Quanto tempo dura o serviço? | IA + SEO (informacional, expectativa) |
| Remove riscos/manchas profundas? | IA + SEO + conversão (objeção de capacidade) |
| Diferença entre [serviço A, B e C]? | **IA (principal)** — formato definitório que LLM e PAA mais citam |
| Posso usar o ambiente no mesmo dia? | Voz + IA + conversão (frase falada) |
| Suja muito? | Conversão (objeção emocional) |
| Quais materiais/tipos atendem? | SEO cauda longa + IA (fatos por material) |
| Qual região atendem? Taxa de deslocamento? | **SEO local (maior impacto)** + conversão |
| Orçamento é grátis? Como funciona? | Conversão fundo de funil (intenção de compra) |
| Qual a garantia? | Confiança/conversão |
| Como manter depois? | SEO + IA + retenção (autoridade pós-serviço) |

---

## 9 · Aplicação na base: empresas pagantes × gratuitas

O mesmo motor, com profundidade de insumo diferente — **nunca inventar para compensar**.

### 9.1 Pipeline em 4 camadas
1. **Enriquecimento automático (sem contato com cliente), base inteira:** Receita
   Federal (razão social, CNAE principal+secundários, fundação, porte, endereço,
   sócios) + Google Places (categoria real, horário, telefone, avaliações reais) +
   geo. Só isso já produz fato confirmado, específico e não-duplicado por CNPJ.
2. **Geração em "modo dado público":** o prompt roda sobre essa base → descrição
   factual (só `confirmado: true`) → publica server-rendered → as lacunas
   proprietárias já saem marcadas com dono.
3. **Fechamento de lacunas em autosserviço:** cada lacuna vira pergunta curta
   pré-preenchida via Digisac/WhatsApp ("Confirma: desde que ano? Quais bairros?
   Garantia de quantos meses?"). Resposta confirmada → regera + IndexNow → nota sobe.
4. **Gate de densidade (anti-scaled-content):** se o texto gerado não atinge um
   mínimo de fatos próprios distintos, **não publica página fina** — enriquece mais
   ou `noindex`/consolida. Sem esse gate, escalar recria a desindexação.

### 9.2 O que muda por tipo de cliente

| | **Gratuita** | **Pagante** |
|---|---|---|
| Insumo | Dado público (Receita + Places + CNAE) | Público + briefing + transcrição + Digisac + mídias |
| Descrição | Factual, curta mas densa (modo dado público) | Completa (estrutura de 5 blocos) + essência |
| FAQ | Padrão do nicho (quando houver densidade) | Nicho + dúvidas reais do Digisac |
| Canais | Página Solutudo | Solutudo + Solusite + Google + Instagram + SEO |
| Lacunas | Convite a completar (upsell natural) | Loop ativo de confirmação via Digisac |
| Prioridade de indexação | Matriz brigar/fortalecer/soltar | "Brigar": prioridade + IndexNow a cada mudança |
| Se densidade mínima não atingida | `noindex`/consolidar (não publica casca) | Não ocorre (sempre há insumo) |

### 9.3 Sequenciamento (não roda os 28 mi de uma vez)
1. Pagantes + categorias/cidades de alta demanda (maior ROI, mais insumo).
2. Em paralelo e automático: enriquecimento público do restante da base.
3. Cascas sem demanda nem dado → `noindex`/consolidar (limpa crawl budget).
4. O **checklist Solutudo** é o painel de operação: nota + lacunas + status por
   cliente; ops/vendas sabem quem cutucar.

---

## 10 · Requisitos técnicos da página (sem os quais a descrição não funciona)

1. **Server-render:** texto e JSON-LD no HTML servido, nunca via JS. Teste: desligou
   o JS e sumiu? → errado. (Nenhum crawler de IA executa JavaScript.)
2. **Texto é texto:** nada de informação essencial em imagem; telefone/WhatsApp
   clicáveis (`tel:` / `wa.me`) e sempre visíveis.
3. **JSON-LD:** `@type` específico da categoria (fallback `LocalBusiness`; sem tipo
   dedicado → pai mais próximo, ex.: marmoraria → `HomeAndConstructionBusiness`).
   Obrigatórios `name` + `address`; recomendados telephone, geo,
   openingHoursSpecification, areaServed, foundingDate, url, image.
   **`dateModified` vai no nó `WebPage`** (não no LocalBusiness). FAQ em `FAQPage`
   à parte. `aggregateRating` só com avaliação real.
4. **Frescor:** "Atualizado em DD/MM/AAAA" visível + `dateModified` (WebPage) +
   frescor no `<title>` + **IndexNow** a cada mudança (propaga ao Bing).
5. **Indexação:** `meta-robots index,follow,max-snippet:-1,max-image-preview:large`;
   `canonical`; sitemap segmentado; robots.txt liberado para Bingbot, OAI-SearchBot,
   ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot (Google-Extended é token de
   controle do Gemini, não crawler).
6. **3 camadas na página:** Consumo (contato) → Confiança (avaliações, selo,
   frescor, conteúdo do dono — o fosso) → Profundidade de dado (dossiê CNPJ).
7. **Performance/mobile:** CSS crítico inline, lazy-load abaixo da dobra, FCP baixo
   (páginas rápidas recebem ~3× mais citação por IA); mobile-first, toque ≥44px,
   contraste ≥4,5:1.

---

## 11 · Conferências externas realizadas (o que valida tudo acima)

### 11.1 Confirmado em fontes públicas
- **LocalBusiness (schema.org / Google):** obrigatórios `name`+`address`;
  recomendados batem com nosso conjunto; usar o @type mais específico possível.
- **FAQPage:** tipo válido; rich results restritos a gov/saúde desde ago/2023;
  IA cita o conteúdo Q&A limpo.
- **aggregateRating só real** — diretriz explícita.
- **Google Meu Negócio:** limite **750** caracteres; ~250 exibidos antes do "Mais";
  proibido URL e foco promocional.
- **Instagram bio:** 150 caracteres exatos.
- **Title ~60 / meta 140–160:** faixas de exibição confirmadas.
- **Crawlers de IA não executam JS** (estudo Vercel+MERJ, 500 mi+ fetches, zero
  execução) — a "casca vazia" é real.
- **ChatGPT busca sobre o índice do Bing** (+ OAI-SearchBot próprio, em crescimento).
- **AI Performance no Bing Webmaster Tools:** lançado fev/2026 (citações por URL).
- **Spam updates 2024–2026** derrubando redes de páginas quase-duplicadas de
  localização — o risco que o princípio "único e denso" mitiga.
- **Velocidade ↔ citação:** FCP <0,4s ≈ 3× mais citações por IA.

### 11.2 Corrigido durante a conferência (estava errado nas primeiras versões)
- Limite do Google era citado como 700 → é **750** (+ regra dos ~250 primeiros).
- `dateModified` estava no nó LocalBusiness → é propriedade de CreativeWork, vai
  no nó **WebPage**.
- "Sem telefone (política do Google)" → política proíbe URL/foco promocional;
  telefone de fora é **boa prática** (campo próprio do perfil).
- Bio Instagram anotada como "≈135" → medida real **150/150** (no limite exato).

### 11.3 Ressalvas mantidas à vista (não invalidam, mas precisam constar)
- "94% × 23%" (leitura HTML × JS): direção confirmada; números exatos sem fonte
  pública localizada — tratar como estimativa ilustrativa.
- "Lê ~20–30 páginas e cita ~15%": plausível, sem fonte pública — estimativa.
- Números internos (~17 mi, 45→28 mi): dados do Search Console da Solutudo, não
  verificáveis externamente.
- Todos os números da New Rock usados no exemplo são **simulados e marcados como
  lacuna** até o cliente confirmar.

**Fontes:** schema.org (`LocalBusiness`, `dateModified`,
`HomeAndConstructionBusiness`) · Google Search Central (structured data de negócio
local; spam policies / scaled content abuse; mudanças de FAQ ago/2023) · diretrizes
do Perfil de Empresa no Google (750/250, sem links) · Vercel/MERJ "The rise of the
AI crawler" · Bing Blogs (AI Performance, fev e jun/2026) · limites Instagram/title/
meta (verificação de contagem própria + guias do setor) · documentação do
Google-Extended.

---

## 12 · O que fica explícito para o usuário final

- Números e fatos ainda não confirmados **não entram** no texto público — nem em
  pagante, nem em gratuita.
- A página exibe "Atualizado em DD/MM/AAAA" real (nunca decorativo).
- Avaliações exibidas/marcadas são sempre reais.

## 13 · Pendências antes do go-live (decisões em aberto)

- [ ] **Gate de densidade:** definir o mínimo objetivo de fatos próprios para
  publicar página indexável (e o que dispara `noindex`/consolidação).
- [ ] **Prompt-avaliador irmão:** gera a `nota_geral` + diagnóstico por cliente
  (o card do checklist espelha).
- [ ] **Contrato de dados fechado:** schema canônico completo + `dossie_cnpj` +
  bloco `entrega` (server_rendered, json_ld, dateModified, indexnow).
- [ ] **Loop Digisac de lacunas:** formato exato das perguntas de confirmação e o
  fluxo de regeração + IndexNow.
- [ ] **Matriz brigar/fortalecer/soltar por cidade×categoria:** decisão de negócio
  (não técnica) sobre onde priorizar.
- [ ] **Confirmar com a New Rock** os dados simulados antes de usar o caso como
  material público.

## 14 · Checklist de aprovação final (para conferir "em outros locais")

- [ ] As regras de verdade (seção 3.1) cobrem o risco jurídico/da marca de texto
  público? (zero invenção, lacuna com dono, claims proibidos)
- [ ] A estrutura (3.3) funciona nas categorias mais distantes do exemplo
  (restaurante, advogado, e-commerce local)?
- [ ] Os limites por canal (seção 4) conferem com as políticas vigentes na data da
  implementação? (revalidar 750/250, 150, 60/155 — políticas mudam)
- [ ] O plano pagante × gratuita (seção 9) está de acordo com o comercial
  (o que a gratuita "ganha" e onde entra o upsell)?
- [ ] O gate de densidade evita publicar casca — quem define o threshold?
- [ ] O JSON-LD (seção 10.3) valida no Rich Results Test com páginas reais?
- [ ] O time de dev confirma viabilidade: server-render + IndexNow + sitemap
  segmentado no stack atual?

---

*Gerado a partir do artefato vivo (abas Descrição/FAQ/Indexação), dos dois
documentos internos auditados (técnico-dev e design) e das conferências externas
de 17–18/07/2026. Qualquer alteração nas definições deve atualizar este arquivo,
o artefato e os docs-irmãos juntos.*
