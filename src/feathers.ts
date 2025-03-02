import authenticationClient from '@feathersjs/authentication-client';
import { feathers, type FeathersService } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
// import { useStorage } from '@vueuse/core'
import { createPiniaClient } from 'feathers-pinia';
import io from 'socket.io-client';
import { pinia } from './stores/index';
import { error } from 'console';
import { Notify } from 'quasar';
type ServiceTypes = Record<string, FeathersService>;

console.log('RUN env :', process.env.DEV);
const isDev = process.env.DEV || process.env.DEV === 'true';

const socket = io(
  isDev
    ? `http://localhost:${process.env.LISTEN_BACKEND_PORT}`
    : 'http://localhost:80',
  { transports: ['websocket'] },
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

socket.io.engine.transport.on('error', () => {
  Notify.create({
    color: 'negative',
    message: 'Impossible de se connecter au Backend !',
    icon: 'warning',
    position: 'top',
  });
});

export const api = createPiniaClient(feathersClient, {
  pinia,
  idField: '_id',
  // optional
  //ssr: false,

  setupInstance(data) {
    return data;
  },
  syncWithStorage: true,
  services: {},
  whitelist: [],
  paramsForServer: [],
  skipGetIfExists: true,
  customSiftOperators: {},
});

console.log('Feathersjs api :', { ...api });
