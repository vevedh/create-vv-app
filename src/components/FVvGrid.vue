<template>
    <div class="">
        <div class="row fit q-pb-md items-right justify-right full-width" v-if="show_ExcelImport">
            <q-uploader ref="uploader" :multiple="false" :hide-upload-btn="true" square outlined
                label="Sélectionner un fichier excel" type="file" @added="onChange" class="full-width q-px-none" />
            <q-btn color="primary" text-color="white" label="Utiliser comme base de donnée" v-if="currentFile.name"
                @click="saveToDatabase()" />
        </div>
        <q-table id="myTable" ref="myTable" :title="setTitle" :data="datas ? datas : liveDatas"
            :row-key="(row) => (row._id ? row._id : row[Object.keys(row)[0]])" :selection="useSelection"
            :columns="newColumns" :filter="filter" @row-click="rowSelect"
            no-data-label="pas de données pour l'instant..." no-results-label="Aucun résultat trouvé"
            :selected="useSelected" :visible-columns="visibleColumns" :pagination="initialPagination"
            :separator="'cell'">
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width v-if="editable" class="text-bold text-primary bg-blue-1">
                    </q-th>
                    <q-th v-for="col in props.cols" :key="col.name" :props="props"
                        class="text-bold text-primary bg-blue-1">
                        <q-btn v-if="headers_filter" flat dense round aria-label="Filtre" icon="filter_alt">
                            <q-popup-edit :ref="`filter_${col.name}`" v-model="filtersParams[col.name]" :cover="false"
                                :offset="[0, 2]" v-slot="scope">
                                <div v-if="datesFields.includes(col.name)" class="q-pa-none" style="width: 180px">
                                    <div class="text-body2 text-grey q-mb-md">
                                        Critère de filtre [{{ col.name }}]
                                    </div>

                                    <div class="row items-center">
                                        <div class="q-pa-none text-caption text-dark full-width">
                                            <q-select dense filled v-model="filtersParams[col.name].option"
                                                :options="['annee', 'mois', 'jour']" label="Date par" />
                                        </div>
                                        <div class="col-12 q-pa-none">
                                            <q-input dense v-model="filtersParams[col.name].value" />
                                        </div>

                                        <div class="q-pa-sm q-gutter-md">
                                            <q-btn dense no-caps color="primary" size="sm" style="min-width: 68px"
                                                label="Filtrer" @click="updateFilters(scope, col.name)" />
                                            <q-btn dense no-caps color="grey-7" size="sm" style="min-width: 68px"
                                                label="Effacer" @click="deleteFilters(scope, col.name)" />
                                        </div>
                                    </div>
                                </div>
                            </q-popup-edit>
                        </q-btn>
                        {{ String(col.label).toUpperCase() }}
                    </q-th>
                </q-tr>

                <q-tr :props="props" class="ignore-elements" v-if="columns_filter">
                    <q-th auto-width v-if="editable" class="text-bold text-primary bg-blue-1">
                        <q-icon name="filter_alt" size="20px"></q-icon>
                    </q-th>
                    <q-th :key="col.name" v-for="col in props.cols" style="padding: 0px 0px 0px 0px">
                        <q-input v-if="
                            !col.hasOwnProperty('filter_type') || col.filter_type == 'text'
                        " dense color="teal" class="q-pl-xs q-pr-xs" filled v-model="filter_data[col.field]"
                            @input="filterColumn">
                            <template v-if="filter_data[col.field]" v-slot:append>
                                <q-icon name="cancel" @click.stop="
                                    filter_data[col.field] = '';
                                filterColumn(col.field);
                                " class="cursor-pointer" />
                            </template>
                        </q-input>

                        <q-select v-if="
                            col.hasOwnProperty('filter_type') && col.filter_type == 'select'
                        " map-options multiple emit-value filled v-model="column_options_selected[col.field]"
                            :options="getColumnOptions(col.field)" dense>
                            <template v-slot:append>
                                <q-icon v-if="column_options_selected[col.field].length > 0" name="close"
                                    @click.stop="column_options_selected[col.field] = []" class="cursor-pointer" />
                            </template>
                        </q-select>
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props" :class="props.rowIndex % 2 === 0
                    ? 'bg-teal-1  q-pa-none'
                    : 'bg-white  q-pa-none'
                    ">
                    <q-td class="q-pa-none" v-if="editable">
                        <div class="q-pa-none fit flex flex-center text-center non-selectable">
                            <div class="q-gutter-sm" :auto-width="true">
                                <q-checkbox v-model="props.selected" color="teal" />
                            </div>
                        </div>
                    </q-td>
                    <q-td :props="props" v-for="col in props.cols" :key="col.name" class="q-pa-none">
                        <json-viewer v-if="ifJSON(col.value)" :value="col.value"></json-viewer>
                        <div class="q-pa-none inline cursor-pointer" v-else>
                            <div class="
                  q-pa-none
                  fit
                  flex flex-center
                  text-center
                  non-selectable
                ">
                                {{ col.value }}
                            </div>
                        </div>
                    </q-td>
                </q-tr>
            </template>

            <template v-slot:top="props">
                <div class="col-12 col-md full-width ">
                    <div class="row q-gutter-sm text-h6 q-px-sm ">
                        <span class="row items-center text-h8  q-pa-none">{{
                            currentAcces != ''
                                ? `${setTitle} [${currentAcces}]`
                                : `${setTitle}`
                        }}</span>
                        <q-space />
                        <!--<span class="row items-center text-h8  q-pa-none">Visiteurs accueil RDC
                            &nbsp;<q-avatar color="blue" size="35px" font-size="20px"  text-color="white">{{ nbRdc }}</q-avatar>
                        </span>
                        <span>&nbsp;</span>-->
                        <span class="row items-center text-h8  q-pa-none">
                            Véhicules au PARKING &nbsp;<q-avatar color="teal" size="35px" font-size="20px"
                                text-color="white">{{
                                    nbParking
                                }}</q-avatar>
                        </span>
                        <span class="row items-center" v-if="nbResParking && String(nbResParking).trim() != ''">{{
                            nbResParking
                            }} réservations PARKING</span>
                    </div>
                    <q-separator class="q-my-sm bg-teal" />

                    <div class="row q-gutter-sm q-py-md">
                        <q-btn color="primary" dense no-caps @click="show_ExcelImport = true" class="q-px-sm"
                            v-if="useAdmin && !hideexcel">
                            <q-icon size="0.9em" name="far fa-file-excel" />
                            <q-icon size="0.9em" name="fas fa-arrow-right" />
                            <q-icon size="0.9em" name="fas fa-database" />

                            <div class="q-px-sm">Excel Init</div>
                        </q-btn>
                    </div>



                    <div class="row q-gutter-sm q-px-sm q-pb-md justify-center">
                        <q-btn-dropdown color="primary">
                            <template v-slot:label>
                                <div class="row items-center no-wrap">
                                    <q-icon left name="filter_alt" :color="currentAcces == '' || currentAcces == null
                                        ? 'white'
                                        : 'red'
                                        " />
                                    <div class="text-center">Lieu</div>
                                </div>
                            </template>
                            <q-list v-for="lieu in lieuAcces" :key="`lieu-${lieu}`">
                                <q-item clickable v-close-popup @click="filterTypeAcces(lieu)">
                                    <q-item-section>
                                        <q-item-label>{{ lieu }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>

                        <q-btn dense no-caps filled class="q-px-md text-subtitle2 text-bold text-primary bg-amber-3">
                            <div class="row items-center no-wrap">
                                <q-icon left name="filter_alt" :color="currentDateSel &&
                                    currentDateSel.from != '' &&
                                    currentDateSel.to != ''
                                    ? 'red'
                                    : 'primary'
                                    " />
                                <div class="text-center">
                                    Les visites entre le
                                    <span class="text-bold text-accent">{{
                                        Object(dateRange).hasOwnProperty('from')
                                            ? dateRange.from
                                            : null
                                    }}</span>
                                    et le (cliquez-ici)
                                    <span class="text-bold text-red">{{
                                        Object(dateRange).hasOwnProperty('to') ? dateRange.to : null
                                        }}</span>
                                </div>
                            </div>

                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="dateRange" :locale="myLocale" mask="DD/MM/YYYY" range minimal
                                    @range-end="filterRangeDate(dateRange)">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Fermer" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                            <q-tooltip content-class="text-dark text-subtitle2 text-center bg-amber">
                                Cliquez-ici pour voir les visites entre 2 dates
                            </q-tooltip>
                        </q-btn>

                        <q-btn dense no-caps filled shadow-4
                            class="q-px-md text-subtitle2 text-bold text-primary bg-amber-3">
                            <div class="row items-center no-wrap">
                                <q-icon left name="filter_alt" :color="dateSelected && dateSelected != '' ? 'red' : 'primary'
                                    " />
                                <div class="text-center">
                                    Visites pour
                                    <span
                                        :class="dateSelected && dateSelected != '' ? 'text-bold text-h6 text-red' : null">{{
                                            dateSelected
                                                &&
                                                dateSelected != '' ? dateSelected : 'la date' }}</span>
                                    (cliquez-ici)
                                </div>
                            </div>
                            <q-popup-proxy ref="btnDatej" transition-show="scale" transition-hide="scale">
                                <q-date v-model="dateSelected" :locale="myLocale" mask="DD/MM/YYYY" minimal
                                    @input="filterDateVisite(dateSelected), $refs.btnDatej.hide()">
                                </q-date>
                            </q-popup-proxy>
                            <q-tooltip content-class="text-dark text-subtitle2 text-center bg-amber">
                                Cliquez-ici pour voir les visites pour une date précise
                            </q-tooltip>
                        </q-btn>

                        <q-btn icon="filter_alt_off" color="primary" no-caps label="Effacer les filtres" @click="
                            (currentAcces = ''),
                            (customFilter = ''),
                            (dateSelected = null),
                            (currentDateSel = null),
                            (dateRange = null)
                            ">
                            <q-tooltip content-class="text-dark text-subtitle2 text-center bg-amber">
                                Cliquez-ici pour effacer les filtres
                            </q-tooltip>
                        </q-btn>
                        <q-btn label="Chronologie aujourd'hui" icon="timeline" no-caps @click="showTimeLine"
                            class="text-subtitle2 text-bold text-primary bg-amber-3"></q-btn>
                    </div>
                    <div class="row q-gutter-sm q-pb-md"></div>



                    <div class="row q-gutter-sm q-px-none q-pb-md full-width">
                        <q-input dense filled debounce="300" v-model="filter" placeholder="Recherche"
                            label-color="text-dark" style="width: 60%">
                            <q-icon name="search" />
                        </q-input>

                        <q-space />
                        <div v-if="allowexport" class="row items-center   ">
                            <div class="q-gutter-sm">
                                <q-btn dense flat no-caps class="bg-primary" text-color="white" icon="far fa-file-excel"
                                    label=".xlsx" @click="exportDatasExcel()" />
                                <q-btn dense no-caps flat class="bg-primary" text-color="white" icon="fas fa-file-csv"
                                    label=".csv" @click="exportCsvTable()" />
                                <q-btn dense no-caps flat filled class="bg-primary" text-color="white"
                                    icon="far fa-file-pdf" label=".pdf" @click="exportDatasPdf()" />
                            </div>

                        </div>

                        <q-select v-model="visibleColumns" multiple outlined dense options-dense
                            :display-value="$q.lang.table.columns" emit-value map-options :options="newColumns"
                            option-value="name" options-cover style="min-width: 150px" />
                        <q-btn color="primary" icon="add" no-caps @click="show_AddDialog = true" class="q-px-sm"
                            v-if="newColumns.length != 0 && showAdd">Nouveau Visiteur</q-btn>
                        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                            @click="props.toggleFullscreen" class="q-ml-md" />
                    </div>
                </div>
            </template>

            <template v-slot:bottom-row v-if="selected && selected.length > 0">
                <q-tr>
                    <q-td colspan="100%" class="q-pa-md">
                        <q-btn color="red" dense no-caps v-if="selected && selected.length > 0 && editable"
                            class="q-px-md q-mx-sm" @click="supPrevBtn">Supprimer</q-btn>
                        <q-btn color="grey-8" dense no-caps v-if="selected && selected.length > 0 && editable"
                            class="q-px-md q-mx-sm" @click="show_EditDialog = true">Modifier</q-btn>

                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <q-dialog v-model="show_EditDialog">
            <q-card style="width: 80%; max-width: 100%">
                <q-toolbar class="text-white full-width bg-blue">
                    <q-toolbar-title class="text-h5">
                        Modification !
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <q-card-section class="q-pa-md" style="width: 100%; max-width: 100%">
                    <f-vv-form-by-name ref="editForm"
                        :nameForm="(selectedRow.typeacces == 'PARKING') ? 'Demande Parking' : 'Accueil'"
                        :fieldsmodel="selectedRow" :hiddenFields="[{ chargeaccueil: currentUsername }]" class="q-pa-sm">
                    </f-vv-form-by-name>
                </q-card-section>
                <q-card-actions align="center" class="q-pa-md">
                    <div class=" row full-width q-gutter-xl items-center justify-center">
                        <q-btn label="Annuler" color="primary" v-close-popup @click="show_EditDialog = false"></q-btn>
                        <q-btn label="Modifier" color="primary" v-close-popup @click="updateRow">
                        </q-btn>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>


<script setup>
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


import { QSpinnerGears, QBtn, QTooltip } from 'quasar';

import DiagTimeLineJour from './DiagTimeLineJour.vue';


const $q = useQuasar();
const myLocale = {
    /* starting with Sunday */
    days: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
    daysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
    months:
        'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aôut_Septembre_Octobre_Novembre_Décembre'.split(
            '_'
        ),
    monthsShort: 'Jan_Fév_Mar_Avr_Mai_Jun_Jui_Aou_Sep_Oct_Nov_Déc'.split('_'),
    firstDayOfWeek: 0,
};

const objectsNotIn = (fobj, lobj) => {
    var arnotin = [];
    Object.keys(fobj).forEach((val) => {
        console.log('val :', val);
        if (!Object.keys(lobj).includes(val)) {
            arnotin.push(val);
        }
    });
    return arnotin;
};

const currentDateSel = ref(null);
const dateSelected = ref('');
const currentAcces = ref('');
const lieuAcces = ref([]);
const data = ref([]);
const currentFile = ref({});
const show_ExcelImport = ref(false);
const initialPagination = reactive({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 5,
    // rowsNumber: xx if getting data from a server
});
const visibleColumns = ref([]);
const show_AddDialog = ref(false);
const show_EditDialog = ref(false);
const newColumns = ref([]);
const editRow = ref({});
const selected = ref([]);
const selectedRow = ref({});
const dateRange = ref({});
const filter = ref('');
const filters = ref({});
const filtersParams = ref({});
const filtersOperator = ref({});
const filter_data = ref({});
const column_options = ref({});
const column_options_selected = ref({});
const datesFields = ref([]);
const customFilter = ref(null);
const datedujour = date.formatDate(Date.now(), 'DD/MM/YYYY');

const props = defineProps({
    datas: {
        type: Array,
        default: () => [],
        required: false,
    },
    dbname: {
        type: String,
        required: false,
    },
    dbtype: {
        type: String,
        required: false,
    },
    tablename: {
        type: String,
        default: 'mongodb',
        required: false,
    },
    query: {
        type: String,
        required: false,
    },
    columns: {
        type: Array,
        required: false,
    },
    headers_filter: {
        type: Boolean,
        default: false,
        required: false,
    },
    columns_filter: {
        type: Boolean,
        default: false,
        required: false,
    },
    labelsColumns: {
        type: Array,
        default: null,
        required: false,
    },
    editable: {
        type: Boolean,
        default: true,
        required: false,
    },
    hideid: {
        type: Boolean,
        default: true,
        required: false,
    },
    excelimport: {
        type: Boolean,
        default: false,
        required: false,
    },
    allowexport: {
        type: Boolean,
        default: false,
        required: false,
    },
    hideexcel: {
        type: Boolean,
        default: true,
        required: false,
    },
    titre: {
        type: String,
        default: '',
        required: false,
    },
    useAdmin: {
        type: Boolean,
        default: false,
        required: false,
    },
    selectable: {
        type: Boolean,
        default: false,
        required: false,
    },
    showAdd: {
        type: Boolean,
        default: false,
        required: false,
    },
})

const currentUsername = computed(() => {
    const auth = useAuthStore();
    return auth?.user?.sAMAccountName;
});


const setTitle = computed(() => {
    if (props.titre === '') {
        return props.dbname;
    } else {
        return props.titre;
    }
});

const liveDatas = computed(() => {
    if (!props.dbtype || !props.dbname) {
        return [...props.datas];
    }

    if (Array.isArray(customFilter.value)) {
        return customFilter.value;
    } else {
        return props.datas;
    }
});

const useSelection = computed(() => {
    if (props.editable || props.selectable) {
        return 'single';
    } else {
        return 'none';
    }
});

const nbRdc = computed(() => {
    return liveDatas.value.filter(
        (item) => item.typeacces == 'RDC' && item.etat != 'parking'
    ).length;
});

const nbParking = computed(() => {
    return liveDatas.value.filter(
        (item) => item.typeacces == 'PARKING' && item.etat == 'parking'
    ).length;
});

const nbResParking = computed(() => {
    return null;
});

const useSelected = computed({
    get() {
        if (props.editable || props.selectable) {
            return selected.value;
        } else {
            return [];
        }
    },
    set(val) {
        selected.value = val;
    },
});

/*const visiteursDuJour = computed(() => {
    if (
        !store.state.admin.visiteurs ||
        !Array.isArray(store.state.admin.visiteurs)
    )
        return;
    return store.state.admin.visiteurs
        .filter(
            (elt) =>
                elt.datevisite == dateDujour.value &&
                elt.etat != 'attente' &&
                elt.etat != 'efface'
        )
        .sort((a, b) => {
            var dateA = a.heurevisite;
            var dateB = b.heurevisite;
            return dateA < dateB ? 1 : -1;
        });
});*/



/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
function filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
        // validates all filter criteria
        return filterKeys.every((key) => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
        });
    });
}
/**
 *Myr!(Object(dateRange).hasOwnProperty('from'))?dateRange.from:nul
 */
