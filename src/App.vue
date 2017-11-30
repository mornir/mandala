<template>
  <v-app :light="theme" :dark="!theme">
    <m-toolbar></m-toolbar>

    <main >
      <v-content fill-height class="bg"  :class="{lightSnowflake: theme}">
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

.bg {
  background-image: url('../static/snowflake.svg'), url('../static/snowflake.svg'), url('../static/snowflake.svg'), url('../static/snowflake.svg'), url('../static/snowflake.svg'), url('../static/snowman.svg');
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: 9% 15%, 27% 68%, 59% 49%, 5% 92%, 96% 12%, 95% 95%;
  background-size: 120px 120px, 100px 100px, 150px 150px, 140px 140px, 110px 110px, 256px 256px;
  background-attachment: fixed, fixed, fixed, fixed, fixed, fixed;
  /* height: calc(100vh - 64px); */
  min-height: calc(100vh - 64px);
}

.lightSnowflake {
  background-image: url('../static/snowflake_black.svg'), url('../static/snowflake_black.svg');
}

.stepper__wrapper .stepCard {
  margin-bottom: 20px;
}

.stepCard {
  border: 2px solid grey;
  padding: 5px;
  border-radius: 10px;
}

@supports (display: grid) {
  body * {
    cursor: url('/static/santahand.cur'), auto !important;
  }
}
</style>
