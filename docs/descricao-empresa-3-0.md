# Descrição da Empresa 3.0 — Especificação consolidada

**O que é:** a versão vigente da Descrição da Empresa (e FAQ) da Solutudo. Consolida a
nossa 2.0 (dossiê editorial + caso New Rock) com a revisão externa 2.1 (ChatGPT),
**após auditoria independente das afirmações da 2.1 contra fontes oficiais** (seção 9).

**Escopo:** perfis gratuitos e pagos, descrições por canal, FAQ, governança de fatos,
prompt gerador e gate de publicação. Regras de página/indexação: ver
`orientacoes-telas-solutudo.md`; detalhe editorial e caso completo: ver
`descricao-empresa-2-0.md` (histórico).

**Par visual:** artefato — aba Descrição, card "Da 2.0 → 3.0"
(`https://memorias-solutudo.github.io/soluintel/artefatos/sobre-empresa-new-rock/`).

**Níveis de obrigação** (herdados da 2.1): **Obrigatório** (política, integridade,
direito) · **Recomendado** (sustentado por documentação) · **Estilo da casa**
(heurística editorial assumida — não é fator oficial de ranking/citação; é o nosso
padrão). Nenhum método garante posição, mapa ou citação por IA.

---

## 1 · Decisões resolvidas nesta versão

1. **Solusite deixa de copiar o texto da Solutudo.** Mesma base de fatos e mesma
   essência; narrativa própria de primeira parte. Motivo: texto idêntico em dois
   domínios faz o buscador escolher só um. *(Reversão de decisão anterior — marcada
   no artefato para validação final do time.)*
2. **Números observacionais continuam no material como estimativas rotuladas**
   (94%×23%, FCP↔citação) — não somem, mas não são argumento de venda nem regra;
   a meta oficial de velocidade é Core Web Vitals.
3. **Google Places bloqueado por padrão** como fonte de enriquecimento até parecer
   jurídico específico (termos do Maps restringem uso em diretório). O enriquecimento
   automático de gratuitas passa a ser: CNPJ (como pista) + declaração do responsável.

## 2 · O que muda da 2.0 para a 3.0 (resumo)

| Tema | 2.0 | 3.0 |
|---|---|---|
| Fato publicável | `confirmado: true` bastava | + `publication_allowed` (direito/LGPD) + `location_scope` por unidade + `valid_until` |
| CNPJ/Receita | Fato confirmado | Pista cadastral: CNAE ≠ serviço atual · abertura ≠ fundação · endereço fiscal ≠ atendimento |
| Google Places | Fonte de enriquecimento | Bloqueado por padrão até parecer jurídico |
| JSON-LD | LLM emitia `json_ld` | Gerado por código pela aplicação (grafo `WebPage` + negócio); LLM só prosa + relatório |
| Estrutura | 5 blocos obrigatórios | Módulos por arquétipo (6 tipos); módulo sem fato é omitido |
| Solusite | Mesmo texto | Mesma base de fatos, narrativa própria |
| aggregateRating | "Avaliação real" | Só avaliações **nativas da Solutudo**, visíveis e ligadas à unidade; não remarcar nota de terceiros |
| Regra × heurística | Tudo como regra | 3 níveis (obrigatório / recomendado / estilo da casa) |
| FAQ | Base do nicho | Pauta do nicho OK; publica só com resposta **específica da empresa** — nunca lista genérica replicada |
| Exemplo New Rock | Parecia publicável | Simulação explícita "não publicar"; testes usam fixtures "DADOS FICTÍCIOS" |
| Gate | Densidade de fatos | Utilidade decisória + condições duras; mesmo gate para grátis e pago |

**O que não mudou:** verdade primeiro e lacuna com dono · entidade primeiro · frases
atômicas · único e denso (anti-molde) · Google ≤750 com essencial no início ·
Instagram ≤150 · sem stuffing · server-render como baseline · title ~50–60 e meta
~140–160 como alvos editoriais.

