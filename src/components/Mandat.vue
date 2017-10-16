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
                <span>
                    <v-btn icon :color="mandat.révisé ? 'success' : ''" @click="toggleRevised">
                        <v-icon>spellcheck</v-icon>
                    </v-btn>
                    <v-btn icon color="info">
                        <v-icon>chat</v-icon>
                    </v-btn>
                </span>
            </v-card-actions>
            <v-card-text>
                <div class="title text-xs-center pb-2">{{mandat.nom}}</div>
                <div class="line"></div>
                <div class="subheading text-xs-center pt-2">
                    <div>
                        Délai :
                        <strong>{{mandat.délai}}</strong>
                    </div>
                    <div>
                        Révision :
                        <strong>{{mandat.réviseur}}</strong>
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
                //send notification
                return bus.darkTheme ? 'purple darken-2' : 'purple lighten-2'
            } else if (this.mandat.statut === 'Révision finie') {
                //send notification
                return 'light-blue lighten-2'
            } else if (this.mandat.statut === 'Liquider le mandat') {
                return 'green lighten-2'
            } else {
                return ''
            }
        }
    },
    methods: {
        toggleRevised() {
            this.$emit('revised', !this.mandat.révisé)
        },
        setStatut(newStatut) {
            this.$emit('setStatut', newStatut)
        }
    },

}
</script>

<style>

</style>
