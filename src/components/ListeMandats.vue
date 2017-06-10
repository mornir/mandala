<template>
<div>

    <div v-if="currentUser">

        <h6 v-if="lateMandats.length" class="titre">En retard</h6>

        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
   <trans-mandat v-for="mandat in lateMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
</transition-group>
        

        <h6 v-if="mandatsPrioritaires.length" class="titre">Mandats prioritaires</h6>
        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
        <trans-mandat v-for="mandat in mandatsPrioritaires" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>


        <h6 v-if="todayMandats.length" class="titre">A rendre aujourd'hui</h6>
        <!--        <span v-else>Aucun mandat à rendre aujourd'hui</span>-->
        
        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
        <trans-mandat v-for="mandat in todayMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

        <h6 v-if="tomorrowMandats.length" class="titre">A rendre demain</h6>
        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
        <trans-mandat v-for="mandat in tomorrowMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

        <h6 v-if="weekMandats.length" class="titre">A rendre cette semaine</h6>
        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
        <trans-mandat v-for="mandat in weekMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

        <h6 v-if="laterMandats.length" class="titre">A rendre la semaine prochaine ou plus tard encore</h6>
        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
        <trans-mandat v-for="mandat in laterMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)"></trans-mandat>
            </transition-group>

    </div>


    <v-layout v-else justify-center>

        <v-card>
            <v-card-title class="primary white--text">
                <span>Se connecter</span>
            </v-card-title>
            <v-card-text>
                <v-select :items="users" v-model="selectedUser" label="Traducteur" auto></v-select>
                <v-text-field name="password" label="Mot de passe" v-model="password" hide-details></v-text-field>
                <span v-if="errorMessage" style="color:red">{{errorMessage}}</span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-row actions>
                <v-spacer></v-spacer>
                <v-btn flat success @click.native="login">Se connecter</v-btn>
                <v-spacer></v-spacer>
            </v-card-row>


        </v-card>
    </v-layout>


</div>
</template>

<script>
    import Mandat from "./Mandat.vue";
    import moment from 'moment';

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
                errorMessage: ''
            };
        },
        //        firebase: {
        //            mandats: db.ref('mandatsEnCours')
        //        },
        methods: {
            newStatut(newStatut, mandat) {

                const key = mandat['.key'];
                this.$firebaseRefs.mandats.child(key).child('statut').set(newStatut);

                if (newStatut === "Liquidé") {

                    const year = "20" + mandat.code.substring(0, 2);
                    //const monthName = moment(mandat.code.substring(3, 5), "MM").format("MMMM"); Move to Codepen

                    const archivedMandat = mandat;
                    // TO DO create year from substring of mandat.deadline
                    delete archivedMandat['.key'];
                    db.ref("mandats/" + year).child(key).set(archivedMandat);
                    setTimeout(() => {
                        this.$firebaseRefs.mandats.child(key).remove();
                    }, 500);
                }

            },
            login() {
                //test@test.com, test11
                auth.signInWithEmailAndPassword(this.selectedUser.email, this.password).catch((error) => {
                    // Handle Errors here.
                    console.log(error.message);
                    if (error.code === 'auth/wrong-password') {
                        this.errorMessage = 'Mot de passe incorrect';
                    }
                });
            }
        },
        computed: {
            todayMandats() {
                return this.mandats.filter(item => {
                    return item.deadline === moment().format("DD/MM/YYYY");
                });
            },
            tomorrowMandats() {
                return this.mandats.filter(item => {
                    return item.deadline === moment().add(1, 'days').format("DD/MM/YYYY");
                });
            },
            laterMandats() {
                return this.mandats.filter(item => {
                    return moment(item.deadline, "DD/MM/YYYY").isoWeek() > moment().isoWeek();
                });
            },
            mandatsPrioritaires() {
                return this.mandats.filter(item => {
                    return item.priority === "Prioritaire";
                });
            },
            weekMandats() {
                return this.mandats.filter(item => {
                    return moment(item.deadline, "DD/MM/YYYY").isoWeek() == moment().isoWeek() && moment(item.deadline, "DD/MM/YYYY") > moment().add(1, 'days');
                });
            },
            lateMandats() {
                return this.mandats.filter(item => {
                    return moment(item.deadline, "DD/MM/YYYY") < moment().subtract(1, 'days');
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
                    //this.$bindAsArray('mandats', db.ref('mandats/2016').orderByChild("statutFirebase").equalTo(true));
                    this.$bindAsArray('mandats', db.ref('mandatsEnCours'));

                } else {
                    // User is signed out.
                    this.currentUser = null;
                }
            });
        },
        components: {
            transMandat: Mandat
        }
    };

</script>

<style>
    .titre {
        margin-top: 14px;
        margin-bottom: 5px;
    }

</style>
