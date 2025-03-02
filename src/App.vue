<!--<template>
  <router-view />
</template>-->
<template>
  <Suspense>
    <!-- composant avec des dépendances asynchrones imbriquées -->
    <router-view />

    <!-- état de chargement via le slot #fallback -->
    <template #fallback>
      <q-page class="row items-center justify-evenly">
        Chargment en cours...
      </q-page>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});

onMounted(async () => {
  // detection de window et suppression du loading initial
  if (typeof window !== 'undefined') {
    document.getElementById('apploading')?.remove();

    window.addEventListener('error', (event) => {
      console.log('Error : ', event);
    });
  }

  const { api } = useFeathers();
  const User = api.service('users');
  if (import.meta.env.DEV) {
    console.log('Dev mode');
    /*const currentUser: any = await User.find({
      paginate: false,
      query: {
        username: process.env.SUPER_ADM_ID,
        password: process.env.SUPER_ADM_PWD,
      },
    });
    console.log('Is user found :', currentUser?.total);
    if (currentUser?.total == 0) {
      const createUser = await User.create({
        //strategy: 'local',
        username: process.env.SUPER_ADM_ID,
        password: process.env.SUPER_ADM_PWD,
      });
      console.log('Create user :', createUser);
    }*/
    /*const authStore = useAuthStore();
    authStore.clearError();
    await authStore.getPromise();
    await authStore.authenticate({
      strategy: 'local', // 'sso',
      username: process.env.SUPER_ADM_ID,
      password: process.env.SUPER_ADM_PWD,
    } as any);

    console.log('Feathersjs Auth :', authStore.isAuthenticated);
    console.log('Feathersjs the user :', authStore.user);*/
  }
});
</script>
