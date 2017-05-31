<template>
<v-card class="mb-5">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col xs2>
                        <v-subheader>Public-cible</v-subheader>
                    </v-col>
                    <v-col xs8>
                        <v-text-field name="public_cible" v-model="mandat.public_cible" label="Public-cible"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs2>
                        <v-subheader>Type de texte</v-subheader>
                    </v-col>
                    <v-col xs3>
                        <v-select :items="textTypes" v-model="mandat.type" label="Type de texte" auto/>
                    </v-col>
                    <v-col xs2>
                        <v-subheader>Activité</v-subheader>
                    </v-col>
                    <v-col xs3>
                        <v-select :items="activities" v-model="mandat.activity" label="Activité" auto/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs2>
                        <v-subheader>Direction</v-subheader>
                    </v-col>
                    <v-col xs3>
                        <img src="../assets/germany.svg" alt="German" width="40px">
                        <v-btn icon class="black--text  mb-5" @click.native="toggleDirection">
                            <v-icon>{{arrowDirection}}</v-icon>
                        </v-btn>
                        <img src="../assets/france.svg" alt="French" width="40px">
                    </v-col>
                    <v-col xs2>
                        <v-checkbox label="Trados" info light hide-details v-model="mandat.TAO" true-value="Oui" false-value="Non" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs2>
                        <v-subheader>Révision</v-subheader>
                    </v-col>
                    <v-col xs2>
                        <v-radio label="Jérôme" v-model="mandat.reviewer" value="Jérôme" warning light hide-details />
                    </v-col>
                    <v-col xs2>
                        <v-radio label="Sarah" v-model="mandat.reviewer" value="Sarah" info light hide-details />
                    </v-col>
                    <v-col xs2>
                        <v-radio label="Autre" v-model="mandat.reviewer" value="autre" light hide-details />
                    </v-col>
                    <v-col xs2 v-if="mandat.reviewer === 'autre'">
                        <v-text-field name="autre" v-model="autreReviewer" label="Autre réviseur"></v-text-field>
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
                autreReviewer: 'sans',
                arrowDirection: 'arrow_forward',
                textTypes: ['REDAC', 'TEC', 'JUR', 'FINANC'],
                activities: ['Traduction', 'Adaptation', 'Correction', 'Rédaction', 'Révision'],
                reviewers: [{
                        text: 'Jérôme',
                        value: 'Jérôme'
                    },

                    {
                        text: 'Sarah',
                        value: 'Sarah'
                    },
                    {
                        text: 'Autre',
                        value: ''
                    }
                ]
            };
        },
        methods: {
            toggleDirection() {
                if (this.mandat.source === 'DE' && this.mandat.target === 'FR') {
                    this.mandat.source = 'FR';
                    this.mandat.target = 'DE';
                    this.arrowDirection = 'arrow_back';
                } else {
                    this.mandat.source = 'DE';
                    this.mandat.target = 'FR';
                    this.arrowDirection = 'arrow_forward';
                }
            },
        }
    };

</script>

<style>


</style>
