<template>
<div>

    <div v-if="currentUser">
        <div v-if="mandats.length && isMandats">

            <h6 class="titre" v-if="traductions.length">Mes traductions</h6>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in traductions" :mandat=mandat :key="mandat.code"></trans-mandat>
            </transition-group>


            <h6 class="titre" v-if="revisions.length">Mes révisions</h6>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in revisions" :mandat=mandat :key="mandat.code"></trans-mandat>
            </transition-group>
        </div>
        <v-layout v-else justify-center>
            <div class="title" v-if="isMandats">
                <p>Tu n'as aucune traduction ni révision en cours...</p>
                <p>C'est le bon moment pour archiver des mandats ou créer des fiches dans MultiTerm
                    <v-icon>mood</v-icon>
                </p>
            </div>
        </v-layout>
    </div>

    <v-layout v-else justify-center>
        <login-screen></login-screen>
    </v-layout>

</div>
</template>

<script>
    import moment from 'moment';

    import Mandat from "./Mandat.vue";
    import LoginScreen from "./LoginScreen.vue";

    import {
        auth
    } from '../firebase';

    import {
        db
    } from '../firebase';

    export default {
        data() {
            return {
                test: false,
                currentUser: {},
                mandats: [],
                isMandats: false
            };
        },
        firebase: {
            mandats: db.ref('mandatsEnCours').orderByChild('timeStamp')
        },
        computed: {
            revisions() {
                return this.mandats.filter((mandat) => {
                    return mandat.reviewer === this.currentUser.displayName && mandat.statut === "À réviser";
                });
            },
            traductions() {
                return this.mandats.filter((mandat) => {
                    return mandat.translator === this.currentUser.displayName;
                });
            }
        },
        beforeCreate() {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    this.currentUser = user;
                    // Bind this instance's 'mandats'
                    // Firebase reference via vuefire.js' $bindAsArray() method
                    this.$bindAsArray('mandats', db.ref('mandatsEnCours').orderByChild('timeStamp'), null, () => {
                        this.isMandats = true;
                    });


                } else {
                    // User is signed out.
                    this.currentUser = null;
                }
            });
        },
        components: {
            transMandat: Mandat,
            loginScreen: LoginScreen
        }
    };

</script>

<style>
    .titre {
        margin-top: 14px;
        margin-bottom: 5px;
    }

</style>
