<template>
<div>
    <div v-if="currentUser">
        <div v-if="traductions.length || revisions.length && isMandats">
            <transition name="fade" leave-active-class="animated fadeOut">
                <h6 class="titre" v-if="traductions.length">Mes traductions</h6>
            </transition>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in traductions" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
            </transition-group>

            <transition name="fade" leave-active-class="animated fadeOut">
                <h6 class="titre" v-if="revisions.length">Mes révisions</h6>
            </transition>
            <transition-group name="bounce" leave-active-class="animated bounceOutRight">
                <trans-mandat v-for="mandat in revisions" :mandat=mandat :key="mandat.code" @changedStatut="newStatut($event, mandat)" @newRemarque="saveRemarque($event, mandat)"></trans-mandat>
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
    import {
        displayMandats
    } from './mixins/displayMandats';

    export default {
        mixins: [displayMandats],
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
        }
    };

</script>

<style>
    .titre {
        margin-top: 14px;
        margin-bottom: 5px;
    }

</style>
