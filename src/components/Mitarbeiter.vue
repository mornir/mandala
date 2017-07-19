<template>
<v-layout justify-center>
    <v-flex xs6>
        <v-card>
            <v-toolbar class="indigo" light>
                <v-toolbar-title>Ajouter un mandant</v-toolbar-title>
            </v-toolbar>
            <v-card-text>

                <v-layout>
                    <v-flex xs2>
                        <v-subheader>Kürzel</v-subheader>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field label="Kürzel" v-model="newMandant.Kürzel" :maxlength="4"></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-subheader>Nom</v-subheader>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field label="Prénom + Nom" v-model="newMandant.text"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs4>
                        <v-subheader>Centre de coûts</v-subheader>
                    </v-flex>
                    <v-flex xs4>
                        <v-select label="Centre de coûts" :items="centres" v-model="selectedCenters" multiple/>
                    </v-flex>


                </v-layout>
                <v-layout>
                    <v-flex xs4>
                        <v-subheader>Département</v-subheader>
                    </v-flex>
                    <v-flex xs4>
                        <v-select label="Département" :items="départements" v-model="newMandant.département" />
                    </v-flex>


                </v-layout>

            </v-card-text>
            <v-card-row actions>
                <v-spacer></v-spacer>
                <v-btn flat success @click.native="addMitarbeiter">Ajouter</v-btn>
                <v-spacer></v-spacer>
            </v-card-row>
        </v-card>
    </v-flex>
    <v-flex xs6>

        <v-tabs id="mobile-tabs-1" grow scroll-bars v-model="activeTab" light @input="rebind">
            <v-tabs-bar slot="activators" class="indigo">
                <v-tabs-item v-for="centre in centres" :key="centre" :href="'#' + centre" ripple>
                    {{ centre }}
                </v-tabs-item>
                <v-tabs-slider></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-content v-for="centre in centres" :key="centre" :id="centre">

                <v-card flat>

                    <v-list two-line subheader>

                        <v-list-item v-for="mandant in groupe" :key="mandant.Kürzel">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title> {{mandant.text}} <small>({{mandant.Kürzel}})</small></v-list-tile-title>
                                    <v-list-tile-sub-title>{{ mandant.département }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn icon ripple @click.native="deleteMandant(mandant.Kürzel)">
                                        <v-icon class="red--text">close</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-item>
                        <v-divider></v-divider>


                    </v-list>

                </v-card>
            </v-tabs-content>
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
                départements: ["Human Resources", "Sekretariat", "Generalsekretariat", "Public Relations", "Rechtsdienst", "VKF ZIP AG", "Brandschutz", "Elementarschaden-Prävention", "Ausbildung", "Finanzen", "Informatik", "Rückversicherung", "Liegenschaftsdienst"],
                centres: ["VKF", "IRV", "Pool", "VKG", "PRAEVENT", "VKF ZIP AG"],
                selectedCenters: [],
                newMandant: {
                    Kürzel: '',
                    text: '',
                    département: ''
                }
            };
        },
        firebase: {
            VKF: db.ref('mandantsListe/VKF')
        },
        created() {
            this.$bindAsArray('groupe', db.ref('mandantsListe/VKF'));
        },
        methods: {
            addMitarbeiter() {
                this.selectedCenters.forEach((el) => {
                    db.ref('mandantsListe').child(el).child(this.newMandant.Kürzel).set(this.newMandant);
                });

            },
            deleteMandant(key) {
                this.$firebaseRefs.groupe.child(key).remove();
            },
            rebind() {
                this.$unbind('groupe');
                this.$bindAsArray('groupe', db.ref('mandantsListe/' + this.activeTab));
            }
        }
    };

</script>

<style>


</style>