## 3 · Envelope canônico de fatos (obrigatório)

Todo valor que pode virar afirmação pública carrega o mesmo envelope:

```json
{
  "id": "fact.service.001",
  "field": "service | address | hours | proof | price | ...",
  "value": { },
  "source_type": "owner_declaration | official_site | internal_licensed | cnpj | editorial",
  "source_ref": "briefing:2026-07-18:item-14",
  "verified_by": "customer_success:482",
  "verified_at": "2026-07-18",
  "valid_until": null,
  "confidence": "high",
  "confirmed": true,
  "publication_allowed": true,
  "location_scope": ["solutudo:location:7890"]
}
```

Regras por tipo: endereço distingue `fiscal_address` / `public_operating_address` /
`service_area` (só o operacional público aparece como estabelecimento) · `foundingDate`
exige confirmação da história (abertura de CNPJ não prova) · horário/preço são voláteis
(`valid_until`) · provas numéricas exigem método e data · avaliações guardam origem,
autor, data, consentimento e unidade · dados pessoais/sócios/endereço residencial não
entram só por constarem em base pública (LGPD).

## 4 · Arquétipos e módulos (recomendado)

**Arquétipos (forma do negócio):** prestador por área de atendimento ·
loja/estabelecimento físico · restaurante/alimentação · serviço online/nacional ·
indústria/B2B · e-commerce/híbrido · `outro` (fallback — usar o mais próximo e
registrar em `review_reasons`). **Setor regulado não é arquétipo:** é eixo
transversal via `compliance_tags` (clínica = estabelecimento físico + tag de saúde)
e sempre aciona `needs_human_review`.

**Módulos:** identidade · oferta · atendimento · processo · evidências · políticas ·
CTA factual. Nenhum módulo é preenchido para manter formato: sem fato útil → omite
e registra lacuna.

**Achado negativo não é fato (obrigatório).** "Não encontrado na varredura" significa
**desconhecido**, nunca "não existe". Conteúdo dentro de aplicativos e áreas logadas é
ponto cego estrutural da descoberta automática — testado em campo: concluímos que um
cliente não estava numa plataforma de delivery e a consulta direta no app provou o
contrário. Ausência só vira fato com confirmação do dono ou verificação humana direta,
e nunca embasa afirmação pública nem abordagem comercial ("você não está em X").

## 5 · Prompt gerador 3.0 (íntegra)

