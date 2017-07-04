<template>
<v-card class="mb-5">
    <v-card-text>
        <v-container>
            <v-layout>
                <v-flex xs2>
                    <v-subheader>Date d'arrivée</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-menu lazy :close-on-content-click="false" transition="v-scale-transition" right offset-x :nudge-left="20">
                        <v-text-field slot="activator" label="Date d'arrivée" v-model="mandat.arrivée" class="calenderField" readonly></v-text-field>
                        <v-date-picker :allowed-dates="disableWeekends" :days="days" :months="months" v-model="arrivalDate" no-title scrollable :date-format="date => new Date(date).toLocaleDateString('fr-FR')" :formatted-value.sync="mandat.arrivée"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs2>
                    <v-subheader>Délai fixé</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-menu lazy :close-on-content-click="false" transition="v-scale-transition" right offset-x :nudge-left="20">
                        <v-text-field slot="activator" label="Délai fixé" v-model="mandat.délai" class="calenderField" readonly></v-text-field>
                        <v-date-picker :days="days" :allowed-dates="disableWeekends" :months="months" v-model="deadlineDate" no-title scrollable :date-format="date => new Date(date).toLocaleDateString('fr-FR')" :formatted-value.sync="mandat.délai"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs2>
                    <v-subheader>Priorité</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-checkbox label="Prioritaire" v-model="mandat.priorité" true-value="Prioritaire" false-value="Ordinaire" error hide-details />
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs2>
                    <v-subheader>Heure</v-subheader>
                </v-flex>
                <v-flex xs2>
                    <v-dialog v-model="timeModal" lazy>
                        <v-text-field slot="activator" v-model="mandat.heure" prepend-icon="access_time" readonly></v-text-field>
                        <v-time-picker v-model="mandat.heure" format="24hr" actions>

                            <v-card-row actions>
                                <v-btn flat primary @click.native="timeModal = false">Enregister</v-btn>
                            </v-card-row>

                        </v-time-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card-text>
</v-card>
</template>

<script>
    export default {
        props: ['mandat'],
        data() {
            return {
                timeModal: false,
                save: () => this.mandat.time = this.time,
                days: ['Dimance', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                disableWeekends: (date) => {
                    return !(date.getDay() === 0 || date.getDay() === 6);
                },
            };
        },
        computed: {
            arrivalDate() {
                return this.$moment(this.mandat.arrivée, "DD/MM/YYYY");
            },
            deadlineDate() {
                return this.$moment(this.mandat.délai, "DD/MM/YYYY");
            }
        }
    };

</script>

<style>
    /*Fixes for Internet Explorer*/
    
    .calenderField {
        min-width: 100px !important;
    }

</style>
