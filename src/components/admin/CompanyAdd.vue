<template>
  <div>
    <p>New Company Info:</p>
      <div class="row">
        <div>
          <label for="companyName">Company Name:</label>
          <input type="text" id="companyName" v-model="company.name" />
        </div>
      </div>

  </div>
</template>

<script>
export default {
  props: {
    company: Object
  }
}
</script>
