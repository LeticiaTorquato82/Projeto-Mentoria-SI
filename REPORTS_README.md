# Relatórios gerados

Este projeto agora gera relatórios HTML das execuções de testes:

- Newman (Postman): `reports/newman/report.html`

Como gerar localmente:

```bash
npm install
npm run postman:html
# O relatório ficará em reports/newman/report.html
```

No GitHub Actions o artefato será publicado com o nome `newman-report` e conterá o HTML gerado.
