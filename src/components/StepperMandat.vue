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
        <step-admin :mandat=mandat></step-admin>
        <v-btn primary @click.native="etape = 2" light>Continuer</v-btn>
    </v-stepper-content>

    <v-stepper-content step="2" class="light-blue lighten-4">
        <step-cal :mandat=mandat></step-cal>
        <v-btn primary @click.native="etape = 3" light>Continuer</v-btn>
        <v-btn flat @click.native="etape = 1">Retour</v-btn>
    </v-stepper-content>

    <v-stepper-content step="3" class="light-blue lighten-4">
        <step-trad :mandat=mandat></step-trad>
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
                mandat: {
                    code: '',
                    name: '',
                    arrival: new Date(),
                    fichiers: [{
                            name: 'Word',
                            value: 1
                        },
                        {
                            name: 'Excel',
                            value: 0,
                        },
                        {
                            name: 'PPT',
                            value: 0,
                        },
                        {
                            name: 'PDF',
                            value: 0,
                        }
                    ],
                    type: 'REDAC',
                    activity: 'Traduction',
                    TAO: 'Oui',
                    source: 'DE',
                    target: 'FR',
                    translator: '',
                    reviewer: '',
                    deadline: new Date(),
                    moment: null,
                    priority: 'Ordinaire',
                    mandant: '',
                    public_cible: 'ECA',
                    costs: 'VKF',
                    remarque: '',
                    statut: 'En traduction',
                    statutFirebase: true
                }
            };
        },
        firebase: {
            mandats: db.ref('mandats/2016')
        },
        methods: {
            newMandat() {
                if (this.mandat.reviewer === 'autre') {
                    this.mandat.reviewer = this.autreReviewer;
                }

                //iterate over this.files extract value > 0 push into this.mandat.fichiers

                this.mandat.fichiers = this.mandat.fichiers.filter(item => {
                    return item.value > 0;
                });

                this.mandat.translator = auth.currentUser.displayName;

                this.mandat.arrival = new Date(this.mandat.arrival).toLocaleDateString('fr-FR');
                this.mandat.deadline = new Date(this.mandat.deadline).toLocaleDateString('fr-FR');

                this.mandat.code = this.generateCode();

                console.log(JSON.stringify(this.mandat));

                this.$firebaseRefs.mandats.push(this.mandat);

                this.$router.push('/');

            },
            generateCode() {
                const year = moment().format("YY");
                const month = moment().format("MM");
                const number = ("00" + this.mandats.length).slice(-3);
                const code = `${year}.${month}.${number}`;

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
