<template>
  <div>
    <p>User profile</p>
    <div class="nav">
      <router-link :to="{ name: 'UserOrders' }" exact>Your Orders</router-link> |
      <router-link :to="{ name: 'UserBoxes' }">Saved Designs</router-link> |
      <router-link :to="{ name: 'UserDetails' }">Personel Details</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
}
</script>
