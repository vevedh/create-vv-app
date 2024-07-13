# Qu’est-ce que l’UnoCSS ?

UnoCSS est le moteur CSS atomique instantané, conçu pour être flexible et extensible. Le noyau n’a pas d’opinion et tous les utilitaires CSS sont fournis via des préréglages.

Par exemple, vous pouvez définir vos utilitaires CSS personnalisés, en fournissant des règles dans votre [fichier de configuration](https://unocss.dev/guide/config-file) local.

**Ts**

```
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

Cela ajoutera un nouvel utilitaire CSS à votre projet. Comme UnoCSS est à la demande, il ne fera rien tant que vous ne l’utiliserez pas dans votre base de code. Supposons donc que nous ayons un composant comme celui-ci :`m-1`

**HTML**

```
<div class="m-1">Hello</div>
```

`m-1` sera détecté et le CSS suivant sera généré :

**Css**

```
.m-1 { margin: 1px; }
```

Pour la rendre plus flexible, vous pouvez rendre votre règle dynamique en changeant le premier argument de la règle (nous l’appelons matcher) en a et le corps en une fonction, par exemple :`RegExp`

**Diff**

```
// uno.config.ts
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }],
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

En faisant cela, vous pouvez maintenant avoir des utilitaires de marge arbitraires, comme , ou . Et encore une fois, UnoCSS ne les génère que lorsque vous les utilisez.`m-1``m-100``m-52.43`

**HTML**

```
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

**Css**

```
.m-1 { margin: 1px; }
.m-7.5 { margin: 7.5px; }
```

## Presets

Une fois que vous avez défini quelques règles, vous pouvez les extraire dans un préréglage et le partager avec d’autres. Par exemple, vous pouvez créer un préréglage pour le système de conception de votre entreprise et le partager avec votre équipe.

**Ts**

```
// my-preset.ts
import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
  variants: [/* ... */],
  shortcuts: [/* ... */],
  // ...
}
```

**Ts**

```
// uno.config.ts
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset, // your own preset
  ],
})
```

De même, nous avons fourni quelques [préréglages officiels](https://unocss.dev/presets/) que vous pouvez commencer à utiliser immédiatement, et vous pouvez également trouver de nombreux [préréglages communautaires intéressants](https://unocss.dev/presets/community).

## Tester

Vous pouvez essayer UnoCSS dans votre navigateur, dans le [Playground](https://unocss.dev/play/). Vous pouvez également rechercher des utilitaires à partir des paramètres prédéfinis par défaut dans la [documentation interactive.](https://unocss.dev/interactive/)
