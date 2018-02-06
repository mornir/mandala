<template>
  <v-app :light="theme" :dark="!theme">
    <m-toolbar></m-toolbar>

    <main >
      <v-content class="bg">
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
    },
  },

  components: {
    mToolbar: Toolbar,
    smartView: SmartView,
  },
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

.bg {
  background-image: url('../static/bg.png')
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
 
}
main {
  min-height: calc(100vh - 64px);
}

</style>
