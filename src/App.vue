<template>
<v-app>
    <v-toolbar>
        <router-link tag="v-toolbar-logo" to="/" id="logo">MandaLa</router-link>
        <v-toolbar-items>
            <!--                <v-toolbar-item ripple><v-icon>person</v-icon>Mes mandats</v-toolbar-item>-->
            <v-toolbar-item ripple :router=true href="/">
                <v-icon>import_export</v-icon>Mandats</v-toolbar-item>
            <v-toolbar-item ripple :router=true href="nouveau" v-if="currentUser">
                <v-icon>add</v-icon>Nouveau</v-toolbar-item>
            <v-toolbar-item ripple :router=true href="rechercher">
                <v-icon>search</v-icon>Rechercher</v-toolbar-item>
            
<!--
            <v-toolbar-item ripple @click.native="login">
                <v-icon light>help_outline</v-icon>
            </v-toolbar-item>
-->
                <v-toolbar-item ripple :router=true href="parametres" v-if="currentUser">
                <v-icon light>settings</v-icon>
            </v-toolbar-item>
        </v-toolbar-items>
    </v-toolbar>
    <main>
        <v-container>
            <router-view></router-view>
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
                currentUser: null
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
    @import '../node_modules/vuetify/src/stylus/main' @import './css/main.css'

</style>
