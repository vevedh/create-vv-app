<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /><!-- class="animate animate-bounce" -->

        <q-toolbar-title class="dark:text-primary text-white">
          Create VV App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <q-btn color="white" icon="logout" flat @click="logOut()" />
        <q-btn
          :color="$q.dark.isActive ? 'white' : 'dark'"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'wb_sunny' : 'nights_stay'"
        />
      </q-toolbar>
    </q-header>

    <!--<q-drawer v-model="leftDrawerOpen" show-if-above elevated>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <LeftMenuLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>-->

    <LeftMenu v-model="leftDrawerOpen" :linksList="linksList" />

    <q-page-container>
      <router-view class="h-full" v-slot="{ Component }">
        <Suspense>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <component :is="Component" />
          </transition>
          <template #fallback>
            <q-page class="row items-center justify-evenly">
              Chargment en cours...
            </q-page>
          </template>
        </Suspense>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LeftMenu from 'components/LeftMenu.vue';
import { LeftMenuLinkProps } from 'components/LeftMenuLink.vue';
//import LeftMenuLink from 'src/components/LeftMenuLink.vue';

const $q = useQuasar();
const auth = useAuthStore();
const router = useRouter();

defineOptions({
  name: 'MainLayout',
});

const linksList: LeftMenuLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const leftDrawerOpen = ref(false);

function logOut() {
  auth.logout();
  router.push('');
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style type="text/css" scope>
#app :is(.dark .dark\:bg-blue) {
  --un-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--un-bg-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}

.dark .dark\:text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
/*
html {
  background: radial-gradient(
    circle,
    rgba(248, 250, 251, 1) 20%,
    rgba(0, 212, 255, 1) 100%
  );
  background-size: cover;
}
*/
</style>
