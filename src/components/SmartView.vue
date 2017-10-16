<template>
    <v-container fluid grid-list-md>
        <v-snackbar top v-model="showSnack">Bonne traduction ! 😃</v-snackbar>
        <v-layout justify-center v-if="isLoading">
            <v-progress-circular indeterminate color="primary" id="progress-circular" :width="7" :size="70" class="mt-5"></v-progress-circular>
        </v-layout>

        <v-layout row wrap v-else justify-center>
            <v-flex xs10 v-if="!mandats.length">
                <blockquote>Man kann sogar behaupten, dass eine Übersetzung um so abweichender wird, je mühsamer sie nach Treue strebt.
                    <footer>
                        <small>
                            <em>&mdash; Wilhelm von Humboldt</em>
                        </small>
                    </footer>
                </blockquote>
            </v-flex v-else>
            <transition-group name="roll" enter-active-class="animated rollIn" leave-active-class="animated rollOut" tag="v-layout">

                <mandat :mandat="mandat" @revised="updateRevised($event, mandat)" @setStatut="setStatut($event, mandat)" v-for="mandat in mesMandats" :key="mandat.code"></mandat>

            </transition-group>
        </v-layout>

    </v-container>
</template>

<script>
import {
    db, auth
} from '../firebase';

import Mandat from '@/components/Mandat'
import bus from '@/js/bus'

export default {
    data: () => ({
        showSnack: false,
        isLoading: true
    }),
    computed: {
        mesMandats() {
            return this.mandats.filter(trad => trad.statut !== 'À réviser' || trad.révisé === true && trad.réviseur === auth.currentUser.displayName)
        }
    },
    methods: {
        updateRevised(newBool, mandat) {
            const key = mandat['.key']
            this.$firebaseRefs.mandats.child(`${key}/révisé`).set(newBool)
        },
        setStatut(newStatut, mandat) {
            const key = mandat['.key']

            if (newStatut === '') {

            }
            this.$firebaseRefs.mandats.child(`${key}/statut`).set(newStatut)
        }
    },
    created() {
        this.showSnack = bus.showSnack
        bus.showSnack = false
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
