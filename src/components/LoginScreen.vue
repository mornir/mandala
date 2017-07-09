<template>
<v-card>
    <v-card-title class="primary white--text">
        <span>Se connecter</span>
    </v-card-title>
    <v-card-text>
        <v-select :items="users" v-model="selectedUser" label="Traducteur" auto></v-select>
        <v-text-field name="password" label="Mot de passe" v-model="password" hide-details type="password"    :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"></v-text-field>
        <span v-if="errorMessage" style="color:red">{{errorMessage}}</span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-row actions>
        <v-spacer></v-spacer>
        <v-btn flat success @click.native="login">Se connecter</v-btn>
        <v-spacer></v-spacer>
    </v-card-row>
</v-card>
</template>

<script>
    import {
        auth
    } from '../firebase';
    export default {
        data() {
            return {
                users: [{
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
                e1: true
            };
        },
        methods: {
            login() {
                auth.signInWithEmailAndPassword(this.selectedUser.email, this.password).catch((error) => {
                    console.log(error.message);
                    if (error.code === 'auth/wrong-password') {
                        this.errorMessage = 'Mot de passe incorrect';
                    }
                });
            }
        }
    };

</script>

<style>


</style>
