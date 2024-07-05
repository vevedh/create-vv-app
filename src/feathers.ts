import authenticationClient from '@feathersjs/authentication-client';
import { feathers, type FeathersService } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
// import { useStorage } from '@vueuse/core'
import { createPiniaClient } from 'feathers-pinia';
import io from 'socket.io-client';
import { pinia } from './stores/index';

type ServiceTypes = Record<string, FeathersService>;

const socket = io(
  import.meta.env.DEV == true
    ? 'http://localhost:23030'
    : 'https://svrapi.agglo.local',
);

const storageKey = 'feathers-jwt';
const jwt = useStorage(storageKey, '');
const storage = {
  getItem: () => jwt.value,
  setItem: (val: string) => (jwt.value = val),
  removeItem: () => (jwt.value = null),
};

export const feathersClient = feathers<ServiceTypes>()
  .configure(socketio(socket))
  .configure(
    authenticationClient({
      storage: typeof window !== 'undefined' ? window.localStorage : storage,
    }),
  );
/*
 .configure(authenticationClient({ storage: (typeof window !== 'undefined') ? window.localStorage : null }))
 */ // (global !== undefined) ? global.localStorage :

export const api = createPiniaClient(feathersClient, {
  pinia,
  idField: '_id',
  // optional
  //ssr: false,

  setupInstance(data) {
    return data;
  },
  syncWithStorage: true,
  //services: {},
  whitelist: [],
  paramsForServer: [],
  skipGetIfExists: true,
  customSiftOperators: {},
});

console.log('Feathersjs api :', { ...api });
