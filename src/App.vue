<template>
  <v-app :light="theme" :dark="!theme">
    <m-toolbar></m-toolbar>

    <main>
      <v-content>
        <v-divider></v-divider>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import SmartView from '@/components/SmartView'
import bus from '@/js/bus'

export default {
  data() {
    return {}
  },
  computed: {
    theme() {
      return bus.darkTheme
    }
  },

  components: {
    mToolbar: Toolbar,
    smartView: SmartView
  }
}
</script>

<style lang="stylus">
@import './stylus/main';

.stepper__wrapper .stepCard {
  margin-bottom: 20px;
}

.stepCard {
  border: 2px solid grey;
  padding: 5px;
  border-radius: 10px;
}
</style>
