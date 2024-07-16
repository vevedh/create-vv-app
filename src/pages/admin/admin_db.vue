<script setup lang="ts">
import VVGrid from '~/components/VVGrid.vue';


const { api } = useFeathers()
const dbService = api.service('api/v1/admindb')
const data = ref([])
const databases = ref([])
const columns = ref([])
const loading = ref(false)
const actionView = ref('')

const listTables = ref([])

const showNewCollection = ref(false)
const showDeleteDiag = ref(false)
const vueTable = ref(false)
const nDbName = ref('')
const nDbCollection = ref('')
const dbToDelete = ref('')
const currentDb = ref('')

async function fetchData() {
  loading.value = true
  databases.value = await dbService.service.find({ query: { databases: '' } })
  console.log('Databases :', databases.value)
  vueTable.value = false
  loading.value = false
}


async function createTable() {
  console.log('Create table : ', nDbName.value, nDbCollection.value)
  const newCollection = await dbService.service.create({
    query: {
      createdb: nDbName.value,
      collection: nDbCollection.value,
    }
  })
  console.log('New Collection :', newCollection)
  showNewCollection.value = false
  fetchData()

}

async function deleteTable(tname: string) {
  console.log('Delete table : ', tname)
  /*const deletedTable = await dbService.service.remove({ 
    query: {
      dbname:tname
    }
  })*/
  //console.log('Table supprimée :', deletedTable)

  fetchData()
  showDeleteDiag.value = false
}


function showConfirmDelete(tname: string) {
  showDeleteDiag.value = true
  dbToDelete.value = tname
}


async function showTable(db: string) {
  console.log('Show table : ', db)
  currentDb.value = db
  listTables.value = await api.service(`mongo/${db}/collections`).service.find({
    query: {}
  })

  console.log('List Tables :', listTables.value)
  vueTable.value = true
}




fetchData()
</script>
<template>
  <div class="w-full h-full flex flex-row items-center justify-center" v-if="loading">
    <h2>
      Patientez svp<br>
      Chargement en cours...
    </h2>
  </div>
  <div class="w-full h-full flex flex-row  q-gutter-md items-center justify-center p-xl" v-else>
    <div class="col">
      <div class="q-pa-md row items-start q-gutter-md">
        <div class="text-h4">MongoDB Feathersjs</div>
      </div>
      <q-separator spaced inset dark />
      <q-toolbar class="bg-purple text-white">

        <q-toolbar-title class="w-full items-start justify-start">
          {{ (vueTable === true) ? 'Liste des tables (collections)' : 'Bases de données' }}
        </q-toolbar-title>
        <q-btn v-if="vueTable" flat @click="fetchData()">
          <div i-mdi-arrow-left text-2xl />
        </q-btn>
        <!--<q-btn flat round dense icon="apps" class="q-mr-xs" />-->
        <q-btn flat round dense icon="mdi-plus" @click="showNewCollection = true" />
      </q-toolbar>
      <q-list v-if="!vueTable" bordered>
        <q-item border v-for="db in databases as any[]" :key="`item_${db.name}`">
          <q-item-section avatar top clickable v-ripple>
            <q-btn flat class="pa-none" @click="showTable(db.name)">
              <div class="i-carbon-db2-database" size="35px"></div>
            </q-btn>
          </q-item-section>

          <q-item-section top clickable class="col-2 gt-sm" v-ripple @click="showTable(db?.name)">
            <q-item-label class="q-mt-sm text-2xl text-blue justify-items-start">{{ db?.name }}</q-item-label>
          </q-item-section>

          <q-item-section bottom class="col-2">
            <q-item-label lines="1">
              <span class="text-weight-medium text-h5">Taille : </span>
              <span class="text-xl text-purple">{{ db.sizeOnDisk }} ko</span>
            </q-item-label>
          </q-item-section>

          <q-item-section bottomclass="col-2">
            <q-item-label lines="1" class="text-md">
              Tables : {{ db.tables?.length }}
            </q-item-label>
          </q-item-section>

          <!--<q-item-section   side class="col">
          <q-item-label  class="col-3  text-h6 text-weight-bold text-primary">
            <span class="cursor-pointer no-uppercase" >Détails...</span>
          </q-item-label>
        </q-item-section>-->

          <q-item-section top side class="col">
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs text-negative" size="12px" flat dense round icon="delete"
                v-if="!['config', 'local', 'admin', 'vvbase'].includes(db.name)" @click="showConfirmDelete(db.name)" />
              <!-- <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
              <q-btn size="12px" flat dense round @click="showTable(db.name)">
                <q-icon>
                  <div i-mdi-eye text-blue-800 text-2xl />
                </q-icon>
                <q-tooltip>
                  Voir les tables
                </q-tooltip></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list v-if="vueTable" bordered>
        <q-item v-for="table in listTables as any[]" :key="`item_t_${table.name}`">
          <q-item-section class="rounded" avatar>
            <q-icon color="purple">
              <div i-carbon-db2-database text-2xl />
            </q-icon>
          </q-item-section>
          <q-item-section>
            <div class="column">
              <div class="row q-gutter-md items-center">
                <q-btn stack color="primary" size="sm" label="Voir" @click="actionView = 'view'">
                  <div i-mdi-eye text-2xl />
                </q-btn>
                <q-btn stack color="primary" size="sm" label="Export">
                  <div i-mdi-content-save text-2xl />
                </q-btn>
                <q-btn stack color="primary" size="sm" label="[JSON]">
                  <div i-mdi-content-save text-2xl />
                </q-btn>
                <q-btn stack color="primary" size="sm" label="Import">
                  <div i-mdi-cloud-upload text-2xl />
                </q-btn>
                <q-item-label class="q-ml-xl text-blue-800 text-bold text-xl">{{ table.name }}</q-item-label>
              </div>
              <div class="q-pa-md" v-if="actionView == 'view'">
                <VVGrid :dbname="currentDb" :dbtable="table?.name" :useapi="true" />
                <!-- {{  currentDb }} - {{  table?.name }}-->
              </div>
            </div>
          </q-item-section>


          <q-item-section side>
            <q-btn flat color="negative">
              <div i-mdi-trash-can text-2xl />
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>


    <q-dialog v-model="showNewCollection" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar color="primary" text-color="white">
            <div i-carbon-db2-database text-2xl />
          </q-avatar>
          <span class="q-ml-sm">Creation d'un nouvelle table</span>
        </q-card-section>
        <q-card-section>
          <form>
            <q-input v-model="nDbName" label="Base de donnée :" :value="nDbName" />
            <q-input v-model="nDbCollection" label="Table :" :value="nDbCollection" />
          </form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Confirmer" color="primary" @click="createTable()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteDiag" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar color="negative" text-color="white">
            <div i-mdi-alert text-2xl />
          </q-avatar>
          <span class="q-ml-sm">Suppression d'une table</span>
        </q-card-section>
        <q-card-section>
          Confirmer la suppression de la table <b>{{ dbToDelete }}</b>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Confirmer" color="primary" @click="deleteTable(dbToDelete)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
