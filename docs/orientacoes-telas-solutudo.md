# Orientações para as novas telas do site Solutudo

Guia de implementação extraído do artefato **Sobre a Empresa & FAQ** (aba Indexação).
Só a orientação do que fazer — sem fontes nem justificativas. Use como régua ao
elaborar qualquer tela no Claude Design e ao levar a tela para o código.

---

## 1. Regra de ouro (vale para toda tela)

- **Todo conteúdo essencial nasce no HTML servido (server-rendered).** Nada de
  texto importante injetado por JavaScript depois do load.
- **Teste obrigatório:** desligou o JavaScript e o conteúdo principal sumiu? → está errado.
- Pode ficar em JS apenas o secundário: carrossel de galeria, mapa interativo, widgets.

## 2. Conteúdo é texto, não imagem

- Nome, telefone, endereço, horário, descrição e dados da empresa = **texto real,
  selecionável**, nunca embutido em imagem ou gráfico.
- **Telefone e WhatsApp sempre visíveis e clicáveis** (`tel:` e `wa.me`), grandes,
  de cara — nunca atrás de hover, clique ou "ver telefone".
- Endereço em `<address>` + link de mapa; horário em lista estruturada sempre visível.

## 3. As 3 camadas de toda página de detalhe (nesta prioridade visual)

1. **Consumo (contratar)** — no topo: nome, o que faz, telefone, WhatsApp, endereço,
   horário, serviços. A ação de contato é a primeira coisa que se lê.
2. **Confiança** — avaliações/recomendações, selo de verificação, "Atualizado em",
   conteúdo do dono.
3. **Profundidade de dado** — dossiê cadastral (CNPJ, situação, abertura, porte,
   CNAE, sócios), denso porém limpo e escaneável, mais abaixo.

As três precisam coexistir com respiro e hierarquia — sem virar dump de informação
e sem esconder a ação.

## 4. Dados estruturados (JSON-LD)

- JSON-LD no `<head>`, **server-rendered**, com `@type` **específico** da categoria
  (Restaurant, Plumber, Dentist, Electrician, AutoRepair, Attorney, AccountingService,
  GeneralContractor, HomeAndConstructionBusiness, Bakery, ProfessionalService…
  fallback `LocalBusiness`). Sem tipo dedicado? Usar o pai mais próximo
  (ex.: marmoraria → `HomeAndConstructionBusiness`).
- Campos a preencher: `name`, `legalName`, `taxID`, `url`, `telephone`, `image`,
  `address`, `geo`, `openingHoursSpecification`, `areaServed`, `knowsAbout`,
  `foundingDate`, `founder`. Obrigatórios: `name` + `address`.
- `dateModified` **não** entra no nó do negócio: vai no nó **`WebPage`** do JSON-LD.
- FAQ da página usa um **`FAQPage`** à parte.
- **`aggregateRating` só com avaliação real — nunca inventar.**

## 5. Frescor (página viva)

- "**Atualizado em DD/MM/AAAA**" visível no corpo da página.
- `dateModified` no nó `WebPage` do JSON-LD e frescor também no `<title>`.
- Disparar **IndexNow** sempre que a página mudar.

## 6. Performance e mobile (critérios de design, não detalhes)

- CSS crítico inline; lazy-load só em imagens abaixo da dobra; cortar JS pesado do
  núcleo de conteúdo. Mirar FCP baixo.
- **Mobile-first**: a decisão de layout começa no celular e sobe para o desktop.
- Alvos de toque **≥ 44px**; contraste **≥ 4,5:1**; HTML semântico; `alt` em toda imagem.
- Proibido na tela: hero gigante, vídeo em autoplay, animação pesada, excesso de fontes.
- Seguir os **tokens do design system** (cor, fonte, espaçamento, raios) — não inventar
  cor nem fonte. Hierarquia em segundos: o que é a empresa → como falar com ela → por
  que confiar.

## 7. Indexação (por página)

- `meta-robots`: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.
- `canonical` correto em toda página; sitemap segmentado (só o que importa);
  `noindex`/consolidar páginas-casca.
