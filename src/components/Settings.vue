<template>
    <v-layout justify-center>
        <v-card>
        <v-card-title class="primary white--text">
            Mon profil
            
        </v-card-title>
            <v-card-text>
           <v-card-row>
               <div class="subheading">
                <span>Mon prénom : </span>
                <strong>{{currentUser.displayName }}</strong>
                </div>
                </v-card-row>
                  
                  <v-text-field
              name="displayName"
              label="Nouveau prénom"
                                v-model="displayName"
            ></v-text-field>
          <v-btn @click.native="update">Mettre à jour le prénom</v-btn>
                
                <v-btn error @click.native="logout">Se déconnecter</v-btn>
            
            </v-card-text>
        
        
        </v-card>
  
  </v-layout>
</template>

<script>
    import {
        auth
    } from '../firebase';
    export default {
        data() {
            return {
                currentUser: {},
                displayName: ''
            };
        },
        methods: {
            logout() {
                auth.signOut().then(() => {
                    console.log('Signed Out');
                    this.$router.push('mesmandats');
                }, (error) => {
                    console.error('Sign Out Error', error);
                });
            },
            update() {
                this.currentUser.updateProfile({
                    displayName: this.displayName,
                }).then(() => {
                    // Update successful.
                    console.log('Update successful');
                }, (error) => {
                    // An error happened.
                    console.error(error);
                });
            }
        },
        beforeCreate() {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    this.currentUser = user;
                } else {
                    // User is signed out.
                    this.currentUser = null;
                }
            });
        },
    };

</script>

<style>


</style>
