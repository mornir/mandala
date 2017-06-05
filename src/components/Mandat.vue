<template>
<v-card horizontal class="mb-2" :class="currentStatut">

    <v-card-column>
        <v-card-text>
            <v-layout>
                <v-flex xs4>

                    <strong>{{mandat.name}}</strong>
                    <div>{{mandat.public_cible}}</div>
                    <!--            <span>{{mandat.type}}</span>,
                 <span>{{mandat.source}}--&#62;{{mandat.target}}</span>,-->
                </v-flex>
                <v-flex xs1>

                    <strong>{{mandat.code}}</strong>
                    <div :class="{prioritaireClass: mandat.priority === 'Prioritaire'}">{{mandat.priority}}</div>

                </v-flex>
                <v-flex xs3 class="text-xs-center">

                    <div>
                        <v-icon>send</v-icon>
                        <strong>{{mandat.deadline}}</strong>
                    </div>
                    <div>
                        <v-icon>person</v-icon>
                        <strong>{{mandat.mandant}}</strong>
                    </div>

                </v-flex>
                <v-flex xs2>

                    <div>
                        <v-icon>edit</v-icon>
                        <strong>{{mandat.translator}}</strong>
                    </div>
                    <div>
                        <v-icon>spellcheck</v-icon>
                        <strong>{{mandat.reviewer}}</strong>
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
                                    <v-radio label="Questions" v-model="selectedStatut" value="Questions"></v-radio>
                                    <v-radio label="À révisé" v-model="selectedStatut" value="À révisé"></v-radio>
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
                                <button v-clipboard="copyToClipboard">Copy to clipboard</button>
                                <v-spacer></v-spacer>
                                <v-btn class="blue--text darken-1" flat @click.native="dialogInfo = false">Annuler</v-btn>
                                <v-btn v-if="mandat.translator === currentTranslator" class="blue--text darken-1" flat @click.native="editMandat">Modifier</v-btn>
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
    import StatutModal from './StatutModal.vue';
    import MandatDetails from './MandatDetails.vue';

    import {
        auth
    } from '../firebase';

    export default {
        props: ['mandat'],
        data() {
            return {
                statuts: ['Traduction', 'Questions', 'À révisé', 'Révision finie', 'Liquidé'],
                currentTranslator: auth.currentUser.displayName,
                selectedStatut: '',
                dialogStatut: false,
                dialogInfo: false,
                copyToClipboard: `<table>
                                      <tr>
                                        <td>${this.mandat.code}</td>
                                        <td>${this.mandat.arrival}</td>
                                        <td>${this.mandat.name}</td>
                                        <td>${this.mandat.type}</td>
                                        <td>1 Word</td>
                                        <td>${this.mandat.activity}</td>
                                        <td>${this.mandat.TAO}</td>
                                        <td>${this.mandat.source}</td>
                                        <td>${this.mandat.target}</td>
                                        <td>${this.mandat.translator}</td>
                                        <td>${this.mandat.reviewer}</td>
                                        <td>${this.mandat.remarque}</td>
                                        <td>${this.mandat.deadline}</td>
                                        <td>${this.mandat.priority}</td>
                                        <td>${this.mandat.mandant}</td>
                                        <td>${this.mandat.public_cible}</td>
                                        <td>${this.mandat.costs}</td>
                                        <td>${this.mandat.statut}</td>
                                      </tr>
                                    </table>`
            };
        },
        methods: {
            setStatut() {
                this.dialogStatut = false;
                const payload = {
                    key: this.mandat['.key'],
                    newStatut: this.selectedStatut
                };

                this.$emit('changedStatut', payload);

            },
            editMandat() {
                this.dialogInfo = false;

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
                    //this.setStatut();
                    return 'amber lighten-1 black--text';
                } else if (this.mandat.statut === 'Questions') {
                    //this.setStatut();
                    return 'red darken-1 black--text';
                } else if (this.mandat.statut === 'À révisé') {
                    //this.setStatut();
                    //send email
                    return 'light-blue lighten-1 black--text';
                } else if (this.mandat.statut === 'Révision finie') {
                    //this.setStatut();
                    //send email
                    return 'brown darken-1 black--text';
                } else if (this.mandat.statut === 'Liquidé') {
                    //this.setStatut();
                    return 'light-green accent-4 black--text';
                } else {
                    console.error('Erreur: statut de mandat inconnu');
                }
            }
        },
        components: {
            statutModal: StatutModal,
            mandatDetails: MandatDetails
        }
    };

</script>

<style>
    .prioritaireClass {
        color: red;
    }

</style>
