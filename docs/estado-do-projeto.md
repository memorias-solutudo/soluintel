# Estado do projeto — handoff

**Atualizado:** 27/08/2026 · fim da etapa 1
**Para que serve:** dar a uma sessão nova o contexto inteiro sem precisar recolar histórico.

---

## 1. O ambiente

| Item | Valor |
|---|---|
| Repositório | `memorias-solutudo/soluintel` |
| Branch de trabalho | `claude/intelligent-gates-av5c7o` |
| Publicação | `.github/workflows/pages.yml` → GitHub Pages |
| URL base | `https://memorias-solutudo.github.io/soluintel/` |

**Padrão de deploy usado o tempo todo:**

```bash
git add -A docs/ artefatos/ && git commit -q -m "..." \
&& git push -u origin claude/intelligent-gates-av5c7o -q \
&& git fetch origin main -q && git merge-base --is-ancestor origin/main HEAD \
&& git push origin HEAD:main -q && echo DEPLOY-OK
```

### Limites de rede desta sessão (confirmados, não suposições)

- **`api.solutudo.com` está bloqueada** — 403 no CONNECT do proxy. Não é a API recusando; é a política de rede do ambiente. Todo payload de parceiro até agora foi **colado pelo usuário no chat**.
- **`memorias-solutudo.github.io` também está bloqueada para leitura.** Dá para *publicar* (push vai por `github.com`, liberado) e **não** dá para *abrir* a página publicada. Validação visual é sempre com o arquivo local.
- **O CDN `solutudo-cdn.s3-sa-east-1.amazonaws.com` está bloqueado** no headless. Screenshot trava esperando imagem — usar `--blink-settings=imagesEnabled=false`. As URLs do CDN funcionam para o usuário final.

---

## 2. Convenções de construção

**Design system** (idêntico em todos os artefatos):
DM Sans via Google Fonts · `--brand-purple:#A701FD` · `--brand-pink:#FC0097` · `--brand-orange:#FF6849` · `--bg:#F5F4F8` · tints lav/mint/peach/cyan/yellow · `--grad-cta` · `--r-lg:20px` · `--pill:999px`.

**Padrão de build de página:** script Python com `rep(old,new,count)` baseado em `assert`, e verificação de balanço de tags (`div`, `section`, `ul`, `li`, `span`, `table`, `tr`) ao fim de cada etapa. Páginas grandes são montadas em partes com um marcador `<!--PARTS-->`.

**Screenshot:**
```bash
timeout 55 /opt/pw-browsers/chromium --headless --disable-gpu --no-sandbox \
  --hide-scrollbars --blink-settings=imagesEnabled=false \
  --window-size=1500,2000 --virtual-time-budget=4000 \
  --screenshot=out.png "http://localhost:PORTA/caminho/#aba"
```
`pkill` do servidor retorna exit 144 — é benigno, mas **quebra comandos encadeados com `&&`**. Rodar separado.

**Modal lateral (drawer):** `.dw-back` e `.dw` precisam ser filhos diretos de `<body>`, nunca de dentro de um `.panel` — senão o `position:fixed` se ancora no painel. Fecha com Esc.

**Marcações com hint:** `mark.m-bad` (laranja, enfraquece), `.m-fill` (roxo, fato ausente), `.m-good` (verde, verificado), todas com `data-tip` no hover. A regra vira dica, nunca nota de rodapé.

---

## 3. Agentes (`.claude/`)

Cinco agentes em `.claude/agents/*.md` + orquestrador em `.claude/skills/empresa-3-0/SKILL.md`.
São **8 execuções por empresa** (4 ângulos de descoberta compartilham um prompt).

| Agente | Papel | Ferramentas |
|---|---|---|
| `descobridor-empresa` | Varre a internet em 1 de 4 ângulos (site oficial / redes e diretórios / bases oficiais / reputação) | WebSearch, WebFetch, Read, Grep, Bash |
| `verificador-adversarial` | Tenta **derrubar** cada fato; caça homônimos, cruza CEP/DDD/endereço | WebSearch, WebFetch, Read, Grep, Bash |
| `redator-3-0` | Escreve a partir do envelope verificado — **sem internet, de propósito** | Read, Grep, Bash |
| `auditor-indexacao` | Limites de canal medidos em código, frases atômicas, acessibilidade | Read, Grep, Bash, WebSearch |
| `supervisor-3-0` | Confere as 4 fases com spot-check ativo. Veredito e retrabalho (máx. 2 ciclos) | Read, Grep, Bash, WebSearch, WebFetch |

