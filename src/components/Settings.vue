<template>
    <div>
    <v-btn error @click.native="logout">Log out</v-btn>
                  <v-text-field
              name="displayName"
              label="Prénom"
                                v-model="displayName"
            ></v-text-field>
          <v-btn @click.native="update">Update</v-btn>
    </div>
</template>

<script>
    import {
        auth
    } from '../firebase';
    export default {
        data() {
            return {
                currentUser: null,
                displayName: ''
            };
        },
        methods: {
            logout() {
                auth.signOut().then(() => {
                    console.log('Signed Out');
                    this.$router.push('/');
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
