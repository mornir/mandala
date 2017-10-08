<template>
    <v-container fluid grid-list-md>
        <v-snackbar top v-model="showSnack">Bonne traduction ! 😃</v-snackbar>
        <v-layout row wrap>
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
        ]
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