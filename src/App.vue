<template>
  <router-view />
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});

onMounted(() => {
  // detection de window et suppression du loading initial
  if (typeof window !== 'undefined') {
    document.getElementById('apploading')?.remove();

    window.addEventListener('error', (event) => {
      console.log('Error : ', event);
    });
  }
});
</script>
