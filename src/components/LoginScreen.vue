<template>
    <v-layout justify-center>

    <v-dialog v-model="happyBirthday" max-width="700" hide-overlay persistent>
      <v-card class="happyBirthdayCard">

        <v-card-title class="happyBirthday"> Joyeux Anniversaire !!! </v-card-title>

  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat="flat" @click="merci" class="merci" outline >Merci !</v-btn>
              <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-flex xs3>
            <v-card flat class="stepCard" v-if="showLogin">

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
          email: 'carine@test.com'
        },
        {
          text: 'Jérôme',
          email: 'test@test.com'
        },
        {
          text: 'Sarah',
          email: 'sarah@test.com'
        }
      ],
      selectedUser: {
        text: 'Carine',
        email: 'carine@test.com'
      },
      password: '',
      errorMessage: '',
      e1: true,
      happyBirthday: false,
      showLogin: true
    }
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.selectedUser.email, this.password)
        .then(user => {
          if (user.displayName === 'Sarah') {
            this.showLogin = false
            this.$confetti.start({
              shape: 'rect',
              colors: ['red', 'pink', '#ba0000']
            })
            this.happyBirthday = true
            return
          }
          this.$router.push('/smartview')
        })
        .catch(error => {
          console.log(error.message)
          if (error.code === 'auth/wrong-password') {
            this.errorMessage = 'Mot de passe incorrect'
          }
        })
    },
    merci() {
      this.happyBirthday = false
      this.$confetti.stop()
      this.$router.push('/smartview')
    }
  }
}
</script>

<style>
.happyBirthday {
  justify-content: center;
  font-family: 'Pacifico', cursive;
  color: red;
  font-size: 50px;
}
.merci {
  font-family: 'Pacifico', cursive;
}

.happyBirthdayCard {
  border: 2px solid red;
  padding: 5px;
  border-radius: 10px;
  background-color: gainsboro !important;
}
</style>