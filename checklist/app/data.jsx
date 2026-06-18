/* ============================================================
   Dados do cliente + checklist de auditoria por bloco.
   Régua oficial Solutudo — o que DEVERIA existir, conferido
   contra a realidade (Sem × Com Solutudo).

   Cada item é um ponto a conferir, com:
   - etapa  : descoberta | avaliacao | experiencia
   - pilar  : verdade | atualizacao | confiabilidade
   - impacto: baixo | medio | alto   (+ critico => aplica teto)
   - sem / com : estado antes × depois da Solutudo
   - dono   : nos | cliente  (de quem é a lacuna quando incompleto)
   - acao / insumo : o que falta fazer / o que falta o cliente enviar
   ============================================================ */

const CLIENTE = {
  empresa: "Restaurante Sabor da Serra",
  cidade: "Botucatu",
  estado: "SP",
  categoria: "Restaurantes",
  plano: "Potente",
  responsavel: "Marina Alves",
  idExtranet: "BTU-48217",
};

/* ---- Bloco 0 — Dados da empresa (dados factuais puros) ----
   A fonte da verdade — alimenta todos os produtos. Tem antes × depois:
   ex. o cliente chega sem logo, a Solutudo cria, e no “Com” ele tem logo.
   Cada campo tem sem/com + impacto e entra na média geral (pilar verdade). */
const DADOS_EMPRESA = [
  { id: "d_nome",         label: "Nome oficial exato",        valor: "Restaurante Sabor da Serra", pilar: "verdade", impacto: "alto",  sem: true,  com: true },
  { id: "d_categoria",    label: "Categoria / segmento",      valor: "Restaurantes",               pilar: "verdade", impacto: "medio", sem: true,  com: true },
  { id: "d_contatos",     label: "Telefones, WhatsApp e e-mails", pilar: "verdade", impacto: "alto",  sem: true,  com: true },
  { id: "d_endereco",     label: "Endereço completo + físico", valor: "Botucatu/SP",               pilar: "verdade", impacto: "alto",  sem: true,  com: true },
  { id: "d_cobertura",   label: "Área de cobertura (bairros + raio)", pilar: "verdade", impacto: "medio", sem: false, com: true },
  { id: "d_horario",      label: "Horário por dia + feriados", pilar: "verdade", impacto: "medio", sem: false, com: true },
  { id: "d_pagamento",   label: "Formas de pagamento",        pilar: "verdade", impacto: "baixo", sem: false, com: true },
  { id: "d_facilidades", label: "Atributos / facilidades",    pilar: "verdade", impacto: "baixo", sem: false, com: false, dono: "cliente" },
  { id: "d_marca",        label: "Logo em alta + cores (hex)", pilar: "verdade", impacto: "alto",  sem: false, com: true },
  { id: "d_historia",    label: "História / ano de fundação", pilar: "verdade", impacto: "medio", sem: false, com: true },
];

// Pesos de impacto para o roll-up ponderado.
const PESO = { baixo: 1, medio: 2, alto: 3 };

// Metadados de pilar (cor + rótulo + o que afirma).
const PILARES = {
  verdade:        { rotulo: "Verdade",        cor: "var(--brand-purple)", tint: "var(--tint-lavender)", afirma: "A empresa existe sendo o que é" },
  atualizacao:    { rotulo: "Atualização",    cor: "var(--brand-cyan)",   tint: "#DCF6FC",              afirma: "A empresa está viva" },
  confiabilidade: { rotulo: "Confiabilidade", cor: "var(--brand-mint)",   tint: "var(--tint-mint)",    afirma: "Passa no teste de confiança" },
};

const ETAPAS = {
  descoberta:  { rotulo: "Descoberta",  short: "Ser encontrado" },
  avaliacao:   { rotulo: "Avaliação",   short: "Ser confiável" },
  experiencia: { rotulo: "Experiência", short: "Ser escolhido" },
};

// Helper de construção de item.
let _uid = 0;
function it(o) { return { id: "i" + (++_uid), conteudo: true, visual: true, autenticidade: true, ...o }; }

