<template>
       
        <v-card class="mb-5">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col xs3>
                            <v-subheader>Nom du projet</v-subheader>
                        </v-col>
                        <v-col xs8>
                            <v-text-field name="name" v-model="mandat.name" label="Nom du projet" autocomplete="off"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs3>
                            <v-subheader>Centre de coûts</v-subheader>
                        </v-col>

                        <v-col xs2>
                            <v-select :items="centres" v-model="mandat.costs" single-line auto/>
                        </v-col>

                        <v-col xs2>
                            <v-subheader>Mandant</v-subheader>
                        </v-col>

                        <v-col xs4>
                            <v-text-field name="mandant" v-model="mandat.mandant" label="Mandant"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs3>
                            <v-subheader>Fichiers</v-subheader>
                        </v-col>
                        <v-col xs2>
                            <img src="../assets/Word.png" alt="Word" width="50px">
                        </v-col>
                        <v-col xs2>
                            <img src="../assets/Excel.png" alt="Excel" width="50px">
                        </v-col>
                        <v-col xs2>
                            <img src="../assets/PPT.png" alt="PPT" width="50px">
                        </v-col>
                        <v-col xs2>
                            <img src="../assets/PDF.png" alt="PDF" width="57px">
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs2 v-for="(value, index) in mandat.fichiers" :key="value.name" :class="{ 'offset-xs3': index === 0}">
                            <input name="value.name" v-model="value.value" type="number" min="0">
                        </v-col>
                    </v-row>
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
