<template>
  <q-dialog ref="timedialog" @hide="onDialogHide" class="q-pa-none">
    <q-card class="q-dialog-plugin q-pa-none" :style="`width:${twidth}; max-width:90%`">
      <q-card-section class="q-pa-none">
        <q-bar class="bg-primary text-white">
          <q-space />
          <q-btn dense flat icon="close" @click="hide()" />
        </q-bar>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div class="q-px-lg q-pb-md">
          <q-timeline :layout="layout" color="secondary">
            <q-timeline-entry heading>
              Visiteurs du jour
              <!--<br>
            ({{$q.screen.lt.sm ? 'Dense' : ($q.screen.lt.md ? 'Comfortable' : 'Loose')}})-->
            </q-timeline-entry>

            <q-timeline-entry v-for="(visiteur, idx) in visiteursJour" :key="`visiteur_jour_${idx}`"
              :title="`${visiteur.prenom} ${visiteur.nom} ${(visiteur.typeacces == 'PARKING') ? '- entrée Parking' : ''}`"
              :subtitle="`${visiteur.heurevisite}`" side="left">
              <div>
                <span class="text-caption text-bold">Agent :</span>{{ visiteur.contactinterne }}
              </div>
              <div>
                <span class="text-caption text-bold">Motif :</span>{{ visiteur.motif }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card-section>

    </q-card>

  </q-dialog>
</template>

<script>
import { FeathersVuexFind, FeathersVuexGet, FeathersVuexCount } from 'feathers-vuex'
import { mapState, mapActions } from 'vuex';
import { colors, QSpinnerGears, QSpinnerPie } from 'quasar';
import { date, openURL } from 'quasar';
import { defineComponent } from '@vue/composition-api';
//import FVvTable from 'components/FVvTable.vue'


const sortByDate = (arr) => {
  arr.sort(function (a, b) {
    return Number(new Date(a.readableDate)) - Number(new Date(b.readableDate));
  });

  return arr;
}



export default defineComponent({
  name: 'DiagTimeLineJour',
  components: {

  },
  data() {
    const myLocale = {
      /* starting with Sunday */
      days: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
      daysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
      months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aôut_Septembre_Octobre_Novembre_Décembre'.split(
        '_'
      ),
      monthsShort: 'Jan_Fév_Mar_Avr_Mai_Jun_Jui_Aou_Sep_Oct_Nov_Déc'.split('_'),
      firstDayOfWeek: 0
    };
    return {
      data: [],
      columns: [],
      selected: [],
      filter: '',
      datedujour: date.formatDate(Date.now(), 'DD/MM/YYYY')
    }
  },
  props: {
    visiteursJour: {
      type: Array,
      required: false
    },
    twidth: {
      type: String,
      default: '90%',
      required: false
    }
  },
  computed: {
    layout() {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  },
  methods: {

    onRowClick(evt, row) {
      console.log('Row :', row)
      this.$emit('ok', row)

      // then hiding dialog
      this.hide()
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {

      console.log('Les visiteurs du jour :', this.visiteursJour)
      this.$refs.timedialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.timedialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    }
  },
  async mounted() {
    console.log('TIMELINE')

    //const dbdatas = await this.$store.dispatch('tables/find',{query:{tableDb:this.dbtype,tableName:this.dbname,query:JSON.stringify({})}});//this.getDatas([this.dbtype,this.dbname,{}])
    //console.log("Datas :",dbdatas);
    //this.data = dbdatas;

  }
})
</script>
