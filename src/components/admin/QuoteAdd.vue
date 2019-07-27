<template>
  <div>
    <h2>ADD QUOTE</h2>
    <form @submit.prevent="onSubmit">
      <button @click.prevent="addQuote">Add Quote</button>
      <div class="row" v-for="(quote, i) in quotes" :key="i">
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" v-model="quote.price" />
        </div>
        <div class="form-group">
          <label for="currency">Currency</label>
          <input type="text" id="currency" v-model="quote.currency" />
        </div>
        <div v-if="isNewCompany[i] == false">
          <label for="currency">Company</label>
          <select v-model="quote.company.uuid">
            <option disabled value>Please select one</option>
            <option v-for="company in companies" :value="company.uuid" :key="company.uuid">{{company.name}}</option>
          </select>
          <button @click.prevent="addCompany(i)">Add NEW Company</button>
        </div>
        <CompanyAdd v-if="isNewCompany[i] == true" :company="quote.company"/>
        <div class="row">
          <div>
            <h3>Delivery Quotes</h3>
            <button @click.prevent="addDeliveryQuote(i)">Add Delivery Quote</button>
            <div class="row" v-for="(deliveryQuote, j) in quote.deliveryQuotes" :key="j">
              <div class="form-group">
                <label for="price">Price</label>
                <input type="number" id="price" v-model="deliveryQuote.price" />
              </div>
              <div class="form-group">
                <label for="currency">Currency</label>
                <input type="text" id="currency" v-model="deliveryQuote.currency" />
              </div>
              <div class="form-group">
                <label for="days">Days</label>
                <input type="number" id="days" v-model="deliveryQuote.days" />
              </div>
              <div>
                <button
                  type="button"
                  @click.prevent="deleteDeliveryQuote(i, j)"
                >X</button>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div class="row">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import CompanyAdd from '@/components/admin/CompanyAdd.vue'
import requests from './requests.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      quotes: [],
      isNewCompany: []
    }
  },
  props: {
    orderId: null
  },
  components: {
    CompanyAdd
  },
  computed: {
    ...mapGetters('admin', ['companies'])
  },
  methods: {
    ...mapActions('admin', ['getCompanies']),
    addQuote () {
      this.quotes.push({
        price: null,
        currency: null,
        company: {
          uuid: null,
          name: null
        },
        deliveryQuotes: []
      })
      this.isNewCompany.push(false)
      this.getCompanies()
    },
    addCompany (quoteIndex) {
      this.quotes[quoteIndex].company.uuid = null
      this.$set(this.isNewCompany, quoteIndex, true)
    },
    addDeliveryQuote (quoteIndex) {
      this.quotes[quoteIndex].deliveryQuotes.push({
        price: null,
        currency: null,
        days: null
      })
    },
    deleteDeliveryQuote (quoteIndex, deliveryQuoteIndex) {
      this.quotes[quoteIndex].deliveryQuotes.splice(deliveryQuoteIndex, 1)
    },
    onSubmit () {
      console.log('send ' + this.quotes[0].company.uuid + ' name:' + this.quotes[0].company.name)
      requests.addQuotes(this.orderId, this.quotes)
    }
  }
}
</script>
