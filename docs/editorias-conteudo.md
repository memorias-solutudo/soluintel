# Editorias de conteúdo — padronização

**Status:** vigente · pareado com `docs/descricao-empresa-3-0.md`
**Aplicado em:** Pizza Frita Semião (ID 1737, pizzaria) e Porto Certo Consórcio (ID 27460312, consórcio — setor regulado)
**Última revisão:** 12/08/2026

Este documento formaliza o método usado para gerar as **6 editorias** e os **24 temas anuais** de cada
parceiro. Ele nasceu da aplicação em dois casos de segmentos opostos e está escrito para ser executado
por um agente ou por uma pessoa, com o mesmo resultado.

---

## 1. O princípio

> **Editoria não é tema. Editoria é um eixo de fatos que a empresa consegue sustentar o ano inteiro.**

A regra que governa tudo aqui é a mesma da Descrição 3.0: **nada é inventado**. Uma editoria só existe
se houver **pelo menos 2 fatos do cadastro** que a sustentem — porque uma editoria precisa render 4
publicações sem que ninguém precise inventar nada no meio do caminho.

Se o eixo tem 1 fato só, ele vira *tema avulso* dentro de outra editoria. Se tem zero, vira **pendência
de CS** ("pergunta de 1 toque para o dono"), nunca uma editoria vazia.

---

## 2. Os 6 slots fixos

Toda empresa recebe 6 editorias, e elas ocupam sempre as mesmas 6 funções. O que muda de segmento para
segmento é o **nome** e o **conteúdo** — nunca a função. Isso é o que torna o método comparável entre
28 milhões de perfis.

| # | Função do slot | De onde vem o lastro no cadastro | A pergunta que a editoria responde |
|---|---|---|---|
| **A** | **Processo e origem** | Diferencial operacional, história, fundação, modo de fazer | "Por que fazer com vocês e não com outro?" |
| **B** | **Oferta / catálogo** | Produtos cadastrados, categorias, itens do cardápio ou portfólio | "O que exatamente eu compro?" |
| **C** | **Conversão** | Serviços e canais: delivery, retirada, reserva, simulação, horário, pagamento | "Como eu faço para comprar agora?" |
| **D** | **Público e experiência** | Características do estabelecimento ou segmentos de cliente atendidos | "Isso é para mim?" |
| **E** | **Território** | Endereço, cidade, região atendida | "Vocês são daqui?" |
| **F** | **Dúvidas (AEO)** | Palavras-chave particulares (buscas reais) ou dúvidas clássicas do setor | "Aquela coisa que eu ia perguntar" |

**Por que exatamente esses seis:** cobrem o funil inteiro sem sobreposição — A e E constroem confiança,
B e D qualificam, C converte, F captura demanda de busca. Um calendário sem C vira vitrine que não vende;
sem F, a empresa perde a única editoria que trabalha em três canais ao mesmo tempo (post, FAQ e Google).

---

## 3. Como nomear

O nome da editoria é lido pelo dono da empresa e pela pessoa que produz — nunca por um marqueteiro.

- **2 a 4 palavras**, na linguagem do negócio, não na do marketing.
- Nada de "Conversão", "Awareness", "Institucional", "Engajamento".
- Prefira o que o cliente diria: *"Peça em casa"*, *"Salão & família"*, *"Perguntas que chegam"*.
- O slot E leva o nome do lugar: *"Botucatu é aqui"*, *"Araraquara e região"*.

**Exemplo dos dois casos aplicados:**

| Slot | Pizzaria (Semião) | Consórcio (Porto Certo) |
|---|---|---|
| A · Processo e origem | Por dentro do Semião | Como o consórcio funciona |
| B · Oferta | Cardápio em destaque | Conquistas e planejamento |
| C · Conversão | Peça em casa | Crédito com garantia de imóvel |
| D · Público | Salão & família | Para empresas e produtores |
| E · Território | Botucatu é aqui | Araraquara e região |
| F · Dúvidas | Perguntas que chegam | Perguntas que chegam |

Note o slot C no caso do consórcio: em serviço financeiro, o produto de entrada mais concreto (home
equity) ocupa a função de conversão, porque é o que gera contato imediato. **A função é fixa; quem a
ocupa depende do negócio.**

---

## 4. Os 24 temas

- **4 temas por editoria × 6 editorias = 24**, o que dá **2 por mês** durante um ano.
- Cada tema é marcado com a editoria a que pertence — sem exceção, para que a distribuição seja auditável.
- Cada tema nasce de **um fato específico**, não de um assunto genérico. "Dicas de pizza" não é tema;
  "Pizza com criança, sem estresse" é, porque espaço kids e fraldário estão no cadastro.
