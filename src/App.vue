<template>
  <v-app light toolbar>
    <m-toolbar></m-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
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
</style>
