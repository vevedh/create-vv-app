import { h, watch } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';
import './rainbow.css';
import './vars.css';
import './overrides.css';
import 'uno.css';
//import 'virtual:group-icons.css';
import Feature from './components/uno/Feature.vue';
import Posts from './components/blog/Posts.vue';
import Post from './components/blog/Post.vue';
import PostDetail from './components/blog/PostDetail.vue';
import PostIcon from './components/blog/PostIcon.vue';
import PostAuthor from './components/blog/PostAuthor.vue';
import AuthorDetail from './components/blog/AuthorDetail.vue';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import RainbowAnimationSwitcher from './components/RainbowAnimationSwitcher.vue';
import DocAfter from './components/doc/DocAfter.vue';

import CustomLayout from './layouts/CustomLayout.vue';

import UnoCSSLayout from './layouts/UnoCSSLayout.vue';

import '@shikijs/vitepress-twoslash/style.css';

//import 'virtual:group-icons.css';

let homePageStyle: HTMLStyleElement | undefined;

export default {
  ...DefaultTheme,

  extends: DefaultTheme,
  Layout() {
    return h(UnoCSSLayout, null, {
      //DefaultTheme.Layout
      //'page-bottom': () => h(DocAfter)
    });
  },
  enhanceApp({ app, router }) {
    app.component('RainbowAnimationSwitcher', RainbowAnimationSwitcher);

    app.component('Feature', Feature);
    app.component('Posts', Posts);
    app.component('Post', Post);
    app.component('PostDetail', PostDetail);
    app.component('PostIcon', PostIcon);
    app.component('PostAuthor', PostAuthor);
    app.component('AuthorDetail', AuthorDetail);
    app.use(TwoslashFloatingVue);

    if (typeof window === 'undefined') return;

    document.body.classList.add('rainbow');

    watch(
      /*() => {
        console.log('Home page route changed', location.pathname);
      },*/
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/create-vv-app/'),
      { immediate: true },
    );
  },
};

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase();

  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome');
    document.documentElement.classList.add('rainbow');
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox');
    document.documentElement.classList.add('rainbow');
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari');
    document.documentElement.classList.add('rainbow');
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement('style');
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}
