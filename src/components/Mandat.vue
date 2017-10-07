<template>
    <v-card hover>
        <v-card-actions>
            <span class="subheading pl-1">
                <strong>17.03.005</strong>
            </span>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn flat round small :ripple="false" slot="activator">{{currentStatut}}</v-btn>
                <v-list>
                    <v-list-tile v-for="statut in statuts_trad" :key="statut.title" @click="currentStatut = statut.title">
                        <v-list-tile-title>{{ statut.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-menu bottom left>
                <v-btn icon slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="statut in statuts_trad" :key="statut.title" @click="">
                        <v-list-tile-title>{{ statut.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-card-actions>
        <v-card-text>
            <div class="title text-xs-center pb-2">Merkblatt Merkblatt für Drehflügeltüren</div>
            <div class="line"></div>
            <div class="subheading text-xs-center pt-2">
                <div>
                    Délai :
                    <strong>17/08/2017</strong>
                </div>
                <div>
                    Révision :
                    <strong>Carine</strong>
                </div>
            </div>
        </v-card-text>

    </v-card>
</template>

<script>
export default {
    props: ['card'],
    data() {
        return {
            currentStatut: 'À traduire',
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
                    title: 'Prêt pour révision'
                },
                {
                    title: 'Liquider le mandat'
                }
            ],
            statuts_rev: [
                {
                    title: 'Révision finie'
                }
            ]
        }
    },
    computed: {
        currentStatutColor() {
            if (this.mandat.statut === 'Premier jet') {
                return 'blue lighten-4'
            } else if (this.mandat.statut === 'Questions') {
                return 'red lighten-2';
            } else if (this.mandat.statut === 'À réviser') {
                //send notification
                return 'purple lighten-2'
            } else if (this.mandat.statut === 'Révision finie') {
                //send notification
                return 'light-blue lighten-2'
            } else if (this.mandat.statut === 'Liquidé') {
                return 'green lighten-2'
            } else {
                return 'grey lighten-3'
            }
        }
    }

}
</script>

<style>

</style>
