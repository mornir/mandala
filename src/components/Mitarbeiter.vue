<template>
<v-layout justify-center>
    <v-flex xs6>
        <v-card>
            <v-toolbar class="indigo" light>
                <v-toolbar-title>Ajouter un mandant</v-toolbar-title>
            </v-toolbar>
            <v-card-text>

                <v-layout row justify-space-around>
                    <v-flex xs2>
                        <v-text-field label="Kürzel" v-model="newMandant.Kürzel" :maxlength="4"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field label="Prénom" v-model="newMandant.prénom"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field label="Nom" v-model="newMandant.nom"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                       <v-flex xs4>
                            <v-subheader>Centre de coûts</v-subheader>
                        </v-flex>
                        <v-flex xs4>
                         <v-select label="Centre de coûts" :items="centres" v-model="centre" multiple/>
                        </v-flex>
                
                
                </v-layout>
                                <v-layout>
                       <v-flex xs4>
                            <v-subheader>Domaines</v-subheader>
                        </v-flex>
                        <v-flex xs4>
  <v-select label="Domaine" :items="domaines" v-model="domaine" multiple/>
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
                domaines: ['Ausbildung', 'Brandschutz', 'ESP', 'Finanzen', 'Rechtsdienst', 'Kommunikation'],
                centres: ['VKF', 'IRV', 'VKG'],
                centre: [],
                domaine: [],
                newMandant: {
                    Kürzel: '',
                    prénom: '',
                    nom: ''
                }
            };
        },
        firebase: {
            mandants: db.ref('mandants'),
            //domaines: db.ref('domaines')
        },
        methods: {
            addMitarbeiter() {
                this.$firebaseRefs.mandants.child(this.newMandant.Kürzel).set(this.newMandant);
            }
        }
    };

</script>

<style>


</style>
