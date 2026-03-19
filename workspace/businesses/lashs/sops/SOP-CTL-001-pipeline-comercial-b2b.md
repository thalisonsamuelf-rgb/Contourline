# SOP-CTL-001 — Pipeline Comercial B2B: Venda de Equipamentos Medicos e Esteticos

| Campo | Valor |
|-------|-------|
| **SOP ID** | SOP-CTL-001 |
| **Titulo** | Pipeline Comercial B2B — Venda de Equipamentos Medicos e Esteticos |
| **Versao** | 1.0.0 |
| **Data Efetiva** | 2026-03-19 |
| **Classificacao** | CRITICAL |
| **Status** | DRAFT |
| **Autor** | Deming (SOP Factory) |
| **Aprovador** | Gabriel Carpello (Diretor Comercial) |
| **Proxima Revisao** | 2026-09-19 |
| **Empresa** | Contourline Equipamentos Medicos e Diagnosticos |

---

## 1. Objetivo e Escopo

### 1.1 Objetivo

Padronizar o pipeline de vendas B2B de equipamentos medicos e esteticos da Contourline, desde a qualificacao do lead ate a entrega do equipamento ao cliente. Este procedimento visa garantir:

- Taxas de conversao consistentes em todas as etapas do funil
- Analise de credito adequada antes do fechamento
- Protecao de margem em todas as 5 linhas de produto
- Rastreabilidade completa no ERP Protheus e CRM
- Experiencia de compra padronizada para os 4.000+ clientes ativos

### 1.2 Escopo — Incluido

| Etapa | Descricao |
|-------|-----------|
| Qualificacao de Lead | Triagem e classificacao de leads inbound |
| Demonstracao de Produto | Apresentacao tecnica e cientifica do equipamento |
| Proposta Comercial | Geracao de proposta com precificacao por linha |
| Negociacao | Tratamento de objecoes e ajustes dentro da margem aprovada |
| Analise de Credito | Avaliacao de risco e capacidade de pagamento do cliente |
| Fechamento | Assinatura de contrato e registro do pedido |
| Faturamento | Emissao de NF-e e processamento do pedido no Protheus |
| Agendamento de Entrega | Coordenacao com logistica e instalacao |

### 1.3 Escopo — Excluido

| Item | SOP de Referencia |
|------|-------------------|
| Geracao de leads pelo marketing | A definir |
| Suporte tecnico pos-venda | SOP-CTL-005 |
| Producao e montagem de equipamentos | SOP-CTL-004 |
| Gestao de estoque e armazem | A definir |

### 1.4 Aplica-se a

- Inside Sales (equipe interna de vendas)
- Vendas Externas (vendedores de campo por regiao)
- UN Lumenis (unidade de negocio Lumenis)
- UN Visbody (unidade de negocio Visbody)
- Credito (equipe de analise de credito)

---

## 2. Definicoes

| Termo | Definicao |
|-------|-----------|
| **Lead** | Contato ou empresa que demonstrou interesse em equipamentos da Contourline, ainda nao qualificado comercialmente. |
| **MQL (Marketing Qualified Lead)** | Lead qualificado pelo marketing com base em engajamento (downloads, webinars, solicitacoes de informacao). Ainda nao validado comercialmente. |
| **SQL (Sales Qualified Lead)** | Lead qualificado pelo Inside Sales via criterios BANT (Budget, Authority, Need, Timeline). Pronto para abordagem do Vendedor Externo. |
| **Proposta Comercial** | Documento formal gerado no Protheus (SIGAFAT) contendo especificacoes do equipamento, condicoes de pagamento, garantia e valor total. |
| **Pedido de Venda** | Registro formal no Protheus que autoriza o faturamento e a entrega do equipamento ao cliente. |
| **NF-e (Nota Fiscal Eletronica)** | Documento fiscal eletronico emitido via Protheus para acompanhar a saida do equipamento. |
| **FIDC (Fundo de Investimento em Direitos Creditorios)** | Instrumento financeiro utilizado para viabilizar vendas a prazo com cessao de recebiveis. |
| **FINIMP (Financiamento a Importacao)** | Linha de credito para financiamento de equipamentos importados, aplicavel a linha Lumenis. |
| **Ticket Medio** | Valor medio por venda fechada. Varia por linha de produto: Medica (~R$316K), Estetica (~R$160K), Lumenis (~R$443K), Visbody (~R$130K). |
| **Ciclo de Venda** | Tempo medio entre a qualificacao do lead (SQL) e o fechamento do pedido. Meta: <= 60 dias. |
| **Cross-sell** | Venda de produto de linha complementar ao mesmo cliente (ex: cliente de Estetica adquire equipamento Visbody). |
| **Upsell** | Venda de versao superior ou acessorio adicional dentro da mesma linha de produto (ex: upgrade de HIPRO para HIPRO MED). |
| **BANT** | Framework de qualificacao: Budget (Orcamento), Authority (Autoridade de decisao), Need (Necessidade), Timeline (Prazo). |
| **Protheus (TOTVS)** | Sistema ERP da Contourline. Modulo SIGAFAT para faturamento. Go-live em janeiro de 2026. |
| **Universidade Contourline** | Programa de treinamento tecnico e cientifico para clientes apos a compra do equipamento. |

