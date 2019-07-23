<template>
  <div v-if="selectedDeliveryQuoteIndexes.length != 0">
    <h2>QUOTES</h2>
    <table>
      <tr>
        <th v-for="(quote, i) in quotes" :key="quote.uuid">
          <input type="radio" :id="quote.uuid" :value="i" v-model="selectedQuoteIndex">
          <p>{{quote.company.name}}</p>
          <span>{{quote.price}} {{quote.currency}}</span>
        </th>
      </tr>
      <tr>
        <td v-for="(quote, i) in quotes" :key="quote.uuid">
          <table>
            <tr v-for="(deliveryQuote, j) in quote.deliveryQuotes" :key="deliveryQuote.deliveryCompany.uuid">
              <input v-if="selectedQuoteIndex == i" type="radio" :id="deliveryQuote.uuid" :value="j" v-model="selectedDeliveryQuoteIndexes[i]">
              <input disabled v-if="selectedQuoteIndex != i" type="radio" :id="j" :value="j" v-model="selectedDeliveryQuoteIndexes[i]">
              <p>{{deliveryQuote.price}} {{deliveryQuote.currency}}</p>
              <span>({{deliveryQuote.days}} days)</span>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td v-for="(quote, i) in quotes" :key="quote.uuid">
          <p>{{quote.currency}} {{(quote.price + quote.deliveryQuotes[selectedDeliveryQuoteIndexes[i]].price)/orderQuantity}}/Unit Price</p>
          <p>{{quote.currency}} {{quote.price + quote.deliveryQuotes[selectedDeliveryQuoteIndexes[i]].price}}</p>
        </td>
      </tr>
    </table>
    <p class="total" v-if="quotes != null">Total Price: {{quotes[selectedQuoteIndex].price + quotes[selectedQuoteIndex].deliveryQuotes[selectedDeliveryQuoteIndexes[selectedQuoteIndex]].price}}</p>
  </div>
</template>

<script>
export default {
  props: {
    quotes: null,
    orderQuantity: Number
  },
  data () {
    return {
      selectedQuoteIndex: 0,
      selectedDeliveryQuoteIndexes: []
    }
  },
  watch: {
    quotes: function (newVal, oldVal) {
      console.log('shcas;la' + this.quotes.length)
      this.selectedDeliveryQuoteIndexes = Array(this.quotes.length).fill(0)
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

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.total {
  font-weight: bold;
  font-size: 24px
}
</style>
