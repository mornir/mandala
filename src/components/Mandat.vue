<template>
<v-card horizontal class="mb-2" :class="currentStatut">

    <v-card-column>
        <v-card-text>
            <v-layout>
                <v-flex xs3>

                    <strong>{{mandat.nom}}</strong>


                </v-flex>
                <v-flex xs2>

                    <strong>{{mandat.code}}</strong>
                    <div>{{mandat.mandant}}</div>

                </v-flex>
                <v-flex xs2>

                    <div>
                        <v-icon>send</v-icon>
                        <strong>{{mandat.délai}}</strong>
                    </div>
                    <div v-if="mandat.moment === 'Matin' || mandat.priorité === 'Prioritaire'">
                        <div>
                            <v-icon>warning</v-icon>

                            <strong v-if="mandat.priorité === 'Prioritaire'">{{mandat.priorité}}</strong>
                            <strong v-if="mandat.moment === 'Matin'">{{mandat.moment}}</strong>


                        </div>
                    </div>
                    <div v-else>
                        Ordinaire
                    </div>

                </v-flex>
                <v-flex xs1>

                    <div>
                        <v-icon>edit</v-icon>
                        <strong>{{mandat.traducteur}}</strong>
                    </div>
                    <div>
                        <v-icon>spellcheck</v-icon>
                        <strong>{{mandat.réviseur}}</strong>
                    </div>

                </v-flex>
                <v-flex xs2>

                    <v-dialog v-model="dialogStatut" scrollable persistent>
                        <v-btn outline slot="activator">{{mandat.statut}}</v-btn>
                        <v-card>
                            <v-card-title>Nouveau statut</v-card-title>
                            <v-divider></v-divider>
                            <v-card-row height="300px">
                                <v-card-text>
                                    <v-radio label="Traduction" v-model="selectedStatut" value="Traduction"></v-radio>
                                    <v-radio label="Premier jet" v-model="selectedStatut" value="Premier jet"></v-radio>
                                    <v-radio label="Questions" v-model="selectedStatut" value="Questions"></v-radio>
                                    <v-radio label="À réviser" v-model="selectedStatut" value="À réviser"></v-radio>
                                    <v-radio label="Révision finie" v-model="selectedStatut" value="Révision finie"></v-radio>
                                    <v-radio label="Liquidé" v-model="selectedStatut" value="Liquidé"></v-radio>
                                </v-card-text>
                            </v-card-row>
                            <v-divider></v-divider>
                            <v-card-row actions>
                                <v-btn class="blue--text darken-1" flat @click.native="dialogStatut = false">Annuler</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="setStatut">Enregistrer</v-btn>
                            </v-card-row>
                        </v-card>
                    </v-dialog>
                </v-flex>

                <v-flex xs1>

                    <v-dialog v-model="dialogInfo" :width="700">
                        <v-btn icon slot="activator" class="black--text">
                            <v-icon>info</v-icon>
                        </v-btn>
                        <v-card>
                            <mandat-details :mandat="mandat"></mandat-details>

                            <v-divider></v-divider>
                            <v-card-row actions>
                                <button v-clipboard="copyToClipboard">Copier dans Excel</button>
                                <v-spacer></v-spacer>
                                <v-btn class="blue--text darken-1" flat @click.native="dialogInfo = false">Fermer</v-btn>
                                <v-btn v-if="mandat.traducteur === currentTranslator" class="blue--text darken-1" flat @click.native="editMandat">Modifier</v-btn>
                            </v-card-row>
                        </v-card>
                    </v-dialog>


                </v-flex>

                <v-flex xs1 v-if="mandat.remarque">

                    <v-dialog v-model="dialogRemarque">
                        <v-btn icon slot="activator" class="black--text">
                            <v-icon>comment</v-icon>
                        </v-btn>
                        <v-card>
                            <v-card-text>
                                {{mandat.remarque}}
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-row actions>
                                <v-btn class="blue--text darken-1" flat @click.native="dialogRemarque = false">Fermer</v-btn>
                                <!--
                                <v-btn v-if="mandat.traducteur === currentTranslator" class="blue--text darken-1" flat @click.native="editMandat">Modifier</v-btn>
                                -->
                            </v-card-row>
                        </v-card>


                    </v-dialog>
                    
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card-column>


</v-card>
</template>

<script>
    import MandatDetails from './MandatDetails.vue';

    import {
        auth
    } from '../firebase';

    export default {
        props: ['mandat'],
        data() {
            return {
                statuts: ['Traduction', 'Premiet jet', 'Questions', 'À réviser', 'Révision finie', 'Liquidé'],
                currentTranslator: auth.currentUser.displayName,
                selectedStatut: '',
                dialogStatut: false,
                dialogInfo: false,
                dialogRemarque: false,
                copyToClipboard: `<table>
                                      <tr>
                                        <td>${this.mandat.code}</td>
                                        <td>${this.mandat.arrivée}</td>
                                        <td>${this.mandat.nom}</td>
                                        <td>${this.mandat.type}</td>
                                        <td>1 Word</td>
                                        <td>${this.mandat.activité}</td>
                                        <td>${this.mandat.TAO}</td>
                                        <td>${this.mandat.source}</td>
                                        <td>${this.mandat.cible}</td>
                                        <td>${this.mandat.traducteur}</td>
                                        <td>${this.mandat.réviseur}</td>
                                        <td>${this.mandat.remarque}</td>
                                        <td>${this.mandat.délai}</td>
                                        <td>${this.mandat.priorité}</td>
                                        <td>${this.mandat.mandant}</td>
                                        <td>${this.mandat.public_cible}</td>
                                        <td>${this.mandat.centre_coûts}</td>
                                        <td>${this.mandat.statut}</td>
                                      </tr>
                                    </table>`
            };
        },
        methods: {
            setStatut() {
                this.dialogStatut = false;
                this.$emit('changedStatut', this.selectedStatut);

            },
            editMandat() {
                this.dialogInfo = false;

                //after upgrading to Vuetify 0.13, can delete setTimeout
                setTimeout(() => {
                    this.$router.push({
                        name: 'edit',
                        params: {
                            key: this.mandat['.key']
                        }
                    });
                }, 100);

            }
        },
        computed: {
            currentStatut() {
                if (this.mandat.statut === 'Traduction') {
                    return 'amber lighten-2 black--text';
                } else if (this.mandat.statut === 'Premier jet') {
                    return 'blue lighten-4 black--text';
                } else if (this.mandat.statut === 'Questions') {
                    return 'red lighten-1 black--text';
                } else if (this.mandat.statut === 'À réviser') {
                    //send notification
                    return 'purple lighten-2 black--text';
                } else if (this.mandat.statut === 'Révision finie') {
                    //send notification
                    return 'light-blue lighten-1 black--text';
                } else if (this.mandat.statut === 'Liquidé') {
                    return 'light-green accent-4 black--text';
                } else {
                    console.error('Erreur: statut de mandat inconnu');
                }
            }
        },
        components: {
            mandatDetails: MandatDetails
        }
    };

</script>

<style>


</style>
