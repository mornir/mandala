<template>
    <v-layout justify-center>
        <v-flex xs5>
            <v-card flat class="stepCard">

                <v-card-text>
                    <v-form v-model="validForm" ref="form" lazy-validation>
                        <v-layout row wrap justify-space-around>

                            <v-flex xs4>
                                <v-text-field label="Kürzel" v-model="newMandant.Kürzel" :maxlength="4" box></v-text-field>
                            </v-flex>

                            <v-flex xs6>
                                <v-text-field label="Prénom + Nom" v-model="newMandant.text" box></v-text-field>
                            </v-flex>

                            <v-flex xs4>
                                <v-select label="Centre de coûts" :items="centres" v-model="selectedCenters" multiple/>
                            </v-flex>

                            <v-flex xs6>
                                <v-select label="Département" :items="départements" v-model="newMandant.département" />
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>
                <v-card-actions>

                    <v-layout justify-center>
                        <v-btn flat color="success" @click.native="addMitarbeiter">Ajouter un mandant</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex xs6 offset-xs1>

            <v-tabs v-model="activeTab">
                <v-tabs-bar>
                    <v-tabs-item v-for="centre in centres" :key="centre" :href="'#' + centre" ripple>
                        {{centre}}
                    </v-tabs-item>
                    <v-tabs-slider></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                    <v-tabs-content v-for="centre in centres" :key="centre" :id="centre">
                        <v-card flat>

                            <v-list two-line subheader>

                                <v-list-tile v-for="mandant in groupe" :key="mandant.Kürzel">
                                    <v-list-tile-content>
                                        <v-list-tile-title> {{mandant.text}}
                                            <small>({{mandant.Kürzel}})</small>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title>{{ mandant.département }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-btn icon ripple @click.native="deleteMandant(mandant.Kürzel)">
                                            <v-icon class="red--text">close</v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                </v-list-tile>

                                <v-divider></v-divider>

                            </v-list>
                        </v-card>
                    </v-tabs-content>
                </v-tabs-items>
            </v-tabs>
        </v-flex>
    </v-layout>
</template>

<script>
import {
    db
} from '../firebase';

export default {
    data() {
        return {
            activeTab: 'VKF',
            validForm: true,
            départements: ["Human Resources", "Sekretariat", "Generalsekretariat", "Public Relations", "Rechtsdienst", "VKF ZIP AG", "Brandschutz", "Elementarschaden-Prävention", "Ausbildung", "Finanzen", "Informatik", "Rückversicherung", "Liegenschaftsdienst"],
            centres: ["VKF", "IRV", "Pool", "VKG", "PRAEVENT", "VKF ZIP AG"],
            selectedCenters: [],
            newMandant: {
                Kürzel: '',
                text: '',
                département: ''
            },
            groupe: []
        };
    },

    methods: {
        addMitarbeiter() {

            this.selectedCenters.forEach((el) => {
                db.ref('mandantsListe').child(el).child(this.newMandant.Kürzel).set(this.newMandant);
            });

            this.$refs.form.reset()

        },
        deleteMandant(key) {
            this.$firebaseRefs.groupe.child(key).remove();
        }
    },
    created() {
        this.$bindAsArray('groupe', db.ref('mandantsListe/VKF'));
    },
    watch: {
        activeTab(newValue, oldValue) {
            this.$unbind('groupe');
            this.$bindAsArray('groupe', db.ref('mandantsListe/' + newValue));
        }
    },
};

</script>

<style>

</style>
