<template>
  <div id="app">
    <div id="nav">
      <div>Shed API</div>
      <router-link to="/">Motion</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

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
  padding: 1rem;
  background-color: #2980b9;
  color: #d5e9f6;

  a {
    font-weight: bold;
    color: #c0def1;
    text-decoration: none;

    &.router-link-exact-active,
    &:hover {
      color: #eaf4fa;
      text-decoration: underline;
    }
  }

  > div {
    display: inline;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 2rem;
    color: #d5e9f6;
  }
}

.content {
  margin: 1.5rem;
}
</style>
