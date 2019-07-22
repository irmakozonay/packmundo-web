<template>
  <div>
    <p>Sub Types Id: {{mainBoxTypeId}}</p>
    <SubBoxType v-for="subBoxType in subBoxTypes" :key="subBoxType.id" :subBoxType="subBoxType"/>
  </div>
</template>

<script>
import SubBoxType from '@/components/box-type/SubBoxType.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      mainBoxTypeId: this.$route.params.url
    }
  },
  components: {
    SubBoxType
  },
  computed: {
    ...mapGetters('boxType', [
      'subBoxTypes'
    ])
  },
  methods: {
    ...mapActions('boxType', [
      'getSubBoxTypes'
    ])
  },
  created () {
    this.getSubBoxTypes(this.mainBoxTypeId)
  }
}
</script>
