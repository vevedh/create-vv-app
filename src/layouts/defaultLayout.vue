<script setup lang="ts"></script>
<template>
  <q-layout>
    <Suspense>
      <q-page-container>
        <router-view class="h-full" v-slot="{ Component }">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
      <!-- état de chargement via le slot #fallback -->
      <template #fallback>
        <q-page class="row items-center justify-evenly">
          Chargment en cours...
        </q-page>
      </template>
    </Suspense>
  </q-layout>
</template>
<style lang="scss">
html {
  background: radial-gradient(
    circle,
    rgba(248, 250, 251, 1) 20%,
    rgba(0, 212, 255, 1) 100%
  );
  background-size: cover;
}
</style>
