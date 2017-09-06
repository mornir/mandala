<template>
  <v-app light toolbar>
    <m-toolbar></m-toolbar>
    <main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs4="false" xs6="true">
            <mandat></mandat>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import Mandat from '@/components/Mandat'
export default {
  data() {
    return {

    }
  },
  components: {
    mToolbar: Toolbar,
    Mandat: Mandat
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
