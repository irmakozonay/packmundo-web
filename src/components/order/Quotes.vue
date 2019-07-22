<template>
  <div>
    <h2>QUOTES</h2>
    <table>
      <tr>
        <th v-for="quote in quotes" :key="quote.uuid">
          <p>{{quote.company.name}}</p>
          <span>{{quote.price}} {{quote.currency}}</span>
        </th>
      </tr>
      <tr>
        <td v-for="quote in quotes" :key="quote.price">
          <table>
            <tr v-for="deliveryQuote in quote.deliveryQuotes" :key="deliveryQuote.deliveryCompany.uuid">
              <p>{{deliveryQuote.price}} {{deliveryQuote.currency}}</p>
              <span>({{deliveryQuote.days}} days)</span>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    quotes: null
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
