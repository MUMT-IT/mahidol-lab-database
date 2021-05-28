<template>
  <div class="container">
    <h1 class="Welcome to Mahidol Lab Database"></h1>
    <div class="has-text-centered">
      <router-link :to="{ name: 'Form' }" class="button is-info is-light">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>เพิ่มข้อมูลห้องปฏิบัติการ</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
}
</script>

<style scoped>

</style>