---

## 3. Matriz RACI

| Atividade | Inside Sales | Vendedor Externo | Gerente Comercial | Analista de Credito | Dir. Comercial (Gabriel Carpello) |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Qualificacao de Lead | **R** | I | A | - | I |
| Analise de Necessidades | I | **R** | A | - | I |
| Demonstracao de Produto | C | **R** | A | - | I |
| Criacao de Proposta | C | **R** | **A** | - | C |
| Analise de Credito | - | I | I | **R** | **A** |
| Negociacao | - | **R** | **A** | C | C |
| Fechamento (ate R$100K) | - | **R** | **A** | - | I |
| Fechamento (R$100K-R$300K) | - | **R** | C | - | **A** |
| Fechamento (>R$300K) | - | **R** | C | - | C* |
| Processamento do Pedido | - | C | **R** | - | I |
| Faturamento e NF-e | - | I | **R** | - | I |
| Handoff Pos-Venda | - | **R** | A | - | I |

> **Legenda:** R = Responsavel, A = Aprovador, C = Consultado, I = Informado
> *Fechamentos acima de R$300K requerem aprovacao do CEO (Egio Roberto).

---

## 4. Pre-Requisitos

### 4.1 Acessos de Sistema

| Sistema | Modulo/Area | Solicitacao |
|---------|-------------|-------------|
| ERP Protheus (TOTVS) | SIGAFAT (Faturamento) | TI via chamado interno |
| ERP Protheus (TOTVS) | SIGACRM (se integrado) | TI via chamado interno |
| CRM | Acesso completo ao pipeline | Gerente Comercial |
| E-mail corporativo | @contourline.com.br | TI via chamado interno |

### 4.2 Documentacao Necessaria

- [ ] Catalogo de produtos atualizado (por linha de produto)
- [ ] Tabela de precos vigente (por linha de produto, atualizada trimestralmente)
- [ ] Matriz de aprovacao de descontos e margens minimas
- [ ] Template de proposta comercial no Protheus
- [ ] Checklist de analise de credito
- [ ] Materiais cientificos e de ROI por equipamento (Ciencia que Conecta)

### 4.3 Treinamentos Obrigatorios

| Treinamento | Responsavel | Periodicidade |
|-------------|-------------|---------------|
| Produtos — Linha Medica (UNYQUE PRO, HIPRO MED, SUPREME PRO) | Gerente de Produto | Inicial + atualizacao semestral |
| Produtos — Linha Estetica (HIPRO, FOCUSKIN, MULTSHAPE) | Gerente de Produto | Inicial + atualizacao semestral |
| Produtos — Lumenis | UN Lumenis | Inicial + atualizacao semestral |
| Produtos — Visbody (Scanner M-30, S-30, Esteira A600) | UN Visbody | Inicial + atualizacao semestral |
| Analise de credito e condicoes de pagamento | Credito / CFO | Inicial |
| Operacao do ERP Protheus (SIGAFAT) | TI / TOTVS | Inicial |
| Operacao do CRM | TI | Inicial |
| Tecnicas de venda consultiva B2B | Dir. Comercial | Trimestral |

---

## 5. Procedimento

### 5.1 Qualificacao de Lead

**Responsavel:** Inside Sales
**Entrada:** Lead recebido do marketing (MQL) ou indicacao
**Saida:** SQL registrado no CRM e atribuido a Vendedor Externo

#### Passos:

1. **Receber o lead.** O Inside Sales recebe o lead via:
   - Formulario do site (inbound)
   - Campanha de marketing (MQL)
   - Indicacao de cliente existente
   - Evento ou feira (captacao presencial)
   - Prospeccao ativa (outbound)

2. **Realizar contato inicial** dentro de **2 horas uteis** para leads inbound e **24 horas uteis** para demais fontes.

3. **Qualificar usando o framework BANT:**

   | Criterio | Pergunta-Chave | Qualificado Se |
   |----------|----------------|----------------|
   | **Budget** | Qual o orcamento disponivel para investimento em equipamentos? | Ticket entre R$50.000 e R$500.000+ |
   | **Authority** | Quem participa da decisao de compra? | Contato e decisor ou tem acesso direto ao decisor |
   | **Need** | Quais procedimentos deseja oferecer? Qual equipamento atual? | Necessidade clara mapeada para uma das 5 linhas |
   | **Timeline** | Qual o prazo para a aquisicao? | Ate 90 dias |

