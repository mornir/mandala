<template>
<div>

    <h6 v-if="lateMandats.length" class="titre">En retard</h6>
    <trans-mandat v-for="mandat in lateMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut"></trans-mandat>

    <h6 v-if="mandatsPrioritaires.length" class="titre">Mandats prioritaires</h6>
    <trans-mandat v-for="mandat in mandatsPrioritaires" :mandat=mandat :key="mandat.code" @changedStatut="newStatut"></trans-mandat>


    <h6 v-if="todayMandats.length" class="titre">A rendre aujourd'hui</h6>
    <!--        <span v-else>Aucun mandat à rendre aujourd'hui</span>-->
    <trans-mandat v-for="mandat in todayMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut"></trans-mandat>

    <h6 v-if="tomorrowMandats.length" class="titre">A rendre demain</h6>
    <trans-mandat v-for="mandat in tomorrowMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut"></trans-mandat>
    
      <h6 v-if="weekMandats.length" class="titre">A rendre cette semaine</h6>
    <trans-mandat v-for="mandat in weekMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut"></trans-mandat>

    <h6 v-if="laterMandats.length" class="titre">A rendre plus tard</h6>
    <trans-mandat v-for="mandat in laterMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut"></trans-mandat>

</div>
</template>

<script>
    import Mandat from "./Mandat.vue";
    import moment from 'moment';
    //import 'moment/locale/fr';

    import {
        db
    } from '../firebase';

    //necessary?
    //moment.locale('fr');

    export default {
        data() {
            return {
                mandats: [],
                currentUser: "Carine"
            };
        },
        firebase: {
            mandats: db.ref('mandats/2016').orderByChild("statutFirebase").equalTo(true)
        },
        methods: {
            newStatut({
                key,
                newStatut
            }) {
                console.log(key);
                console.log(newStatut);
                this.$firebaseRefs.mandats.child(key).child('statut').set(newStatut);
                if (newStatut === 'Liquidé') {
                    this.$firebaseRefs.mandats.child(key).child('statutFirebase').set(false);
                }

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
                    //return item.deadline === this.tomorrow;
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