```text
PAPEL
Você redige o conteúdo factual dos perfis de empresas e organizações da Solutudo
(Descrição 3.0). Transforma FATOS APROVADOS em texto útil para pessoas — legível
também por buscadores e sistemas de IA. Você não completa lacunas e não inventa nada.
Escreve em português do Brasil, correto e natural.

ENTRADA (da base canônica; todo fato tem envelope de governança)
{
  "entity_id": "...", "location_id": "...",
  "archetype": "prestador_area_atendimento | estabelecimento_fisico | restaurante |
                servico_online_ou_nacional | industria_b2b | ecommerce_hibrido | outro",
  "facts": [ { "id", "field", "value", "source_type", "source_ref", "verified_at",
               "valid_until", "confidence", "confirmed", "publication_allowed",
               "location_scope" } ],
  "brand_voice": "opcional — tom confirmado com o cliente",
  "claims_prohibited": ["..."], "compliance_tags": ["..."],
  "channel_requirements": { "canais": ["solutudo","solusite","google","instagram","seo"], "limites": { } }
}
Campos típicos em facts[]: name, category, address | service_area, hours, service,
product, material, process, proof, policy, differentiator, history, price.
Setor regulado NÃO é arquétipo: vem em compliance_tags e combina com qualquer forma
(clínica = estabelecimento_fisico + tag de saúde). Archetype ausente ou sem encaixe:
use o mais próximo e registre o motivo em review_reasons.

REGRAS INQUEBRÁVEIS (verdade E direito de publicação)
1. Use somente fatos com confirmed=true E publication_allowed=true E escopo compatível
   com a unidade atual (location_scope). Fato verdadeiro sem direito de publicação NÃO entra.
2. Toda afirmação lista os ids que a sustentam em fatos_usados.
3. NÃO infira do CNPJ: CNAE não é serviço atual; data de abertura não é fundação;
   endereço fiscal não é local de atendimento.
4. Não invente números, bairros, preços, horários, certificações, avaliações, garantias,
   especialidades, resultados ou diferenciais. Sem superlativos NEM comparações sem
   evidência aprovada. Respeite claims_prohibited. Sem emoji (exceto bio do Instagram).
5. Módulo sem fato útil é OMITIDO — nunca preenchido com genérico ("qualidade,
   excelência, compromisso") — e vira lacuna com dono.
6. Não mencione pessoas físicas (sócios, equipe nomeada) sem fato publicável específico.
7. Sinalize needs_human_review=true quando compliance_tags indicar setor regulado
   (saúde, jurídico, financeiro, educação…), houver conflito entre fatos ou alegação
   sensível/de resultado.
8. Poucos fatos NÃO é licença para encher: com fatos só de identidade, escreva 2–3
   frases e pare. Sem fato publicável nem para a identidade: devolva os textos como
   null, liste as lacunas e marque needs_human_review. Nunca estique além dos fatos.
9. NÃO gere JSON-LD, HTML técnico, canonical, robots ou sitemap — isso a aplicação
   gera por código, a partir dos mesmos fatos.
10. Gere SOMENTE os canais pedidos em channel_requirements.canais — canal não pedido
    (ex.: cliente sem Solusite ou sem Instagram) tem a chave omitida.

ESTILO DA CASA (heurísticas editoriais assumidas — não são fatores oficiais de
ranking; são o nosso padrão de clareza para pessoas, buscadores e IA)
- Entidade primeiro: a 1ª frase diz o que o negócio é + categoria + cidade/UF — ou o
  escopo real ("em todo o Brasil", "atendimento online") quando não houver praça única.
- Frases atômicas e autossuficientes: um fato por frase, sem "isso/aquilo".
- Único e denso: fatos específicos DESTE negócio — nunca molde que só troca nome
  e cidade (é o que buscador desindexa em escala).
- A frase termina no fato: nada de cauda genérica ("soluções sob medida",
  "atendimento personalizado", "qualidade garantida") pendurada em frase factual.
- Consistência interna: a enumeração de serviços/produtos da abertura, dos módulos e
  de TODAS as versões por canal é o MESMO conjunto — nunca listas divergentes.
- Essencial no início: abertura, títulos e descrição do Google começam pelo que decide.
- Localização natural quando o negócio é local (cidade 1–2x + bairros reais
  confirmados); atuação nacional/online declara o escopo real, sem forçar cidade/bairro.
- Termos que os clientes do segmento realmente buscam; explique siglas e termos
  técnicos quando o público for leigo.
- Listas e subtítulos só quando ajudarem a leitura. "Desde [ano]" em vez de datas
  que envelhecem.

MÓDULOS (montar conforme o archetype; nenhum é obrigatório sem fato útil)
identidade · oferta · atendimento · processo · evidências · políticas · CTA factual
Foco por arquétipo — prestador_area_atendimento: serviços, regiões, orçamento/visita,
processo, garantia · estabelecimento_fisico: mix, endereço público, horários, acesso,
retirada/entrega · restaurante: cozinha, tipo de serviço, horários, reservas, delivery ·
servico_online_ou_nacional: o que entrega, como atende, escopo, canais, prazos ·
industria_b2b: capacidades, segmentos atendidos, cobertura, especificações,
certificações, processo comercial · ecommerce_hibrido: categorias, entrega, retirada,
trocas, suporte · outro: aplique os módulos que os fatos sustentarem.

SAÍDAS
- essencia: resumo factual reutilizável (1–3 frases).
- descricao_solutudo: { texto, modulos_incluidos } — perfil factual e comparável;
  tamanho proporcional aos fatos (tipicamente 80–250 palavras), nunca esticado.
- descricao_solusite: { pauta, texto } — MESMA base de fatos, narrativa própria de
  primeira parte; não copiar o texto da Solutudo.
- por_canal.google_business_profile: até 750 caracteres, o essencial nos ~250
  primeiros; sem URL, promoção ou preço; telefone fica no campo próprio do perfil.
- por_canal.instagram_bio: até 150 caracteres (a aplicação reconta); emojis e quebras
  de linha conforme brand_voice (padrão da casa: 1 ideia por linha).
- seo.title (~50–60, alvo editorial: negócio + categoria + praça quando couber) e
  seo.meta_description (~140–160, alvo editorial, factual) — o Google pode reescrever.
- fatos_usados: [ { claim, fact_ids } ]
- lacunas: [ { campo, impacto, dono: "cliente | nos" } ]
- claims_evitados · needs_human_review · review_reasons
(O FAQ tem gerador próprio — não faz parte desta saída.)

FORMATO
Responda SOMENTE com JSON válido conforme o contrato de saída da aplicação.

VALIDAÇÃO POSTERIOR (da aplicação, não sua): schema fechado; recontagem de caracteres
em código; fact_ids existentes, publicáveis e no escopo; detector de nomes/números/
localidades fora dos fatos; similaridade anti-molde entre páginas; revisão humana
quando marcada. Só depois disso a página passa pelo gate de indexabilidade.
```

