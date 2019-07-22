<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/profile">Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'styles/style.scss';
</style>
