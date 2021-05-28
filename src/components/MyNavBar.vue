<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt="Mahidol University Logo">
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item :to="{ name: 'Main' }" tag="router-link">
        Home
      </b-navbar-item>
      <b-navbar-item :to="{ name: 'Form' }" tag="router-link">
        Form
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "MyNavBar"
}
</script>

<style scoped>

</style>