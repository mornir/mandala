<template>
    <div>


        <h6  class="titre">Mes traductions</h6>

        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
   <trans-mandat v-for="mandat in traductions" :mandat=mandat :key="mandat.code"></trans-mandat>
</transition-group>
        

        <h6  class="titre">Mes révisions</h6>
        <transition-group   name="bounce"
  leave-active-class="animated bounceOutRight">
        <trans-mandat v-for="mandat in revisions" :mandat=mandat :key="mandat.code"></trans-mandat>
            </transition-group>


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
                currentTranslator: auth.currentUser.displayName,
                mandats: []
            };
        },
        firebase: {
            mandats: db.ref('mandats/2016').orderByChild("statutFirebase").equalTo(true)
        },
        computed: {
            revisions() {
                return this.mandats.filter((mandat) => {
                    return mandat.reviewer === this.currentTranslator && mandat.statut === "À révisé";
                });
            },
            traductions() {
                return this.mandats.filter((mandat) => {
                    return mandat.translator === this.currentTranslator;
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
