<template>
    <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
            <v-flex v-bind="{ [`xs${card.flex}`]: true }" v-for="card in cards" :key="card.title">
                <v-card hover>
                    <v-card-actions>
                        <span class="subheading pl-1">17.03.005</span>
                        <v-spacer></v-spacer>
                        <!--  <v-btn flat round small>En traduction</v-btn> -->
                        <v-menu offset-y>
                            <v-btn flat round small slot="activator">à traduire</v-btn>
                            <v-list>
                                <v-list-tile v-for="item in items" :key="item.title" @click="">
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <v-spacer></v-spacer>
                        <v-menu bottom left>
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile v-for="item in items" :key="item.title" @click="">
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Mandat from '@/components/Mandat'

export default {
    data: () => ({
        cards: [
            { title: 'Pre-fab homes', src: '../../../static/house.jpg', flex: 4 },
            { title: 'Favorite road trips', src: '../../../static/road.jpg', flex: 4 },
            { title: 'Best airlines', src: '../../../static/plane.jpg', flex: 6 },
            { title: 'Best airlines', src: '../../../static/plane.jpg', flex: 12 }
        ],
        items: [
            {
                title: 'Premier jet'
            },
            {
                title: 'Question'
            },
            {
                title: 'Message'
            },
            {
                title: 'Click Me 2'
            }
        ],
        dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana']
    }),
    components: {
        Mandat: Mandat,
    }
}
</script>

<style>
.line {
    background-color: rgba(0, 0, 0, 0.12);
    border: none;
    height: 1px;
    width: 200px;
    text-align: center;
    margin: 0 auto;
}
</style>
