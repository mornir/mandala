<template>
    <v-layout row justify-center>
        <v-flex xs7>
            <v-stepper v-model="stepCount" vertical>
                <v-stepper-items>
                    <v-stepper-step step="1" :complete="stepCount > 1" editable editIcon="check">
                        Mandant
                    </v-stepper-step>

                    <!-- MANDANT -->
                    <v-stepper-content step="1">
                        <div class="stepCard">
                            <v-layout row wrap justify-center>

                                <v-flex xs4 class="mr-2">
                                    <v-select :items="centres" v-model="mandat.centre_coûts" label="Centre de coûts" @input="rebind"></v-select>
                                </v-flex>
                                <v-flex xs5>
                                    <v-select :items="mandants" v-model="mandat.mandant"  :hint="mandat.mandant.département" persistent-hint label="Mandant" item-value="text" return-object></v-select>
                                </v-flex>
                                <v-flex xs9>
                                    <v-text-field v-model.trim="mandat.nom" box label="Nom du mandat"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </div>
                        <v-btn color="primary" @click="stepCount = 2" >Suivant</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="2" editable :complete="stepCount > 2" editIcon="check">Fichiers</v-stepper-step>

                    <!-- Fichiers -->
                    <v-stepper-content step="2">
                        <div class="stepCard">
                            <v-layout row justify-center>
                                <v-flex xs2>
                                    <img src="../assets/Word.png" alt="Word" width="50px">
                                </v-flex>
                                <v-flex xs2>
                                    <img src="../assets/Excel.png" alt="Excel" width="50px">
                                </v-flex>
                                <v-flex xs2>
                                    <img src="../assets/PPT.png" alt="PPT" width="50px">
                                </v-flex>
                                <v-flex xs2>
                                    <img src="../assets/PDF.png" alt="PDF" width="50px">
                                </v-flex>
                            </v-layout>
                            <v-layout class="mb-2" justify-center>
                                <v-flex xs2 v-for="(file, index) in mandat.fichiers" :key="file.fichier">
                                    <input name="file.fichier" v-model.number="file.nombre" type="number" min="0" style="width: 50px;">
                                </v-flex>
                            </v-layout>
                        </div>
                        <v-btn color="primary" @click="stepCount = 3">Suivant</v-btn>
                        <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="3" editable editIcon="check" :complete="stepCount > 3">Date d'arrivée et délai</v-stepper-step>

                    <!-- Date d'arrivée et délai -->
                    <v-stepper-content step="3">
                        <div class="stepCard">
                            <v-layout row class="ml-3">
                                <v-flex xs6>
                                    <v-layout column>
                                        <h4 class="headline">
                                            Arrivée</h4>
                                    <v-date-picker v-model="mandat.arrivée" actions
                                    :allowed-dates="disableWeekends"  locale="fr-FR" first-day-of-week="1"
                                    no-title></v-date-picker>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6>
                                       <v-layout column>
                                              <h4 class="headline">Délai</h4>
                                    <v-date-picker v-model="mandat.délai" 
                                    :allowed-dates="disableWeekends" actions locale="fr-FR" first-day-of-week="1"
                                    no-title ></v-date-picker>
                                       </v-layout>
                                </v-flex>

                            </v-layout>
                        </div>
                        <v-btn color="primary" @click="stepCount = 4">Suivant</v-btn>
                        <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="4" editable editIcon="check" :complete="stepCount > 4">Heure et priorité</v-stepper-step>

                    <!-- Heure et priorité -->
                    <v-stepper-content step="4">
                        <div class="stepCard">
                            <v-layout row align-center>
                                <v-flex xs12>
                                    <v-time-picker v-model="mandat.heure" format="24hr"></v-time-picker>
                                </v-flex>
                                <v-flex xs7>

                                    <v-checkbox label="Mandat prioritaire" v-model="mandat.priorité" color="red" :error="mandat.priorité === 'Prioritaire'" true-value="Prioritaire" false-value="Ordinaire">
                                    </v-checkbox>

                                </v-flex>
                                <v-flex xs5>
                                    <span v-if="mandat.priorité === 'Prioritaire'" style="font-size:28px">⏳</span>
                                </v-flex>
                            </v-layout>
                        </div>
                        <v-btn color="primary" @click="stepCount = 5">Suivant</v-btn>
                        <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="5" editable :complete="stepCount > 5" editIcon="check">Situation de communication</v-stepper-step>

                    <!-- Situation de communication -->
                    <v-stepper-content step="5">
                        <div class="stepCard">
                            <v-layout row wrap justify-center>
                                <v-flex xs8>
                                    <v-text-field box v-model.trim="mandat.public_cible" label="Public cible"></v-text-field>
                                </v-flex>
                                <v-flex xs4 class="mr-2">
                                    <v-select :items="textTypes" v-model="mandat.type" label="Type de texte"></v-select>
                                </v-flex>
                                <v-flex xs4 class="mr-2">
                                    <v-select :items="activities" v-model="mandat.activité" label="Activité"></v-select>
                                </v-flex>

                            </v-layout>
                        </div>
                        <v-btn color="primary" @click="stepCount = 6">Suivant</v-btn>
                        <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="6" editable editIcon="check" :complete="stepCount > 6">Traduction</v-stepper-step>

                    <!-- Traduction -->
                    <v-stepper-content step="6">
                        <div class="stepCard">
                            <v-layout row wrap justify-center>

                                <v-flex xs7>
                                    <img src="../assets/germany.svg" alt="German" width="40px" height="40px">
                                    <v-btn icon class="black--text  mb-5" @click="toggleDirection">
                                        <v-icon>{{arrowDirection}}</v-icon>
                                    </v-btn>
                                    <img src="../assets/france.svg" alt="French" width="40px" height="40px">
                                </v-flex>
                                <v-flex xs2>
                                    <v-checkbox label="Trados" info hide-details v-model="mandat.TAO" true-value="Oui" false-value="Non" color="primary"/>
                                </v-flex>
                                <v-flex xs9>
                                    <label class="subheading">Charge de travail estimée :
                                        <span class="title">
                                            <b>{{pageNumber}}</b>
                                        </span>
                                        <v-slider v-model="mandat.chargeTravail" step="2" snap :min="4" :max="10"></v-slider>
                                    </label>
                                </v-flex>
                                <v-flex xs9>
                                    <label class="subheading"><span v-if="mandat.réviseur !== 'Sans révision'">Révision par</span>
                                        <b>{{mandat.réviseur}}</b>    </label>
                                        <v-radio-group v-model="mandat.réviseur" row>
                                            <v-layout row>
                                                <v-flex xs6>
                                            <v-radio label="Carine" value="Carine" v-if="currentUser !== 'Carine'" color="primary"></v-radio>
                                                <v-radio label="Jérôme" value="Jérôme" v-if="currentUser !== 'Jérôme'" color="primary"></v-radio>

                                            <v-radio label="Sarah" value="Sarah" v-if="currentUser !== 'Sarah'" color="primary"></v-radio>
                                            </v-flex>
                                                <v-flex xs6>
                                            <v-radio label="Sans révision" value="Sans révision" color="primary"></v-radio>
                                            <v-radio label="Autre" value="Autre" color="primary"></v-radio>
                                                    </v-flex>
                                            </v-layout>
                                        </v-radio-group>
                                
                                </v-flex>
                                            <v-flex xs9>
                                    <v-text-field box v-if="mandat.réviseur === 'Autre'" label="Autre réviseur" v-model="autreRéviseur" hide-details></v-text-field>
                                </v-flex>
                                <v-flex xs9 v-if="editing">
                                    <label class="subheading">Traduction par
                                        <b>{{mandat.traducteur}}</b> </label>
                                        <v-radio-group v-model="mandat.traducteur" row>
                                            <v-radio label="Carine" value="Carine" color="primary"></v-radio>
                                                <v-radio label="Jérôme" value="Jérôme" color="primary"></v-radio>
                                            <v-radio label="Sarah" value="Sarah" color="primary"></v-radio>
                                        </v-radio-group>
                         
                                </v-flex>
                    
                            </v-layout>
                        </div>

                        <v-btn color="primary" @click="stepCount = 7">Suivant</v-btn>
                        <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="7" editable editIcon="check" :complete="stepCount > 7">Remarque</v-stepper-step>
                    <v-stepper-content step="7">
                        <v-flex xs11>
                            <v-text-field name="remarque" label="Remarque" textarea v-model="mandat.remarque"></v-text-field>
                        </v-flex>
                            <v-flex xs12>
                        <v-btn v-if="editing" color="info" @click="editMandat" :loading="loading" :disabled="basicValidation">Enregistrer les modifications</v-btn>
                        <v-btn v-else color="info" @click.native.once="createMandat" :loading="loading" :disabled="basicValidation">Créer le mandat</v-btn>
                        <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                   
                           </v-flex>
                                  <v-flex xs12>
                                <span v-if="basicValidation" class="subheading"><v-icon color="error" class="mr-2">warning</v-icon>Assure-toi d'avoir bien rempli les champs "nom", "mandant" et "public cible".</span>
                                    </v-flex>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-flex>
    </v-layout>
