<template>
  <q-item clickable tag="a" target="_blank" :href="link" v-ripple>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn flat round dense icon="close" @click="console.log('close')" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LeftMenuLink',
});

export interface LeftMenuLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<LeftMenuLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const app = useAppStore();

onMounted(() => {
  console.log('App :', app.authStore);
});
</script>
