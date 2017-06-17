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
                    nom: '',
                    arrivée: moment().format("DD/MM/YYYY"),
                    délai: moment().format("DD/MM/YYYY"),
                    fichiers: [{
                            nombre: 1,
                            fichier: 'Word'

                        },
                        {
                            nombre: 0,
                            fichier: 'Excel'

                        },
                        {
                            nombre: 0,
                            fichier: 'PPT'

                        },
                        {
                            nombre: 0,
                            fichier: 'PDF'

                        }
                    ],
                    type: 'REDAC',
                    activité: 'Traduction',
                    TAO: 'Oui',
                    source: 'DE',
                    cible: 'FR',
                    traducteur: '',
                    réviseur: 'Jérôme',
                    moment: null,
                    priorité: 'Ordinaire',
                    mandant: '',
                    public_cible: 'ECA',
                    centre_coûts: 'VKF',
                    remarque: '',
                    statut: 'Traduction',
                    timeStamp: 0
                }
            };
        },
        firebase: {
            mandats: db.ref('mandatsEnCours'),
            counter: {
                source: db.ref('compteurs').child(moment().format('YYYY')).child(moment().format('MMMM')),
                asObject: true
            }
        },
        methods: {
            newMandat() {

                //FIX FOR IE11 which insert non ASCII caracters
                this.mandat.arrivée = this.mandat.arrivée.replace(/[^\x00-\x7F]/g, "");
                this.mandat.délai = this.mandat.délai.replace(/[^\x00-\x7F]/g, "");

                this.mandat.traducteur = auth.currentUser.displayName;

                if (this.mandat.priorité === 'Prioritaire') {
                    this.mandat.timeStamp = 0;
                } else {
                    this.mandat.timeStamp = moment(this.mandat.délai, "DD/MM/YYYY").format('x');
                }

                this.mandat.code = this.generateCode();
                const cleanCode = this.mandat.code.replace(/\./g, '_');
                db.ref('mandatsEnCours').child(cleanCode).set(this.mandat);
                //IF SUCCESS THEN UPDATE COMPTEUR!!!!!!!!!!

                this.$router.push('touslesmandats');


                /********
                this.mandat.translator = auth.currentUser.displayName;

                const year = moment().format("YY");
                const month = moment().format("MM");

                //handel error
                this.getCounterValue().then((result) => {
                    const number = ("00" + result.snapshot.val()).slice(-3);
                    this.mandat.code = `${year}.${month}.${number}`;
                    const cleanCode = this.mandat.code.replace(/\./g, '_');
                    db.ref('mandatsEnCours').child(cleanCode).set(this.mandat);
                });

                this.$router.push('/'); //inside the callback??
                
                ********/

            },
            generateCode() {

                //.set fonctionne aussi. mais avec .transaction, il est possible d'initialiser le counter à zéro if it was undefined before.
                //handel error??
                this.$firebaseRefs.counter.transaction((currentValue) => {
                    return (currentValue || 0) + 1;
                });

                const year = moment().format("YY");
                const month = moment().format("MM");
                const number = ("00" + this.counter['.value']).slice(-3);
                const code = `${year}.${month}.${number}`;
                return code;

            }
            //            getCounterValue() {
            //                if (!this.counter['.value']) {
            //                    db.ref('counters').child(moment().format('YYYY')).child(moment().format('MMMM')).set(0);
            //                }
            //
            //                return db.ref('counters').child(moment().format('YYYY')).child(moment().format('MMMM')).transaction((currentValue) => {
            //                    return currentValue + 1;
            //                });
            //            }
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
