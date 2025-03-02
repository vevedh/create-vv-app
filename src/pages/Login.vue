<template>
  <q-page
    :class="`window-height window-width fit row justify-center ${settings.gratientBg}`"
  >
    <!-- content -->

    <div
      class="column justify-center self-center q-pb-xl q-px-md"
      style="width: 400px"
    >
      <q-card
        class="my-card"
        square
        v-motion
        :initial="{
          opacity: 0,
          y: -100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 350,
            delay: 1500,
          },
        }"
        :duration="1500"
      >
        <q-card-section
          class="row text-center items-center gap-sm bg-primary text-white text-h5 q-py-none"
        >
          <q-avatar
            size="100px"
            font-size="52px"
            color="teal"
            text-color="white"
            class="q-ma-md"
            ><q-img :src="url" spinner-color="blue" class="rounded-borders"
          /></q-avatar>
          <div>Identification</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pb-none">
          <q-fab
            color="secondary"
            icon="add"
            class="absolute size-10"
            style="top: 0; right: 12px; transform: translateY(-70%)"
          ></q-fab>
          <q-form
            class="q-pa-md q-col-gutter-md"
            id="loginForm"
            ref="loginForm"
          >
            <q-input
              filled
              bottom-slots
              input-class="text-bold"
              v-model="email"
              label="* Utilisateur :"
              :rules="[
                (val) => (val && val.length > 0) || settings.requiredField,
              ]"
              :dense="dense"
              lazy-rules
            >
              <q-tooltip anchor="top left" self="top middle">
                Enregistrement
              </q-tooltip>
            </q-input>
            <q-input
              filled
              bottom-slots
              type="password"
              input-class="text-bold"
              v-model="password"
              :rules="[
                (val) => (val && val.length > 0) || settings.requiredField,
              ]"
              label="Mot de passe :"
              :dense="dense"
            >
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions
          :hidden="!loading"
          class="row items-center justify-center q-mt-sm q-pt-none"
        >
          <div>
            <div class="col items-center justify-center">
              <div>
                <q-spinner
                  :color="settings.spinnerColor"
                  size="3em"
                  :thickness="10"
                />
              </div>
              <div class="text-h6">Vérifications en cours...</div>
            </div>
          </div>
        </q-card-actions>
        <q-card-actions
          class="row items-center justify-center q-mt-md q-pt-none"
        >
          <div class="q-gutter-xl">
            <q-btn
              ref="loginBtn"
              autofocus
              color="primary"
              icon="lock"
              text-color="white"
              label="Connexion"
              @click="onSubmit(email, password)"
              :disable="email == '' || password == ''"
            />
            <!--<q-btn color="primary" text-color="white" label="S'inscrire" @click="onRegister(email,password)" :disable="(email=='')&&(password=='')"/>-->
          </div>
        </q-card-actions>
        <q-card-section class="col text-center" separator>
          Mot de passe oublié ?
          <a
            href="#"
            class="text-primary"
            @click="appStore.sendForgotPassword('herve@dechavigny.fr')"
            >Cliquer ici</a
          >
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const $q = useQuasar();

const authStore = useAuthStore();
const appStore = useAppStore();
const settings = ref(appStore.settings);
const router = useRouter();
const route = useRoute();
const { api } = useFeathers();

const variant = ref();

console.log('Api :', api);

//import { mapGetters,mapState } from 'vuex'
console.log('Auth login:', authStore);

defineOptions({
  name: 'LonginPage',
});

const email = ref('');
const password = ref('');
const url = ref('fbavatar.png');
const loading = ref(false);
const dense = ref(true);
//const showParticules = ref(false)

const onSubmit = (email: string, password: string) => {
  console.log('Utilisateur :', email);
  console.log('Password :', password);
  //const { api } = useFeathers();
  authStore.clearError();

  authStore
    .authenticate({
      strategy: 'local',
      username: email,
      password: password,
    } as any)
    .then(async (authres) => {
      console.log('Auth result :', authres);
      await router.push('/');
    })
    .catch((error: any) => {
      // eslint-disable-next-line no-console
      console.log(error);
      if (settings.value?.errorNotify) {
        $q.notify({
          color: 'negative',
          message: error.message,
          icon: 'warning',
          position: 'top',
        });
      } else {
        $q.dialog({
          title: ' Erreur',
          message: error.message,
          ok: {
            push: true,
            label: 'Ok',
          },
          persistent: true,
        })
          .onOk(() => {
            console.log('>>>> OK');
          })
          .onDismiss(() => {
            console.log('I am triggered on both OK');
          });
      }
      /**/

      //dialogError.value = true
    });
};

onBeforeMount(async () => {
  //console.log('Settings route :', route);
});

onMounted(async () => {
  console.log('Settings route :', route.query);
  //await appStore.writeSettings(settings.value)
  await appStore.readSettings();
  settings.value = appStore.settings;
  console.log('Settings :', settings.value);
  if (
    settings.value.gratientBg === '' ||
    !settings.value.hasOwnProperty('gratientBg')
  ) {
    settings.value.gratientBg = 'bg-gradient-to-br from-slate-50 to-sky-500';
  }
  if (
    settings.value.spinnerColor === '' ||
    !settings.value.hasOwnProperty('spinnerColor')
  ) {
    settings.value.spinnerColor = 'blue';
  }
  if (
    settings.value.requiredField === '' ||
    !settings.value.hasOwnProperty('requiredField')
  ) {
    settings.value.requiredField = 'Champ obligatoire !';
  }
  if (
    settings.value.errorNotify === true ||
    !settings.value.hasOwnProperty('errorNotify')
  ) {
    settings.value.errorNotify = true;
  }
});
</script>

<style lang="scss">
.my-card {
  width: 100%;

  max-width: 400px;
}

.mymy {
  background-color: #ff0000;
  //background: url('https://cdn.quasar.dev/img/parallax2.jpg');
}
</style>
