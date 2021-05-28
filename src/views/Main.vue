<template>
  <div class="container">
    <div class="has-text-centered">
      <h1 class="title">Welcome to Mahidol Lab Database</h1>
      <b-field>
        <b-input rounded placeholder="ค้นหาการทดสอบ" size="is-medium"></b-input>
      </b-field>
      <router-link :to="{ name: 'Form' }" class="button is-info is-light">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>เพิ่มข้อมูลห้องปฏิบัติการ</span>
      </router-link>
      <b-table :data="data" :columns="columns"></b-table>
      <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
    </div>
  </div>
</template>

<script>
import {db} from "@/firebase";

export default {
  name: "Main",
  computed: {
    isLoading: function () {
      return this.data.length == 0
    }
  },
  data () {
    return {
      data: [],
      columns: [
        {
          field: 'labname',
          label: 'ห้องปฏิบัติการ',
        },
        {
          field: 'faculty',
          label: 'คณะ/หน่วยงาน',
        },
        {
          field: 'address',
          label: 'ที่อยู่',
        },
        {
          field: 'province',
          label: 'จังหวัด',
        },
        {
          field: 'phone',
          label: 'โทรศัพท์',
        },
        {
          field: 'website',
          label: 'Web Site',
        }
      ],
    }
  },
  methods: {
    loadData () {
      const self = this;
      db.collection('faculty').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          let fac = d.data()
          self.data.push({
            labname: fac.labname,
            faculty: fac.faculty,
            address: fac.address,
            province: fac.province,
            id: d.id
          })
        })
      })
    },
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>