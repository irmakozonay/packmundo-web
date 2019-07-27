<template>
  <div>
    <h2>ORDERS</h2>
    <table>
      <tr>
        <th>User Id</th>
        <th>Quote Date</th>
        <th>Delivery Date</th>
        <th>Status</th>
        <th>Options</th>
      </tr>
      <tr v-for="(order, i) in ordersData" :key="order.uuid">
        <td>{{order.user.uuid}}</td>
        <td>Quote Date</td>
        <td>Delivery Date</td>
        <td>{{order.status}}</td>
        <td>
          <button @click="selectedIndex = i">See Details</button>
        </td>
      </tr>
    </table>
    <div v-if="selectedIndex != -1">
      <UserData :user="ordersData[selectedIndex].user" />
      <OrderDetails :order="ordersData[selectedIndex]" />
      <QuoteAdd v-if="ordersData[selectedIndex].status == 'WAITING_QUOTES'" :orderId="ordersData[selectedIndex].uuid"/>
    </div>
  </div>
</template>

<script>
import UserData from '@/components/admin/UserData.vue'
import QuoteAdd from '@/components/admin/QuoteAdd.vue'
import OrderDetails from '@/components/order/OrderDetails.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedIndex: -1
    }
  },
  components: {
    UserData,
    OrderDetails,
    QuoteAdd
  },
  computed: {
    ...mapGetters('admin', ['ordersData'])
  },
  methods: {
    ...mapActions('admin', ['getOrdersData'])
  },
  created () {
    this.getOrdersData()
  }
}
</script>

<style scoped lang="scss">
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
