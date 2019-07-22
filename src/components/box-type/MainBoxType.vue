<template>
  <div>
    <router-link tag="a" :to="{name: 'BoxList', params: {url: mainBoxType.id}}">
      <p>{{mainBoxType.name}}</p>
      <img :src="mainBoxType.image" alt />
      <br />
      <button>Customize</button>
    </router-link>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    mainBoxType: Object
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
