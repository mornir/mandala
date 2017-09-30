<template>
    <v-layout row justify-center>
        <v-flex xs7>
            <v-stepper v-model="stepCount" vertical>
                <v-stepper-step step="1" :complete="stepCount > 1" editable editIcon="check">
                    Mandant
                </v-stepper-step>
                <v-stepper-content step="1">
                    <div class="stepCard">
                        <v-layout row wrap justify-center>

                            <v-flex xs4 class="mr-2">
                                <v-select :items="centres" v-model="mandat.centre_coûts" label="Centre de coûts"></v-select>
                            </v-flex>
                            <v-flex xs5>
                                <v-select :items="centres" v-model="mandat.centre_coûts" label="Mandant"></v-select>
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field v-model="mandat.nom" box label="Nom du mandat"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                    <v-btn primary @click="stepCount = 2">Suivant</v-btn>
                </v-stepper-content>
                <v-stepper-step step="2" editable :complete="stepCount > 2" editIcon="check">Fichiers</v-stepper-step>
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
                                <img src="../assets/PDF.png" alt="PDF" width="57px">
                            </v-flex>
                        </v-layout>
                        <v-layout class="mb-2" justify-center>
                            <v-flex xs2 v-for="(file, index) in mandat.fichiers" :key="file.fichier">
                                <input name="file.fichier" v-model.number="file.nombre" type="number" min="0" style="width: 50px;">
                            </v-flex>
                        </v-layout>
                    </div>
                    <v-btn primary @click="stepCount = 3">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="3" editable editIcon="check" :complete="stepCount > 3">Date d'arrivée et délai</v-stepper-step>
                <v-stepper-content step="3">
                    <div class="stepCard">
                        <v-layout row class="ml-3">
                            <v-flex xs6>
                                <v-date-picker v-model="e2" actions locale="fr-FR" first-day-of-week="1"></v-date-picker>
                            </v-flex>
                            <v-flex xs6>
                                <v-date-picker v-model="e2" actions locale="fr-FR" first-day-of-week="1" dark></v-date-picker>
                            </v-flex>

                        </v-layout>
                    </div>
                    <v-btn primary @click.native="stepCount = 4">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="4" editable editIcon="check" :complete="stepCount > 4">Heure et priorité</v-stepper-step>
                <v-stepper-content step="4">
                    <div class="stepCard">
                        <v-layout row align-center>
                            <v-flex xs12>
                                <v-time-picker v-model="e7" format="24hr"></v-time-picker>
                            </v-flex>
                            <v-flex xs7>

                                <v-checkbox label="Mandat prioritaire" v-model="ex5" :value="true" color="red" :error="ex5">
                                </v-checkbox>
                            </v-flex>
                            <v-flex xs5>
                                <span v-if="ex5" style="font-size:28px">⏳</span>
                            </v-flex>
                        </v-layout>
                    </div>
                    <v-btn primary @click.native="stepCount = 5">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="5" editable :complete="stepCount > 5" editIcon="check">Situation de communication</v-stepper-step>
                <v-stepper-content step="5">

                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field box v-model="mandat.public_cible" label="Public cible"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>

                        <v-flex xs6>
                            <v-select :items="activities" v-model="mandat.activité" label="Thème"></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs3 class="mr-2">
                            <v-select :items="textTypes" v-model="mandat.type" label="Type de texte"></v-select>
                        </v-flex>
                        <v-flex xs3 class="mr-2">
                            <v-select :items="activities" v-model="mandat.activité" label="Activité"></v-select>
                        </v-flex>

                    </v-layout>
                    <v-btn primary @click="stepCount = 6">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="6" editable editIcon="check" :complete="stepCount > 6">Traduction</v-stepper-step>
                <v-stepper-content step="6">
                    <div class="stepCard">
                        <v-layout row wrap justify-center>

                            <v-flex xs7>
                                <img src="../assets/germany.svg" alt="German" width="40px" height="40px">
                                <v-btn icon class="black--text  mb-5" @click.native="toggleDirection">
                                    <v-icon>{{arrowDirection}}</v-icon>
                                </v-btn>
                                <img src="../assets/france.svg" alt="French" width="40px" height="40px">
                            </v-flex>
                            <v-flex xs2>
                                <v-checkbox label="Trados" info hide-details v-model="mandat.TAO" true-value="Oui" false-value="Non" />
                            </v-flex>
                            <v-flex xs9>
                                <label class="subheading">Charge de travail :
                                    <span class="subheading">{{pageNumber}}</span>
                                    <v-slider v-model="sliderValue" step="25" snap :min="25"></v-slider>
                                </label>
                            </v-flex>
                            <v-flex xs9>
                                <label class="subheading">Révision par {{mandat.révision}}
                                    <v-radio-group v-model="mandat.révision" row>
                                        <v-radio label="Carine" value="Carine"></v-radio>
                                        <v-radio label="Sarah" value="Sarah"></v-radio>
                                        <v-radio label="Autre" value="Autre"></v-radio>
                                    </v-radio-group>
                                </label>
                            </v-flex>
                        </v-layout>
                    </div>

                    <v-btn primary @click="stepCount = 7">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="7" :complete="stepCount > 7">Remarque</v-stepper-step>
                <v-stepper-content step="7">
                    <v-flex xs12>
                        <v-text-field name="remarque" label="Remarque" textarea v-model="mandat.remarque"></v-text-field>
                    </v-flex>
                    <v-btn success @click="createMandat">Créer le mandat</v-btn>
                </v-stepper-content>

            </v-stepper>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            stepCount: 1,
            centres: ["VKF", "IRV", "Pool", "VKG", "PRAEVENT", "VKF ZIP AG"],
            e2: null,
            e7: null,
            ex5: false,
            ex4: false,
            sliderValue: 25,
            arrowDirection: 'arrow_forward',
            textTypes: ['Rédactionnel', 'Technique', 'Juridique', 'Financier'],
            activities: ['Traduction', 'Adaptation', 'Correction', 'Rédaction', 'Révision'],
            mandat: {
                remarque: '',
                activité: '',
                centre_coûts: 'VKF',
                nom: '',
                public_cible: '',
                type: '',
                TAO: 'Oui',
                source: 'DE',
                révision: 'Carine',
                fichiers: [{
                    nombre: 1,
                    fichier: 'Word'

                },
                {
                    nombre: 0,
                    fichier: 'Excel'

                },
                {
                    nombre: 0,
                    fichier: 'PPT'

                },
                {
                    nombre: 0,
                    fichier: 'PDF'

                }
                ]
            }
        }
    },
    methods: {
        createMandat() {
            console.log(this.mandat)
        },
        toggleDirection() {
            if (this.mandat.source === 'DE') {
                this.mandat.source = 'FR';
                this.mandat.cible = 'DE';
                this.arrowDirection = 'arrow_back';
            } else {
                this.mandat.source = 'DE';
                this.mandat.cible = 'FR';
                this.arrowDirection = 'arrow_forward';
            }
        }
    },
    computed: {
        pageNumber() {
            if (this.sliderValue === 25) {
                return 'faible 😁'
            } else if (this.sliderValue === 50) {
                return 'moyenne 😐'
            } else if (this.sliderValue === 75) {
                return 'grande 😥'
            } else if (this.sliderValue === 100) {
                return 'énorme 😵'
            } else {
                return '...'
            }

        }
    }
}
</script>

<style>
.stepCard {
    margin-bottom: 20px;
    border: 2px solid grey;
    padding: 5px;
}
</style>
