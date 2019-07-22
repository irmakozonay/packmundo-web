<template>
  <div>
    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/197/852/small/realistic-empty-box-mockup-template-design.jpg" alt />
    <p v-if="userBox.name">{{userBox.name}}</p>
    <p>{{userBox.updateTime | formatDate('DD MMMM YYYY hh:mm')}}</p>
    <button>Share</button>
    <button>Copy</button>
    <button>Delete</button>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    userBox: Object
  }
}
</script>
