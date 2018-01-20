<template>
    <v-layout justify-center>
        <v-flex xs3>
            <v-card flat class="stepCard">

                <v-card-text>
                    <v-select :items="users" v-model="selectedUser" label="Traducteur" auto></v-select>
                    <v-text-field name="password" label="Mot de passe" v-model="password" hide-details :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"></v-text-field>
                    <span v-if="errorMessage" style="color:pink">{{errorMessage}}</span>
                </v-card-text>
                <v-card-actions>
                    <v-layout class="mt-4" justify-center>
                        <v-btn flat color="info" @click="login">Se connecter</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { auth } from '../firebase'
export default {
  data() {
    return {
      users: [
        {
          text: 'Carine',
          email: 'carine@test.com',
        },
        {
          text: 'Jérôme',
          email: 'test@test.com',
        },
        {
          text: 'Sarah',
          email: 'sarah@test.com',
        },
      ],
      selectedUser: {
        text: 'Carine',
        email: 'carine@test.com',
      },
      password: '',
      errorMessage: '',
      e1: true,
    }
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.selectedUser.email, this.password)
        .then(() => {
          this.$router.push('/smartview')
        })
        .catch(error => {
          console.log(error.message)
          if (error.code === 'auth/wrong-password') {
            this.errorMessage = 'Mot de passe incorrect'
          }
        })
    },
  },
}
</script>

<style>

</style>
