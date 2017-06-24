<template>
<v-app>
    <v-toolbar light>
        <router-link tag="v-toolbar-logo" to="/mesmandats" id="logo">MandaLa<small class="body-1">[ beta ]</small></router-link>
        <v-toolbar-items>
            <template v-if="currentUser">
                <v-toolbar-item ripple :router=true href="/mesmandats">
                    <v-icon>person</v-icon><span class="hidden-sm-and-down">Mes mandats</span></v-toolbar-item>
                <v-toolbar-item ripple :router=true href="/touslesmandats">
                    <v-icon>import_export</v-icon><span class="hidden-sm-and-down">Mandats</span></v-toolbar-item>

                <v-toolbar-item ripple :router=true href="/nouveau">
                    <v-icon>add</v-icon><span class="hidden-sm-and-down">Nouveau</span></v-toolbar-item>
                <v-toolbar-item ripple :router=true href="/rechercher">
                    <v-icon>search</v-icon><span class="hidden-sm-and-down">Rechercher</span></v-toolbar-item>


                <v-toolbar-item ripple :router=true href="parametres">
                    <v-icon light>settings</v-icon>
                </v-toolbar-item>
            </template>
</v-toolbar-items>
</v-toolbar>
<main id="mainContainer">
    <v-container>
        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" :duration="300">
            <router-view></router-view>
        </transition>
    </v-container>

</main>
</v-app>
</template>

<script>
    import {
        auth
    } from './firebase';
    export default {
        data() {
            return {
                currentUser: {}
            };
        },
        beforeCreate() {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    this.currentUser = user;
                } else {
                    // User is signed out.
                    this.currentUser = null;
                }
            });
        },
    };

</script>

<style lang="stylus">
    @import '../node_modules/vuetify/src/stylus/main' @import '../node_modules/animate.css/animate.min.css' @import './css/main.css'

</style>