function ifJSON(field) {
    try {
        if (
            Object.prototype.toString.call(field) === '[object Object]' ||
            Array.isArray(field)
        ) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
/**
 *  Chargement de données depuis un fichier excel
 */
function onChange(files) {
    let file = files ? files[0] : null;
    console.log('File :', file);
    this.currentFile = file;
    const target = file;
    console.log('Files data :', target);
    const reader = new FileReader();
    reader.onload = (e) => {
        // read workbook //
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
            type: 'binary',
            cellDates: true,
        });
        /*  grab first sheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        if (this.data) {
            /* save data */
            this.data = XLSX.utils.sheet_to_json(ws, {
                header: 0,
                raw: true,
            });
        }
        console.log('Datas :', this.data);
        let dataHeader = XLSX.utils.sheet_to_json(ws, {
            header: 1,
            raw: true,
        });
        console.log('Datas headers :', dataHeader);
        //if (this.data.length>0) {
        // this.showInitTable = true;
        //}
        console.log('Datas with header :', dataHeader.length);
        //this.idatas = data; //this.data;//this.route.snapshot.paramMap.get('datas');
        if (Array.isArray(dataHeader) && dataHeader.length > 0) {
            this.newColumns = [];
            //this.selectedCols = [];
            //this.memColumns = [];
            console.log(
                'Keys headers :',
                JSON.parse(JSON.stringify(dataHeader[0]))
            );
            //this.headerKey= dataHeader[0][1];
            let headers = JSON.parse(JSON.stringify(dataHeader[0]));
            let cheaders = headers.map((elt) => `${String(elt).trim()}`);
            console.log('Keys headers :', cheaders);
            this.visibleColumns = cheaders;
            headers.forEach((val) => {
                if (typeof val == 'string') {
                    //const row = { name: val, field: val, label: val ,sortable: true};
                    //this.selectedCols.push(val);
                    this.newColumns.push({
                        name: val,
                        field: val,
                        label: val,
                        sortable: true,
                    });
                    //this.memColumns.push({ name: val, field: val, label: val ,sortable: true});
                }
            });
            //console.log("Mem Champs :",this.memColumns);
        }
    };
    reader.readAsBinaryString(file);
}
async function saveToDatabase() {
    let datas = Object.assign([], this.data);
    let emptyArr = [];
    this.data = Object.assign([], emptyArr);
    if (!Array.isArray(datas)) {
        return;
    }
    datas.forEach(async (data) => {
        await api
            .service(`/mongo/${props.dbname}/${props.tablename}`)
            .create(JSON.parse(JSON.stringify(data)));
    });
    if (datas.length > 0) {
        const cols = Object.keys(datas[0]);
        console.log('Columns :', cols);
        //  transform ['nom','prenom'] en { nom:'',prenom:''}
        this.editRow = cols.reduce(
            (column, key) => ((column[key] = ''), column),
            {}
        );
        this.newColumns = cols.map((col) => ({
            name: col,
            align: 'center',
            label: col,
            field: col,
            sortable: true,
        }));
    }
    this.visibleColumns = Object.assign([], this.newColumns);
    if (this.hideid) {
        this.visibleColumns = Object.assign(
            [],
            this.visibleColumns
                .filter((col) => col.field != '_id')
                .map((o) => `${o.field.trim()}`)
        );
        console.log('Visible columns :', this.visibleColumns);
    }
    setTimeout(async () => {
        await this.updateDatas();
        this.show_ExcelImport = false;
    }, 1000);
}
function exportDatasExcel() {
    XLSX.then((xlsx) => {
        let columns;
        let body;
        let exportdatas;
        /*if ( Array.isArray(this.selectedLines) && this.selectedLines.length>0) {
                          exportdatas = this.selectedLines;
                        } else {
                          exportdatas = this.rdatas;
                        }*/
        exportdatas = this.data;
        if (this.newColumns.length > 0) {
            const expDatas = [];
            exportdatas.forEach((elt, elti, eltarr) => {
                let obj = {};
                this.newColumns.forEach((val, index, arr) => {
                    obj[val.name] = elt[val.field];
                });
                console.log('données exportables:', obj);
                expDatas.push(obj);
            });

            columns = this.newColumns; //this.exportDatasColumns;
            body = expDatas;
        } else {
            //columns = this.exportDatasColumns;
            //columns = this.exportDatasColumns;
            let newexp = [];
            this.newColumns.forEach((col) => {
                let obj = {
                    title: col.name,
                    dataKey: col.field,
                };
                if (col.name != 'Actions') {
                    newexp.push(obj);
                }
            });
            console.log('Columns :', newexp);
            columns = newexp;
            const expDatas = [];
            exportdatas.forEach((elt, elti, eltarr) => {
                let obj = {};
                this.newColumns.forEach((val, index, arr) => {
                    obj[val.name] = elt[val.field];
                });
                console.log('données exportables:', obj);
                expDatas.push(obj);
            });
            body = expDatas; //this.rdatas;
        }

        body.map((x) => {
            delete x._id;
            return x;
        });

        let Heading = [
            columns
                .filter((o) => o.name != '_id')
                .map((x) => {
                    return x.name;
                }),
        ];

        const ws = XLSX.utils.book_new();
        xlsx.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        const worksheet = xlsx.utils.sheet_add_json(ws, body, {
            origin: 'A2',
            skipHeader: true,
        });

        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        // to csv
        //const csvcontent = xlsx.utils.sheet_to_csv(worksheet, { FS: ';' })

        //this.saveAsExcelFile(excelBuffer, "datas");
        const status = exportFile(
            'table-export.xlsx',
            excelBuffer,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        );

        if (status !== true) {
            this.$q.notify({
                message: 'Browser denied file download...',
                color: 'negative',
                icon: 'warning',
            });
        }
    });
}
function exportDatasPdf() {
    autoTable.then((objdoc) => {
        const doc = new jsPDF();
        let columns;
        let body;
        if (this.newColumns.length > 0) {
            const expDatas = [];
            this.data.forEach((elt, elti, eltarr) => {
                let obj = [];
                this.newColumns.forEach((val, index, arr) => {
                    if (val.field != '_id') {
                        obj.push(elt[val.field]);
                    }
                });
                console.log('données exportables:', obj);
                expDatas.push(obj);
            });
            let tmpcols = Object.assign([], this.newColumns);
            delete tmpcols._id;
            columns = [
                tmpcols
                    .filter((o) => o.name != '_id')
                    .map((x) => {
                        return x.name;
                    }),
            ];

            body = expDatas;
        }
        //

        console.log('Columns :', columns);
        console.log('Body :', body);

        autoTable(doc, { head: columns, body: body }); //.autoTable((this.exportVisiblesCols.length==0)?this.exportDatasColumns:this.exportVisiblesCols, this.rdatas);
        //autoTable.default(doc, { html: '#my-table' })
        doc.save('export-table.pdf');
    });
}
function exportCsvTable() {
    XLSX.then((xlsx) => {
        let columns;
        let body;
        let exportdatas;

        exportdatas = this.data;
        if (this.newColumns.length > 0) {
            const expDatas = [];
            exportdatas.forEach((elt, elti, eltarr) => {
                let obj = {};
                this.newColumns.forEach((val, index, arr) => {
                    obj[val.name] = elt[val.field];
                });
                console.log('données exportables:', obj);
                expDatas.push(obj);
            });

            columns = this.newColumns; //this.exportDatasColumns;
            body = expDatas;
        } else {
            //columns = this.exportDatasColumns;
            //columns = this.exportDatasColumns;
            let newexp = [];
            this.newColumns.forEach((col) => {
                let obj = {
                    title: col.name,
                    dataKey: col.field,
                };
                if (col.name != 'Actions') {
                    newexp.push(obj);
                }
            });
            console.log('Columns :', newexp);
            columns = newexp;
            const expDatas = [];
            exportdatas.forEach((elt, elti, eltarr) => {
                let obj = {};
                this.newColumns.forEach((val, index, arr) => {
                    obj[val.name] = elt[val.field];
                });
                console.log('données exportables:', obj);
                expDatas.push(obj);
            });
            body = expDatas; //this.rdatas;
        }

        body.map((x) => {
            delete x._id;
            return x;
        });

        let Heading = [
            columns
                .filter((o) => o.name != '_id')
                .map((x) => {
                    return x.name;
                }),
        ];
        const ws = XLSX.utils.book_new();
        xlsx.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        const worksheet = xlsx.utils.sheet_add_json(ws, body, {
            origin: 'A2',
            skipHeader: true,
        });

        // to csv
        const csvcontent = xlsx.utils.sheet_to_csv(worksheet, { FS: ',' });

        //this.saveAsExcelFile(excelBuffer, "datas");
        const status = exportFile('table-export.csv', csvcontent, 'text/csv');

        if (status !== true) {
            this.$q.notify({
                message: 'Browser denied file download...',
                color: 'negative',
                icon: 'warning',
            });
        }
    });
}
function rowSelect(evt, row, index) {
    this.$emit('row-click', evt, row, index);
}
/*...mapActions('tables', {
    getDatas: 'getTableQuery',
}),*/
function whereDateYearEq(annee) {
    return (item) => item.split('/')[2] === annee;
}
function whereDateMonthrEq(annee) {
    return (item) => item.split('/')[2] === annee;
}
function whereDateDayEq(annee) {
    return (item) => item.split('/')[2] === annee;
}
function whereContain(search) {
    return (item) =>
        String(item).toLowerCase().indexOf(search.toLowerCase()) != -1;
}
function whereDateBetween(date1, date2) {
    return (item) =>
        date.isBetweenDates(
            new Date(item.split('/')[2], item.split('/')[1], item.split('/')[0]),
            new Date(
                date1.split('/')[2],
                date1.split('/')[1],
                date1.split('/')[0]
            ),
            new Date(
                date2.split('/')[2],
                date2.split('/')[1],
                date2.split('/')[0]
            ),
            { onlyDate: true, inclusiveFrom: true, inclusiveTo: true }
        );
}
function whereDateDuJour(datej) {
    let cdate = new Date(
        datej.split('/')[2],
        datej.split('/')[1],
        datej.split('/')[0]
    );
    return (item) =>
        date.isSameDate(
            new Date(item.split('/')[2], item.split('/')[1], item.split('/')[0]),
            cdate
        );
}
function whereTypeAcces(acces) {
    return (item) => String(item).trim() == acces;
}
function filterRangeDate(datesel) {
    console.log('test datesel', datesel);
    if (
        datesel &&
        Object(datesel).hasOwnProperty('from') &&
        Object(datesel).hasOwnProperty('to')
    ) {
        console.log('test datesel 1 :', datesel);
        this.currentDateSel = Object.assign({}, datesel);
        if (datesel.from && datesel.to) {
            this.filters['datevisite'] = this.whereDateBetween(
                datesel.from,
                datesel.to
            );
            console.log('filtre :', this.filters['datevisite']);
            this.customFilter = this.filterArray(this.data, this.filters);
        }
    }
}
function filterDateVisite(sdate) {
    if (sdate) {
        this.filters['datevisite'] = this.whereDateDuJour(sdate);
        this.customFilter = this.filterArray(this.data, this.filters);
    }
}
function filterTypeAcces(val) {
    if (val) {
        this.currentAcces = val;
        this.filters['typeacces'] = this.whereTypeAcces(val);
        this.customFilter = this.filterArray(this.data, this.filters);
    }
}
function filterColumn(val) {
    console.log('Filter data :', this.filter_data);
    console.log('Value :', val);
    console.log(
        'Donnees :',
        this.data.filter(
            (row) =>
                String(row[Object.keys(this.filter_data)[0]]).indexOf(val) != -1
        )
    );
    const fdata = Object.entries(this.filter_data).map(([key, value]) => ({
        key,
        value,
    }));
    console.log('Donnees :', fdata);
    fdata.forEach((elt) => {
        this.filters[elt.key] = this.whereContain(elt.value);
    });
    this.customFilter = this.filterArray(this.data, this.filters);
    // Object.assign([],this.data.filter(row => this.filter_data.every(val => String(row[Object.keys(this.filter_data)[0]]).indexOf(val)!=-1)))
}
/**
 *   MIse à jour des données pour filtrer les entetes de colonnes
 */
