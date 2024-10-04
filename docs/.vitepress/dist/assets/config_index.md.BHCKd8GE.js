import{_ as e,c as s,a2 as n,o as i}from"./chunks/framework.D-fnukmd.js";const u=JSON.parse('{"title":"Les Base de la première configuration","description":"","frontmatter":{"editLink":false,"prev":{"text":"Précédent"},"next":{"text":"Suivant"}},"headers":[],"relativePath":"config/index.md","filePath":"config/index.md"}'),t={name:"config/index.md"};function l(o,a,p,r,d,c){return i(),s("div",null,a[0]||(a[0]=[n(`<h1 id="les-base-de-la-premiere-configuration" tabindex="-1">Les Base de la première configuration <a class="header-anchor" href="#les-base-de-la-premiere-configuration" aria-label="Permalink to &quot;Les Base de la première configuration&quot;">​</a></h1><h2 id="possibilite-de-creer-directement-l-application-sans-utiliser-git" tabindex="-1">Possibilité de créer directement l&#39;application sans utiliser git <a class="header-anchor" href="#possibilite-de-creer-directement-l-application-sans-utiliser-git" aria-label="Permalink to &quot;Possibilité de créer directement l&#39;application sans utiliser git&quot;">​</a></h2><blockquote><p>Installer globalement le package @phasme/cli</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>npm i -g @phasme/cli</span></span></code></pre></div></blockquote><ul><li>Une fois le package <em>@phasme/cli</em> installé créer une nouvelle à partir du template avec la commande suivante:<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npx phasme generate app</span></span></code></pre></div></li></ul><h2 id="installer-le-package-manager-bun" tabindex="-1">Installer le package manager &quot;bun&quot; <a class="header-anchor" href="#installer-le-package-manager-bun" aria-label="Permalink to &quot;Installer le package manager &quot;bun&quot;&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm i -g bun</span></span></code></pre></div><h2 id="installer-les-dependences" tabindex="-1">Installer les dépendences <a class="header-anchor" href="#installer-les-dependences" aria-label="Permalink to &quot;Installer les dépendences&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><h2 id="creation-automatique-du-fichier-env" tabindex="-1">Création automatique du fichier .env <a class="header-anchor" href="#creation-automatique-du-fichier-env" aria-label="Permalink to &quot;Création automatique du fichier .env&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>bun gen:env</span></span>
<span class="line"><span># ou</span></span>
<span class="line"><span>npx phasme generate env</span></span></code></pre></div><h2 id="creation-manuelle-du-fichier-env" tabindex="-1">Création manuelle du fichier &quot;.env&quot; <a class="header-anchor" href="#creation-manuelle-du-fichier-env" aria-label="Permalink to &quot;Création manuelle du fichier &quot;.env&quot;&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Adresse d&#39;accès à la base mongodb</span></span>
<span class="line"><span># les valeurs à modifier</span></span>
<span class="line"><span># user  -&gt; nom d&#39;utilisateur</span></span>
<span class="line"><span># password -&gt; le mot de passe d&#39;accès à la base de donnée</span></span>
<span class="line"><span># dbname -&gt; nom de votre base de donnée</span></span>
<span class="line"><span>MONGODB_URL=mongodb://user:password@localhost:27019/dbname?authSource=admin</span></span>
<span class="line"><span># user  -&gt; nom d&#39;utilisateur de la base de donnée</span></span>
<span class="line"><span>MONGO_USERNAME=user</span></span>
<span class="line"><span># password -&gt; le mot de passe d&#39;accès à la base de donnée</span></span>
<span class="line"><span>MONGO_PASSWORD=password</span></span>
<span class="line"><span># dbname -&gt; nom de votre base de donnée</span></span>
<span class="line"><span>MONGO_BASENAME=dbname</span></span>
<span class="line"><span># Nom du client de votre configuration Keycloak en mode developpement</span></span>
<span class="line"><span>KC_CLIENT_DEV=feathersjs-app</span></span>
<span class="line"><span># Nom du client de votre configuration Keycloak en mode production</span></span>
<span class="line"><span>KC_CLIENT_PROD=portaildsi</span></span>
<span class="line"><span># Url de votre authentification Keycloak</span></span>
<span class="line"><span>KC_URL=https://svrkeycloak.domain.local:8443</span></span>
<span class="line"><span># Nom du REALM de votre configuration Keycloak</span></span>
<span class="line"><span>KC_REALM=REALM_NAME</span></span>
<span class="line"><span># Nom d&#39;utilisateur pour l&#39;accès initial page login de votre site</span></span>
<span class="line"><span>SUPER_ADM_ID=admuser</span></span>
<span class="line"><span># Nom d&#39;utilisateur pour l&#39;accès initial page login de votre site</span></span>
<span class="line"><span>SUPER_ADM_PWD=passuser</span></span></code></pre></div><h2 id="preparer-votre-backend-creation-du-dossier-dist" tabindex="-1">Préparer votre backend (creation du dossier &#39;dist&#39;) <a class="header-anchor" href="#preparer-votre-backend-creation-du-dossier-dist" aria-label="Permalink to &quot;Préparer votre backend (creation du dossier &#39;dist&#39;)&quot;">​</a></h2><p><code>bun run build</code></p><h2 id="si-vous-souhaiter-changer-l-icone-fbavatar-de-l-application" tabindex="-1">Si vous souhaiter changer l&#39;icone &#39;fbavatar&#39; de l&#39;application <a class="header-anchor" href="#si-vous-souhaiter-changer-l-icone-fbavatar-de-l-application" aria-label="Permalink to &quot;Si vous souhaiter changer l&#39;icone &#39;fbavatar&#39; de l&#39;application&quot;">​</a></h2><p><code>bun run gen:logo </code></p><p><code>bun run dev:icons</code></p><p><code>bun run build</code></p><h2 id="executer-le-backend-feathersjs-et-la-base-de-donnee-mongodb-listen-mongodb-port-et-le-backend-listen-backend-port" tabindex="-1">Exécuter le backend Feathersjs et la base de donnée Mongodb (LISTEN_MONGODB_PORT) et le backend (LISTEN_BACKEND_PORT) <a class="header-anchor" href="#executer-le-backend-feathersjs-et-la-base-de-donnee-mongodb-listen-mongodb-port-et-le-backend-listen-backend-port" aria-label="Permalink to &quot;Exécuter le backend Feathersjs et la base de donnée Mongodb (LISTEN_MONGODB_PORT) et le backend (LISTEN_BACKEND_PORT)&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev:backend</span></span></code></pre></div><h2 id="demarrage-de-l-application-en-mode-developpement" tabindex="-1">Demarrage de l&#39;application en mode developpement <a class="header-anchor" href="#demarrage-de-l-application-en-mode-developpement" aria-label="Permalink to &quot;Demarrage de l&#39;application en mode developpement&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><h2 id="lint-nettoyer-le-code-sur-les-fichiers" tabindex="-1">Lint (nettoyer le code) sur les fichiers <a class="header-anchor" href="#lint-nettoyer-le-code-sur-les-fichiers" aria-label="Permalink to &quot;Lint (nettoyer le code) sur les fichiers&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lint</span></span></code></pre></div><h2 id="mettre-en-forme-les-fichiers" tabindex="-1">Mettre en forme les fichiers <a class="header-anchor" href="#mettre-en-forme-les-fichiers" aria-label="Permalink to &quot;Mettre en forme les fichiers&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format</span></span></code></pre></div><h2 id="compiler-l-application-pour-la-production" tabindex="-1">Compiler l&#39;application pour la production <a class="header-anchor" href="#compiler-l-application-pour-la-production" aria-label="Permalink to &quot;Compiler l&#39;application pour la production&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><h2 id="executer-l-application-dans-votre-docker-desktop" tabindex="-1">Exécuter l&#39;application dans votre Docker Desktop <a class="header-anchor" href="#executer-l-application-dans-votre-docker-desktop" aria-label="Permalink to &quot;Exécuter l&#39;application dans votre Docker Desktop&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>bun dev:backend</span></span></code></pre></div><h2 id="modifier-la-configuration-du-frondend" tabindex="-1">Modifier la configuration du Frondend <a class="header-anchor" href="#modifier-la-configuration-du-frondend" aria-label="Permalink to &quot;Modifier la configuration du Frondend&quot;">​</a></h2><p>Voir <a href="https://v2.quasar.dev/quasar-cli-vite/quasar-config-js" target="_blank" rel="noreferrer">Configuration quasar.config.js</a>.</p><h2 id="modifier-le-backend" tabindex="-1">Modifier le Backend <a class="header-anchor" href="#modifier-le-backend" aria-label="Permalink to &quot;Modifier le Backend&quot;">​</a></h2><p>Voir <a href="https://feathersjs.com" target="_blank" rel="noreferrer">Configuration Feathersjs</a></p>`,34)]))}const b=e(t,[["render",l]]);export{u as __pageData,b as default};