import Unocss from 'unocss/vite';
import { defineConfig } from 'vitepress';
import { version } from '../../package.json';
import { fileURLToPath } from 'node:url';
import { withPwa } from '@vite-pwa/vitepress';

export default withPwa(
  defineConfig({
    base: '/create-vv-app/',
    head: [['script', {}, `document.getElementByClassName('desc').remove();`]],
    description: 'Create VVApp. Crée à partir de Quasar et UnoCSS.',
    markdown: {
      headers: {
        level: [0, 0],
      },
    },
    themeConfig: {
      logo: '/fbavatar.png',
      footer: {
        message: 'Create VVApp Starter',
        copyright: 'Copyright © 2024 Hervé de CHAVIGNY',
      },
      search: {
        provider: 'local',
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vevedh/create-vv-app' },
      ],
      editLink: {
        pattern: 'https://github.com/create-vv-app/edit/main/docs/:path',
        text: 'Modifier la page sur GitHub',
      },
      nav: nav(),
      sidebar: {
        '/guide/': sidebarGuide(),
        '/config/': sidebarConfig(),
      },
      /* blog: {
       title: 'My Blog',
       description: 'Some articles for sample Blog',
     }, */
    },
    title: 'Create VVApp Starter',
    vite: {
      resolve: {
        alias: [
          {
            find: /^\/VPLink\.vue$/,
            replacement: fileURLToPath(
              new URL('./components/DocAfter.vue', import.meta.url),
            ),
          },
        ],
      },
      plugins: [
        Unocss({
          configFile: '../../unocss.config.ts',
        }),
      ],
    },
    pwa: {
      strategies: 'generateSW', // <== if omitted, defaults to `generateSW`
      workbox: {
        /* your workbox configuration if any */
      },
      experimental: {
        includeAllowlist: true,
      },
    },
  }),
);

function nav() {
  return [
    { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
    { text: 'Configs', link: '/config/', activeMatch: '/config/' },
    //{ text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
    {
      text: 'Documentations Externes',
      items: [
        {
          text: 'Vitepress',
          link: 'https://vitepress.vuejs.org',
        },
        {
          text: 'UnoCSS',
          link: 'https://uno.antfu.me',
        },
        {
          text: 'Quasar',
          link: 'https://quasar.dev',
        },
        {
          text: 'FeathersJS',
          link: 'https://feathersjs.com',
        },
      ],
    },
    {
      text: version,
      items: [
        {
          text: 'Changements',
          link: 'https://github.com/vevedh/create-vv-app/docs/blob/main/CHANGELOG.md',
        },
      ],
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [{ text: "Comment l'utiliser ?", link: '/guide/using' }],
    },
    {
      text: 'Fonctions',
      collapsible: true,
      items: [{ text: 'UnoCSS', link: '/guide/features/unocss' }],
    },
  ];
}

function sidebarConfig() {
  return [
    {
      text: 'Config',
      items: [
        { text: 'Introduction', link: '/config/' },
        { text: 'UnoCSS', link: '/config/unocss' },
      ],
    },
  ];
}
