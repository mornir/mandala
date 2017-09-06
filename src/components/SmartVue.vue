<template>
    <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
            <v-flex v-bind="{ [`xs${card.flex}`]: true }" v-for="card in cards" :key="card.title">
                <v-card>
                    <v-card-media :src="card.src" height="200px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text" v-text="card.title"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-actions class="white">
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>share</v-icon>
                        </v-btn>
                    </v-card-actions>
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
            { title: 'Pre-fab homes', src: '../../../static/house.jpg', flex: 3 },
            { title: 'Favorite road trips', src: '../../../static/road.jpg', flex: 3 },
            { title: 'Best airlines', src: '../../../static/plane.jpg', flex: 6 },
            { title: 'Best airlines', src: '../../../static/plane.jpg', flex: 12 }
        ]
    }),
    components: {
        Mandat: Mandat,
    }
}
</script>

<style>

</style>
