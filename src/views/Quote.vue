<template>
  <div>
    <p>Get A Quote</p>
    <Auth></Auth>
    <p>SHIPPING</p>
    <div class="input">
      <label for="country">Country</label>
      <input type="country" id="country" v-model="country" />
    </div>
    <div class="input">
      <label for="city">City</label>
      <input type="city" id="city" v-model="city" />
    </div>
    <p>BOX INFO</p>
    <button>GET A QUOTE</button>
  </div>
</template>

<script>
import Auth from '@/components/auth/Auth.vue'

export default {
  data () {
    return {
      city: '',
      country: ''
    }
  },
  components: {
    Auth
  }
}
</script>
