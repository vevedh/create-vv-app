// stores/auth.ts
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useAuth } from 'feathers-pinia';

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers();
  const router = useRouter()
  /*
  const setup = async ({ user }) => {
      await sleep(500)
      // Make additional requests, populate data,
      // return additional data, if desired.
      return { user, foo: 'bar' }
    }
  */


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
  return {
    ...auth, isDSI: isDSI, logout: async () => {
      try {
        await auth.logout()
      } catch (error) {

      }

      //auth.loginRedirect = null
      await router.push('')
    }
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