</template>

<script>
import { db, auth } from '../firebase'
import Mandat from '@/js/newMandat'
import { mandatFirebase } from '@/js/mandatFirebase'
import bus from '@/js/bus'

export default {
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      stepCount: 1,
      loading: false,
      editing: false,
      autreRéviseur: null,
      centres: ['VKF', 'IRV', 'Pool', 'VKG', 'PRAEVENT', 'VKF ZIP AG'],
      arrowDirection: 'arrow_forward',
      textTypes: [
        { text: 'Rédactionnel', value: 'REDAC' },
        { text: 'Technique', value: 'TEC' },
        { text: 'Juridique', value: 'JUR' },
        { text: 'Financier', value: 'FINANC' },
      ],
      activities: [
        'Traduction',
        'Adaptation',
        'Correction',
        'Rédaction',
        'Révision',
      ],
      disableWeekends: date => {
        return !(date.getDay() === 0 || date.getDay() === 6)
      },
      mandat: {},
    }
  },
  methods: {
    prepareForFirebase() {
      this.loading = true
      if (this.mandat.réviseur === 'Autre') {
        this.mandat.réviseur = this.autreRéviseur
      }
      if (this.mandat.chargeTravail === 10) {
        this.mandat.chargeTravail += 2
      }

      delete this.mandat.mandant['.key']
      delete this.mandat.mandant.Kürzel
    },
    createMandat() {
      this.prepareForFirebase()

      if (this.mandat.priorité === 'Prioritaire') {
        this.mandat.timeStamp = 0
      } else {
        this.mandat.timeStamp = new Date(this.mandat.délai).getTime()
      }

      this.mandat.traducteur = this.currentUser

      mandatFirebase(this.mandat)
        .then(() => {
          this.loading = false
          this.$router.push('/smartview')
          bus.snackbar.showSnack = true
          if (this.mandat.chargeTravail > 6) {
            bus.snackbar.message = 'Bon courage ! 💪'
          } else {
            bus.snackbar.message = 'Bonne traduction ! 😃'
          }
        })
        .catch(error => {
          this.loading = false
          console.log('an error', error)
        })
    },
    editMandat() {
      this.prepareForFirebase()
      if (this.mandat.priorité === 'Prioritaire') {
        this.mandat.timeStamp = 0
      }
      delete this.mandat['.key']

      db
        .ref('mandatsEnCours/' + this.code)
        .set(this.mandat)
        .then(() => {
          this.loading = false
          this.$router.push('/smartview')
          bus.snackbar.showSnack = true
          bus.snackbar.message = 'Mandat édité ! 👍'
        })
        .catch(error => {
          this.loading = false
          console.log('an error', error)
        })
    },
    toggleDirection() {
      if (this.mandat.source === 'DE') {
        this.mandat.source = 'FR'
        this.mandat.cible = 'DE'
        this.arrowDirection = 'arrow_back'
      } else {
        this.mandat.source = 'DE'
        this.mandat.cible = 'FR'
        this.arrowDirection = 'arrow_forward'
      }
    },
    rebind() {
      this.$unbind('mandants')
      this.$bindAsArray(
        'mandants',
        db.ref('mandantsListe/' + this.mandat.centre_coûts)
      )
    },
  },
  computed: {
    pageNumber() {
      if (this.mandat.chargeTravail < 5) {
        return 'faible 😁'
      } else if (this.mandat.chargeTravail === 6) {
        return 'moyenne 😐'
      } else if (this.mandat.chargeTravail === 8) {
        return 'grande 😓'
      } else if (this.mandat.chargeTravail > 9) {
        return 'énorme 😵'
      } else {
        return '...'
      }
    },
    currentUser() {
      return auth.currentUser.displayName || null
    },
    basicValidation() {
      return !(
        this.mandat.nom &&
        this.mandat.mandant.text &&
        this.mandat.public_cible
      )
    },
  },
  created() {
    if (this.code) {
      this.editing = true
      this.$bindAsObject(
        'mandat',
        db.ref('mandatsEnCours/' + this.code),
        null,
        () => {
          this.$bindAsArray(
            'mandants',
            db
              .ref('mandantsListe/' + this.mandat.centre_coûts)
              .orderByChild('text')
          )
        }
      )
    } else {
      this.mandat = { ...Mandat }
      this.$bindAsArray(
        'mandants',
        db.ref('mandantsListe/VKF').orderByChild('text')
      )
    }
  },
}
</script>

<style>

</style>
