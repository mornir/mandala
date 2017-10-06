<template>
    <v-toolbar flat app>
        <v-toolbar-title id="logo" class="display-2">
            <router-link to="/smartview" tag="div">
                <span class="hvr-buzz">m</span>
                <span class="hvr-buzz">a</span>
                <span class="hvr-buzz">n</span>
                <span class="hvr-buzz">d</span>
                <span class="hvr-buzz">a</span>
                <span class="hvr-buzz">l</span>
                <span class="hvr-buzz pr-1">a</span>
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-layout row align-center>
                <router-link to="/smartview" class="my-nav-link">SmartView&trade;</router-link>

                <router-link to="/nouveau" class="my-nav-link">Nouveau</router-link>
                <router-link to="/recherche" class="my-nav-link">Recherche</router-link>

                <v-flex xs2>
                    <v-menu bottom left>
                        <v-icon slot="activator" class="excel-link">more_vert</v-icon>
                        <v-list>
                            <v-list-tile v-for="navLink in navLinks" :key="navLink.title" :to="navLink.link">
                                <v-list-tile-title>{{ navLink.title }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-flex>
            </v-layout>

        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    data() {
        return {
            navLinks: [
                {
                    title: 'Mandants',
                    link: '/mandants'
                },
                {
                    title: 'Mots-clés',
                    link: '/tags'
                },
                {
                    title: 'Liste Excel',
                    link: '/tags'
                }
            ]
        }
    }
}
</script>

<style scoped>
.my-nav-link {
    color: black;
    font-size: 18px;
    margin-right: 2rem;
    text-decoration: none;
}

.excel-link {
    color: black;
}

.excel-link:hover {
    color: Crimson;
}

.my-nav-link:hover {
    color: Crimson;
}

.router-link-active {
    color: Crimson !important;
}

#logo {
    font-family: 'Hanalei', cursive;
    color: red;
    cursor: default;
}



@keyframes hvr-buzz {
    50% {
        transform: translateX(3px) rotate(2deg);
    }
    100% {
        transform: translateX(-3px) rotate(-2deg);
    }
}

.hvr-buzz {
    display: inline-block;
    vertical-align: middle;
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
}

.hvr-buzz:hover,
.hvr-buzz:focus,
.hvr-buzz:active {
    animation-name: hvr-buzz;
    animation-duration: 0.15s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
</style>
