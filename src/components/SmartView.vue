<template>
    <v-container fluid grid-list-md>
        <v-snackbar top v-model="showSnack">Bonne traduction ! 😃</v-snackbar>
        <v-layout justify-center v-if="isLoading">
            <v-progress-circular indeterminate color="primary" id="progress-circular" :width="7" :size="70" class="mt-5"></v-progress-circular>
        </v-layout>

        <v-layout row wrap v-else>
            <v-flex xs6 v-if="!mandats.length">
                <blockquote>This is quote from Humbold</blockquote>
            </v-flex v-else>
            <v-flex v-bind="{ [`xs${card.flex}`]: true }" v-for="card in cards" :key="card.title">
                <mandat :card="card"></mandat>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import {
    db
} from '../firebase';

import Mandat from '@/components/Mandat'
import bus from '@/js/bus'

export default {
    data: () => ({
        showSnack: false,
        cards: [
            { title: 'Pre-fab homes', src: '../../../static/house.jpg', flex: 4 },
            { title: 'Favorite road trips', src: '../../../static/road.jpg', flex: 6 },
            { title: 'Best airlines', src: '../../../static/plane.jpg', flex: 8 },
            { title: 'Best airlines', src: '../../../static/plane.jpg', flex: 12 }
        ],
        isLoading: true
    }),
    firebase: {
        mandats: db.ref('mandatsEnCours')
    },
    computed: {
        mesTraductions() {
            return this.mandats.filter(trad => trad.statut !== 'À réviser')
        }
    },
    created() {
        this.showSnack = bus.showSnack
        this.$bindAsArray('mandats', db.ref('mandatsEnCours').orderByChild('timeStamp'), null, () => {
            this.isLoading = false;
        });
    },
    components: {
        Mandat: Mandat
    }
}
</script>

<style>
.line {
    background-color: rgba(0, 0, 0, 0.12);
    border: none;
    height: 1px;
    width: 200px;
    text-align: center;
    margin: 0 auto;
}
</style>
