// stores/auth.ts
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useAuth } from 'feathers-pinia';

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers();
  const router = useRouter();

  const auth = useAuth({ api, servicePath: 'users' });
  if (auth && !auth.isAuthenticated) {
    auth.authenticate();
  } else {
    auth.reAuthenticate();
  }

  console.log('Auth useAuthStore:', { ...auth });
  return {
    ...auth,

    logout: async () => {
      try {
        await auth.logout();
        router.push('/login');
      } catch (error) {}

      //auth.loginRedirect = null
      await router.push('/login');
    },
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

//const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
