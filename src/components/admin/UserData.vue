<template>
  <div>
      <h2>USER DATA</h2>
      <p>{{user.firstName}} {{user.lastName}}</p>
      <p>{{user.email}}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