function updateFilters(objScope, headerToFiltre) {
    console.log('Object SCOPE :', objScope);

    if (Object(objScope.value).hasOwnProperty('option')) {
        if (objScope.value.option && objScope.value.option === 'annee') {
            this.filters[`${headerToFiltre}`] =
                objScope.value.value != ''
                    ? this.whereDateYearEq(objScope.value.value)
                    : '';
        }
        if (objScope.value.option && objScope.value.option === 'mois') {
            this.filters[`${headerToFiltre}`] =
                objScope.value.value != ''
                    ? this.whereDateMonthEq(objScope.value.value)
                    : '';
        }
        if (objScope.value.option && objScope.value.option === 'jour') {
            this.filters[`${headerToFiltre}`] =
                objScope.value.value != ''
                    ? this.whereDateDayEq(objScope.value.value)
                    : '';
        }
    }
    console.log('Filters :', this.filters);
    console.log('Filters Params:', this.filtersParams);
    console.log('Colonne filtre update :', headerToFiltre);
    //this.filters['dateentree'] = this.whereDateYearEq('2021')//(item) => item.split('/')[2] === '2020'
    //this.filters['usercacem'] = this.whereContain('Herve')
    this.customFilter = this.filterArray(this.data, this.filters);
    objScope.set();
}
function getColumnOptions(column) {
    let column_option_simple = [
        ...new Set(this.data.map((item) => item[column])),
    ];
    let column_option = [];
    column_option_simple.filter(function (col) {
        column_option.push({
            label: col.toString(),
            value: col.toString().toLowerCase().replace(/_/g, '_'),
        });
        return col;
    });
    return column_option;
}
/**
 *  delete filter
 */
