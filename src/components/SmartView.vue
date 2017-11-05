<template>
    <v-container fluid grid-list-md>
        <v-snackbar top v-model="snackbar.showSnack"><span class="title">{{snackbar.message}}</span></v-snackbar>

        <v-dialog v-model="liquideMandatDialog" max-width="500px">

          <v-card class="stepCard">
          <v-card-title>
   
            <div class="headline">Veux-tu liquider à jamais ce mandat ?</div>
            <span class="subheading">Cette action est irréversible.</span>

        </v-card-title>
            <v-card-actions>
            <v-btn flat color="info" @click="liquideMandat">Oui, l'expédier illico dans les archives</v-btn>
          <v-btn flat @click="liquideMandatDialog = false">Non, pas encore</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>


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
            <transition-group name="roll" tag="v-layout" class="smartView">

                <mandat :mandat="mandat" @questions="updateQuestions($event, mandat)" @setStatut="setStatut($event, mandat)" v-for="mandat in mesMandats" :key="mandat.code"></mandat>

            </transition-group>
        </v-layout>

    </v-container>
</template>

<script>
import { db, auth } from '../firebase'

import Mandat from '@/components/Mandat'
import bus from '@/js/bus'

import axios from 'axios'

export default {
  data: () => ({
    snackbar: {},
    isLoading: true,
    liquideMandatDialog: false,
    me: auth.currentUser.displayName,
    activeMandatCode: ''
  }),
  computed: {
    mesMandats() {
      return this.mandats.filter(
        trad =>
          (trad.traducteur === this.me && trad.statut !== 'À réviser') ||
          (trad.réviseur === this.me && trad.statut === 'À réviser')
      )
    }
  },
  methods: {
    updateQuestions(newBool, mandat) {
      const key = mandat['.key']
      this.$firebaseRefs.mandats.child(`${key}/questions`).set(newBool)
    },
    setStatut(newStatut, mandat) {
      const key = mandat['.key']

      if (newStatut === 'Liquider le mandat') {
        this.liquideMandatDialog = true
        this.activeMandat = mandat
        return
      }
      this.$firebaseRefs.mandats.child(`${key}/statut`).set(newStatut)
    },
    liquideMandat() {
      const key = this.activeMandat['.key']
      delete this.activeMandat['.key']
      console.log(this.activeMandat)

      const postRequest = {
        body: this.activeMandat
      }

      axios({
        method: 'put',
        url: `https://first-cluster-2026533573.eu-central-1.bonsaisearch.net/mandats/mandat/${key}`,
        data: {
          body: this.activeMandat
        },
        auth: {
          username: 'sl729fctsq',
          password: 'tslh5y1zel'
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.snackbar.showSnack = bus.snackbar.showSnack
    this.snackbar.message = bus.snackbar.message

    bus.snackbar.showSnack = false
    this.$bindAsArray(
      'mandats',
      db.ref('mandatsEnCours').orderByChild('timeStamp'),
      null,
      () => {
        this.isLoading = false
      }
    )
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

.roll-move {
  transition: transform 1s;
  /*transition: all 1s;*/
}

.smartView {
  flex-wrap: wrap;
  justify-content: center;
}

/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

@keyframes rollIn {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes rollOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
  }
}

.roll-enter-active {
  animation: rollIn 1s;
}

.roll-leave-active {
  animation: rollOut 1s;
  position: absolute;
}

.fold-leave-active {
  animation: fold 1s;
}

.fold-move {
  transition: transform 1s;
  /*transition: all 1s;*/
  transition-delay: 1s;
}

@keyframes fold {
  0% {
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale3d(1, 1, 1);
  }
  30% {
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform: scale3d(1, 0.4, 1);
  }
  60% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform: scale3d(0.4, 0.4, 1);
  }
  100% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transform: scale3d(0.2, 0.2, 0.2);
  }
}
</style>