- robots.txt liberado para: Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot,
  PerplexityBot, ClaudeBot, Google-Extended (este último é um token de controle
  do Gemini, não um crawler — não aparece em logs de acesso).
- Linkagem interna real: entidade → categoria/CNAE → empresas similares; nenhuma
  página importante pode ficar órfã.

## 8. Texto "Sobre a Empresa" (Descrição 2.0)

- **Entidade primeiro:** a 1ª frase diz o que a empresa é + categoria + cidade/UF.
- **Frases atômicas:** um fato por frase, autossuficiente, sem "isso/aquilo".
- **Só fato confirmado:** proibido inventar anos, números, prêmios, serviços, bairros
  ou diferenciais. O que faltar vira **lacuna com dono** (nós | cliente) — nunca
  preencher com genérico ("qualidade, excelência, compromisso").
- Sem superlativos não comprovados ("melhor", "líder", "nº 1"). Sem emoji (exceto bio
  do Instagram).
- **Especificidade > volume:** 1 diferencial concreto e verificável vale mais que 3
  adjetivos. Nomear serviços, materiais e provas (ano de fundação, nº de obras,
  garantia, prazo).
- **Localização natural:** cidade 1–2× + bairros/zonas reais. Nada de repetir por cota.
- Escaneável: parágrafos curtos; no texto longo, subtítulos e listas.
- Estrutura da descrição completa: Abertura (entidade + área + desde [ano] + público)
  → "O que fazemos" (lista de serviços: nome + o que resolve) → "Como trabalhamos"
  (processo real + avaliação/visita) → "Por que a [Empresa]" (3–4 provas) → CTA curto
  e específico.

## 9. Por canal (mesma essência, forma adaptada)

| Canal | Regra |
|---|---|
| **Solutudo (Destaque)** | Descrição completa, com subtítulos e listas |
| **Solusite** | Mesmo texto da Solutudo + título SEO (≤60) e meta description (≤155) |
| **Google Meu Negócio** | Até 750 caracteres com o **essencial nos ~250 primeiros**; factual; **sem URL, sem foco promocional**; telefone fica no campo do perfil |
| **Instagram (bio)** | Até 150 caracteres, **com emojis** e quebras de linha (1 ideia por linha) |

- Toda saída de conteúdo vem acompanhada do **JSON-LD pronto** para o HTML servido.

## 10. FAQ nas telas

- As perguntas vêm de dúvidas reais (Digisac) + perguntas padrão do nicho.
- Resposta **ancorada em fato**; onde falta dado do cliente, marcar a lacuna com dono.
- Formato pergunta-resposta atômico e direto; marcar com **FAQPage** no JSON-LD.
  O que a IA cita é o **conteúdo** limpo — a marcação ajuda o parsing; manter os dois.
- Cobrir os eixos: prazo/duração · capacidade (o que resolve e o que não) ·
  diferenças entre serviços · uso do ambiente/logística · sujeira/incômodo ·
  materiais atendidos · região e deslocamento · orçamento · garantia · manutenção pós.

## 11. Checklist de bolso — antes de entregar qualquer tela

- [ ] Telefone visível, grande e clicável — sem clique pra revelar?
- [ ] Desligando o JavaScript, o conteúdo principal continua na tela?
- [ ] Todo texto importante é texto de verdade, não imagem?
- [ ] A ação principal (contato) é a primeira coisa que se lê?
- [ ] Página leve e rápida — sem hero/vídeo/animação que pesem?
- [ ] Funciona bem no celular, com alvos de toque ≥ 44px?
- [ ] Tokens do design system seguidos (cor, fonte, espaçamento, raios)?
- [ ] As 3 camadas presentes, com hierarquia clara?
- [ ] JSON-LD com `@type` específico + `dateModified` no HTML servido?
- [ ] "Atualizado em" visível na página?

Se todas tiverem "sim", a tela é bonita **e** vai ser encontrada.

---

*Pareado com o artefato `artefatos/sobre-empresa-new-rock/` (aba Indexação) e com
`docs/inteligencia-solutudo.md`. Fontes e justificativas de cada regra estão lá.*
