import { defineStore } from 'pinia';

const { api } = useFeathers();

interface App {
  settings: any;
  counter: number;
}

export const useAppStore = defineStore('appstore', {
  state: (): App => ({
    settings: {},
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
    increment() {
      this.counter++;
    },
  },
});
