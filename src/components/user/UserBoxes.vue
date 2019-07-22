<template>
  <div>
    <h2>BOXES</h2>
    <hr />
    <UserBox v-for="userBox in userBoxes" :key="userBox.uuid" :userBox="userBox"/>
  </div>
</template>

<script>
import UserBox from '@/components/user/UserBox.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    UserBox
  },
  computed: {
    ...mapGetters('user', [
      'userBoxes'
    ])
  },
  methods: {
    ...mapActions('user', [
      'getUserBoxes'
    ])
  },
  created () {
    if (this.userBoxes.length === 0) {
      this.getUserBoxes()
    }
  }
}
</script>