4. **Classificar o lead:**
   - **SQL (4/4 criterios):** Registrar no CRM como SQL. Atribuir ao Vendedor Externo da regiao correspondente. Incluir notas de qualificacao no registro.
   - **SQL Parcial (3/4 criterios):** Registrar como SQL com ressalva. Atribuir ao Vendedor Externo com nota sobre o criterio pendente.
   - **Nao Qualificado (<=2/4 criterios):** Devolver ao marketing para sequencia de nurturing. Registrar motivo da desqualificacao no CRM.

5. **Atribuir ao Vendedor Externo** com base na regiao e linha de produto:
   - Leads de Lumenis: atribuir exclusivamente a UN Lumenis
   - Leads de Visbody: atribuir exclusivamente a UN Visbody
   - Leads de Medica/Estetica: atribuir por regiao geografica

6. **Registrar no CRM:**
   - Nome do contato e empresa
   - Dados de contato (telefone, e-mail)
   - Linha de produto de interesse
   - Resultado da qualificacao BANT
   - Vendedor Externo atribuido
   - Data e hora do primeiro contato

> **SLA:** O Vendedor Externo deve realizar contato com o SQL em ate **24 horas uteis** apos a atribuicao.

---

### 5.2 Analise de Necessidades e Mapeamento de Produto

**Responsavel:** Vendedor Externo
**Entrada:** SQL atribuido no CRM
**Saida:** Recomendacao de equipamento documentada no CRM

#### Passos:

1. **Agendar reuniao de descoberta** com o prospect (presencial ou videoconferencia). Priorizar visita presencial para tickets acima de R$150.000.

2. **Conduzir o levantamento de necessidades:**

   | Area de Investigacao | O Que Mapear |
   |----------------------|--------------|
   | Equipamentos atuais | Marca, modelo, idade, estado de conservacao |
   | Volume de pacientes | Atendimentos/mes, especialidades, tendencia de crescimento |
   | Procedimentos oferecidos | Quais ja realiza, quais deseja adicionar |
   | Estrutura fisica | Espaco disponivel, instalacoes eletricas, climatizacao |
   | Plano de crescimento | Expansao, novas unidades, novas especialidades |
   | Concorrencia local | Quais equipamentos os concorrentes do prospect utilizam |
   | Capacidade financeira | Faturamento aproximado, historico de investimentos |

3. **Mapear a necessidade para a linha de produto correta:**

   | Se o Prospect Precisa de... | Linha Recomendada | Equipamentos |
   |-----------------------------|-------------------|--------------|
   | Procedimentos medicos invasivos/semi-invasivos | **Medica** | UNYQUE PRO, HIPRO MED, SUPREME PRO |
   | Procedimentos esteticos nao invasivos | **Estetica** | HIPRO, FOCUSKIN, MULTSHAPE |
   | Tecnologia laser de alta potencia | **Lumenis** | Conforme catalogo Lumenis vigente |
   | Analise corporal / body scanning | **Visbody** | Scanner M-30, S-30, Esteira A600 |
   | Combinacao de procedimentos | **Cross-sell** | Combinar 2+ linhas na proposta |

4. **Calcular estimativa de valor do negocio** com base na recomendacao.

5. **Registrar no CRM:**
   - Resumo da reuniao de descoberta
   - Equipamento(s) recomendado(s)
   - Valor estimado do negocio
   - Probabilidade de fechamento (%)
   - Proximos passos acordados com o prospect
   - Data prevista para demonstracao

> **ATENCAO:** Para oportunidades Lumenis, o Vendedor deve consultar a UN Lumenis antes de fazer qualquer recomendacao tecnica. A margem atual da linha Lumenis e de apenas 9%, e requer atencao especial na precificacao.

---

### 5.3 Demonstracao de Produto

**Responsavel:** Vendedor Externo (com apoio tecnico quando necessario)
**Entrada:** Recomendacao de equipamento aprovada
**Saida:** Demonstracao realizada, objecoes documentadas

#### Passos:

1. **Agendar a demonstracao:**
   - **On-site (no consultorio/clinica do prospect):** Preferencial para equipamentos portateis ou quando o prospect nao pode se deslocar.
   - **Na sede da Contourline (Sete Lagoas/MG):** Preferencial para demonstracoes de equipamentos de grande porte ou quando multiplos stakeholders do prospect participarao.

2. **Preparar a demonstracao:**
   - [ ] Equipamento revisado e funcional
   - [ ] Materiais cientificos da linha (Ciencia que Conecta)
   - [ ] Estudo de caso de clientes similares (com autorizacao)
   - [ ] Calculadora de ROI preenchida com dados do prospect
   - [ ] Apresentacao comercial atualizada

