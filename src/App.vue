<template>
  <v-app light>
    <m-toolbar></m-toolbar>

    <main>
      <v-content>
        <v-divider></v-divider>
        <v-container fluid class="softbg">
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import SmartView from '@/components/SmartView'

export default {
  data() {
    return {

    }
  },
  components: {
    mToolbar: Toolbar,
    smartView: SmartView
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
  .softbg {
    background-color: #f5f5f5
  }

  .stepCard {
    margin-bottom: 20px;
    border: 2px solid grey;
    padding: 5px;
    border-radius: 10px;
}
</style>
