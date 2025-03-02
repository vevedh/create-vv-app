<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-drawer v-model:model-value="props.modelValue" show-if-above elevated>
    <q-list>
      <q-item-label header> Menu </q-item-label>

      <LeftMenuLink v-for="link in linksList" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
defineOptions({
  name: 'LeftMenu',
});

import LeftMenuLink, { LeftMenuLinkProps } from 'components/LeftMenuLink.vue';

export interface LeftMenuProps {
  modelValue: boolean;
  linksList: LeftMenuLinkProps[];
}

const props = withDefaults(defineProps<LeftMenuProps>(), {
  linksList: () => [
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
  ],
});

const emit = defineEmits(['update:modelValue']);

//const leftOpen = ref(false);

//const linksListRef: LeftMenuLinkProps[] = ref(props.linksList);

//modelValue: false,

const modelValue = useVModel(props, 'modelValue', emit);
</script>
