# Gestão de Tráfego — padrão de operação

**Status:** rascunho operacional · 12/08/2026
**Base:** prática de mercado (transcrições de gestores brasileiros, ago/2026) + pesquisa de precificação
já registrada em `docs/gestao-trafego-plano.md`.
**Escopo:** o que a Solutudo faz da assinatura ao relatório — para padronizar antes de escalar.

---

## 1. Onboarding em três frentes

O erro clássico é tratar onboarding como uma coisa só. São três, e elas têm ordem.

### 1.1 Burocrática — nada avança sem isso
- **Contrato assinado antes de qualquer execução.** Não iniciar configuração "enquanto o cliente assina":
  protege os dois lados e evita a discussão de escopo três meses depois ("mas eu achei que estava incluso").
- Assinatura eletrônica válida — gov.br, Google Docs (Ferramentas › Assinatura eletrônica) ou plataforma
  de assinatura. O que importa é ter rastro, não a marca da ferramenta.
- **O contrato precisa listar o escopo exato:** número de campanhas por canal, o que é conjunto adicional,
  o que é renovação de criativo (inclusa) e o que é serviço novo (orçamento à parte).
- **Cobrança recorrente configurada no ato**, com lembrete automático de vencimento. Elimina o "não vi
  o boleto" e o retrabalho de cobrança manual.

### 1.2 Técnica — acessos e propriedade
Regra da casa, e é também argumento de venda: **as contas são do cliente, sempre.**

| Ativo | Como fazemos | Por que |
|---|---|---|
| **Google Ads** | Acesso por **MCC** (Minha Central de Contas), vinculando a conta do cliente | Vínculo entra e sai com um clique, dos dois lados. Acesso direto por e-mail é difícil de remover depois |
| **Meta** | Acesso pelo **Business Manager do cliente**, na conta de anúncio específica | Não pedimos a conta inteira quando só precisamos de uma |
| **Tag Manager / Analytics** | Usuário com permissão nomeada | Rastreio é nosso trabalho, mas o dado é do cliente |
| **Cliente sem contas** | Criamos **tudo no nome dele** (e-mail, conta de anúncio, BM) e nos damos acesso | No dia que a parceria acabar, o histórico fica com ele — e histórico de conversão é ativo, não detalhe |

**WhatsApp:** o número precisa estar em **WhatsApp Business ou API** para receber campanha de mensagem.
Confirmar isso na fase técnica evita descobrir na hora de subir a campanha.

### 1.3 Estratégica — a reunião de fundação
É onde saem os termos do Google, as regiões, os serviços prioritários e o roteiro do criativo.
Sai daqui também o combinado de **quem responde o WhatsApp e em quanto tempo** — tráfego que chega e
não é atendido em minutos vira dinheiro queimado, e essa parte não é nossa.

---

## 2. Configuração padrão das campanhas

### Google — 1 campanha de Pesquisa
- Objetivo **Leads**, não Tráfego.
- Conversões contadas: clique no WhatsApp do site, ligação e formulário.
- Grupos de anúncio por serviço; extensões de chamada e localização.
- Pesquisa antes de qualquer formato automático — estes precisam de histórico de conversão para funcionar.

### Meta — 2 campanhas
1. **Conversa (click-to-WhatsApp):** objetivo Engajamento com destino WhatsApp, otimizado para conversas
   ou leads. Mensagem de entrada pré-escrita (é ela que o cliente envia ao tocar no botão) — escrever
   uma que já qualifique: serviço e cidade.
2. **Site:** leva ao site/LP, alimenta o público de remarketing.

**Segmentação local:** pino no endereço com raio ajustável, ou lista de cidades atendidas. Interesses
entre **5 e 10** — mais que isso é ruído. Posicionamento automático como padrão.

**Orçamento:** a nível de campanha (CBO) quando a verba é enxuta — evita micro-gestão diária de conjunto.

