<template>
    <v-toolbar flat app>
        <v-toolbar-title id="logo" class="display-2">
            <router-link to="/smartview" tag="div">
                <span class="hvr-buzz">m</span>
                <span class="hvr-buzz">a</span>
                <span class="hvr-buzz">n</span>
                <span class="hvr-buzz">d</span>
                <span class="hvr-buzz">a</span>
                <span class="hvr-buzz">l</span>
                <span class="hvr-buzz pr-1">a</span>
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-layout row align-center>
   
                <router-link to="/smartview" class="my-nav-link" tag="span">SmartView&trade;</router-link>
                <router-link to="/nouveau" class="my-nav-link" tag="span">Nouveau</router-link>
                <router-link to="/recherche" class="my-nav-link" tag="span">Recherche</router-link>
  
          <span>
                    <v-menu bottom left>
                        <v-icon slot="activator" class="more-link">more_vert</v-icon>
                        <v-list>
                            <v-list-tile v-for="navLink in navLinks" :key="navLink.title" :to="navLink.link">
                                <v-list-tile-title>{{ navLink.title }}</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="switchTheme">
                                <v-list-tile-title class="text-xs-center">{{lightDark}}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
          </span>
            </v-layout>

        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import bus from '@/js/bus'
export default {
  data() {
    return {
      navLinks: [
        {
          title: 'Mandants',
          link: '/mandants'
        },
        {
          title: 'Liste Excel',
          link: '/tags'
        },
        {
          title: 'Administration',
          link: '/admin'
        }
      ]
    }
  },
  methods: {
    switchTheme() {
      if (bus.darkTheme) {
        localStorage.setItem('theme', '')
      } else {
        localStorage.setItem('theme', '1')
      }
      bus.darkTheme = !bus.darkTheme
    }
  },
  computed: {
    lightDark() {
      if (bus.darkTheme) {
        return '💡'
      } else {
        return '🌙'
      }
    }
  }
}
</script>

<style scoped>
.my-nav-link {
  font-size: 18px;
  margin-right: 2rem;
  text-decoration: none;
  cursor: pointer;
}

.more-link:hover {
  color: Crimson;
}

.my-nav-link:hover {
  color: Crimson;
}

.router-link-active {
  color: Crimson;
}

#logo {
  font-family: 'Hanalei', cursive;
  color: red;
  cursor: default;
}

@keyframes hvr-buzz {
  50% {
    transform: translateX(3px) rotate(2deg);
  }
  100% {
    transform: translateX(-3px) rotate(-2deg);
  }
}

.hvr-buzz {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  animation-name: hvr-buzz;
  animation-duration: 0.15s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}

.hvr-buzz:hover {
  animation-play-state: running;
}
</style>
