# Relatório de Correção - Deals Órfãos no RD Station CRM

**Data:** 17/03/2026

## Resumo

| Métrica | Valor |
|---------|-------|
| Contatos processados | 170 |
| Deals a corrigir | 244 |
| **Contatos corrigidos** | **159** ✅ |
| **Deals re-vinculados** | **228** ✅ |
| Contatos com erro (422) | 11 |
| Deals pendentes | 16 |

## Método Utilizado
PUT `/contacts/:id` com `deal_ids: [array de IDs]` via endpoint interno do RD Station (sessão autenticada no browser).

## Contatos com Erro (422) - Precisam correção manual

| Nome | ID | Deals pendentes |
|------|-----|-----------------|
| ARIANE | 6868233ed56a350001fb5b97 | 1 |
| LEONARDO (ARNALDO FLAVIO PEREIRA DE SOUZA) | 68682340d56a350001fb5c62 | 1 |
| Candice | 68682344d56a350001fb5e46 | 1 |
| Erica Fabiula Canutto Teixeira | 68a31d25bb1d130020e5e46a | 4 |
| Fabrício C. | 68a488eaf636dd000175ed2c | 1 |
| Fabyana | 68a488f2f636dd000175f144 | 1 |
| Pollyanna | 68682341d56a350001fb5d33 | 1 |
| Raquel | 6868233ed56a350001fb5b81 | 1 |
| Renan | 68682345d56a350001fb5ebf | 1 |
| Renata | 689dff65ce53e400018226be | 1 |
| Ricardo | 68682346d56a350001fb5fba | 3 |

**Total de deals pendentes:** 16

Estes 11 contatos retornam erro 422 ao tentar atualizar via API (provavelmente dados inválidos ou campos obrigatórios faltando). Precisam ser corrigidos manualmente na interface do RD Station.
