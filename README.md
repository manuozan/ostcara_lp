# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Coseguros

Los valores de `/coseguros` y los que responde BOTSCARA salen de `src/data/coseguros.js`.
Los dos JSON de `src/assets/` son el respaldo compilado en el bundle.

Si se define `VITE_COSEGUROS_API_URL` al buildear (por ejemplo en un `.env.production`),
el sitio trae los valores del ERP al cargar y reemplaza los del bundle:

```
VITE_COSEGUROS_API_URL=https://<host-del-erp>/api/publico/coseguros
```

Las vigencias se cargan desde el ERP en Portal Web -> Coseguros. Si la API no responde,
el sitio muestra lo que trae compilado, así que conviene igual actualizar los JSON cada
tanto (o dejarlos como snapshot de referencia).
