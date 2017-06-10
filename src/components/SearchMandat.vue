<template>
<v-layout justify-center>
    <v-flex xs4>
        <v-card>
            <v-card-title class="primary white--text">
                <span>Rechercher un mandat</span>
            </v-card-title>
            <v-card-text>
                <vue-fuse :keys="keys" :list="mandats" :defaultAll="false" eventName="queryChanged" placeholder="Entrer nom du mandat">
                </vue-fuse>
                <v-list>

                    <v-list-item v-for="(result, index) in results" key="result.code">
                        <v-list-tile ripple @click.native="mandat = result">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="result.name"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < results.length"></v-divider>
                    </v-list-item>

                </v-list>

            </v-card-text>

        </v-card>
    </v-flex>
    <v-flex xs8>
        <v-card v-if="mandat.name">
            <mandat-details :mandat="mandat"></mandat-details>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
    import MandatDetails from './MandatDetails.vue';
    import {
        db
    } from '../firebase';

    export default {
        data() {
            return {
                mandats: [],
                results: [],
                keys: ["name"],
                mandat: {
                    code: '',
                    name: '',
                    arrival: '',
                    type: '',
                    activity: '',
                    TAO: '',
                    source: '',
                    target: '',
                    translator: '',
                    reviewer: '',
                    deadline: '',
                    moment: '',
                    priority: '',
                    mandant: '',
                    public_cible: '',
                    costs: '',
                    remarque: ''

                }
            };
        },
        methods: {
            updateResults(results) {
                this.results = results;
            }
        },
        created() {
            this.$on('queryChanged', results => {
                this.results = results;
            });
        },
        firebase: {
            mandats: db.ref('mandats/2017')
        },
        components: {
            mandatDetails: MandatDetails
        }
    };

</script>

<style>
    .fuzzy {
        color: red
    }
    
    input[type=search] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

</style>