function deleteFilters(objScope, headerToFiltre) {
    //  vide tous les entetes de colonnes a filtrer
    this.filters[`${headerToFiltre}`] = '';
    this.customFilter = this.filterArray(this.data, this.filters);
    // vide la valeur du filtre de l'entête a filtrer
    this.filtersParams[`${headerToFiltre}`].value = '';
    //this.$refs[`filter_${headerToFiltre}`].cancel()
    objScope.set();
}
async function addRow() {
    if (this.newColumns.length == 0) {
        return;
    }
    console.log('Edit rows :', this.editRow);
    //this.data.push(this.editRow)
    const addrow = await this.$store.dispatch('tables/create', [
        this.editRow,
        {
            query: {
                tableDb: this.dbtype,
                tableName: this.dbname,
            },
        },
    ]);
    console.log('Added row :', addrow);
    await this.updateDatas();
}
async function updateRow() {
    console.log('Edit rows :', selectedRow.value);
    delete this.$refs['editForm'].fieldData._id;
    console.log('Form datas :', this.$refs['editForm'].fieldData);
    if (selectedRow.value) {
        //Object.assign(this.data[this.selectedRow._id],this.$refs['editForm'].fieldData);
        /*
        const updaterow = await feathersClient
            .service('tables')
            .update(this.selectedRow._id, this.$refs['editForm'].fieldData, {
                query: {
                    tableDb: this.dbtype,
                    tableName: this.dbname,
                },
            });
        console.log('Données modifiées :', updaterow);
        */
        await updateDatas();
    }
}
async function addFormDatas(fieldsValues) {
    this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'red',
        message: 'Chargement en cours...',
        delay: 1000,
        sanitize: true
    });
    await addVisiteur(fieldsValues);
    $q.loading.hide();
    console.log('Valeur des champs :', fieldsValues);
}
/**
 *  Mise a jour des donnees depuis la base de donnees
 */