3. **Conduzir a demonstracao seguindo a estrutura:**

   | Etapa | Duracao | Conteudo |
   |-------|---------|----------|
   | Abertura | 10 min | Resumo das necessidades levantadas, confirmacao de expectativas |
   | Evidencia Cientifica | 15 min | Estudos clinicos, publicacoes, certificacoes ANVISA |
   | Demonstracao Pratica | 30 min | Funcionamento do equipamento, interface, facilidade de uso |
   | ROI e Resultados | 15 min | Calculo de retorno sobre investimento para a pratica do prospect |
   | Diferencial Contourline | 10 min | Universidade Contourline, suporte tecnico, rede de 4.000+ clientes |
   | Q&A | 15 min | Responder duvidas, tratar objecoes |

4. **Coletar e documentar objecoes:**

   | Tipo de Objecao | Tratamento |
   |-----------------|------------|
   | Preco | Reforcar ROI, apresentar condicoes de pagamento, mostrar custo total de propriedade |
   | Tecnologia | Apresentar evidencias cientificas, cases de sucesso, comparativos |
   | Timing | Mostrar custo de oportunidade de nao investir agora, janela promocional |
   | Concorrencia | Comparativo tecnico (sem denegrir concorrente), diferencial de suporte |

5. **Registrar no CRM:**
   - Data e local da demonstracao
   - Participantes (nomes e cargos)
   - Objecoes levantadas e tratamento dado
   - Nivel de interesse do prospect (1-5)
   - Proximos passos acordados
   - Data prevista para envio de proposta

> **META:** Toda demonstracao realizada deve resultar em envio de proposta em ate **5 dias uteis**.

---

### 5.4 Proposta e Precificacao

**Responsavel:** Vendedor Externo (com aprovacao do Gerente Comercial)
**Entrada:** Demonstracao realizada, interesse confirmado
**Saida:** Proposta comercial formal enviada ao prospect

> **CLASSIFICACAO: CRITICAL** — Esta etapa define a margem e a rentabilidade da venda.

#### Passos:

1. **Gerar a proposta no Protheus (SIGAFAT):**
   - Acessar o modulo SIGAFAT
   - Selecionar o cliente (ou cadastrar se novo)
   - Incluir os equipamentos recomendados
   - Aplicar a tabela de precos vigente para a linha de produto

2. **Verificar a margem por linha de produto:**

   | Linha | Margem-Alvo | Margem Minima | Acao se Abaixo do Minimo |
   |-------|-------------|---------------|--------------------------|
   | **Medica** | 67% | 55% | Aprovacao do Gerente Comercial |
   | **Estetica** | 60% | 48% | Aprovacao do Gerente Comercial |
   | **Lumenis** | 9% (URGENTE) | 5% | **ESCALATION OBRIGATORIA ao Dir. Comercial e CFO** |
   | **Visbody** | 62% | 50% | Aprovacao do Gerente Comercial |

   > **ALERTA LUMENIS:** A margem atual de 9% esta criticamente baixa. Toda proposta Lumenis deve ser revisada pelo Diretor Comercial (Gabriel Carpello) ANTES do envio ao cliente. A revisao de margem da linha Lumenis e prioridade para 2026.

3. **Compor a proposta incluindo:**
   - Especificacoes tecnicas do(s) equipamento(s)
   - Condicoes de garantia (prazo e cobertura)
   - Pacote de treinamento incluso (Universidade Contourline)
   - Condicoes de pagamento oferecidas
   - Prazo de validade da proposta (padrao: 15 dias corridos)
   - Prazo estimado de entrega apos aprovacao do pedido

4. **Submeter para aprovacao conforme a matriz:**

   | Valor Total da Proposta | Aprovador | Prazo de Aprovacao |
   |-------------------------|-----------|-------------------|
   | Ate R$100.000 | Gerente Comercial | 24 horas uteis |
   | R$100.001 a R$300.000 | Diretor Comercial (Gabriel Carpello) | 48 horas uteis |
   | Acima de R$300.000 | CEO (Egio Roberto) | 72 horas uteis |

5. **Enviar a proposta ao prospect:**
   - Via e-mail corporativo com PDF anexo
   - Incluir carta de apresentacao personalizada
   - Copiar o Gerente Comercial no e-mail

6. **Registrar no CRM:**
   - Proposta enviada (numero, valor, data)
   - Condicoes de pagamento propostas
   - Margem calculada
   - Data de follow-up agendada (D+3 apos envio)

> **REGRA:** Nenhuma proposta pode ser enviada sem o numero gerado no Protheus. Propostas informais (por WhatsApp, verbal) nao tem validade contratual.

---

### 5.5 Analise de Credito

**Responsavel:** Analista de Credito
**Aprovador:** Diretor Comercial (Gabriel Carpello)
**Entrada:** Proposta aceita pelo prospect (interesse formal)
**Saida:** Decisao de credito (Aprovado / Condicional / Negado)

