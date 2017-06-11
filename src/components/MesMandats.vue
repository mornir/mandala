<template>
<div>

    <div v-if="currentUser">
        <div v-if="traductions.length || revisions.length && isMandats">

            <h6 class="titre" v-if="traductions.length">Mes traductions</h6>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in traductions" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>


            <h6 class="titre" v-if="revisions.length">Mes révisions</h6>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in revisions" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
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
        //        firebase: {
        //            mandats: db.ref('mandatsEnCours').orderByChild('timeStamp')
        //        },
        methods: {
            newStatut(newStatut, mandat) {

                const key = mandat['.key'];
                this.$firebaseRefs.mandats.child(key).child('statut').set(newStatut);

                if (newStatut === "Liquidé") {

                    const year = "20" + mandat.code.substring(0, 2);
                    //const monthName = moment(mandat.code.substring(3, 5), "MM").format("MMMM"); Move to Codepen

                    const archivedMandat = mandat;
                    delete archivedMandat['.key'];
                    db.ref("mandatsLiquidés/" + year).child(key).set(archivedMandat);
                    setTimeout(() => {
                        this.$firebaseRefs.mandats.child(key).remove();
                    }, 500);
                }

            }
        },
        computed: {
            traductions() {
                return this.mandats.filter((mandat) => {
                    return mandat.traducteur === this.currentUser.displayName;
                });
            },
            revisions() {
                return this.mandats.filter((mandat) => {
                    return mandat.réviseur === this.currentUser.displayName && mandat.statut === "À réviser";
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
