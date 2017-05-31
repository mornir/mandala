<template>
<v-card class="mb-5">
    <v-card-text>
        <v-container>
            <v-row>
                <v-col xs2>
                    <v-subheader>Date d'arrivée</v-subheader>
                </v-col>
                <v-col xs6>
                    <v-menu lazy :close-on-content-click="false" transition="v-scale-transition" right offset-x :nudge-left="20">
                        <v-text-field slot="activator" label="Date d'arrivée" v-model="localize" class="calenderField" readonly ></v-text-field>
                        <v-date-picker v-model="mandat.arrival" no-title scrollable></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
                <v-row>
                <v-col xs2>
                    <v-subheader>Délai fixé</v-subheader>
                </v-col>
                <v-col xs6>
                    <v-menu lazy :close-on-content-click="false" transition="v-scale-transition" right offset-x :nudge-left="20">
                        <v-text-field slot="activator" label="Délai fixé" v-model="localize2" class="calenderField" readonly></v-text-field>
                        <v-date-picker v-model="mandat.deadline" no-title scrollable></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
                   <v-row>
                <v-col xs2>
                    <v-subheader>Moment</v-subheader>
                </v-col>
                <v-col xs6>
                    <v-btn-toggle :options="AM_PM_options" v-model="mandat.moment"></v-btn-toggle>
                </v-col>
            </v-row>
            <v-row>
                <v-col xs2>
                    <v-subheader>Priorité</v-subheader>
                </v-col>
                <v-col xs6>
                    <v-checkbox label="Prioritaire" v-model="mandat.priority" true-value="Prioritaire" false-value="Ordinaire" error light hide-details />
                </v-col>
            </v-row>
        </v-container>
    </v-card-text>
</v-card>
</template>

<script>
    export default {
        props: ['mandat'],
        data() {
            return {
                AM_PM_options: [{
                        text: 'AM',
                        value: 1
                    },
                    {
                        text: 'PM',
                        value: 2
                    },
                ]
            };
        },
        computed: {
            localize() {
                return new Date(this.mandat.arrival).toLocaleDateString('fr-FR');
            },
            localize2() {
                return new Date(this.mandat.deadline).toLocaleDateString('fr-FR');
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