> **PONTO DE DECISAO** — A analise de credito e obrigatoria para todas as vendas a prazo. Vendas a vista estao isentas desta etapa.

#### Passos:

1. **Receber solicitacao de analise de credito** do Vendedor Externo via CRM ou formulario padronizado.

2. **Coletar documentacao do cliente:**
   - [ ] CNPJ e contrato social atualizado
   - [ ] Ultimos 3 balancetes ou DRE
   - [ ] Certidoes negativas (Federal, Estadual, Municipal)
   - [ ] Referencias comerciais (minimo 3)
   - [ ] Historico de compras anteriores com a Contourline (se aplicavel)

3. **Realizar a analise:**

   | Criterio | Fonte | Peso |
   |----------|-------|------|
   | Score Serasa/SPC | Consulta automatizada | 30% |
   | Demonstracoes financeiras | Documentos do cliente | 25% |
   | Historico de pagamentos Contourline | Protheus | 20% |
   | Referencias comerciais | Contato direto | 15% |
   | Tempo de mercado e porte | Contrato social | 10% |

4. **Emitir parecer:**

   | Resultado | Criterio | Acao |
   |-----------|----------|------|
   | **APROVADO** | Score >= 700, financas saudaveis, sem restritivos | Prosseguir para negociacao. Informar Vendedor Externo. |
   | **CONDICIONAL** | Score 500-699, ou financas com ressalvas | Propor estrutura alternativa: entrada maior, prazo menor, FIDC, ou FINIMP (para Lumenis/importados). Submeter ao Dir. Comercial para aprovacao. |
   | **NEGADO** | Score < 500, restritivos graves, inadimplencia | Comunicar ao Vendedor Externo. Oferecer alternativas: venda a vista com desconto, locacao/leasing, ou contrato com fiador. **Se cliente estrategico:** escalar ao CFO (Claudio Kaizer) para avaliacao excepcional. |

5. **Registrar no CRM e Protheus:**
   - Resultado da analise de credito
   - Score utilizado
   - Condicoes aprovadas (limite, prazo, garantias)
   - Data de validade da analise (padrao: 90 dias)

> **SLA:** A analise de credito deve ser concluida em ate **3 dias uteis** apos o recebimento da documentacao completa.

> **RETENCAO:** O relatorio de analise de credito deve ser retido por **5 anos** conforme politica de compliance.

---

### 5.6 Negociacao e Fechamento

**Responsavel:** Vendedor Externo
**Aprovador:** Gerente Comercial / Diretor Comercial (conforme alcada)
**Entrada:** Credito aprovado (ou venda a vista)
**Saida:** Contrato assinado e pedido registrado

#### Passos:

1. **Retomar contato com o prospect** apos aprovacao de credito. Confirmar condicoes da proposta.

2. **Negociar dentro dos parametros aprovados:**

   | Parametro | Flexibilidade | Aprovacao Necessaria |
   |-----------|---------------|----------------------|
   | Desconto ate 5% sobre tabela | Vendedor Externo | Nenhuma |
   | Desconto 5-10% sobre tabela | Gerente Comercial | Aprovacao por e-mail |
   | Desconto 10-15% sobre tabela | Diretor Comercial | Aprovacao formal |
   | Desconto acima de 15% | CEO | Reuniao + aprovacao formal |
   | Prazo de pagamento estendido | Credito + Dir. Comercial | Analise adicional |
   | Bonificacao de acessorios | Gerente Comercial | Aprovacao por e-mail |
   | Treinamento adicional incluso | Gerente Comercial | Aprovacao por e-mail |

   > **ATENCAO CRITICA:** NUNCA aprovar descontos que resultem em margem abaixo do minimo por linha de produto (ver tabela na secao 5.4). Qualquer negociacao que viole a margem minima deve ser **imediatamente escalada** ao Diretor Comercial.

3. **Fechar o negocio:**
   - Apresentar contrato de venda padronizado
   - Coletar assinatura do representante legal do cliente
   - Registrar forma de pagamento acordada:
     - A vista (desconto aplicavel)
     - Parcelado direto (conforme analise de credito)
     - FIDC
     - FINIMP (importados / Lumenis)
   - Coletar comprovante de entrada (se aplicavel)

4. **Registrar o fechamento:**
   - No CRM: alterar status para "Fechado/Ganho"
   - No Protheus: gerar Pedido de Venda com todos os dados do contrato
   - Notificar o Gerente Comercial sobre o fechamento

5. **Em caso de perda:**
   - No CRM: alterar status para "Fechado/Perdido"
   - Registrar motivo da perda (preco, concorrencia, timing, financeiro, outro)
   - Agendar follow-up em 90 dias para reabordagem

---

### 5.7 Processamento do Pedido e Faturamento

