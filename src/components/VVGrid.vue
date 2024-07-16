<script async setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import FVvGrid from './FVvGrid.vue'

const props = defineProps<{
  useapi: boolean
  dbname: string
  dbtable: string
  vcolumns?: Array<any>
}>()

const dataGrid = ref(null)
const loadingGrid = ref(true)
// 'quasar-ui-qgrid/src/components/QGrid.vue'

const { api } = useFeathers()
const isDark = useDark()
const selected = ref([])

const visible_columns = ref(props.vcolumns || [])// ref([])

// const visiblesc = computed(() => { return visible_columns.value })

const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a: string, b: string) => Number.parseInt(a, 10) - Number.parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10),
  },
])

const data = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
])

function GetSelected(Selected: never[]) {
  selected.value = Selected
}

function changeData(values: never[]) {
  console.log('Objets data :', Object.keys(values[0]))

  // Object.assign(dataGrid.value.visible_columns, Object.keys(values[0]))
}

onBeforeMount(async () => {
  if (props.useapi === true) {
    // await initLdap()
    loadingGrid.value = true
    console.log('API is enabled before:', api)
    const db_data: any = await api.service(`mongo/${props.dbname}/${props.dbtable}`).find({ query: { $limit: 1000 } })
    console.log('Données de la table before :', db_data)
    visible_columns.value = Object.assign([], JSON.parse(JSON.stringify(Object.keys(db_data[0]))))
  }
})

onMounted(async () => {
  if (props.useapi === true) {
    // await initLdap()
    console.log('API is enabled :', api)
    const db_data: any = await api.service(`mongo/${props.dbname}/${props.dbtable}`).find({ query: { $limit: 1000 } })
    console.log('Données de la table :', db_data)
    // ----------------------------------------------------------------
    const countkeys = db_data.map((o: any) => `${Object.keys(o).length}`)
    console.log('Count keys :', countkeys)
    const maxlen = Math.max(...countkeys)
    const minlen = Math.min(...countkeys)
    console.log('Nb max props :', maxlen)
    console.log('Nb min props :', minlen)
    const maxCols = countkeys.findIndex(
      (item: any) => Number(item) == Number(maxlen),
    )

    console.log('Nb maxCols props :', maxCols)
    const dbdata = Object.assign([], db_data)

    console.log('Data max :', dbdata[maxCols])

    const minCols = countkeys.findIndex(
      (item: any) => Number(item) == Number(minlen),
    )

    console.log('Data min :', dbdata[minCols])
    const fusionObj = Object.assign({}, dbdata[maxCols], dbdata[minCols])

    console.log('Fusion Obj :', fusionObj)
    const cols = Object.assign([], Object.keys(fusionObj))
    console.log('Columns :', cols)

    // if (cols.length > 0)
    //  visible_columns.value = Object.assign([], columns.value.map(col => `${col.name}`))

    // cols.forEach(col => visible_columns.value.push(col))
    // dataGrid.visible_columns = Object.assign([], cols)
    // ------------------------------------------------

    columns.value = cols.map(col => ({
      name: col,
      align: 'center',
      label: col,
      field: col,
      sortable: true,
    }))
    // visible_columns.value = Object.assign([], JSON.parse(JSON.stringify(cols)))
    data.value = dbdata
  }
})

watch(data, (newData, oldData) => {
  if (Array.isArray(newData) && newData.length > 0) {
    console.log('Nouvelles Données de la table :', newData)
    const entetes = JSON.parse(JSON.stringify(Object.keys(newData[0])))
    entetes.forEach((element: any) => {
      visible_columns.value.push(element)
    })
    console.log('Entetes visibles :', visible_columns.value.values)
    loadingGrid.value = false
  }
})
</script>

<template>
  <div></div>
  <!-- :visible_columns="['_id', 'sAMAccountName']" -->
  <!--<QGrid ref="dataGrid" :loading="loadingGrid" :visible_columns="visible_columns" :data="data" :columns="columns"
    :columns_filter="false" :draggable="true" :fullscreen="true" :csv_download="true" :global_search="true"
    selection="single" :selected="selected" row_key="sAMAccountName" :color="(isDark) ? 'white' : 'dark'"
    @data-val="changeData($event)" @selected-val="GetSelected($event)"></QGrid>-->
  <!--
  <FVvGrid ref="dataGrid" :loading="loadingGrid" :visible_columns="visible_columns" :data="data" :columns="columns"
    :columns_filter="false" :draggable="true" :fullscreen="true" :csv_download="true" :global_search="true"
    selection="single" :selected="selected" row_key="sAMAccountName" :color="(isDark) ? 'white' : 'dark'"
    @data-val="changeData($event)" @selected-val="GetSelected($event)" />
  -->
  <!-- <template #loading>
      <q-inner-loading showing color="primary">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </template> -->

</template>
