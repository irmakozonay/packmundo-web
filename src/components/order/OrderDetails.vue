<template>
  <div>
    <h2>BOX INFO</h2>
    <p>Box, box, box</p>
    <p>
      <span class="info">Quantity:</span> {{order.quantity}}
    </p>
    <p>
      <span class="info">Order Date:</span> {{order.intime | formatDate('DD MMMM YYYY hh:mm')}}
    </p>
    <p>
      <span class="info">Quote Address:</span> {{order.address.city}}, {{order.address.country}}
    </p>
    <Quotes v-if="order.status == 'QUOTES_READY'" :quotes="orderQuotes"/>
  </div>
</template>

<script>
import Quotes from '@/components/order/Quotes'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    order: Object
  },
  watch: {
    order: function (newVal, oldVal) {
      console.log(newVal.uuid)
      // this.getOrderQuotes(newVal.uuid)
    }
  },
  components: {
    Quotes
  },
  computed: {
    ...mapGetters('order', [
      'orderQuotes'
    ])
  },
  methods: {
    ...mapActions('order', [
      'getOrderQuotes'
    ])
  },
  created () {
    this.getOrderQuotes(this.order.uuid)
  }
}
</script>

<style scoped lang="scss">
.info {
  font-weight: bold;
}
</style>
