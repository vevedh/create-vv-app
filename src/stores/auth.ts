
// stores/auth.ts
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useAuth } from 'feathers-pinia';

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers();

  const auth = useAuth({ api, servicePath: 'users' });
  if (auth && !auth.isAuthenticated) {
    auth.authenticate();
  } else {
    auth.reAuthenticate();
  }

  const isDSI = () => {
    let result;
    if (auth?.user) {
      console.log('Auth :', auth.user.value);
      result = Array.isArray(auth.user.value?.memberOf)
        ? auth.user?.value.memberOf.find((o: any) =>
          o.includes('Utilisateurs DSI'),
        )?.length > 0
        : false;
    }
    return result;
  };

  console.log('Auth useAuthStore:', { ...auth, isDSI: isDSI });
  return { ...auth, isDSI: isDSI };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
