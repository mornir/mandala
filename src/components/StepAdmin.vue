<template>
       
        <v-card class="mb-5">
            <v-card-text>
                <v-container>
                    <v-layout>
                        <v-flex xs3>
                            <v-subheader>Nom du projet</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field name="name" v-model.trim="mandat.nom" label="Nom du projet" autocomplete="off"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs3>
                            <v-subheader>Centre de coûts</v-subheader>
                        </v-flex>

                        <v-flex xs2>
                            <v-select :items="centres" v-model="mandat.centre_coûts" single-line auto/>
                        </v-flex>

                        <v-flex xs2>
                            <v-subheader>Mandant</v-subheader>
                        </v-flex>

                        <v-flex xs4>
                            <v-text-field name="mandant" v-model.trim="mandat.mandant" label="Mandant"></v-text-field>
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
                        <v-flex xs2 v-for="(fichier, index) in mandat.fichiers" :key="fichier.fichier" :class="{ 'offset-xs3': index === 0}">
                            <input name="fichier.fichier" v-model.number="fichier.nombre" type="number" min="0">
                        </v-flex>
                    </v-layout>
                         <v-layout>
                        <v-flex xs3>
                            <v-subheader>Remarque</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field name="remarque" v-model.trim="mandat.remarque" label="Remarque" autocomplete="off" multi-line></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
     
</template>

<script>
    export default {
        props: ['etape', 'mandat'],
        data() {
            return {
                centres: ['VKF', 'IRV', 'VKG']
            };
        }
    };

</script>

<style>


</style>