**Validações pós-LLM (da aplicação):** schema fechado · recontagem de caracteres em
código · `fact_ids` existentes/publicáveis/no escopo · detector de nomes, números,
datas e localidades fora dos fatos · similaridade anti-molde entre páginas · revisão
humana quando `needs_human_review`.

## 6 · Saídas por canal

| Canal | Regra |
|---|---|
| Perfil Solutudo | Módulos do arquétipo; factual, comparável, tamanho variável |
| Solusite | Mesma base de fatos, narrativa própria de primeira parte |
| Google (Perfil da Empresa) | ≤750 caracteres, essencial no início; sem URL, promoção ou preço; telefone no campo do perfil |
| Instagram (bio) | ≤150 caracteres (recontado em código); emoji = escolha de marca |
| `title` / meta | ~50–60 / ~140–160 como alvo editorial; o Google pode reescrever |
| JSON-LD | Pela aplicação: grafo `Organization` (Solutudo) + `WebPage` (`dateModified`, `mainEntity`) + nó do negócio (@type específico; `telephone` como texto "+55…"; sem propriedades vazias; nada invisível na página) + `BreadcrumbList`. Sem endereço público: `Organization`/`Service`/`areaServed` — não fabricar `PostalAddress`. No Solusite do cliente, sem `aggregateRating` de si mesmo (*self-serving*) |

## 7 · FAQ

Conteúdo de atendimento, não atalho de indexação. Perguntas recorrentes comprovadas
(Digisac, atendimento, responsável) · resposta sustentada por fato atual · visível a
todos · **específica daquela empresa** (nunca a mesma lista genérica em milhares de
páginas). Estilo da casa: resposta-primeiro (1ª frase responde). `FAQPage` opcional
e de baixa prioridade (rich results restritos a gov/saúde desde ago/2023); a marcação
deve espelhar exatamente o conteúdo visível.

## 8 · Gate de publicação (mesmo para grátis e pago)

**Condições duras:** entidade/unidade resolvidas sem duplicidade · status operacional
conhecido · direito de publicar os dados essenciais · URL canônica estável e HTTP 200 ·
contato público válido · endereço/área representados corretamente · sem dado sensível
indevido ou claim proibido · conteúdo principal no HTML coerente com o JSON-LD.

**Utilidade decisória:** oferta específica + escopo local + como/quando obter
atendimento + ao menos 1 informação própria verificável além do cadastro.

Falhou → por caso: `noindex` e pedir dados · consolidar/301 · 404/410 · não criar URL.
Pagamento não indexa página fina; gratuito útil não é prejudicado por ser gratuito.

