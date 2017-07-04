<template>
<v-stepper v-model="etape">
    <v-stepper-header>
        <v-stepper-step step="1" :complete="etape > 1" editable edit-icon="check">Administration</v-stepper-step>
        <v-divider />
        <v-stepper-step step="2" :complete="etape > 2" editable edit-icon="check">Calendrier</v-stepper-step>
        <v-divider />
        <v-stepper-step step="3" editable edit-icon="check">Traduction</v-stepper-step>
    </v-stepper-header>

    <v-stepper-content step="1" class="light-blue lighten-4">
        <step-admin :mandat="mandat"></step-admin>
        <v-btn primary @click.native="etape = 2" light>Continuer</v-btn>
    </v-stepper-content>

    <v-stepper-content step="2" class="light-blue lighten-4">
        <step-cal :mandat="mandat"></step-cal>
        <v-btn primary @click.native="etape = 3" light>Continuer</v-btn>
        <v-btn flat @click.native="etape = 1">Retour</v-btn>
    </v-stepper-content>

    <v-stepper-content step="3" class="light-blue lighten-4">
        <step-trad :mandat="mandat"></step-trad>
        <v-btn success @click.native="saveChanges()" light>Enregistrer les modifications</v-btn>
        <v-btn flat @click.native="etape = 2">Retour</v-btn>
    </v-stepper-content>

</v-stepper>
</template>

<script>
    import StepAdmin from "./StepAdmin.vue";
    import StepCal from "./StepCal.vue";
    import StepTrad from "./StepTrad.vue";
    import {
        db
    } from '../firebase';

    export default {
        data() {
            return {
                etape: 1,
                mandat: {}
            };
        },
        firebase() {
            return {
                mandat: {
                    source: db.ref('mandatsEnCours/' + this.$route.params.key),
                    asObject: true
                }
            };
        },
        methods: {
            saveChanges() {
                const updatedMandat = this.mandat;
                delete updatedMandat['.key'];
                db.ref('mandatsEnCours/').child(this.$route.params.key).set(updatedMandat);
                this.$router.push('/');
            }
        },
        components: {
            stepAdmin: StepAdmin,
            stepCal: StepCal,
            stepTrad: StepTrad
        }
    };

</script>

<style>
    input[type=number] {
        width: 50px;
        font-weight: bold;
    }

</style>