**Regras que atravessam todos:** todo fato carrega proveniência (`[fato] | fonte | confiança | PUB/int`); **ausência nunca é fato**; CNPJ é uso interno; 403 não significa site fora do ar; ninguém assina o próprio trabalho.

**Régua de score (0–100), usada em toda comparação "como está × como deveria":**

| Dimensão | Peso |
|---|---|
| Entidade e local | 15 |
| Fatos verificáveis | 25 |
| Resposta direta (AEO) | 20 |
| Estrutura extraível | 15 |
| Unicidade | 15 |
| Contato e próximo passo | 10 |

---

## 4. Documentos

| Arquivo | Conteúdo |
|---|---|
| `docs/descricao-empresa-3-0.md` | Spec da descrição 3.0 |
| `docs/descricao-empresa-2-0.md` | Versão anterior |
| `docs/editorias-conteudo.md` | 6 slots fixos (A processo · B oferta · C conversão · D público · E território · F dúvidas), ≥2 fatos por editoria, 24 temas |
| `docs/gestao-trafego-plano.md` | Resumo executivo para o CEO |
| `docs/gestao-trafego-operacao.md` | **Padrão de operação. A §7 (regras internas) tem precedência sobre qualquer referência de mercado citada antes.** |
| `docs/inteligencia-solutudo.md` | — |
| `docs/orientacoes-telas-solutudo.md` | — |

---

## 5. Artefatos publicados

### `artefatos/sobre-empresa-new-rock/` — artefato principal
5 abas: Descrição · FAQ · Indexação · Empresas 3.0 · **Agentes** (organograma com 8 agentes numerados, ficha lateral, e a fila de expansão: calendário de posts, editorias, Solusite, conteúdo completo, descrições por canal).

### `artefatos/parceiros/` — hub, 3 cards

| Parceiro | ID | Segmento | Descrição | Catálogo | Abas |
|---|---|---|---|---|---|
| Pizza Frita Semião | 1737 | Pizzaria · Botucatu/SP | 40 → 92 | 6 itens | 6 |
| Porto Certo Consórcio | 27460312 | Consórcio · Araraquara/SP · **setor regulado** | 44 → 91 | 7 itens | 6 |
| EA3 Engenharia | 21651088 | Construtora · Avaré/SP | **31 → 92** | 29 itens (10 com ficha) | **7** |

A EA3 tem duas abas que as outras não têm: **Tráfego pago** e **Briefing**.

### `artefatos/propostas/ea3-gestao-trafego/` — 3 abas
`Proposta EA3` (completa) · `Modelo simples` (genérica, reutilizável) · `Plano de entrada` (setup pago).

---

## 6. Gestão de Tráfego — o produto

### Preço vigente (§7.1)

| Plano | Gestão | Mídia coberta |
|---|---|---|
| Só Google | R$ 600/mês | até R$ 1.500/mês |
| Só Meta | R$ 800/mês | até R$ 1.500/mês |
| Google + Meta | R$ 1.200/mês | até R$ 3.000/mês |
| **Entrada (só Google)** | **R$ 400 setup + R$ 400/mês** | até R$ 1.500/mês |

- **Setup cortesia** nos três primeiros. O plano de entrada troca a cortesia por R$ 200/mês a menos — se paga em 2 meses.
- **10% sobre o valor que exceder o teto, por canal.** *(Pendência: confirmar se é sobre o excedente — interpretação adotada — ou sobre o total.)*
- **Gestão e mídia nunca são somadas na proposta.**
- Contrato mínimo de 3 meses. Acompanhamento diário + relatório semanal em duas partes: *como foi* e *o que vamos fazer nesta semana*.

### Regras de execução

- **§7.2 Meta:** toda campanha é para gerar conversa, e **exige oferta concreta**. Sem oferta não há criativo — é **pré-condição do cliente**, não item que a gestão resolve. São 2 campanhas: uma direto para o WhatsApp, outra para o site institucional (que empurra para o WhatsApp).
- **§7.3 Google:** 1 campanha de Pesquisa, objetivo Leads, **palavras específicas** — quanto mais genérica, mais caro o clique e menor a conversão.
- **§7.4** Cliente aprova o plano pela **API do Dani**. *(Pendência: não sabemos o que é nem o que o aceite dispara.)*
- **§7.5 EA3:** não é possível compartilhar acesso no Meta → **só Google nesta fase**.
- **Contas sempre no nome do cliente** (MCC no Google, Business Manager no Meta).
- **O site captura o número do interessado antes de abrir a conversa** — sem isso, quem clica e não escreve some, e o clique já foi pago.
- Não julgar criativo antes de 3–4 dias. 4 criativos por conjunto baixam o custo sem aumentar a verba.