**Responsavel:** Gerente Comercial / Backoffice Comercial
**Entrada:** Pedido de Venda registrado no Protheus
**Saida:** NF-e emitida e entrega agendada

#### Passos:

1. **Validar o Pedido de Venda no Protheus:**
   - [ ] Dados do cliente corretos (CNPJ, endereco de entrega, inscricao estadual)
   - [ ] Equipamento(s) correto(s) e quantidade
   - [ ] Condicao de pagamento conforme contrato
   - [ ] Margem dentro do aprovado
   - [ ] Aprovacao de credito vigente

2. **Verificar disponibilidade de estoque** com a area de Operacoes:
   - **Disponivel:** Prosseguir com faturamento
   - **Indisponivel:** Consultar prazo de producao/importacao. Informar o Vendedor Externo e o cliente sobre o prazo atualizado. Registrar no CRM.

3. **Emitir NF-e no Protheus:**
   - Gerar a Nota Fiscal Eletronica
   - Verificar classificacao fiscal (NCM) correta
   - Validar CFOP adequado
   - Transmitir para a SEFAZ
   - Arquivar XML da NF-e

4. **Agendar entrega e instalacao:**
   - Coordenar com a equipe de logistica
   - Definir data de entrega com o cliente
   - Agendar instalacao tecnica (se aplicavel)
   - Enviar confirmacao de agendamento ao cliente por e-mail

5. **Acionar treinamento:**
   - Notificar a Universidade Contourline sobre a venda fechada
   - Agendar treinamento inicial do cliente conforme pacote contratado
   - Enviar cronograma de treinamento ao cliente

6. **Registrar no Protheus e CRM:**
   - Numero da NF-e
   - Data de emissao
   - Data prevista de entrega
   - Data agendada para treinamento

> **SLA:** A NF-e deve ser emitida em ate **2 dias uteis** apos a confirmacao de pagamento/entrada (para vendas a prazo, apos aprovacao do credito).

---

### 5.8 Handoff para Pos-Venda

**Responsavel:** Vendedor Externo
**Entrada:** Equipamento entregue e instalado
**Saida:** Cliente integrado ao programa de pos-venda

#### Passos:

1. **Confirmar entrega e instalacao bem-sucedida:**
   - Obter aceite formal do cliente (termo de recebimento assinado)
   - Verificar se o equipamento esta funcionando corretamente
   - Confirmar se o treinamento inicial foi realizado

2. **Registrar conclusao da venda no CRM:**
   - Alterar status do negocio para "Entregue"
   - Registrar data de entrega e instalacao
   - Anexar termo de recebimento assinado

3. **Realizar handoff formal para Customer Success:**
   - Compartilhar ficha do cliente com: historico de compra, equipamentos adquiridos, perfil da clinica, contatos-chave
   - Informar particularidades da venda (promessas feitas, expectativas especificas)

4. **Agendar follow-ups pos-venda:**

   | Quando | Objetivo | Responsavel |
   |--------|----------|-------------|
   | D+30 | Verificar satisfacao inicial e uso do equipamento | Vendedor Externo |
   | D+60 | Avaliar resultados e coletar feedback | Customer Success |
   | D+90 | Identificar oportunidades de cross-sell/upsell | Vendedor Externo |

5. **Registrar oportunidades de expansao:**
   - No CRM: criar nova oportunidade se identificado potencial de cross-sell ou upsell
   - Exemplos:
     - Cliente comprou Estetica → oferecer Visbody para body scanning
     - Cliente comprou Medica → oferecer upgrade ou equipamento complementar
     - Cliente com multiplas unidades → oferecer expansao

6. **Solicitar indicacao:**
   - No follow-up D+30 ou D+60, solicitar indicacao de colegas ou clinicas parceiras
   - Registrar indicacoes como novos leads no CRM (fonte: indicacao)

---

## 6. Verificacao e Criterios de Aceitacao

### 6.1 KPIs do Pipeline

| Indicador | Meta | Frequencia de Medicao | Responsavel pela Medicao |
|-----------|------|----------------------|--------------------------|
| Conversao MQL → SQL | >= 30% | Mensal | Inside Sales / Gerente Comercial |
| Conversao SQL → Proposta | >= 60% | Mensal | Gerente Comercial |
| Conversao Proposta → Fechamento | >= 40% | Mensal | Gerente Comercial |
| **Conversao SQL → Fechamento (geral)** | **>= 25%** | **Mensal** | **Dir. Comercial** |
| Ciclo medio de venda | <= 60 dias | Mensal | Gerente Comercial |
| Completude de dados no CRM | >= 95% | Semanal | Inside Sales / Gerente Comercial |
| Tempo de resposta a lead inbound | <= 2 horas uteis | Diario | Inside Sales |
| Margem media por linha | Conforme tabela 5.4 | Mensal | Dir. Comercial / CFO |

### 6.2 Checkpoints de Qualidade