async function updateDatas() {
    let tmpFormDatas;
    let formFields;

    const tmpdatas = Object.assign([], this.data);/*.filter(
                (o) => ((o.etat != 'attente') && (o.etat != 'efface')) || !Object(o).hasOwnProperty('etat')
            );*/
    console.log('Table result info data :', this.data);
    console.log('Table result info avant parking :', this.data.filter((o) => o.typeacces == 'PARKING'));

    //if (this.data.length > 0) {
    const countkeys = tmpdatas.map((o) => `${Object.keys(o).length}`);
    console.log('Count keys :', countkeys);
    const maxlen = Math.max(...countkeys);
    const minlen = Math.min(...countkeys);
    console.log('Nb max props :', maxlen);
    console.log('Nb min props :', minlen);
    const maxCols = countkeys.findIndex(
        (item) => Number(item) == Number(maxlen)
    );

    console.log('Nb maxCols props :', maxCols);
    const dbdata = Object.assign([], tmpdatas);

    console.log('Data max :', dbdata[maxCols]);

    const minCols = countkeys.findIndex(
        (item) => Number(item) == Number(minlen)
    );



    console.log('Data min :', dbdata[minCols]);
    const fusionObj = Object.assign({}, dbdata[maxCols], dbdata[minCols]);

    console.log('Fusion Obj :', fusionObj);
    let cols = Object.keys(fusionObj);
    console.log('Columns :', cols);
    console.log('Table result info entre parking :', tmpdatas.filter((o) => o.typeacces == 'PARKING'));


    /**
     *  recupération des infos du formulaire associé spécifique pour mode
     *  avec formulaire associé
     */
    tmpFormDatas = await feathersClient.service('tables').find({
        query: {
            tableDb: 'cacemdb',
            tableName: 'formulaires',
            query: JSON.stringify({
                query: { uid: 'c1fe350f-95d2-4996-93a6-c03a7545b883' },
            }),
        },
    });
    console.log(
        'INFOS Formulaire associé Demande Parking :',
        tmpFormDatas
    );
    /**
    * filtre lieu d'accès
    */

    this.lieuAcces = ['PARKING', 'RDC', 'GPU', 'GCD'];


    //  transform ['nom','prenom'] en { nom:'',prenom:''}
    this.editRow = cols.reduce(
        (column, key) => ((column[key] = ''), column),
        {}
    );

    /**
     * prise en compte de tous les champs possible des données de la table
     */
    const compCols = [];

    tmpdatas.forEach((val, index) => {
        compCols.push({
            orig: Object.keys(val).length,
            col: Object.keys(this.editRow).length,
            obbj: this.objectsNotIn(val, this.editRow),
        });
        if (this.objectsNotIn(val, this.editRow).length > 0) {
            let newrow = this.objectsNotIn(val, this.editRow).reduce(
                (column, key) => ((column[key] = ''), column),
                {}
            );
            this.editRow = Object.assign(this.editRow, newrow);
        }
    });
    console.log('New edit row :', this.editRow);
    cols = Object.keys(this.editRow);

    this.newColumns = cols.map((col) => ({
        name: col,
        align: 'center',
        label: col,
        field: col,
        sortable: true,
    }));

    console.log('NEw Columns :', this.editRow);

    console.log('COLONNES  COMP : ', compCols);

    // colonnes à afficher
    if (this.labelsColumns && this.labelsColumns.length > 0) {
        console.log('Label :', this.labelsColumns);
        console.log('Columns :', this.newColumns);
        this.labelsColumns.forEach((val, index) => {
            if (val.id && val.label) {
                let i = this.newColumns.findIndex((o) => o.name == val.id);
                console.log('Index :', i);
                if (i != -1) {
                    this.newColumns[i].label = val.label;
                }
            }
        });
    } else {
        if (tmpFormDatas && tmpFormDatas.length == 1 && formFields) {
            //let formFields = tmpFormDatas[0].data;
            this.datesFields = [];
            formFields.forEach((val, index) => {
                if (this.newColumns.findIndex((o) => o.name == val.id) != -1) {
                    let i = this.newColumns.findIndex((o) => o.name == val.id);
                    this.newColumns[i].label = String(val.label)
                        .trim()
                        .replace(':', '');
                    if (val.field_type == 'date') {
                        this.datesFields.push(val.id);
                    }
                }
            });

            console.log('Champs types date :', this.datesFields);
            console.log(' Form Columns :', this.newColumns);
        } else {
            const labels = Object.assign(
                [],
                this.newColumns.map((o) => ({ id: o.name, label: o.name }))
            );
            labels.forEach((val, index) => {
                if (val.id && val.label) {
                    let i = this.newColumns.findIndex((o) => o.name == val.id);

                    this.newColumns[i].label = val.label;
                }
            });
            console.log('Columns :', this.newColumns);
        }
    }
    //}


    this.visibleColumns = Object.assign([], this.newColumns);
    console.log('Visible columns :', this.visibleColumns);
    if (this.hideid && (!this.editable || !this.selectable)) {
        let tmp = Object.assign(
            [],
            this.visibleColumns
                .filter((col) => col.field != '_id')
                .map((o) => `${o.field.trim()}`)
        );
        this.visibleColumns = Object.assign([], tmp);
        console.log('Visible columns :', this.visibleColumns);
    } else {
        let tmp = Object.assign(
            [],
            this.visibleColumns.map((o) => `${o.field.trim()}`)
        );
        this.visibleColumns = Object.assign([], tmp);
        console.log('Visible columns :', this.visibleColumns);
    }

    //-----------------------------------------------
    if (this.filters === null || this.filters.length === 0) {
        this.filters = this.visibleColumns.reduce(
            (column, key) => ((column[key] = ''), column),
            {}
        );
    }

    if (this.filtersParams === null || this.filtersParams.length === 0) {
        this.filtersParams = this.visibleColumns.reduce(
            (column, key) => ((column[key] = {}), column),
            {}
        );
    }

    console.log('Table result info parking :', tmpdatas.filter((o) => o.typeacces == 'PARKING'));
    console.log('Filters :', this.filters);
    console.log('Filters Params:', this.filtersParams);
    //this.filters['dateentree'] = this.whereDateYearEq('2021')//(item) => item.split('/')[2] === '2020'
    //this.filters['usercacem'] = this.whereContain('Herve')
    this.customFilter = this.filterArray(tmpdatas, this.filters);

    //-----------------------------------------------
    console.log('Custom filter :', this.customFilter);
}
async function deletedRow() {
    if (this.selected.length == 1) {
        const delrow = await this.$store.dispatch('tables/remove', [
            this.selected[0]._id,
            {
                query: {
                    tableDb: this.dbtype,
                    tableName: this.dbname,
                },
            },
        ]);
        console.log('Deleted row :', delrow);
        await this.updateDatas();
    }
}
function showTimeLine() {
    console.log('Visiteurs du jour :', this.visiteursDuJour);
    this.$q
        .dialog({
            component: DiagTimeLineJour,
            visiteursJour: this.visiteursDuJour,
            twidth: '70%',
        })
        .onOk(async (conf) => {
            console.log('OK timeline');
        })
        .onCancel(() => {
            console.log('Cancel');
        })
        .onDismiss(() => {
            console.log('Called on OK or Cancel');
        });
}
function supPrevBtn() {
    this.$q
        .dialog({
            title: 'Confirmation',
            message: 'Vous allez supprimer définitivement cette ligne ?',
            ok: {
                push: true,
                label: 'Oui',
                color: 'negative',
            },
            cancel: {
                push: true,
                label: 'Non',
            },
            persistent: true,
        })
        .onOk(async () => {
            await deletedRow();
        })
        .onCancel(() => {
            return;
        })
        .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
        });
}



