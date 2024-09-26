import{_ as r,c as t,a2 as a,o as s}from"./chunks/framework.BtOjZnwA.js";const f=JSON.parse('{"title":"UnoCSS - definir une couleur dégradée","description":"","frontmatter":{},"headers":[],"relativePath":"config/unocss.md","filePath":"config/unocss.md"}'),o={name:"config/unocss.md"};function n(i,e,l,c,u,h){return s(),t("div",null,e[0]||(e[0]=[a('<h1 id="unocss-definir-une-couleur-degradee" tabindex="-1">UnoCSS - definir une couleur dégradée <a class="header-anchor" href="#unocss-definir-une-couleur-degradee" aria-label="Permalink to &quot;UnoCSS - definir une couleur dégradée&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class=&quot;bg-gradient-to-r from-violet-600 to-indigo-600&quot;</span></span></code></pre></div><blockquote><p>Outils d&#39;aide : <a href="https://tailwindcomponents.com/gradient-generator/" target="_blank" rel="noreferrer">Tailwind CSS Gradient Generator (tailwindcomponents.com)</a></p></blockquote><h1 id="unocss-gestion-facile-du-theme-sombre" tabindex="-1">UnoCSS - gestion facile du theme sombre <a class="header-anchor" href="#unocss-gestion-facile-du-theme-sombre" aria-label="Permalink to &quot;UnoCSS - gestion facile du theme sombre&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class=&quot;dark:text-white text-dark&quot;</span></span></code></pre></div><h1 id="unocss-configurations" tabindex="-1">UnoCSS Configurations <a class="header-anchor" href="#unocss-configurations" aria-label="Permalink to &quot;UnoCSS Configurations&quot;">​</a></h1><p>UnoCSS is an atomic-CSS engine instead of a framework. Everything is designed with flexibility and performance in mind. There are no core utilities in UnoCSS, all functionalities are provided via presets.</p><p>By default, UnoCSS applies <a href="https://github.com/unocss/unocss/tree/main/packages/preset-uno" target="_blank" rel="noreferrer">the default preset</a>, which provides a common superset of the popular utilities-first frameworks Tailwind CSS, Windi CSS, Bootstrap, Tachyons, etc.</p><h2 id="presets" tabindex="-1">Presets <a class="header-anchor" href="#presets" aria-label="Permalink to &quot;Presets&quot;">​</a></h2><p>Presets are the heart of UnoCSS. They let you make your own custom framework in minutes.</p><h2 id="official-presets" tabindex="-1">Official Presets <a class="header-anchor" href="#official-presets" aria-label="Permalink to &quot;Official Presets&quot;">​</a></h2><ul><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-uno" target="_blank" rel="noreferrer">@unocss/preset-uno</a> - The default preset (right now it&#39;s equivalent to <code>@unocss/preset-wind</code>).</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-mini" target="_blank" rel="noreferrer">@unocss/preset-mini</a> - The minimal but essential rules and variants.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-wind" target="_blank" rel="noreferrer">@unocss/preset-wind</a> - Tailwind / Windi CSS compact preset.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-attributify" target="_blank" rel="noreferrer">@unocss/preset-attributify</a> - Provides <a href="https://github.com/unocss/unocss/tree/main/packages/preset-attributify#attributify-mode" target="_blank" rel="noreferrer">Attributify Mode</a> to other presets and rules.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-icons" target="_blank" rel="noreferrer">@unocss/preset-icons</a> - Use any icon as a class utility.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-web-fonts" target="_blank" rel="noreferrer">@unocss/preset-web-fonts</a> - Web fonts at ease.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-typography" target="_blank" rel="noreferrer">@unocss/preset-typography</a> - The typography preset.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-tagify" target="_blank" rel="noreferrer">@unocss/preset-tagify</a> - Tagify Mode for UnoCSS.</li><li><a href="https://github.com/unocss/unocss/tree/main/packages/preset-rem-to-px" target="_blank" rel="noreferrer">@unocss/preset-rem-to-px</a> - Coverts rem to px for utils.</li></ul><h2 id="community-presets" tabindex="-1">Community Presets <a class="header-anchor" href="#community-presets" aria-label="Permalink to &quot;Community Presets&quot;">​</a></h2><ul><li><a href="https://github.com/macheteHot/unocss-preset-scalpel" target="_blank" rel="noreferrer">unocss-preset-scalpel</a> - Scalpel Preset by <a href="https://github.com/macheteHot/" target="_blank" rel="noreferrer">@macheteHot</a>.</li><li><a href="https://github.com/chu121su12/unocss-preset-chroma" target="_blank" rel="noreferrer">unocss-preset-chroma</a> - Gradient Preset by <a href="https://github.com/chu121su12" target="_blank" rel="noreferrer">@chu121su12</a>.</li><li><a href="https://github.com/action-hong/unocss-preset-scrollbar" target="_blank" rel="noreferrer">unocss-preset-scrollbar</a> - Scrollbar Preset by <a href="https://github.com/action-hong" target="_blank" rel="noreferrer">@action-hong</a>.</li><li><a href="https://github.com/unocss-applet/unocss-applet" target="_blank" rel="noreferrer">unocss-applet</a> - Using UnoCSS in applet (UniApp / Taro) by <a href="https://github.com/zguolee" target="_blank" rel="noreferrer">@zguolee</a>.</li><li><a href="https://github.com/MellowCo/unocss-preset-weapp" target="_blank" rel="noreferrer">unocss-preset-weapp</a> - Wechat MiniProgram Preset for <a href="https://uniapp.dcloud.io" target="_blank" rel="noreferrer">UniApp</a> and <a href="https://taro-docs.jd.com/taro/docs" target="_blank" rel="noreferrer">Taro</a> by <a href="https://github.com/MellowCo" target="_blank" rel="noreferrer">@MellowCo</a>.</li><li><a href="https://github.com/Julien-R44/unocss-preset-heropatterns" target="_blank" rel="noreferrer">unocss-preset-heropatterns</a> - Preset that integrates <a href="https://heropatterns.com/" target="_blank" rel="noreferrer">Hero Patterns</a> by <a href="https://github.com/Julien-R44" target="_blank" rel="noreferrer">@Julien-R44</a>.</li><li><a href="https://github.com/Julien-R44/unocss-preset-flowbite" target="_blank" rel="noreferrer">unocss-preset-flowbite</a> - Port of of <a href="https://github.com/themesberg/flowbite" target="_blank" rel="noreferrer">Flowbite Tailwind plugin</a> for UnoCSS by <a href="https://github.com/Julien-R44" target="_blank" rel="noreferrer">@Julien-R44</a>.</li><li><a href="https://github.com/Julien-R44/unocss-preset-forms" target="_blank" rel="noreferrer">unocss-preset-forms</a> - Port of <a href="https://github.com/tailwindlabs/tailwindcss-forms" target="_blank" rel="noreferrer">@tailwindcss/forms</a> for UnoCSS by <a href="https://github.com/Julien-R44" target="_blank" rel="noreferrer">@Julien-R44</a>.</li><li><a href="https://github.com/MoomFE/unocss-preset-extra" target="_blank" rel="noreferrer">unocss-preset-extra</a> - <a href="https://animate.style" target="_blank" rel="noreferrer">Animate.css</a> Preset and some other rules by <a href="https://github.com/Zhang-Wei-666" target="_blank" rel="noreferrer">@Zhang-Wei-666</a>.</li><li><a href="https://github.com/kidonng/unocss-preset-daisy" target="_blank" rel="noreferrer">unocss-preset-daisy</a> - daisyUI Preset by <a href="https://github.com/kidonng" target="_blank" rel="noreferrer">@kidonng</a>.</li><li><a href="https://github.com/zirbest/unocss-preset-primitives" target="_blank" rel="noreferrer">unocss-preset-primitives</a> - Like <a href="https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss" target="_blank" rel="noreferrer">headlessui-tailwindcss</a> , radix-ui , custom for UnoCSS By <a href="https://github.com/zirbest" target="_blank" rel="noreferrer">@zirbest</a>.</li><li><a href="https://github.com/Dunqing/unocss-preset-theme" target="_blank" rel="noreferrer">unocss-preset-theme</a> - Preset for automatic theme switching by <a href="https://github.com/Dunqing" target="_blank" rel="noreferrer">@Dunqing</a></li></ul>',14)]))}const g=r(o,[["render",n]]);export{f as __pageData,g as default};