## 9 · Verificação independente da spec 2.1 (nossa auditoria)

Auditamos as 9 afirmações estruturais da 2.1 com agentes independentes e adversariais
(instruídos a tentar refutar), contra documentação oficial. Resultado: **8 confirmadas ·
1 nuance · 0 refutadas** (22/07/2026).

| Afirmação (2.1) | Veredito | Fonte primária |
|---|---|---|
| Termos do Maps proíbem Places em diretório | **Confirmado** — §3.2.3: "No Scraping" (cita nomes/endereços/reviews), "No Caching", "não usar em *listings or directory service*" | cloud.google.com/maps-platform/terms |
| Review snippet: só 1ª parte; não agregar terceiros | **Nuance** — correto, e há regra ADICIONAL: reviews *self-serving* (entidade marcando avaliação de si no próprio site) são inelegíveis desde 2019 | developers.google.com/search (review-snippet; blog 09/2019) |
| Bots OpenAI: OAI-SearchBot / GPTBot / ChatGPT-User independentes | **Confirmado** — bloquear GPTBot não remove da busca do ChatGPT | developers.openai.com/api/docs/bots |
| Google AI features: sem marcação/arquivo especial | **Confirmado** — llms.txt sem efeito (atualização 06/2026); "AEO/GEO ainda é SEO" | developers.google.com/search (ai-features; ai-optimization-guide) |
| Ranking local = relevância + distância + proeminência | **Confirmado** | support.google.com/business/answer/7091 |
| IndexNow: só motores participantes; Google fora | **Confirmado** — Bing, Yandex, Seznam, Naver, Yep; sem garantia de indexação | indexnow.org/faq |
| CWV: LCP 2,5s · INP 200ms · CLS 0,1 (p75) | **Confirmado** | web.dev/articles/vitals |
| LocalBusiness exige endereço; não fabricar PostalAddress | **Confirmado** — `address` é obrigatório; dado invisível na página viola as políticas | developers.google.com/search (local-business; sd-policies) |
| Bots Anthropic: ClaudeBot / Claude-SearchBot / Claude-User | **Confirmado** | support.claude.com (artigo 8896518) |

**Regra nova derivada da nuance:** a página **Solutudo** (plataforma que publica
avaliações de OUTROS negócios) é elegível ao `aggregateRating` com avaliações nativas;
o **Solusite do cliente NÃO deve marcar** `aggregateRating`/review de si mesmo
(*self-serving* → inelegível) — pode exibir as avaliações na página, sem markup.

## 10 · Pendências antes do go-live (consolidadas)

**Jurídico/dados:** parecer de fontes (Places bloqueado até lá) · política de
avaliações nativas · critérios de publicação de endereço/registro/CNPJ · regras por
setor regulado.
**Produto/operação:** taxonomia de arquétipos aprovada · fluxo de reivindicação e
correção · SLA de reverificação de dados voláteis · experiência para perfis `noindex` ·
separação editorial Solutudo × Solusite (validar a reversão da decisão).
**Engenharia:** contrato canônico de fatos + escopo por unidade · gerador
determinístico de JSON-LD com teste de correspondência ao HTML · SSR do conteúdo
crítico · URLs/redirects/canonicals/sitemaps/ciclo de vida · registro versionado de
robots + testes de CDN/WAF · dashboards de indexação e conversão.
**Qualidade:** fixtures sintéticos "NÃO PUBLICAR" · testes de vazamento entre
unidades · avaliação humana por arquétipo · **piloto controlado antes de escalar** ·
diagnóstico da queda de URLs por motivo e template (45→28 mi é observação interna a
validar, não conclusão fechada).

---

*3.0 consolidada em 22/07/2026 a partir da 2.0 (nossa), da revisão 2.1 (ChatGPT) e da
auditoria independente da seção 9. Mudança em políticas, robôs, contratos de dados ou
arquitetura ⇒ nova versão com registro de alteração.*
