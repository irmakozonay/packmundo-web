<template>
  <div>
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <p>SIGN IN</p>
        <div class="input">
          <label for="email">Mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div v-if="mode != 'guest'" class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button v-if="mode == 'login'" type="submit" @click.prevent="openSignup">LOGIN</button>
        <!-- <div class="submit">
          <button type="submit">GET A QUOTE</button>
        </div> -->
        <br />
        <a v-if="mode == 'signup'" href='javascript:void(0)' @click="changeMode('login')">Login</a>
        <a v-if="mode == 'login' || mode == 'guest'" href='javascript:void(0)' @click="changeMode('signup')">Sign Up</a> or
        <a v-if="mode == 'guest'" href='javascript:void(0)' @click="changeMode('login')">Login</a>
        <a v-if="mode == 'signup' || mode == 'login'" href='javascript:void(0)' @click="changeMode('guest')">Continue as guest</a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'signup',
      email: '',
      password: '',
      city: '',
      country: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('sign submiet')
    },
    changeMode (mode) {
      this.mode = mode
    }
  }
}
</script>
