<template>
<v-layout justify-center>
    <v-card class="mb-5">
        <v-card-text>

            <v-layout column>
                <h5>Rechercher un mandat</h5>
                <vue-fuse :keys="keys" :list="mandats" :defaultAll="false" eventName="queryChanged">
                </vue-fuse>
                <v-list>

                    <v-list-item v-for="(result, index) in results" key="result.code">
                          <v-list-tile ripple>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="result.name"></v-list-tile-title>
                        </v-list-tile-content>
</v-list-tile>
                        <v-divider v-if="index + 1 < results.length"></v-divider>
                    </v-list-item>


                </v-list>
            </v-layout>
        </v-card-text>

    </v-card>


</v-layout>
</template>

<script>
    import {
        db
    } from '../firebase';

    export default {
        data() {
            return {
                mandats: [],
                results: [],
                centres: ['VKF', 'IRV', 'VKG'],
                keys: ["name"],
                mandat: {
                    code: '',
                    name: 'Nouvelle',
                    arrival: new Date(),
                    type: 'REDAC',
                    activity: 'Traduction',
                    TAO: 'Oui',
                    source: 'DE',
                    target: 'FR',
                    translator: '',
                    reviewer: 'Jérôme',
                    deadline: new Date(),
                    moment: null,
                    priority: 'Ordinaire',
                    mandant: '',
                    public_cible: 'ECA',
                    costs: 'VKF',
                    statut: 'En traduction',
                    statutFirebase: true
                },
                bikes: [{
                        brand: "Schwinn",
                        model: {
                            name: "Classic",
                            id: "1345"
                        }
                    },
                    {
                        brand: "Red Line",
                        model: {
                            name: "Flight",
                            id: "5430"
                        }
                    },
                    {
                        brand: "Hoffman",
                        model: {
                            name: "Condore",
                            id: "0543"
                        }
                    },
                    {
                        brand: "Tribe",
                        model: {
                            name: "CRMO",
                            id: "0432"
                        }
                    }
                ]
            };
        },
        methods: {
            search() {
                //this.$bindAsArray('results', db.ref('mandats/2016').orderByChild("name").startAt(this.mandat.name).limitToLast(25));
            },
            updateResults(results) {
                console.log("hello");
                this.results = results;
            }
        },
        created() {
            this.$on('queryChanged', results => {
                this.results = results;
            });
        },
        firebase: {
            mandats: db.ref('mandats/2016').orderByChild("statutFirebase").equalTo(false)
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
