<template>
<div>
    <div v-if="currentUser">
        <div v-if="mandats.length && isMandats">

            <h6 v-if="lateMandats.length" class="titre">En retard</h6>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in lateMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
            </transition-group>

            <transition name="fade" leave-active-class="animated fadeOut">
                <h6 v-if="todayMandats.length" class="titre">A rendre aujourd'hui</h6>
            </transition>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in todayMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
            </transition-group>

            <transition name="fade" leave-active-class="animated fadeOut">
                <h6 v-if="tomorrowMandats.length" class="titre">A rendre demain</h6>
            </transition>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in tomorrowMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
            </transition-group>
            <transition name="fade" leave-active-class="animated fadeOut">
                <h6 v-if="weekMandats.length" class="titre">A rendre cette semaine</h6>
            </transition>

            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in weekMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
            </transition-group>
            <transition name="fade" leave-active-class="animated fadeOut">
                <h6 v-if="laterMandats.length" class="titre">A rendre la semaine prochaine ou plus tard encore</h6>
            </transition>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in laterMandats" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
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
    import {
        displayMandats
    } from './mixins/displayMandats';

    export default {
        mixins: [displayMandats],
        computed: {
            todayMandats() {
                return this.mandats.filter(item => {
                    return item.délai === this.$moment().format("DD/MM/YYYY");
                });
            },
            tomorrowMandats() {
                return this.mandats.filter(item => {
                    return item.délai === this.$moment().add(1, 'days').format("DD/MM/YYYY");
                });
            },
            laterMandats() {
                return this.mandats.filter(item => {
                    return this.$moment(item.délai, "DD/MM/YYYY").isoWeek() > this.$moment().isoWeek();
                });
            },
            weekMandats() {
                return this.mandats.filter(item => {
                    return this.$moment(item.délai, "DD/MM/YYYY").isoWeek() == this.$moment().isoWeek() && this.$moment(item.délai, "DD/MM/YYYY") > this.$moment().add(1, 'days');
                });
            },
            lateMandats() {
                return this.mandats.filter(item => {
                    return this.$moment(item.délai, "DD/MM/YYYY") < this.$moment().subtract(1, 'days');
                });
            }
        }
    };

</script>

<style>
    .titre {
        margin-top: 14px;
        margin-bottom: 5px;
    }

</style>
