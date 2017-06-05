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
                        <v-text-field slot="activator" label="Date d'arrivée" v-model="mandat.arrival" class="calenderField" readonly ></v-text-field>
                        <v-date-picker :allowed-dates="disableWeekends" :days="days" :months="months" v-model="arrivalDate" no-title scrollable :date-format="date => new Date(date).toLocaleDateString('fr-FR')"
          :formatted-value.sync="mandat.arrival"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
                <v-layout>
                <v-flex xs2>
                    <v-subheader>Délai fixé</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-menu lazy :close-on-content-click="false" transition="v-scale-transition" right offset-x :nudge-left="20">
                        <v-text-field slot="activator" label="Délai fixé" v-model="mandat.deadline" class="calenderField" readonly></v-text-field>
                        <v-date-picker :allowed-dates="disableWeekends" :days="days" :months="months" v-model="deadlineDate" no-title scrollable  :date-format="date => new Date(date).toLocaleDateString('fr-FR')"
          :formatted-value.sync="mandat.deadline"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
                   <v-layout>
                <v-flex xs2>
                    <v-subheader>Moment</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-btn-toggle :options="AM_PM_options" v-model="mandat.moment"></v-btn-toggle>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs2>
                    <v-subheader>Priorité</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-checkbox label="Prioritaire" v-model="mandat.priority" true-value="Prioritaire" false-value="Ordinaire" error hide-details />
                </v-flex>
            </v-layout>
        </v-container>
    </v-card-text>
</v-card>
</template>

<script>
    import moment from 'moment';
    export default {
        props: ['mandat'],
        data() {
            return {
                days: ['Dimance', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                disableWeekends: (date) => {
                    return !(date.getDay() === 0 || date.getDay() === 6);
                },
                AM_PM_options: [{
                        text: 'Matin',
                        value: 'Matin'
                    },
                    {
                        text: 'Après-midi',
                        value: 'Après-midi'
                    },
                ]
            };
        },
        computed: {
            arrivalDate() {
                return moment(this.mandat.arrival, "DD/MM/YYYY");
            },
            deadlineDate() {
                return moment(this.mandat.deadline, "DD/MM/YYYY");
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
