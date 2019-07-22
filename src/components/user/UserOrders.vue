<template>
  <div>
    <h2>ORDERS</h2>
    <table>
      <tr>
        <th>Box Type</th>
        <th>Design Name</th>
        <th>Action Date</th>
        <th>Quantity</th>
        <th>Status</th>
        <th>Details</th>
      </tr>
      <tr v-for="(userOrder, i) in userOrders" :key="userOrder.uuid">
        <td>Alfreds Futterkiste</td>
        <td>{{userOrder.box.name}}</td>
        <td>{{userOrder.statusDate | formatDate('DD MMMM YYYY hh:mm')}} ({{userOrder.status}})</td>
        <td>{{userOrder.quantity}}</td>
        <td>
          <button v-if="userOrder.status == 'QUOTES_READY'">See Quotes</button>
          <span v-if="userOrder.status == 'WAITING_QUOTES'">Waiting for Quotes</span>
          <button v-if="userOrder.status == 'PAYMENT_RECEIVED'">See Invoice</button>
        </td>
        <td><button @click="selectedIndex = i">Details</button></td>
      </tr>
    </table>
    <OrderDetails v-if="selectedIndex != -1" :order="userOrders[selectedIndex]"/>
  </div>
</template>

<script>
import OrderDetails from '@/components/order/OrderDetails.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedIndex: -1
    }
  },
  components: {
    OrderDetails
  },
  computed: {
    ...mapGetters('user', [
      'userOrders'
    ])
  },
  methods: {
    ...mapActions('user', [
      'getUserOrders'
    ])
  },
  created () {
    if (this.userOrders.length === 0) {
      this.getUserOrders()
    }
  }
}
</script>

<style scoped lang="scss">
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
