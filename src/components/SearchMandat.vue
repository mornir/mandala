<template>
<v-layout justify-center>
    <v-flex xs4>
        <v-card flat class="stepCard">
         
            <v-toolbar flat>
                <v-toolbar-title>Rechercher un mandat</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout row>
                  <v-flex xs11>
                <v-text-field name="search" v-model.lazy="searchText" label="Nom du mandat" box></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn @click="elasticSearch" color="primary">Lancer la recherche</v-btn>
                <span v-if="total">Résultats: {{total}}</span>
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
        
            <mandat-details :mandat="mandat" v-if="mandat.nom"></mandat-details>
   
    </v-flex>
</v-layout>
</template>

<script>
import { search } from '@/js/axios'
import MandatDetails from './MandatDetails.vue'

export default {
  data() {
    return {
      results: [],
      total: '',
      searchText: '',
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
      search(query)
        .then(response => {
          this.results = response.results
          this.total = response.total
        })
        .catch(err => console.error(err))
    }
  },
  components: {
    mandatDetails: MandatDetails
  }
}
</script>

<style>

</style>
