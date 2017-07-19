<template>
       
        <v-card class="mb-5">
            <v-card-text>
                <v-container>
                    <v-layout>
                        <v-flex xs3>
                            <v-subheader>Nom du mandat</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field name="nom" v-model.trim="mandat.nom" label="Nom du mandat"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout> 
                        <v-flex xs3>
                            <v-subheader>Centre de coûts</v-subheader>
                        </v-flex>

                        <v-flex xs2>
                            <v-select :items="centres" v-model="mandat.centre_coûts" @input="rebind" single-line/>
                        </v-flex>

                        <v-flex xs2>
                            <v-subheader>Mandant</v-subheader>
                        </v-flex>

                        <v-flex xs4>
                            <v-select :items="mandants" v-model="mandant" @input="saveMandant" single-line :hint="mandant.département" persistent-hint/>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs3>
                            <v-subheader>Fichiers</v-subheader>
                        </v-flex>
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
                    <v-layout>
                        <v-flex xs2 v-for="(file, index) in mandat.fichiers" :key="file.fichier" :class="{ 'offset-xs3': index === 0}">
                            <input name="file.fichier" v-model.number="file.nombre" type="number" min="0">
                        </v-flex>
                    </v-layout>
                         <v-layout>
                        <v-flex xs3>
                            <v-subheader>Remarque</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field name="remarque" v-model.trim="mandat.remarque" label="Remarque" multi-line></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
</template>

<script>
    import {
        db
    } from '../firebase';
    export default {
        props: ['etape', 'mandat'],
        data() {
            return {
                centres: ["VKF", "IRV", "Pool", "VKG", "PRAEVENT", "VKF ZIP AG"],
                mandant: {}
            };
        },
        created() {
            this.$bindAsArray('mandants', db.ref('mandantsListe/' + this.mandat.centre_coûts));
        },
        methods: {
            rebind() {
                this.$unbind('mandants');
                this.$bindAsArray('mandants', db.ref('mandantsListe/' + this.mandat.centre_coûts));
            },
            saveMandant() {
                this.mandat.mandant = this.mandant.text;
                this.mandat.département = this.mandant.département;
            }
        }
    };

</script>

<style>


</style>
