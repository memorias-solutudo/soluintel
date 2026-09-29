# Solusite — o padrão do site do parceiro

**Status:** vigente desde 29/09/2026 · revisado no mesmo dia com títulos úteis, catálogo = páginas, FAQ por página, métricas da Descrição 3.0 e os blocos do Solusite · primeiro caso aplicado: **LAAE Laboratório** (aba Solusite da central)
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

**Um item do catálogo é uma página do site, com o mesmo texto — e vice-versa.** Todo produto ou
serviço da página Solutudo ganha a sua página no Solusite, e toda página de produto que o site
recomendar entra no catálogo da Solutudo. Item condicionado sobe nas duas vitrines ao mesmo tempo.

**Cada página de produto responde às próprias perguntas.** De 1 a 3, só com fato, além do FAQ geral
— que é o mesmo nas duas vitrines.

Para cada página, a entrega traz: **URL · H1 · title (até ~60 caracteres) · meta description (até
~155) · a pergunta que ela responde · o conteúdo · as perguntas da página · os links internos · o
JSON-LD esperado · a nota da rubrica com os critérios.** Caracteres contados, não estimados.

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
10. **Títulos úteis, nunca rótulos.** Nenhum H1 ou H2 genérico — "Serviços", "Sobre", "Contato",
    "O que fazemos", "Quem atendemos", "Perguntas frequentes". O título diz o que a pessoa busca
    ("Análise de efluente industrial e sanitário em Montes Claros (MG)") ou responde a uma pergunta
    ("Como é feita a coleta da amostra de água e efluente"). O menu pode ser curto, mas específico:
    "Análises", nunca "Serviços".

### 4.1 As métricas

Todo texto de página passa pela **rubrica da Descrição 3.0** — seis dimensões, 100 pontos — com
**critérios explícitos**, e a nota aparece junto com os critérios que ela cumpriu:

| Dimensão | Pontos | Critérios |
|---|---|---|
| Entidade e local | 15 | nome da empresa na 1ª frase · categoria ou serviço na 1ª frase · sede ou alcance declarados |
| Fatos verificáveis | 25 | proporção de frases com fonte confirmada; frase do site não lido ou a confirmar vale meio ponto; adjetivo sem fato tira 5 |
| Resposta direta (AEO) | 20 | a 1ª frase responde o que é · responde onde, prazo, como pedir e como recebe · títulos que respondem a uma busca |
| Estrutura extraível | 15 | média de até 22 palavras por frase · lista onde há enumeração · títulos descritivos |
| Unicidade | 15 | 3 pontos por fato que só a empresa tem, até 5 |
| Contato e próximo passo | 10 | canal por extenso · o que informar · horário ou agendamento |

E os **limites por canal**, conferidos na mesma entrega: detalhes da empresa proporcional aos fatos
(tipicamente 80 a 250 palavras, nunca esticado) · Google até 750 caracteres, com o essencial nos ~250
primeiros · bio até 150 · title ~50 a 60 · meta ~140 a 155. **A enumeração de serviços é a mesma em
todos os canais.** A entrega completa da 3.0 inclui ainda: a essência, os fatos usados com a fonte,
as lacunas com dono, os claims evitados e se precisa de revisão humana.

### 4.2 Os blocos do Solusite

O Solusite replica a página Solutudo e acrescenta o que só um site próprio pode ter:

| Bloco | O que leva | De onde vem |
|---|---|---|
| Banner, desktop e mobile | a frase de entidade e alcance; legenda sem meia lista de cidades | só no site |
| Ícones | 3 ou 4 diferenciais verificáveis, em poucas palavras | só no site |
| O laboratório, a loja, a empresa | o texto dos detalhes da empresa | replica o Destaque |
| Produtos e serviços | um item do catálogo, uma página | replica o Destaque |
| Perguntas | o FAQ geral + as perguntas de cada página | replica o Destaque + só no site |
| Depoimentos | nome, empresa e cargo, com autorização | só no site |
| Avaliações | exibidas, sem marcação de avaliação de si mesma | replica o Destaque |
| Fotos | da operação real, com `alt` descritivo | replica o Destaque |
| Contato, horário, pagamento, mapa | os mesmos dados em todos os canais | replica o Destaque |

### 4.3 Além do Destaque

O que costuma valer a pena só no site, conforme o negócio: **área do cliente** (portal, pedidos,
laudos) · **pedido guiado**, um formulário curto que abre o WhatsApp com a mensagem pronta ·
**credencial com prova**, com link para o registro oficial · **guia**, o blog das editorias ·
**link de WhatsApp rastreável**, para medir o contato que vem do site · **página de cidade** só com
fato próprio da cidade.

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

UM ITEM DO CATÁLOGO, UMA PÁGINA — E VICE-VERSA
Todo produto ou serviço da página Solutudo ganha a sua página no site, com o mesmo texto.
Toda página de produto que o site recomendar entra no catálogo da Solutudo. Cada página
responde de 1 a 3 perguntas próprias, só com fato, além do FAQ geral, que é o mesmo nas duas
vitrines.

PARA CADA PÁGINA, ENTREGUE
URL · H1 · title (até ~60 caracteres) · meta description (até ~155) · a pergunta que ela responde ·
o conteúdo · as perguntas da página · os links internos · o JSON-LD esperado · a nota da rubrica
com os critérios. Conte os caracteres.

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
10. Títulos úteis, nunca rótulos: nenhum H1 ou H2 como "Serviços", "Sobre", "Contato" ou "Perguntas
    frequentes". O título diz o que a pessoa busca ou responde a uma pergunta. Menu curto, mas
    específico: "Análises", nunca "Serviços".

AS MÉTRICAS DA DESCRIÇÃO 3.0, EM TODA PÁGINA
Rubrica de 100 pontos, com os critérios à vista: entidade e local 15 · fatos verificáveis 25 ·
resposta direta 20 · estrutura extraível 15 · unicidade 15 · contato e próximo passo 10. Limites:
detalhes da empresa tipicamente 80 a 250 palavras · Google até 750, essencial nos ~250 primeiros ·
bio até 150 · title ~50 a 60 · meta ~140 a 155. A enumeração de serviços é a mesma em todos os
canais. Entregue também: essência, fatos usados com a fonte, lacunas com dono, claims evitados e
se precisa de revisão humana.

OS BLOCOS DO SOLUSITE
Replicam a página Solutudo: o texto da empresa · um item do catálogo por página · o FAQ · as
avaliações, sem marcação · as fotos · contato, horário, pagamento e mapa.
Só no site: banner com a frase de entidade e alcance · 3 ou 4 ícones de diferenciais verificáveis ·
depoimentos com autorização · perguntas por página.
Além do Destaque, conforme o negócio: área do cliente · pedido guiado que abre o WhatsApp com a
mensagem pronta · credencial com link para o registro oficial · guia com as editorias · link de
WhatsApp rastreável · página de cidade só com fato próprio.

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
