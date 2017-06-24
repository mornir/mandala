<template>
<div>
    <v-card-title class="primary white--text">
        <span>{{mandat.nom}}</span>

    </v-card-title>
    <v-card-text>
        <div class="details">
            <v-layout row wrap>

                <v-flex xs5 sm4 md3 lg2>
                    <div>Code UD</div><strong>{{mandat.code}}</strong>
                </v-flex>

                <v-flex xs5 sm4 md3 lg2>
                    <div>Date d'arrivée</div><strong>{{mandat.arrivée}}</strong>
                </v-flex>

                <v-flex xs5 sm4 md3 lg2>
                    <div>Date de renvoi</div><strong>{{mandat.délai}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Priorité</div><strong>{{mandat.priorité}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Mandant</div><strong>{{mandat.mandant}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Centre de coûts</div><strong>{{mandat.centre_coûts}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Public-cible</div><strong>{{mandat.public_cible}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Traduction</div><strong>{{mandat.traducteur}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Révision</div><strong>{{mandat.réviseur}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>TAO</div><strong>{{mandat.TAO}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Direction</div><strong>{{mandat.source}} -&#62; {{mandat.cible}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Type de texte</div><strong>{{mandat.type}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Activité</div><strong>{{mandat.activité}}</strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2>
                    <div>Fichiers</div><strong><ul><li v-for="file in mandat.fichiers" v-if="file.nombre">{{file.nombre}} {{file.fichier}}</li></ul></strong>
                </v-flex>
                
                <v-flex xs5 sm4 md3 lg2 v-if="mandat.remarque">
                    <div>Remarque</div><strong>{{mandat.remarque}}</strong>
                </v-flex>
            </v-layout>
        </div>
    </v-card-text>

</div>
</template>

<script>
    export default {
        props: ['mandat']
    };

</script>

<style>
    .details .flex {
        margin-bottom: 16px;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }

</style>
