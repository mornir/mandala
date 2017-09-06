<template>
  <v-app light toolbar>
    <m-toolbar></m-toolbar>
    <main>
      <v-container fluid>
        <smart-vue></smart-vue>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import SmartVue from '@/components/SmartVue'

export default {
  data() {
    return {

    }
  },
  components: {
    mToolbar: Toolbar,
    smartVue: SmartVue
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
