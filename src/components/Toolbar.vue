<template>
    <v-toolbar flat>
        <v-toolbar-title id="logo" class="display-2">
            <span class="hvr-buzz">m</span>
            <span class="hvr-buzz">a</span>
            <span class="hvr-buzz">n</span>
            <span class="hvr-buzz">d</span>
            <span class="hvr-buzz">a</span>
            <span class="hvr-buzz">l</span>
            <span class="hvr-buzz pr-1">a</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-layout row align-center>
                <router-link to="/smartview" class="my-nav-link">SmartView &trade;</router-link>
                <router-link to="/new" class="my-nav-link">Tous les mandats</router-link>
                <router-link to="/new" class="my-nav-link">En révision</router-link>
                <router-link to="/new" class="my-nav-link">Nouveau</router-link>
            </v-layout>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>person</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {

}
</script>

<style scoped>
.btn--active,
.btn:hover,
.btn:focus {
    color: red !important;
    background-color: transparent !important;
}

.my-nav-link {
    color: black;
    font-size: 18px;
    padding-right: 2rem;
    text-decoration: none;
}

.my-nav-link:hover {
    color: red
}

.router-link-active {
    color: red !important;
}



.btn {
    background-color: transparent !important;
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
