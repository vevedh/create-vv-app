# Veve App (create-vv-app)

Veve App est un modèle d'application Web multiplatform (quasar framework) + unocss and autoimport

- [Quasar](https://quasar.dev)
- [Unocss](https://unocss.dev/)

## Install the dependencies

```bash
bun
# or
bun install
```

### Exécuter avant le docker de la base de donnée mongodb (LISTEN_MONGODB_PORT) et le backend (LISTEN_BACKEND_PORT)

```bash
bun dev:backend
```

### Demarrage de l'application en mode developpement

```bash
bun dev
```

### Lint the files

```bash
yarn lint
# or
bun run lint
```

### Format the files

```bash
yarn format
# or
bun run format
```

### Compiler l'application pour la production

```bash
bun run build
```

### Exécuter l'application dans votre Docker Desktop

```
bun dev:docker
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
