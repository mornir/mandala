<template>
    <v-toolbar>
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
        <v-btn flat>SmartView &trade;</v-btn>
        <v-btn flat>Tous les mandats</v-btn>
        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>person</v-icon>
        </v-btn>

    </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>
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
