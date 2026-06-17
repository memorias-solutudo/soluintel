/* ============================================================
   Dados de exemplo — Cliente + checklist por produto.
   Cada item é uma promessa verificável (§6 da spec), com:
   - etapa  : descoberta | avaliacao | experiencia
   - pilar  : verdade | atualizacao | confiabilidade
   - impacto: baixo | medio | alto   (+ critico => aplica teto)
   - estado dos dois momentos: sem / com  (Sem Solutudo / Com Solutudo)
   - lentes (sobre o "com"): conteudo / visual / autenticidade
   - dono   : nos | cliente   (de quem é a lacuna quando incompleto)
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
  {
    id: "destaque",
    nome: "Destaque Solutudo",
    superficie: "Solutudo",
    url: "solutudo.com.br/sabor-da-serra",
    cor: "var(--brand-purple)",
    itens: [
      it({ texto: "À frente das empresas não pagantes nas buscas", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ texto: "Página exclusiva indexada também no Google", etapa: "descoberta", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "História, fotos autorais e detalhes na página", etapa: "avaliacao", pilar: "verdade", impacto: "alto", sem: false, com: false, dono: "cliente", insumo: "Fotos autorais e história da empresa", acao: "Cliente precisa enviar fotos próprias — hoje usamos imagens genéricas." }),
      it({ texto: "Produtos e serviços cadastrados na página", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: true, com: true }),
      it({ texto: "Selo de recomendação exibido no perfil", etapa: "avaliacao", pilar: "confiabilidade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Contatos em destaque e botão de WhatsApp", etapa: "experiencia", pilar: "atualizacao", impacto: "baixo", sem: true, com: true }),
    ],
  },
  {
    id: "google",
    nome: "Presença no Google",
    superficie: "Google",
    url: "google.com/maps · Sabor da Serra",
    cor: "var(--brand-orange)",
    itens: [
      it({ texto: "Perfil do Google otimizado e verificado", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ texto: "Refinamento para buscas \u201Cperto de mim\u201D", etapa: "descoberta", pilar: "atualizacao", impacto: "medio", sem: false, com: true }),
      it({ texto: "Perfil completo e profissional", etapa: "avaliacao", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ texto: "Avaliações respondidas no Google", etapa: "avaliacao", pilar: "confiabilidade", impacto: "alto", critico: true, sem: false, com: false, dono: "nos", acao: "Responder as 12 avaliações pendentes do último trimestre." }),
      it({ texto: "Nota saudável e volume de avaliações (\u22654,5)", etapa: "avaliacao", pilar: "confiabilidade", impacto: "alto", critico: true, sem: true, com: true }),
      it({ texto: "Informações de contato direto atualizadas", etapa: "experiencia", pilar: "atualizacao", impacto: "baixo", sem: true, com: true }),
    ],
  },
  {
    id: "solusite",
    nome: "Site Profissional (Solusite)",
    superficie: "Solusite",
    url: "saborserra.com.br",
    cor: "var(--brand-pink)",
    itens: [
      it({ texto: "Site indexado no Google com domínio próprio", etapa: "descoberta", pilar: "verdade", impacto: "alto", sem: false, com: true }),
      it({ texto: "Site com a marca e a paleta corretas", etapa: "avaliacao", pilar: "verdade", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Cores entregues divergem da paleta hex da marca — ajustar header e botões." }),
      it({ texto: "E-mail profissional configurado", etapa: "avaliacao", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Estatísticas de acesso disponíveis", etapa: "experiencia", pilar: "atualizacao", impacto: "baixo", sem: false, com: false, dono: "nos", acao: "Ativar painel de estatísticas (em configuração)." }),
      it({ texto: "Contatos fáceis e visíveis no site", etapa: "experiencia", pilar: "verdade", impacto: "medio", sem: true, com: true }),
    ],
  },
  {
    id: "social",
    nome: "Redes Sociais",
    superficie: "Social Media",
    url: "instagram.com/saborserra",
    cor: "var(--brand-cyan)",
    itens: [
      it({ texto: "Página reorganizada e padronizada", etapa: "descoberta", pilar: "verdade", impacto: "medio", sem: false, com: true }),
      it({ texto: "Templates e identidade visual profissional", etapa: "avaliacao", pilar: "verdade", impacto: "alto", sem: false, com: false, dono: "cliente", insumo: "Fotos autorais do espaço e dos pratos", acao: "Posts ainda genéricos — depende de fotos próprias do cliente." }),
      it({ texto: "Perfil ativo com publicações recentes", etapa: "avaliacao", pilar: "atualizacao", impacto: "alto", sem: false, com: false, dono: "nos", acao: "Retomar cadência de 1 post/semana do plano Potente." }),
      it({ texto: "Canal direto de vendas configurado", etapa: "experiencia", pilar: "atualizacao", impacto: "medio", sem: false, com: true }),
    ],
  },
];

window.SOL_DATA = { CLIENTE, PESO, PILARES, ETAPAS, PRODUTOS };
