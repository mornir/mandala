<template>
<div>
    <div v-if="currentUser">
        <div v-if="mandats.length && isMandats">
            <h6 v-if="lateMandats.length" class="titre">En retard</h6>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in lateMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>


            <h6 v-if="mandatsPrioritaires.length" class="titre">Mandats prioritaires</h6>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in mandatsPrioritaires" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>


            <h6 v-if="todayMandats.length" class="titre">A rendre aujourd'hui</h6>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in todayMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

            <h6 v-if="tomorrowMandats.length" class="titre">A rendre demain</h6>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in tomorrowMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

            <h6 v-if="weekMandats.length" class="titre">A rendre cette semaine</h6>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in weekMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

            <h6 v-if="laterMandats.length" class="titre">A rendre la semaine prochaine ou plus tard encore</h6>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in laterMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>
        </div>
        <v-layout v-else justify-center>
            <span class="title" v-if="isMandats"><v-icon>beach_access</v-icon>  Aucun mandat en cours <v-icon>beach_access</v-icon></span>
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
                mandats: [],
                currentUser: {},
                isMandats: false
            };
        },
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
            todayMandats() {
                return this.mandats.filter(item => {
                    return item.délai === moment().format("DD/MM/YYYY");
                });
            },
            tomorrowMandats() {
                return this.mandats.filter(item => {
                    return item.délai === moment().add(1, 'days').format("DD/MM/YYYY");
                });
            },
            laterMandats() {
                return this.mandats.filter(item => {
                    return moment(item.délai, "DD/MM/YYYY").isoWeek() > moment().isoWeek();
                });
            },
            mandatsPrioritaires() {
                return this.mandats.filter(item => {
                    return item.priorité === "Prioritaire";
                });
            },
            weekMandats() {
                return this.mandats.filter(item => {
                    return moment(item.délai, "DD/MM/YYYY").isoWeek() == moment().isoWeek() && moment(item.délai, "DD/MM/YYYY") > moment().add(1, 'days');
                });
            },
            lateMandats() {
                return this.mandats.filter(item => {
                    return moment(item.délai, "DD/MM/YYYY") < moment().subtract(1, 'days');
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
