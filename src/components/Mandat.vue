<template>
    <v-card hover>
        <v-card-actions>
            <span class="subheading pl-1">17.03.005</span>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn flat round small :ripple="false" slot="activator">à traduire</v-btn>
                <v-list>
                    <v-list-tile v-for="statut in statuts_trad" :key="statut.title" @click="">
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
            ],
            dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana']
        }
    }

}
</script>

<style>

</style>
