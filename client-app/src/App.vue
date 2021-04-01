<template>
  <div id="app">
    <div id="nav">
      <div>Shed API</div>
      <router-link to="/">Motion</router-link> |
      <router-link to="/about">About</router-link>
      <Notifications />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Notifications from "@/components/Notifications.vue";

@Component({
  components: {
    Notifications,
  },
})
export default class App extends Vue {}
</script>


<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 0.5rem;
  background-image: linear-gradient(to right,  #174869, #2980b9, #2573a7);
  display: flex;

  a {
    font-weight: bold;
    color: rgba(#fff, 0.75);
    text-decoration: none;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    transition: color 0.4s;

    &.router-link-exact-active,
    &:hover {
      color: rgba($color: #fff, $alpha: 0.95);
      text-decoration: underline;
    }
  }

  > div:first-child {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 0.5rem;
    color: rgba(#fff, 0.6);
  }

  :last-child {
    margin-left: auto;
  }
}

.content {
  margin: 1.5rem;
}
</style>
