<template>
<v-layout justify-center>
    <v-card flat class="stepCard">
        <v-toolbar flat>
            <v-toolbar-title>Profil de {{currentUser.displayName}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        
                <div class="subheading">
                <span>Numéro du dernier mandat créé du mois :</span>
                    <v-text-field label="Numéro du mandat" name="numéro" v-model.number="compteur" box></v-text-field>
                    <v-btn @click="updateNumero" color="info" flat>Mettre à jour le numéro</v-btn>
                </div>
         
            

  <!--
                <div class="subheading">
                    <span>Mon prénom : </span>
                    <strong>{{currentUser.displayName}}</strong>
                </div>
            <v-text-field name="displayName" label="Nouveau prénom" v-model="displayName" hide-details></v-text-field>
            <v-btn @click="update">Mettre à jour le prénom</v-btn>
-->
            
            <v-divider></v-divider>
            <v-btn color="error" @click="logout" flat>Se déconnecter</v-btn>
            
            

        </v-card-text>


    </v-card>

</v-layout>
</template>

<script>
import format from 'date-fns/format'
import { db, auth } from '../firebase'

const year = format(new Date(), 'YYYY')
const month = format(new Date(), 'MM')

const compteurRef = db
  .ref('compteurs')
  .child(year)
  .child(month)

export default {
  data() {
    return {
      currentUser: auth.currentUser,
      displayName: '',
      compteur: 0
    }
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          console.log('Signed Out')
        })
        .catch(error => {
          console.error('Sign Out Error', error)
        })
    },
    update() {
      this.currentUser
        .updateProfile({
          displayName: this.displayName
        })
        .then(() => {
          // Update successful.
          console.log('Update successful')
        })
        .catch(error => {
          // An error happened.
          console.error(error)
        })
    },
    updateNumero() {
      compteurRef
        .set(this.compteur)
        .then(function() {
          console.log('Synchronization succeeded')
        })
        .catch(function(error) {
          console.log('Synchronization failed')
        })
    }
  },
  created() {
    compteurRef.on('value', snapshot => {
      this.compteur = snapshot.val() || 0
    })
  }
}
</script>

<style>

</style>