watch(
    () => props.scope,
    (evt) => {
        console.log('SCOPE EVENT :', evt);
    }
);

watch(
    () => props.selected,
    (newVal) => {
        if (newVal.length > 0) {
            Object.assign(props.selectedRow, newVal[0]);
            emit('row-click', 'case à cocher', props.selectedRow);
        }
    }
);

watch(
    () => props.data,
    (newVal) => {
        console.log('Table data:', newVal);
    }
);

watch(
    () => props.selectedRow,
    () => {
        console.log('Changement de données');
    }
);



onBeforeMount(() => {


    if (props.dbname && props.tablename) {
        console.log('Query :', Object.entries(JSON.parse(props.query)).map(([key, val]) => ({ key: key, val: val })))
        const { api } = useFeathers()
        api.service(`/mongo/${props.dbname}/${props.tablename}`).find({
            query: props.query,

        }).then(async (res) => {
            console.log('Table :', res);
            console.log('DbName :', props.dbname);
            data = Object.assign([], res);
            //map((o) =>(!Object(o).hasOwnProperty('etat'))?({...o,etat:''}):({...o})).filter((o) => ((o.etat != 'attente') && (o.etat != 'efface') && (o.etat != 'sortie')) )
            await this.updateDatas();
        });

    } else {
        data = Object.assign([], this.datas);
    }
})

onMounted(() => {
    if (this.dbname && this.tablename) {
        console.log('Query :', Object.entries(JSON.parse(this.query)).map(([key, val]) => ({ key: key, val: val })))
        Table.find({
            query: {
                tableDb: this.dbname,
                tableName: this.tablename,
                query: JSON.stringify(JSON.parse(this.query)),
            },
        }).then(async (res) => {
            console.log('Table :', res);
            console.log('DbName :', this.dbname);
            this.data = Object.assign([], res);
            await this.updateDatas();
        });

    } else {
        this.data = Object.assign([], this.datas);
    }

})


</script>

<style></style>
