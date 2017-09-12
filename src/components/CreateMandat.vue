<template>
    <v-layout row justify-center>
        <v-flex xs8>
            <v-stepper v-model="stepCount" vertical>
                <v-stepper-step step="1" :complete="stepCount > 1">
                    Mandant
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-layout row>
                        <v-flex xs3 class="mr-2">
                            <v-select :items="centres" v-model="mandat.centre_coûts" label="Centre de coûts"></v-select>
                        </v-flex>
                        <v-flex xs4>
                            <v-select :items="centres" v-model="mandat.centre_coûts" label="Mandant"></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs7>
                            <v-text-field v-model="mandat.nom" label="Nom du mandat"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-btn primary @click="stepCount = 2">Suivant</v-btn>
                </v-stepper-content>
                <v-stepper-step step="2" :complete="stepCount > 2">Fichiers</v-stepper-step>
                <v-stepper-content step="2">
                    <v-layout>

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
                    <v-layout class="mb-2">
                        <v-flex xs2 v-for="(file, index) in mandat.fichiers" :key="file.fichier">
                            <input name="file.fichier" v-model.number="file.nombre" type="number" min="0">
                        </v-flex>
                    </v-layout>
                    <v-btn primary @click="stepCount = 3">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="3" :complete="stepCount > 3">Date d'arrivée et délai</v-stepper-step>
                <v-stepper-content step="3">
                    <v-layout row wrap align-center>
                        <v-flex xs6>
                            <v-date-picker v-model="e2" actions locale="fr-FR" first-day-of-week="1"></v-date-picker>
                        </v-flex>
                        <v-flex xs6>
                            <v-date-picker v-model="e2" actions locale="fr-FR" first-day-of-week="1" dark></v-date-picker>
                        </v-flex>

                    </v-layout>
                    <v-btn primary @click.native="stepCount = 4">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="4">Situation de communication</v-stepper-step>
                <v-stepper-content step="4">
                    <v-flex xs4>
                        <v-text-field v-model="mandat.public_cible" label="Public cible"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="textTypes" v-model="mandat.type" label="Type de texte"></v-select>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="activities" v-model="mandat.activité" label="Activité"></v-select>
                    </v-flex>
                    <v-btn primary @click.native="stepCount = 1">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
                </v-stepper-content>
                <v-stepper-step step="5">Direction et TAO</v-stepper-step>
                <v-stepper-content step="5">
                    <v-flex xs4>
                        <v-time-picker v-model="e7" format="24hr"></v-time-picker>
                    </v-flex>
                    <v-btn primary @click.native="stepCount = 1">Suivant</v-btn>
                    <v-btn flat @click="stepCount -= 1">Retour</v-btn>
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
            ex4: false,
            arrowDirection: 'arrow_forward',
            textTypes: ['REDAC', 'TEC', 'JUR', 'FINANC'],
            activities: ['Traduction', 'Adaptation', 'Correction', 'Rédaction', 'Révision'],
            mandat: {
                activité: '',
                centre_coûts: 'VKF',
                nom: '',
                public_cible: '',
                type: '',
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
    }
}
</script>

<style>

</style>
