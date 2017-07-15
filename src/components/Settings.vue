<template>
<v-layout justify-center>
    <v-card>
        <v-toolbar class="indigo" light>
            <v-toolbar-title>Mon profil</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-card-row>
                <div class="subheading">
                <span>Numéro du dernier mandat créé du mois :</span>
                    <v-text-field label="Numéro du mandat" name="numéro" v-model.number="compteur" hide-details></v-text-field>
                    <v-btn @click.native="updateNumero">Mettre à jour le numéro</v-btn>
                </div>
                </v-card-row>
                <v-card-row>
                <div class="subheading">
                    <span>Mon prénom : </span>
                    <strong>{{currentUser.displayName}}</strong>
                </div>
            </v-card-row>

            <v-text-field name="displayName" label="Nouveau prénom" v-model="displayName" hide-details></v-text-field>
            <v-btn @click.native="update">Mettre à jour le prénom</v-btn>

            <v-btn error @click.native="logout">Se déconnecter</v-btn>
            
            

        </v-card-text>


    </v-card>

</v-layout>
</template>

<script>
    import moment from 'moment';
    import {
        auth
    } from '../firebase';
    import {
        db
    } from '../firebase';

    const compteurRef = db.ref('compteurs').child(moment().format('YYYY')).child(moment().format("MM"));

    export default {
        data() {
            return {
                currentUser: {},
                displayName: '',
                compteur: 0
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
            },
            updateNumero() {
                compteurRef.set(this.compteur)
                    .then(function() {
                        console.log('Synchronization succeeded');
                    })
                    .catch(function(error) {
                        console.log('Synchronization failed');
                    });
            }

        },
        created() {
            compteurRef.on('value', snapshot => {
                this.compteur = snapshot.val() || 0;
            });
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
