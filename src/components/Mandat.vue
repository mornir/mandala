<template>
    <v-flex v-bind="{ [`xs${mandat.chargeTravail}`]: true }">
        <v-card hover :color="currentStatutColor">
            <v-card-actions>
                <span>
                    <strong>{{mandat.code}}</strong>
                </span>
                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <v-btn flat round small :ripple="false" slot="activator">{{mandat.statut}}</v-btn>
                    <v-list>
                        <v-list-tile v-for="statut in statuts_trad" :key="statut.title" @click="setStatut(statut.title)">
                            <v-list-tile-title>{{ statut.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-spacer></v-spacer>
          
                    <v-btn icon :color="mandat.remarque ? 'info' : ''">
                        <v-icon>chat</v-icon>
                    </v-btn>

            </v-card-actions>
            <v-card-text>
                <div class="title text-xs-center pb-2">{{mandat.nom}}</div>
                <div class="line"></div>
                <div class="subheading text-xs-center pt-2">
                    <div>
                        Délai :
                        <strong>{{mandat.délai}}</strong>
                    </div>
                    <div v-if="mandat.statut !== 'À réviser'">
                        Révision par
                        <strong>{{mandat.réviseur}}</strong>
                    </div>
                    <div v-else>
                    Traduit par
                        <strong>{{mandat.traducteur}}</strong>
                    </div>
                </div>
            </v-card-text>

        </v-card>
    </v-flex>
</template>

<script>
import bus from '@/js/bus'
export default {
  props: ['mandat'],
  data() {
    return {
      révisé: false,
      statuts_trad: [
        {
          title: 'À traduire'
        },
        {
          title: 'Premier jet fini'
        },
        {
          title: 'Questions'
        },
        {
          title: 'À réviser'
        },
        {
          title: 'Révision finie'
        },
        {
          title: 'Liquider le mandat'
        }
      ]
    }
  },
  computed: {
    currentStatutColor() {
      if (this.mandat.statut === 'Premier jet fini') {
        return bus.darkTheme ? 'cyan darken-1' : 'blue lighten-4'
      } else if (this.mandat.statut === 'Questions') {
        return bus.darkTheme ? 'red accent-2' : 'red lighten-2'
      } else if (this.mandat.statut === 'À réviser') {
        return bus.darkTheme ? 'purple darken-2' : 'purple lighten-2'
      } else if (this.mandat.statut === 'Révision finie') {
        return bus.darkTheme ? 'indigo darken-3' : 'light-blue lighten-2'
      } else if (this.mandat.statut === 'Liquider le mandat') {
        return 'green lighten-2'
      } else {
        return ''
      }
    }
  },
  methods: {
    toggleQuestions() {
      this.$emit('questions', !this.mandat.questions)
    },
    setStatut(newStatut) {
      this.$emit('setStatut', newStatut)
    }
  }
}
</script>

<style>

</style>