| Checkpoint | Verificacao | Frequencia |
|------------|-------------|------------|
| Audit de CRM | Todos os campos obrigatorios preenchidos em 100% dos registros ativos | Semanal |
| Revisao de Pipeline | Review do funil por Gerente Comercial com cada vendedor | Semanal |
| Revisao de Margem | Analise de margem real vs. proposta para vendas fechadas no mes | Mensal |
| Forecast Accuracy | Comparar previsao de fechamento vs. real | Mensal |
| Review Comercial | Reuniao do Dir. Comercial com todos os Gerentes | Quinzenal |

---

## 7. Tratamento de Erros e Excecoes

### 7.1 Proposta Enviada Sem Aprovacao de Credito

| Severidade | ALTA |
|------------|------|
| **Deteccao** | Audit semanal de propostas vs. aprovacoes de credito no Protheus |
| **Acao Imediata** | Suspender a proposta. Notificar o Gerente Comercial e o Analista de Credito. |
| **Correcao** | Realizar analise de credito retroativa em ate 24 horas. Se aprovado, revalidar proposta. Se negado, contatar o cliente para renegociar condicoes. |
| **Prevencao** | Configurar bloqueio no Protheus: pedido de venda a prazo nao pode ser gerado sem flag de credito aprovado. |

### 7.2 Desconto Abaixo da Margem Minima

| Severidade | CRITICA |
|------------|---------|
| **Deteccao** | Alerta automatico no Protheus quando margem calculada cai abaixo do minimo da linha |
| **Acao Imediata** | Bloquear o pedido de venda. Notificar o Dir. Comercial (Gabriel Carpello). |
| **Correcao** | Dir. Comercial avalia: aprovar excepcionalmente (com justificativa formal) ou renegociar com o cliente. Para Lumenis, envolver o CFO (Claudio Kaizer). |
| **Prevencao** | Treinamento trimestral sobre margens. Tabela de desconto maximo visivel no sistema. |

### 7.3 Estoque Indisponivel para Negocio Fechado

| Severidade | ALTA |
|------------|------|
| **Deteccao** | Verificacao de estoque no momento do processamento do pedido |
| **Acao Imediata** | Notificar o Vendedor Externo e o Gerente Comercial imediatamente. |
| **Correcao** | Consultar Operacoes sobre prazo de producao/importacao. Contatar o cliente com novo prazo e oferecer compensacao se atraso > 15 dias (ex: extensao de garantia, treinamento extra). |
| **Prevencao** | Verificacao de estoque obrigatoria ANTES do envio da proposta (incluir como campo na proposta do Protheus). Reuniao semanal de planejamento entre Comercial e Operacoes. |

### 7.4 Cancelamento pelo Cliente Apos Assinatura do Contrato

| Severidade | MEDIA-ALTA |
|------------|------------|
| **Deteccao** | Comunicacao do cliente ou Vendedor Externo |
| **Acao Imediata** | Vendedor Externo registra no CRM como "Cancelamento Pos-Contrato". Notificar Gerente Comercial e Dir. Comercial. |
| **Correcao** | Gerente Comercial conduz reuniao de retencao com o cliente (entender motivos, oferecer alternativas). Se cancelamento confirmado: acionar juridico para verificar clausula de multa/penalidade. Estornar NF-e se ja emitida. |
| **Prevencao** | Melhorar processo de validacao de compromisso durante negociacao. Incluir clausula de cancelamento clara no contrato. Realizar follow-up D+3 apos assinatura para confirmar decisao. |

### 7.5 Perda de Lead por Tempo de Resposta

| Severidade | MEDIA |
|------------|-------|
| **Deteccao** | Relatorio automatico de leads sem contato apos SLA (2h inbound / 24h outros) |
| **Acao Imediata** | Gerente Comercial reatribui o lead ou realiza contato direto. |
| **Correcao** | Contato imediato com pedido de desculpas. Oferecer atendimento prioritario. |
| **Prevencao** | Alerta automatico no CRM quando SLA esta proximo de estourar. Rodizio de plantao no Inside Sales. |

---

## 8. Registros e Retencao

| Registro | Sistema | Local | Retencao |
|----------|---------|-------|----------|
| Historico de qualificacao de lead | CRM | Cloud | 3 anos |
| Notas de reuniao de descoberta | CRM | Cloud | 3 anos |
| Proposta comercial (PDF) | Protheus + CRM | Servidor local + Cloud | 5 anos |
| Contrato de venda assinado | Arquivo fisico + digital | Juridico + Protheus | 10 anos |
| Relatorio de analise de credito | Protheus + pasta Credito | Servidor local | 5 anos |
| Pedido de Venda | Protheus (SIGAFAT) | ERP | Permanente |
| NF-e (XML e DANFE) | Protheus + SEFAZ | ERP + Cloud fiscal | 5 anos (obrigatorio fiscal) |
| Termo de recebimento de equipamento | Protheus + arquivo fisico | Servidor local + fisico | 5 anos |
| Registros de follow-up pos-venda | CRM | Cloud | 2 anos |

