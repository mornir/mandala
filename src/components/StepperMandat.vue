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
        <step-trad :mandat="mandat" ></step-trad>
        <v-btn success @click.native="newMandat()" light>Créer le mandat</v-btn>
        <v-btn flat @click.native="etape = 2">Retour</v-btn>
    </v-stepper-content>

</v-stepper>
</template>

<script>
    import moment from 'moment';

    import StepAdmin from "./StepAdmin.vue";
    import StepCal from "./StepCal.vue";
    import StepTrad from "./StepTrad.vue";
    import {
        db
    } from '../firebase';

    import {
        auth
    } from '../firebase';

    export default {
        data() {
            return {
                etape: 1,
                mandats: [],
                counter: {},
                mandat: {
                    code: '',
                    name: '',
                    arrival: new Date().toLocaleDateString('fr-FR'),
                    fichiers: [{
                            value: 1,
                            name: 'Word'

                        },
                        {
                            value: 0,
                            name: 'Excel'

                        },
                        {
                            value: 0,
                            name: 'PPT'

                        },
                        {
                            value: 0,
                            name: 'PDF'

                        }
                    ],
                    type: 'REDAC',
                    activity: 'Traduction',
                    TAO: 'Oui',
                    source: 'DE',
                    target: 'FR',
                    translator: '',
                    reviewer: '',
                    deadline: new Date().toLocaleDateString('fr-FR'),
                    moment: null,
                    priority: 'Ordinaire',
                    mandant: '',
                    public_cible: 'ECA',
                    costs: 'VKF',
                    remarque: '',
                    statut: 'Traduction',
                    statutFirebase: true
                }
            };
        },
        firebase: {
            mandats: db.ref('mandatsEnCours'),
            counter: {
                source: db.ref('counters').child(moment().format('YYYY')).child(moment().format('MMMM')),
                asObject: true
            }
        },
        methods: {
            newMandat() {

                this.mandat.translator = auth.currentUser.displayName;

                this.mandat.code = this.generateCode();

                const cleanCode = this.mandat.code.replace(/\./g, '_');

                db.ref('mandatsEnCours').child(cleanCode).set(this.mandat);

                //this.$firebaseRefs.mandats.push(this.mandat);

                this.$router.push('/');

            },
            generateCode() {
                let counterValue = 1;

                if (this.counter['.value']) {
                    counterValue = this.counter['.value'];
                }

                const year = moment().format("YY");
                const month = moment().format("MM");
                const number = ("00" + counterValue).slice(-3);
                const code = `${year}.${month}.${number}`;

                db.ref('counters').child(moment().format('YYYY')).child(moment().format('MMMM')).set(counterValue + 1);

                return code;

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
