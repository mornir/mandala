<template>
<v-card class="mb-5">
        <v-card-text>
            <v-container>
                <v-layout>
                    <v-flex xs2>
                        <v-subheader>Public-cible</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                        <v-text-field name="public_cible" v-model="mandat.public_cible" label="Public-cible"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs2>
                        <v-subheader>Type de texte</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="textTypes" v-model="mandat.type" label="Type de texte" auto/>
                    </v-flex>
                    <v-flex xs2>
                        <v-subheader>Activité</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="activities" v-model="mandat.activity" label="Activité" auto/>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs2>
                        <v-subheader>Direction</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                        <img src="../assets/germany.svg" alt="German" width="40px">
                        <v-btn icon class="black--text  mb-5" @click.native="toggleDirection">
                            <v-icon>{{arrowDirection}}</v-icon>
                        </v-btn>
                        <img src="../assets/france.svg" alt="French" width="40px">
                    </v-flex>
                    <v-flex xs2>
                        <v-checkbox label="Trados" info hide-details v-model="mandat.TAO" true-value="Oui" false-value="Non" />
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs2>
                        <v-subheader>Révision</v-subheader>
                    </v-flex>
                    <v-flex xs2 v-if="displayName !== 'Carine'">
                        <v-radio label="Carine" v-model="mandat.reviewer" value="Carine" @click.native="autre = false" error hide-details />
                    </v-flex>
                    <v-flex xs2 v-if="displayName !== 'Jérôme'">
                        <v-radio label="Jérôme" v-model="mandat.reviewer" value="Jérôme" @click.native="autre = false"  warning hide-details />
                    </v-flex>
                    <v-flex xs2 v-if="displayName !== 'Sarah'">
                        <v-radio label="Sarah" v-model="mandat.reviewer" value="Sarah" @click.native="autre = false" info hide-details />
                    </v-flex>
                    <v-flex xs2>
                        <v-radio label="Autre" v-model="mandat.reviewer" value="autre"  @click.native="autre = true" hide-details />
                    </v-flex>
                    <v-flex xs2 v-if="autre">
                        <v-text-field name="autre" v-model="mandat.reviewer" label="Autre réviseur"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    import {
        auth
    } from '../firebase';

    export default {
        props: ['mandat'],
        data() {
            return {
                autreReviewer: 'sans',
                autre: false,
                currentUser: null,
                arrowDirection: 'arrow_forward',
                textTypes: ['REDAC', 'TEC', 'JUR', 'FINANC'],
                activities: ['Traduction', 'Adaptation', 'Correction', 'Rédaction', 'Révision']
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
            }
        },
        computed: {
            displayName() {
                if (this.currentUser === null) {
                    return '';
                } else {
                    return this.currentUser.displayName;
                }
            }
        },
        beforeCreate() {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    this.currentUser = user;
                } else {
                    // User is signed out.
                    this.currentUser = null;
                }
            });
        },
        mounted() {
            if (this.mandat.source === 'FR') {
                this.arrowDirection = 'arrow_back';
            }
        }
    };

</script>

<style>


</style>