> **IMPORTANTE:** A retencao de 5 anos para analise de credito e documentos fiscais segue a legislacao brasileira vigente. Consultar o departamento juridico para atualizacoes.

---

## 9. Historico de Revisoes

| Versao | Data | Autor | Descricao da Alteracao |
|--------|------|-------|------------------------|
| 1.0.0 | 2026-03-19 | Deming (SOP Factory) | Criacao inicial a partir do Planejamento Estrategico 2026 da Contourline. Contempla as 5 linhas de produto, estrutura comercial com Inside Sales + Vendas Externas + UNs, integracao com Protheus TOTVS (SIGAFAT), e metas de crescimento de 40% vs 2025. |

---

## 10. Apendices

### Apendice A: Referencia de Precos e Margens por Linha de Produto

> **NOTA:** Os valores abaixo sao referencias do Planejamento Estrategico 2026 e servem para orientacao. A tabela de precos oficial e atualizada deve ser obtida com o Gerente Comercial de cada linha.

| Linha | Receita Projetada 2026 | Margem-Alvo | Unidades Projetadas | Ticket Medio Estimado | Equipamentos Principais |
|-------|----------------------|-------------|---------------------|-----------------------|-------------------------|
| **Medica** | R$ 99M | 67% | 313 | ~R$ 316K | UNYQUE PRO, HIPRO MED, SUPREME PRO |
| **Estetica** | R$ 44M | 60% | 275 | ~R$ 160K | HIPRO, FOCUSKIN, MULTSHAPE |
| **Lumenis** | R$ 47M | 9% | 106 | ~R$ 443K | Conforme catalogo vigente |
| **Visbody** | R$ 7M | 62% | 54 | ~R$ 130K | Scanner M-30, S-30, Esteira A600 |
| **Assist. Tecnica** | R$ 1.4M | 17% | N/A | N/A | Contratos de manutencao |

> **ALERTA LUMENIS:** A margem de 9% exige revisao urgente. Todas as propostas Lumenis devem passar por aprovacao do Dir. Comercial antes do envio.

### Apendice B: Matriz de Aprovacao

#### B.1 Aprovacao de Propostas (por valor)

```
Ate R$100.000          → Gerente Comercial (24h uteis)
R$100.001 - R$300.000  → Dir. Comercial — Gabriel Carpello (48h uteis)
Acima de R$300.000     → CEO — Egio Roberto (72h uteis)
```

#### B.2 Aprovacao de Descontos (sobre tabela)

```
Ate 5%    → Vendedor Externo (autonomo)
5% - 10%  → Gerente Comercial
10% - 15% → Dir. Comercial — Gabriel Carpello
Acima 15% → CEO — Egio Roberto (reuniao + aprovacao formal)
```

#### B.3 Aprovacao de Credito (excepcoes)

```
Credito NEGADO + cliente estrategico → CFO — Claudio Kaizer
Credito CONDICIONAL Lumenis/FINIMP   → Dir. Comercial + CFO
```

### Apendice C: Checklist de Analise de Credito

#### Documentacao Obrigatoria

- [ ] CNPJ ativo e regular na Receita Federal
- [ ] Contrato social ou ultima alteracao contratual
- [ ] Cartao CNPJ atualizado
- [ ] Inscricao Estadual (se aplicavel)
- [ ] Ultimos 3 balancetes ou Demonstracoes de Resultado (DRE)
- [ ] Certidao Negativa de Debitos Federais (CND)
- [ ] Certidao Negativa de Debitos Estaduais
- [ ] Certidao Negativa de Debitos Municipais
- [ ] Certidao Negativa de Debitos Trabalhistas (CNDT)
- [ ] 3 referencias comerciais com telefone de contato

#### Verificacoes Obrigatorias

- [ ] Consulta Serasa/SPC realizada (score registrado)
- [ ] Verificacao de protestos em cartorio
- [ ] Verificacao de acoes judiciais relevantes
- [ ] Historico de pagamentos anteriores com Contourline (se aplicavel)
- [ ] Compatibilidade entre faturamento declarado e valor do pedido

#### Resultado

- [ ] Parecer emitido (Aprovado / Condicional / Negado)
- [ ] Limite de credito definido
- [ ] Condicoes especiais registradas (se houver)
- [ ] Data de validade da analise registrada (90 dias)
- [ ] Analise arquivada conforme politica de retencao (5 anos)

---

**Fim do documento SOP-CTL-001 v1.0.0**

*Classificacao: CRITICAL | Status: DRAFT | Aprovacao pendente: Gabriel Carpello (Dir. Comercial)*