const PRODUTOS = [
  /* ---- Bloco 1 — Destaque Solutudo (página) ---- */
  {
    id: "destaque",
    nome: "Destaque Solutudo",
    superficie: "Solutudo",
    url: "solutudo.com.br/sabor-da-serra",
    cor: "var(--brand-purple)",
    itens: [
      it({ grupo: ["contato"], texto: "Botões de contato (WhatsApp com número + telefone)", etapa: "experiencia", pilar: "verdade", impacto: "medio", sem: true, com: true }),
      it({ grupo: ["endereco"], texto: "Endereço, mapa e coordenadas", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: true, com: true }),
      it({ texto: "E-mail, Instagram, site e perfil Google presentes e corretos", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ grupo: ["horario"], texto: "Horário completo", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: true, com: true }),
      it({ texto: "\u201CSobre a empresa\u201D com diferenciais reais (não texto genérico)", etapa: "avaliacao", pilar: "verdade", impacto: "alto", critico: true, sem: false, com: false, dono: "nos", acao: "Reescrever o \u201CSobre\u201D com os detalhes únicos do cliente — hoje está em texto genérico (\u201Chumanizado/qualidade/excelência\u201D)." }),
      it({ texto: "Galeria de fotos autorais (nº adequado)", etapa: "avaliacao", pilar: "verdade", impacto: "alto", sem: false, com: false, dono: "cliente", insumo: "Fotos autorais do espaço e dos pratos", acao: "Depende de fotos próprias do cliente — hoje usamos imagens genéricas." }),
      it({ texto: "Produtos/serviços com termo de busca + preço ou faixa", etapa: "descoberta", pilar: "verdade", impacto: "medio", sem: false, com: false, dono: "nos", acao: "Evitar tudo \u201CA consultar\u201D — incluir faixa de preço onde possível." }),
      it({ texto: "Notícias publicadas com cadência", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: true }),
      it({ texto: "Facilidades preenchidas", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ texto: "Recomendações exibidas no perfil", etapa: "avaliacao", pilar: "confiabilidade", impacto: "alto", sem: false, com: false, dono: "cliente", insumo: "Convidar clientes a recomendar", acao: "Prova social vazia — zero recomendações hoje." }),
      it({ texto: "Data de validação recente", etapa: "experiencia", pilar: "atualizacao", impacto: "baixo", sem: false, com: true }),
    ],
  },
  /* ---- Bloco 2 — Solusite (site próprio) ---- */
  {
    id: "solusite",
    nome: "Solusite",
    superficie: "Site próprio",
    url: "saborserra.com.br",
    cor: "var(--brand-pink)",
    itens: [
      it({ texto: "Hero claro (proposta + cidade + CTA)", etapa: "descoberta", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "\u201CSobre nós\u201D adaptado (não copiar-colar genérico)", etapa: "avaliacao", pilar: "verdade", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Texto \u201CSobre\u201D está idêntico ao de outros canais — adaptar ao site." }),
      it({ texto: "Serviços com descrição, foto e preço/faixa", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Galeria / escritório com fotos autorais", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: false, dono: "cliente", insumo: "Fotos autorais do espaço", acao: "Predominância de banco de imagem — pedir fotos próprias." }),
      it({ texto: "Equipe com credenciais (nomes, registro, especialidades)", etapa: "avaliacao", pilar: "confiabilidade", impacto: "alto", sem: false, com: true }),
      it({ texto: "Publicações / FAQ", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: false, dono: "nos", acao: "Criar FAQ no formato 2026: perguntas reais por serviço, respostas completas." }),
      it({ grupo: ["horario","endereco"], texto: "Horário e mapa", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ grupo: ["contato"], texto: "Formulário de contato + WhatsApp", etapa: "experiencia", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Rodapé com todos os contatos", etapa: "experiencia", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ texto: "Schema (JSON-LD) batendo com o conteúdo visível", etapa: "descoberta", pilar: "verdade", impacto: "alto", critico: true, sem: false, com: true }),
      it({ texto: "Mobile / responsivo", etapa: "experiencia", pilar: "confiabilidade", impacto: "medio", sem: false, com: true }),
    ],
  },
  /* ---- Bloco 3 — Google Meu Negócio (GMB) ---- */
  {
    id: "google",
    nome: "Google Meu Negócio",
    superficie: "Google",
    url: "google.com/maps · Sabor da Serra",
    cor: "var(--brand-orange)",
    itens: [
      it({ texto: "Perfil criado e verificado", etapa: "descoberta", pilar: "verdade", impacto: "alto", critico: true, sem: false, com: true }),
      it({ grupo: ["categoria"], texto: "Categoria primária + secundárias corretas", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ grupo: ["nome","endereco","contato"], texto: "NAP idêntico (nome/endereço/telefone) aos outros produtos", etapa: "avaliacao", pilar: "verdade", impacto: "alto", critico: true, sem: false, com: false, dono: "nos", acao: "Conferir e alinhar nome, endereço e telefone com Solutudo, site e redes." }),
      it({ grupo: ["horario"], texto: "Horário (inclui feriados / exceções)", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: true, com: true }),
      it({ texto: "Fotos autorais e atualizadas", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: false, dono: "cliente", insumo: "Fotos recentes do estabelecimento", acao: "Subir fotos próprias e recentes ao perfil." }),
      it({ texto: "Serviços / produtos cadastrados", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Atributos (acessibilidade, pagamento, etc.)", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ texto: "Avaliações monitoradas e respondidas", etapa: "avaliacao", pilar: "confiabilidade", impacto: "alto", critico: true, sem: false, com: false, dono: "nos", acao: "Responder avaliações pendentes — sinal forte de ranking local." }),
      it({ texto: "Posts / atualizações com cadência", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: true }),
    ],
  },
  /* ---- Bloco 4 — Redes Sociais (Instagram/Facebook) ---- */
  {
    id: "social",
    nome: "Redes Sociais",
    superficie: "Instagram / Facebook",
    url: "instagram.com/saborserra",
    cor: "var(--brand-cyan)",
    itens: [
      it({ grupo: ["contato"], texto: "Bio completa (o que faz, cidade, contato)", etapa: "descoberta", pilar: "verdade", impacto: "medio", sem: true, com: true }),
      it({ texto: "Link da bio para o destino certo", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Bio aponta para a Solutudo, não para o site próprio — revisar o destino." }),
      it({ grupo: ["logo"], texto: "Identidade visual consistente (logo, paleta, tipografia)", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Destaques organizados", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ texto: "Mix de conteúdo: institucional + educativo/FAQ + prova", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: false, dono: "nos", acao: "Conteúdo ainda só institucional — incluir educativo (prompt-led) e casos." }),
      it({ texto: "Fotos autorais predominando", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: false, dono: "cliente", insumo: "Fotos próprias do dia a dia", acao: "Excesso de banco de imagem — pedir fotos autorais." }),
      it({ texto: "Cadência de postagem estável", etapa: "avaliacao", pilar: "atualizacao", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Retomar cadência de 2–3 posts/semana do plano." }),
      it({ texto: "Engajamento observado (saúde do perfil)", etapa: "experiencia", pilar: "confiabilidade", impacto: "medio", sem: false, com: false, dono: "nos", acao: "Engajamento baixo para o nº de seguidores — revisar conteúdo e horários." }),
    ],
  },
  /* ---- Bloco 5 — Atualização: \u201Co cliente está vivo online?\u201D ---- */
  {
    id: "atualizacao",
    nome: "Atualização",
    superficie: "Cadência por canal",
    url: "Está vivo? · consistência > volume",
    cor: "var(--brand-mint)",
    preview: false,
    itens: [
      it({ texto: "Google: acima do mínimo (1 post/semana)", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: true }),
      it({ texto: "Redes sociais: 2–3 posts/semana consistentes", etapa: "avaliacao", pilar: "atualizacao", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Cadência irregular (rajada-e-silêncio) — estabilizar em 2–3/semana." }),
      it({ texto: "Site (Solusite): 1 publicação/mês", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: false, dono: "nos", acao: "Sem conteúdo novo há meses — retomar publicações mensais." }),
      it({ texto: "Destaque Solutudo: 1 notícia/semana", etapa: "avaliacao", pilar: "atualizacao", impacto: "medio", sem: false, com: true }),
      it({ texto: "Sinal de IA: alguma superfície com conteúdo < 30 dias", etapa: "descoberta", pilar: "atualizacao", impacto: "alto", critico: true, sem: false, com: false, dono: "nos", acao: "Recência multiplica citação por IA (~3,2×) — garantir algo novo nos últimos 30 dias." }),
      it({ texto: "Cadência cruza o \u201Cvivo\u201D nos 4 produtos (não só num canal)", etapa: "avaliacao", pilar: "atualizacao", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Hoje Google/Destaque ok, mas redes e site abaixo do mínimo." }),
      it({ texto: "Feed contínuo de material do cliente sustentando a cadência", etapa: "experiencia", pilar: "atualizacao", impacto: "medio", sem: false, com: false, dono: "cliente", insumo: "Envio recorrente de fotos e novidades", acao: "Sem insumo do cliente, o recorrente degrada em genérico." }),
    ],
  },
  /* ---- Bloco 6 — Consistência (informação + visual) ---- */
  {
    id: "consistencia",
    nome: "Consistência",
    superficie: "Cross-channel",
    url: "NAP · Schema · Visual — bate em todo lugar?",
    cor: "var(--brand-amber)",
    preview: false,
    itens: [
      it({ grupo: ["nome"], consolida: true, texto: "Nome da empresa EXATAMENTE igual em todos os produtos", etapa: "descoberta", pilar: "verdade", impacto: "alto", critico: true, sem: false, com: true }),
      it({ grupo: ["endereco"], consolida: true, texto: "Endereço idêntico (atenção ao número)", etapa: "descoberta", pilar: "verdade", impacto: "alto", critico: true, sem: false, com: false, dono: "nos", acao: "Número diverge entre canais (ex.: \u201C230\u201D no Instagram × \u201C240\u201D no site) — padronizar." }),
      it({ grupo: ["contato"], consolida: true, texto: "Telefone / WhatsApp iguais em todos", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ grupo: ["horario"], consolida: true, texto: "Horário igual em todos", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ grupo: ["categoria"], consolida: true, texto: "Categoria / segmento alinhada", etapa: "descoberta", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Links cruzados corretos (apontam ao destino pretendido)", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: false, dono: "nos", acao: "Revisar links entre canais — alguns apontam ao destino errado." }),
      it({ texto: "Descrição: mesma essência, adaptada por canal", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: false, dono: "nos", acao: "\u201CSobre\u201D idêntico em Solutudo, site e Instagram — adaptar por canal." }),
      it({ texto: "Schema (JSON-LD) coerente com o conteúdo visível", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ grupo: ["logo"], consolida: true, texto: "Logo igual em todos os canais", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: true, com: true }),
      it({ texto: "Paleta de cores consistente", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ texto: "Tipografia / estilo coerente", etapa: "avaliacao", pilar: "verdade", impacto: "baixo", sem: false, com: true }),
      it({ texto: "Padrão de fotos (autoral × banco) coerente entre canais", etapa: "avaliacao", pilar: "confiabilidade", impacto: "baixo", sem: false, com: false, dono: "cliente", insumo: "Fotos autorais", acao: "Mistura desigual de autoral e banco entre canais." }),
    ],
  },
  /* ---- Bloco 7 — Avaliações (campos especiais: ranges + nota por estrelas) ---- */
  {
    id: "avaliacoes",
    nome: "Avaliações",
    superficie: "Google · Solutudo",
    url: "Volume e nota — prova social",
    cor: "var(--brand-magenta)",
    preview: false,
    tipo: "avaliacoes",
    itens: [
      { id: "av_g_qtd",  tipo: "range",  fonte: "Google",   texto: "Avaliações no Google",  opcoes: ["Nenhuma", "1 a 5", "6 a 10", "11+"], valor: { sem: "1 a 5", com: "11+" } },
      { id: "av_g_nota", tipo: "rating", fonte: "Google",   texto: "Nota média no Google",   nota: { sem: 4.2, com: 4.8 } },
      { id: "av_s_qtd",  tipo: "range",  fonte: "Solutudo", texto: "Avaliações na Solutudo", opcoes: ["Nenhuma", "1 a 5", "6 a 10", "11+"], valor: { sem: "Nenhuma", com: "6 a 10" } },
      { id: "av_s_nota", tipo: "rating", fonte: "Solutudo", texto: "Nota média na Solutudo",  nota: { sem: 0, com: 5.0 } },
    ],
  },
];

window.SOL_DATA = { CLIENTE, DADOS_EMPRESA, PESO, PILARES, ETAPAS, PRODUTOS };