### Teste de criativos — por que 4
Subir **um criativo só é o erro mais caro do tráfego local**. O leilão do Meta cobra mais barato de quem
tem criativo com engajamento melhor, então rodar 4 variações no mesmo conjunto e deixar o algoritmo
distribuir costuma **baixar o custo sem aumentar a verba**. É exatamente o que o conjunto do Plano 2
entrega — e a razão de a renovação de criativo estar inclusa: criativo cansa, e trocar é manutenção,
não serviço extra.

**Não julgar criativo antes de 3–4 dias.** Decisão tomada no dia 1 é decisão tomada com ruído.

---

## 3. A conta que sustenta o mínimo de 3 meses

A cadeia é sempre a mesma:

```
investimento ÷ CPC            = cliques
cliques × taxa de conversão   = contatos
investimento ÷ contatos       = custo por contato
```

**Por que 3 meses:** no começo a campanha gasta sem converter — é o período em que a plataforma ainda
não sabe quem é o público que responde. A média só existe depois de volume. Prometer leitura de
resultado no primeiro mês é vender o que não se pode entregar.

**O que controlamos, e onde:**

| Métrica | O que a move |
|---|---|
| **CPC** | qualidade do criativo e do público — é onde o teste de 4 variações age |
| **Taxa de conversão** | página de destino: headline, prova, clareza da oferta, facilidade do contato |
| **Custo por contato** | consequência das duas acima |

Verba muito baixa (R$ 5–10/dia) não é economia: atrasa a formação da média a ponto de o teste não
concluir. Daí o piso de mídia recomendado na proposta.

---

## 4. Rotina do gestor

| Frequência | O que acontece |
|---|---|
| **Diário** | leitura das campanhas, ajuste de lance/termo, pausa de criativo com desempenho ruim (respeitando os 3–4 dias) |
| **Semanal** | relatório: o que aconteceu na semana + **o que faremos nesta semana** |
| **Mensal** | leitura de tendência e decisão de realocação entre Google e Meta |
| **Dia 90** | ponto de decisão com amostra válida: escalar, ajustar ou encerrar |

Princípio de agenda (vale para escalar o time): separar **atividade lucrativa** (prospecção, reunião,
proposta) de **operacional** (subir campanha, relatório). Operação sem bloco protegido de atividade
lucrativa não cresce — só ocupa o dia.

---

## 5. Regras de venda

- **Primeira reunião é diagnóstico, não preço.** Chegar tendo olhado o perfil, o site, se há anúncio
  rodando e quanto tempo o WhatsApp demora a responder. Sem isso, a conversa vira catálogo.
- **Perguntar as duas verbas:** quanto pretende investir em mídia e quanto em gestão. Sem esse número,
  a proposta é chute.
- **Sempre duas opções** — o cliente escolhe entre A e B, não entre sim e não.
- **Apresentar ao vivo** (reunião, vídeo ou presencial). Proposta enviada solta vira comparação de preço
  linha a linha, sem o raciocínio que a sustenta. Nossa proposta é uma página compartilhável — mas o
  link é aberto **junto** com o cliente, e só depois fica com ele.
- **Fechar com data:** definir o dia de início na própria reunião.
- **Não competir por preço:** ninguém paga menos quando a economia representa risco para o próprio
  negócio. O que se vende é o caminho desenhado, não o botão apertado.

---

## 6. O que vimos no mercado e NÃO adotamos

- **Cobrar setup.** É o padrão do mercado; escolhemos zerar como diferencial de entrada — a exceção é
  se o cliente pedir algo fora do escopo contratado.
- **Prometer resultado ou número de leads.** Aparece em muita proposta; não entra em nenhuma nossa.
- **Diferença de 20–30% entre os dois planos.** É a regra citada por quem vende gestão. Os nossos
  planos têm salto maior porque a diferença não é de embalagem, e sim de capacidade (mídia gerida de
  R$ 3 mil para R$ 10 mil, mais os conjuntos). **Pendência comercial:** validar se o salto afasta o
  cliente do plano maior ou se o gatilho de migração — mídia acima de R$ 3.000/mês — resolve sozinho.
