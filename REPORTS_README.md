# Relatórios gerados

Este projeto agora gera relatórios HTML das execuções de testes:

- Newman (Postman): `reports/newman/report.html`
- Jest (unit): `reports/jest/report.html`
- k6 (performance): `reports/k6/report.html`

Como gerar localmente:

```bash
npm install
# Execute testes unitários (gera reports/jest/report.html)
npm test

# Gerar relatório Newman (inicie a API localmente primeiro):
npm start &
npm run postman:html

# Gerar relatório k6 (instale k6 no sistema e execute):
# k6 run --vus 5 --duration 15s --out json=reports/k6/result.json load/test.js
# npx k6-reporter reports/k6/result.json -o reports/k6/report.html
```

No GitHub Actions os artefatos `newman-report`, `jest-report` e `k6-report` são publicados a partir da workflow.
