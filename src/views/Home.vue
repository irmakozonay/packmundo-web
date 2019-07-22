<template>
  <div class="home">
    <p>Choose it, Design it, Get it</p>
    <MainBoxType v-for="mainBoxType in mainBoxTypes" :key="mainBoxType.id" :mainBoxType="mainBoxType"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainBoxType from '@/components/box-type/MainBoxType.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    MainBoxType
  },
  computed: {
    ...mapGetters('boxType', [
      'mainBoxTypes'
    ])
  },
  methods: {
    ...mapActions('boxType', [
      'getMainBoxTypes'
    ])
  },
  created () {
    if (this.mainBoxTypes.length === 0) {
      this.getMainBoxTypes()
    }
  }
}
</script>
