# Veve App (create-vv-app)

Veve App est un modèle d'application Web multiplatform (quasar framework) + unocss and autoimport

- [Quasar](https://quasar.dev)
- [Unocss](https://unocss.dev/)

## Prérequis

- Nodejs 20+
- Docker Desktop (Windows) ou Docker (linux)

## Installer le package manager "bun"

```
npm i -g bun
```

## Installer les dépendences

```bash
bun
# or
bun install
```

### Creer et Renseigner votre fichier ".env"

```
# Adresse d'accès à la base mongodb
# les valeurs à modifier
# user  -> nom d'utilisateur
# password -> le mot de passe d'accès à la base de donnée
# dbname -> nom de votre base de donnée
MONGODB_URL=mongodb://user:password@localhost:27019/dbname?authSource=admin
# user  -> nom d'utilisateur de la base de donnée
MONGO_USERNAME=user
# password -> le mot de passe d'accès à la base de donnée
MONGO_PASSWORD=password
# dbname -> nom de votre base de donnée
MONGO_BASENAME=dbname
# Nom du client de votre configuration Keycloak en mode developpement
KC_CLIENT_DEV=feathersjs-app
# Nom du client de votre configuration Keycloak en mode production
KC_CLIENT_PROD=portaildsi
# Url de votre authentification Keycloak
KC_URL=https://svrkeycloak.domain.local:8443
# Nom du REALM de votre configuration Keycloak
KC_REALM=REALM_NAME
# Nom d'utilisateur pour l'accès initial page login de votre site
SUPER_ADM_ID=admuser
# Nom d'utilisateur pour l'accès initial page login de votre site
SUPER_ADM_PWD=passuser
```

### Exécuter le backend Feathersjs et la base de donnée Mongodb (LISTEN_MONGODB_PORT) et le backend (LISTEN_BACKEND_PORT)

```bash
bun dev:backend
```

### Demarrage de l'application en mode developpement

```bash
bun dev
```

### Lint (nettoyer le code) sur les fichiers

```bash
bun run lint
```

### Mettre en forme les fichiers

```bash

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
