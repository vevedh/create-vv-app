import { defineStore } from 'pinia';

const { api } = useFeathers();
const authStore = useAuthStore();

interface App {
  settings: any;
  authStore: any;
  counter: number;
}

export const useAppStore = defineStore('appstore', {
  state: (): App => ({
    settings: {},
    authStore: authStore,
    counter: 0,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    async readSettings() {
      this.settings = await (await fetch('/settings.json')).json();
    },
    async writeSettings(data: any) {
      await api.service('settings').create(data);
    },
    async sendForgotPassword(email: any) {
      await api.service('auth-management').create({
        action: 'sendResetPwd',
        value: { email }, // {email}, {token: verifyToken}
        notifierOptions: {}, // options passed to options.notifier, e.g. {preferredComm: 'email'}
      })
    },
    increment() {
      this.counter++;
    },
  },
});
