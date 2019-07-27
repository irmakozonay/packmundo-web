import axios from 'axios'

export default {
  addQuotes: async function (orderId, quotes) {
    await axios.post('/order/quote/add?orderid=' + orderId, quotes)
  }
}
