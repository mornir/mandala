<template>
<v-layout justify-center>
    <v-flex xs4>
        <v-card>
            <v-card-title class="indigo white--text">
                <span>Rechercher un mandat</span>
            </v-card-title>
            <v-card-text>
<!--<v-select :items="years" v-model="selectedYear" label="Année" @input="rebind"></v-select>-->
                
                <v-text-field name="search" v-model.lazy="searchText" label="Nom du mandat"></v-text-field>
                
                <v-btn @click.native="elasticSearch">Search</v-btn>
                <span v-if="searchLaunched">Résultats: {{results.length}}</span>
                <v-list>

                    <v-list-item v-for="(result, index) in results" key="result._source.code">
                        <v-list-tile ripple @click.native="mandat = result._source">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="result._source.nom"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < results.length"></v-divider>
                    </v-list-item>

                </v-list>

            </v-card-text>

        </v-card>
    </v-flex>
    <v-flex xs8>
        <v-card v-if="mandat.nom">
            <mandat-details :mandat="mandat"></mandat-details>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
    import MandatDetails from './MandatDetails.vue';
    import {
        search
    } from '../elasticsearch';

    export default {
        data() {
            return {
                results: [],
                searchText: '',
                searchLaunched: false,
                mandat: {}
            };
        },
        methods: {
            elasticSearch() {
                search(this.searchText).then(resp => this.results = resp.hits.hits, err => console.trace(err.message));
                this.searchLaunched = true;
            }
        },
        created() {

            //            for (let i = this.$moment().year(); i >= 2017; i--) {
            //                this.years.push(i);
            //            }

        },
        components: {
            mandatDetails: MandatDetails
        }
    };

</script>

<style>
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
