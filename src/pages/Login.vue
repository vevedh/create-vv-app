<template>
  <q-page class="fit row justify-center">
    <!-- content -->

    <div class="column justify-center self-center q-pb-xl q-px-md" style="width: 400px">
      <div class="row justify-center self-center rounded-borders q-pb-md" style="width: 200px">
        <q-img :src="url" spinner-color="white" class="rounded-borders" />
      </div>
      <q-card class="my-card" bordered>
        <q-card-section style="width: 100%" class="text-center bg-primary text-white text-h5 q-py-xs">
          Identification
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pb-none">
          <q-form class="q-px-xl">
            <q-input filled bottom-slots v-model="email" label="*Utilisateur :" :dense="dense" lazy-rules>
            </q-input>
            <q-input filled bottom-slots type="password" v-model="password" label="Mot de passe :" :dense="dense">
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="row items-center justify-center q-mt-md q-pt-none">
          <div :hidden="!loading">
            <div class="col items-center justify-center">
              <div>
                <q-spinner color="primary" size="3em" :thickness="10" />
              </div>
              <div class="text-h6">Vérifications en cours...</div>
            </div>
          </div>
        </q-card-actions>
        <q-card-actions class="row items-center justify-center q-mt-md q-pt-none">
          <div class="q-gutter-xl">
            <q-btn color="primary" icon="lock" text-color="white" label="Connexion" @click="onSubmit(email, password)"
              :disable="email == '' || password == ''" />
            <!--<q-btn color="primary" text-color="white" label="S'inscrire" @click="onRegister(email,password)" :disable="(email=='')&&(password=='')"/>-->
          </div>
        </q-card-actions>
        <!--<q-card-section class="col text-center"  separator>
            Entrez votre email et mot de passe pour vous inscrire ou vous connecter
          </q-card-section>-->
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const { api } = useFeathers();

console.log('Api :', api);

//import { mapGetters,mapState } from 'vuex'
console.log('Auth login:', authStore);
if (authStore?.user) {
  router.push('');
}

defineOptions({
  name: 'LonginPage',
});

const email = ref('');
const password = ref('');
const url = ref('cacem.png');
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
      //dialogError.value = true
    });
};


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
