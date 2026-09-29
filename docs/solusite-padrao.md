# Solusite — o padrão do site do parceiro

**Status:** vigente desde 29/09/2026 · primeiro caso aplicado: **LAAE Laboratório** (aba Solusite da central)
**Referência de formato:** artefato *Sobre a Empresa & FAQ* do caso New Rock
(`artefatos/sobre-empresa-new-rock/`) — descrição com entidade primeiro, FAQ ancorado em fato, as
três camadas da página e as regras de indexação para buscadores e IAs.
**Pareado com:** `descricao-empresa-3-0.md` (o texto) · `orientacoes-telas-solutudo.md` (a tela) ·
`editorias-conteudo.md` (o blog e as peças fixas do perfil)

---

## 1. Para que o Solusite existe

O Solusite é o site próprio do parceiro. Ele tem três trabalhos, nesta ordem:

1. **Fazer quem chegou entrar em contato.** É o trabalho das pessoas.
2. **Ser encontrado** quando alguém procura o que a empresa faz. É o trabalho dos buscadores.
3. **Ser a fonte** que respostas diretas e IAs usam quando falam da empresa. É o trabalho de AEO e GEO.

| Leitor | O que faz | O que precisa encontrar no site |
|---|---|---|
| **Pessoas** | decide e chama | contato visível no topo, botão de WhatsApp fixo no celular, página rápida |
| **SEO** · Google, Bing | encontra e ordena | uma página por intenção de busca, title, meta e H1 próprios, links internos, dados de contato idênticos em todos os canais |
| **AEO** · trechos em destaque, "as pessoas também perguntam", voz | responde | a pergunta como título e a primeira frase respondendo sozinha |
| **GEO** · ChatGPT, Perplexity, Claude, Gemini, AI Overviews | cita | frases atômicas, com o nome da empresa, o que ela faz e o fato — no HTML servido |

**O Bing pesa mais do que parece:** é por onde a busca do ChatGPT descobre páginas. E os robôs de IA
**não executam JavaScript**: o que não está no HTML servido não existe para eles.

## 2. Um conteúdo, duas vitrines

**Decisão de 29/09/2026:** o texto do site é o **mesmo** dos detalhes da empresa na página
Solutudo — mesmos fatos, mesmas frases, mesma ordem. O que muda é a forma do contato: na Solutudo é
texto por extenso; no site é botão com link.

