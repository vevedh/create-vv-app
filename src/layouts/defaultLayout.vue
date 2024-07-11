<script setup lang="ts"></script>
<template>
  <q-layout>
    <q-page-container>
      <router-view class="h-full" v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