---

## 7. Achados que valem para o produto inteiro

1. **`12/05/1999` é valor-padrão do formulário, não fato.** Aparece idêntico no cadastro dos **três** parceiros — Semião, Porto Certo e EA3 —, em segmentos e cidades diferentes. Nunca usar em texto. **Vale investigar quantos dos 28 milhões de perfis têm essa data.**
2. **As "palavras-chave particulares" são o ativo mais subestimado do cadastro.** São as buscas reais que já encontraram a empresa — incluindo grafias erradas. Na EA3, 43 termos viraram 5 grupos de anúncio sem uma única suposição. Agência nenhuma tem isso no dia 1.
3. **O cadastro responde 13 das 35 perguntas de briefing de campanha.** É a vantagem estrutural da Solutudo sobre agência: a reunião de fundação não começa do zero.
4. **Texto de produto colado de ferramenta de IA vaza HTML de interface.** Encontrado na EA3 (`agent-turn`, `markdown prose dark:prose-invert`). Vale varrer a base inteira por essas classes.
5. **Ausência presumida não é fato.** Errei uma vez afirmando que o Porto Certo não tinha foto real, com base no nome da categoria da foto. Tinha. A correção está registrada na própria página.

---

## 8. EA3 Engenharia — resumo do caso

Cadastro **rico e contaminado**: 29 produtos, 55 fotos, 43 buscas reais. O problema não é falta de matéria-prima.

**Defeitos publicados hoje:**
- Produto `699727` com **HTML de interface de chat de IA** dentro da descrição.
- `706882` fala de Avaré e fecha mandando construir em **Boituva** (180 km).
- `706878` abre em Avaré e afirma atender **Indaiatuba** (200 km).
- `698116` tem título EA3 e corpo que pede contato para a **Nexa Construtora** (marca incorporada), 2×.
- **8 grafias diferentes do nome**, uma com caractere invisível U+200B.
- WhatsApp DDD **11** para empresa de Avaré (DDD **14**).
- Celular `114998919914` — **12 dígitos, não disca**.
- Dois telefones comerciais marcados como padrão; campo `Logo` null com logotipo cadastrado.
- Descrição diz **"Fundada em Jundiaí/SP"**; tudo o mais opera em Avaré.
- 52 fotos com legenda idêntica da marca antiga e descrição vazia.

**Ativos subaproveitados:** Sistema ICF (único diferencial técnico real) · ART e profissional habilitado (aparece **uma vez** em todo o cadastro) · modelagem 3D (oferta pronta para campanha) · sábado 8h–17h · público de casa de veraneio e condomínio (8 buscas de condomínio + 2 da Riviera de Santa Cristina XIII, e nenhum produto nomeia).

**Tráfego:** 5 grupos de anúncio (alto padrão · condomínio e Riviera · orçamento e custo · tipologia · serviço técnico avulso), 10 genéricos marcados para **não** subir, 14 negativas para o dia 1. Inclui `eletrecista` — grafia errada real, clique barato, concorrente nenhum anuncia.

---

## 9. Pendências abertas

| # | Pendência | De quem |
|---|---|---|
| 1 | A taxa de 10% é sobre o **excedente** (interpretação adotada) ou sobre o total? | especialista |
| 2 | O que é a **API do Dani**, como o aceite é registrado e o que ele dispara | especialista |
| 3 | Salvar no `docs/editorias-conteudo.md` §8 a **versão expandida do prompt** de editorias (escrita no chat, ainda não versionada) | decisão do usuário |
| 4 | `pages.yml` dispara em `main` **e** no branch, com o mesmo grupo de concorrência. Hoje é inofensivo; se o branch divergir, o que fica no ar vira corrida. Sugestão: deixar só `main` | decisão do usuário |
| 5 | EA3: confirmar DDD do WhatsApp, corrigir celular de 12 dígitos, **definir a oferta da campanha**, informar prazo de entrega de laudo | CS + cliente |
| 6 | Validar se o salto entre os planos afasta o cliente do plano maior | comercial |