Isso resolve a pendência que a Descrição 3.0 deixou aberta ("separação editorial Solutudo × Solusite
— validar a reversão da decisão"). O custo conhecido: **texto idêntico em dois domínios faz o
buscador mostrar um deles para aquela busca** — não é penalidade, é escolha. A mitigação é
estrutural:

- **O site é sempre maior que a página.** Os mesmos blocos, mais as páginas que só ele tem: uma por
  serviço ou linha, coleta ou atendimento, perguntas frequentes e blog. Quem busca a empresa pelo nome
  encontra as duas; quem busca o serviço encontra a página do serviço, que só existe no site.
- **Cada domínio aponta o canonical para si mesmo.**
- **O texto compartilhado é gerado uma vez**, a partir da mesma base de fatos, e publicado nas duas
  superfícies ao mesmo tempo. Nunca duas versões que divergem com o tempo.

## 3. As páginas

**Obrigatórias:** Home · Sobre (= os detalhes da empresa) · uma página por serviço ou linha que tenha
conteúdo próprio · Perguntas frequentes · Contato.

**Conforme o negócio:** Onde atendemos (**uma** página com todas as cidades) · Blog (as editorias) ·
Obras, cases ou portfólio (com autorização).

**Página por cidade só quando cada cidade tem fato próprio** — frequência da rota, cliente atendido
ali, ponto de atendimento. Sem isso é página que só troca o nome da cidade, o alvo número um das
atualizações de spam do Google desde 2024.

Para cada página, a entrega traz: **URL · H1 · title (até ~60 caracteres) · meta description (até
~155) · a pergunta que ela responde · o conteúdo · os links internos · o JSON-LD esperado.**
Caracteres contados, não estimados.

## 4. Regras de conteúdo

1. **Entidade primeiro.** A primeira frase diz o que a empresa é, a categoria e a sede ou o escopo real.
2. **Frases atômicas.** Um fato por frase, com sujeito explícito, citável fora do contexto.
3. **O nome da empresa se repete** a cada bloco que pode ser citado sozinho: abertura de página,
   resposta de FAQ, primeira linha de cada serviço.
4. **Um nome só para a entidade** em todo lugar. Apelido ou nome de domínio entra uma vez, como nome
   alternativo, e no `alternateName` do JSON-LD.
5. **Só fato confirmado.** Fato que veio do site do parceiro sem leitura direta leva a marca
   *conferir na fonte* até ser conferido (§1.1 de `editorias-conteudo.md`).
6. **Número, norma, parâmetro, prazo e preço só com fonte.** Sem fonte, é lacuna com dono.
7. **Sem superlativo, sem cauda genérica** ("soluções sob medida"), **sem datação relativa**
   ("há mais de 20 anos").
8. **Cidades:** a sede é "sede em X"; a cobertura é a lista inteira ou o alcance. Nunca meia lista.
9. **Setor regulado ou técnico:** credencial sempre com a ressalva do escopo, nenhuma promessa de
   resultado.

## 5. Camada técnica

É da aplicação, não do redator — mas o redator precisa saber que ela existe, e o gate confere.

- **Renderização:** todo conteúdo essencial no HTML servido. Teste: desligue o JavaScript; se o
  texto sumir, está errado.
- **Contato:** telefone e WhatsApp como texto clicável (`tel:`, `wa.me`), visíveis sem clique;
  horário em lista; botão de WhatsApp fixo no celular.
- **JSON-LD:** gerado por código a partir dos mesmos fatos da página, com o `@type` mais específico
  que exista — sem tipo dedicado, `LocalBusiness`. Grafo: `WebSite` + `WebPage` (`dateModified`) +
  o negócio + `BreadcrumbList`; `FAQPage` só na página de perguntas, espelhando o texto visível.
  **Sem `aggregateRating` da empresa sobre si mesma** — pode exibir avaliações, sem marcação.
- **Indexação:** `meta robots` com `index, follow, max-snippet:-1, max-image-preview:large` ·
  canonical para si mesmo · `sitemap.xml` · `robots.txt` liberando os robôs de busca (Googlebot,
  Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot). Robôs de treinamento (GPTBot, ClaudeBot,
  o token Google-Extended) são decisão separada. **Conferir se a CDN ou o firewall bloqueiam robôs
  de IA por padrão** — é comum e ninguém percebe.
- **Velocidade:** Core Web Vitals no percentil 75 — LCP até 2,5 s · INP até 200 ms · CLS até 0,1.
  Sem vídeo em autoplay, hero gigante ou animação pesada.
- **Acessibilidade e celular:** mobile primeiro, alvo de toque de 44 px, contraste de 4,5:1, `alt`
  em toda imagem.
- **Frescor:** "Atualizado em DD/MM/AAAA" visível, `dateModified` no `WebPage` em mudança material,
  IndexNow para o Bing.

## 6. Gate de publicação

A página só vai ao ar com: domínio definido · contato válido e igual em todos os canais · sede ou
área representada sem inventar endereço · nenhuma afirmação sem fonte · pendências com dono · fontes
não acessadas declaradas · camada técnica cumprida. Faltou algo essencial, não publica.

## 7. Especificação para quem monta

O bloco abaixo é a versão de bolso deste padrão. Serve para a pessoa que monta o site e para um
agente que gere o site a partir do cadastro. É o mesmo texto que aparece, com botão de copiar, no fim
da aba Solusite de cada central.

```text
SOLUSITE — O QUE ESPERAMOS DO SITE DO PARCEIRO
Padrão vigente desde 29/09/2026 · primeiro caso aplicado: LAAE Laboratório

PARA QUE ELE EXISTE — três trabalhos, nesta ordem:
1. fazer quem chegou entrar em contato (pessoas);
2. ser encontrado quando alguém procura o que a empresa faz (buscadores);
3. ser a fonte que respostas diretas e IAs usam quando falam da empresa (AEO e GEO).

UM CONTEÚDO, DUAS VITRINES
O texto do site é o MESMO dos detalhes da empresa na página Solutudo: mesmos fatos, mesmas frases,
mesma ordem. Muda só a forma do contato: na Solutudo é texto por extenso; no site é botão com link.
Texto idêntico em dois domínios faz o buscador mostrar um deles para aquela busca. Por isso o site é
sempre MAIOR que a página: os mesmos blocos, mais as páginas que só ele tem. Cada domínio aponta o
canonical para si mesmo. O texto compartilhado é gerado uma vez e publicado nas duas superfícies.

OS QUATRO LEITORES
- PESSOAS decidem e chamam: contato visível no topo, WhatsApp fixo no celular, página rápida.
- SEO (Google, Bing) encontra e ordena: uma página por intenção de busca, title, meta e H1 próprios,
  links internos, dados de contato idênticos em todos os canais. O Bing é por onde a busca do
  ChatGPT descobre páginas.
- AEO (trechos em destaque, "as pessoas também perguntam", voz) responde: a pergunta vira título e a
  primeira frase da resposta responde sozinha.
- GEO (ChatGPT, Perplexity, Claude, Gemini, AI Overviews) cita: frases atômicas, com o nome da
  empresa, o que ela faz e o fato. Os robôs de IA não executam JavaScript: texto no HTML servido.

AS PÁGINAS
Obrigatórias: Home · Sobre (= detalhes da empresa) · uma página por serviço ou linha com conteúdo
próprio · Perguntas frequentes · Contato.
Conforme o negócio: Onde atendemos (UMA página, todas as cidades) · Blog (as editorias) · Obras ou
cases (com autorização).
Página por cidade só quando cada cidade tem fato próprio. Sem isso, é página que só troca o nome da
cidade — o alvo número um das atualizações de spam do Google.

PARA CADA PÁGINA, ENTREGUE
URL · H1 · title (até ~60 caracteres) · meta description (até ~155) · a pergunta que ela responde ·
o conteúdo · os links internos · o JSON-LD esperado. Conte os caracteres.

REGRAS DE CONTEÚDO
1. Entidade primeiro: a 1ª frase diz o que a empresa é, a categoria e a sede ou o escopo real.
2. Frases atômicas: um fato por frase, com sujeito explícito, citável fora do contexto.
3. O nome da empresa se repete a cada bloco que pode ser citado sozinho.
4. Um nome só para a entidade; apelido ou domínio entra uma vez, como nome alternativo.
5. Só fato confirmado. Fato do site do parceiro que não foi lido direto: "conferir na fonte".
6. Número, norma, parâmetro, prazo e preço só com fonte. Sem fonte, lacuna com dono.
7. Sem superlativo, sem cauda genérica, sem datação relativa ("há mais de 20 anos").
8. Cidades: a sede é "sede em X"; a cobertura é a lista inteira ou o alcance. Nunca meia lista.
9. Setor regulado ou técnico: credencial com a ressalva do escopo, nenhuma promessa de resultado.

CAMADA TÉCNICA (da aplicação)
- Todo conteúdo essencial no HTML servido. Desligou o JavaScript e o texto sumiu? Está errado.
- Telefone e WhatsApp como texto clicável (tel:, wa.me), visíveis sem clique; horário em lista.
- JSON-LD gerado por código, dos mesmos fatos da página, com o @type mais específico que exista
  (sem tipo dedicado: LocalBusiness). Grafo: WebSite + WebPage (dateModified) + o negócio +
  BreadcrumbList; FAQPage só na página de perguntas, espelhando o texto visível.
- Sem aggregateRating da empresa sobre si mesma. Pode exibir avaliações, sem marcação.
- meta robots index,follow,max-snippet:-1,max-image-preview:large · canonical para si mesmo ·
  sitemap.xml · robots.txt liberando Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot e
  PerplexityBot. Robôs de treinamento (GPTBot, ClaudeBot, Google-Extended) são decisão separada.
  Conferir se a CDN ou o firewall bloqueiam robôs de IA por padrão.
- Core Web Vitals no p75: LCP até 2,5 s · INP até 200 ms · CLS até 0,1. Sem vídeo em autoplay,
  hero gigante ou animação pesada. Mobile primeiro; toque de 44 px; contraste 4,5:1; alt em toda
  imagem.
- "Atualizado em DD/MM/AAAA" visível; dateModified no WebPage em mudança material; IndexNow (Bing).

ANTES DE PUBLICAR
Domínio definido · contato válido e igual em todos os canais · sede ou área sem inventar endereço ·
nenhuma afirmação sem fonte · pendências com dono · fontes não acessadas declaradas · camada técnica
cumprida. Faltou algo essencial: a página não vai ao ar.
```

## 8. Limites honestos

- **Nenhum método garante posição, mapa ou citação por IA.** Este padrão reduz o que impede de ser
  encontrado; o resto depende de concorrência, demanda e reputação.
- **As metas de caracteres de title e meta são alvos editoriais** — o Google pode reescrever os dois.
- **O conteúdo único nas duas vitrines é decisão de produto recente.** Medir: para buscas pelo nome
  da empresa, qual domínio aparece; para buscas de serviço, se as páginas do site entram. Se o site
  sumir para buscas que deveria ganhar, revisitar a decisão.
