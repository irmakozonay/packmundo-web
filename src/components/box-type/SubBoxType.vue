<template>
  <div>
    <router-link tag="a" :to="{name: 'Tool'}">
      <img :src="subBoxType.image" alt />
      <p>{{subBoxType.name}}</p>
      <br />
      <button>Customize</button>
    </router-link>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    subBoxType: Object
  }
}
</script>

<style scoped lang="scss">
p {
  font-style: italic;
}
</style>