- **Dentro de cada editoria, os 4 temas progridem**: do mais fácil de produzir ao mais trabalhoso.
- **Pelo menos 1 tema do ano é o "único"** — aquele que nenhum concorrente conseguiria publicar.
  No Semião: "Desde 1999, a história da pizza frita em Botucatu". No Porto Certo: "De cliente a consultor:
  por que acredito no modelo" (o consultor foi contemplado antes de vender consórcio). **Esse tema é o
  ativo mais valioso do calendário e merece produção caprichada.**
- **Série recorrente:** ao menos uma editoria ganha um tema repetível (ex.: "O sabor do mês"), que salva
  o calendário quando faltar pauta.

---

## 5. Filtros obrigatórios

Antes de um tema entrar na lista, ele passa por quatro perguntas:

1. **Tem lastro?** Rastreia a um fato do cadastro ou a uma dúvida real de busca. Se não, cai.
2. **Termina em ação?** Todo tema do slot C fecha em contato (WhatsApp, telefone ou como pedir).
3. **É replicável por qualquer concorrente?** Se sim, ou ganha um fato próprio, ou cai.
4. **Setor regulado:** *tema que só funciona prometendo resultado não entra na lista.*
   No consórcio isso eliminou toda pauta de "como ser contemplado rápido" e criou, no lugar, a pauta
   honesta: "Quanto tempo leva para ser contemplado?" — que responde sem prometer.

---

## 6. Quando não há buscas reais

O slot F depende das **palavras-chave particulares** do cadastro — as buscas que já encontraram a empresa.
É o insumo mais rico que existe (o Semião tinha mais de 100, incluindo dezenas de grafias erradas do nome).

Quando o campo está vazio, como no Porto Certo, a ordem de substituição é:

1. `curated_keywords` e `main_keywords` da **categoria** (existem para todas);
2. dúvidas clássicas do setor, extraídas do que o próprio texto da empresa evita responder;
3. o que o CS ouve no atendimento — pendência registrada, não invenção.

E registra-se a lacuna: *"não há buscas reais para este perfil"* é um achado, não um detalhe.

---

## 7. O que a editoria alimenta depois

Editoria não serve só para post. Cada uma tem destino em mais de um canal:

| Editoria | Post | FAQ da página | Google (Q&A e posts) | Blocos do site |
|---|---|---|---|---|
| A · Processo | ✓ | — | ✓ | bloco "Sobre" |
| B · Oferta | ✓ | ✓ | ✓ | páginas de produto |
| C · Conversão | ✓ | ✓ | ✓ | bloco "Como pedir/contratar" |
| D · Público | ✓ | ✓ | — | bloco de experiência |
| E · Território | ✓ | ✓ | ✓ | bloco "Onde estamos" |
| F · Dúvidas | ✓ | ✓ | ✓ | FAQ do site |

**O slot F é o de maior alavancagem:** a mesma resposta vira post, item de FAQ, resposta no Google e
bloco do site — quatro canais, um texto.

---

## 8. Prompt do agente planejador de pauta

> Você recebe o **envelope de fatos verificados** de uma empresa (cadastro Solutudo) e devolve 6 editorias
> e 24 temas.
>
> **Regras:**
> 1. Use os 6 slots fixos: A processo e origem · B oferta · C conversão · D público e experiência ·
>    E território · F dúvidas. A função de cada slot é fixa; quem ocupa depende do negócio.
> 2. Cada editoria precisa de **≥2 fatos do envelope**. Sem isso, não crie a editoria — registre a lacuna
>    como pendência para o CS.
> 3. Nomeie cada editoria com 2 a 4 palavras na linguagem do negócio. Jargão de marketing é proibido.
> 4. Gere 4 temas por editoria (24 no total), cada um ancorado num fato específico e marcado com sua editoria.
> 5. Marque explicitamente **1 tema "único"** — o que nenhum concorrente poderia publicar — e **1 série
>    recorrente**.
> 6. Todo tema do slot C termina em contato real (canal do cadastro).
> 7. Se `compliance_tags` indicar setor regulado: descarte qualquer tema que só funcione com promessa de
>    resultado e prefira a versão honesta da mesma dúvida.
> 8. Não invente sazonalidade local: datas da cidade entram como *"confirmar calendário com o parceiro"*.
>
> **Saída:** para cada editoria — nome, slot, os fatos que a sustentam e os 4 temas com uma linha de
> descrição cada. No fim: lacunas e pendências para o CS.

---

## 9. Limites honestos deste padrão

- **Não é um modelo de engajamento testado.** É uma arquitetura de conteúdo derivada dos fatos do cadastro,
  desenhada para cobrir funil e canais sem inventar nada. Métrica de desempenho ainda não existe —
  quando existir, ela deve realimentar a distribuição dos 24 temas.
- **A ordem sugerida não considera sazonalidade real** da cidade nem do setor. O calendário definitivo
  deve ser confirmado com o parceiro.
- **Formato não é prescrito** de propósito (foto, vídeo, carrossel): quem produz decide, e o mesmo tema
  costuma render em mais de um formato.
