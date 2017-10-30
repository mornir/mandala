<template>
<v-layout justify-center>
    <v-flex xs4>
        <v-card flat class="stepCard">
         
            <v-toolbar flat>
                <v-toolbar-title>Rechercher un mandat</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                
                <v-text-field name="search" v-model.lazy="searchText" label="Nom du mandat" box></v-text-field>
                
                <v-btn @click="elasticSearch" color="primary">Search</v-btn>
                <span v-if="searchLaunched">Résultats: {{results.length}}</span>
                <v-list>
                <template v-for="(result, index) in results" >

                        <v-list-tile ripple @click="mandat = result._source" :key="result._source.code">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="result._source.nom"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < results.length" :key="result._source.code"></v-divider>
         
                </template>
                </v-list>

            </v-card-text>

        </v-card>
    </v-flex>
    <v-flex xs7 offset-xs1>
        <v-card flat class="stepCard" v-if="mandat.nom">
            <mandat-details :mandat="mandat"></mandat-details>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'

import MandatDetails from './MandatDetails.vue'

export default {
  data() {
    return {
      results: [],
      searchText: '',
      searchLaunched: false,
      mandat: {}
    }
  },
  methods: {
    elasticSearch() {
      const query = {
        query: {
          match: {
            nom: this.searchText
          }
        }
      }

      axios
        .get(
          'https://first-cluster-2026533573.eu-central-1.bonsaisearch.net/_search',
          {
            params: {
              source: JSON.stringify(query),
              source_content_type: 'application/json'
            },
            auth: {
              username: 'sl729fctsq',
              password: 'tslh5y1zel'
            }
          }
        )
        .then(res => {
          this.results = res.data.hits.hits
          console.log(res.data.hits.hits)
        })
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
}
</script>

<style>

</style>
