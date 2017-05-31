<template>
<v-app top-toolbar>
    <header>
        <v-toolbar>
            <router-link tag="v-toolbar-logo" to="/" id="logo">TransHub</router-link>
            <v-toolbar-items>
<!--                <v-toolbar-item ripple><v-icon>person</v-icon>Mes mandats</v-toolbar-item>-->
                <v-toolbar-item ripple :router=true href="/"><v-icon>import_export</v-icon>Mandats</v-toolbar-item>
                <v-toolbar-item ripple :router=true href="nouveau"><v-icon>add</v-icon>Nouveau</v-toolbar-item>
                <v-toolbar-item ripple :router=true href="rechercher"><v-icon>search</v-icon>Rechercher</v-toolbar-item>
                <v-toolbar-item ripple><v-icon>help_outline</v-icon></v-toolbar-item>
            </v-toolbar-items>
        </v-toolbar>
    </header>
    <main>
        <v-content >
            <v-container >
       
            <router-view></router-view>

            </v-container>
        </v-content>
    </main>
</v-app>
</template>

<script>
    export default {
        data() {
            return {

            };
        }
    };

</script>

<style lang="stylus">
    @import '../node_modules/vuetify/src/stylus/main' @import './css/main.css'

</style>
