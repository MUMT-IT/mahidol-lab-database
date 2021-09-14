<template>
  <div class="container">
    <div class="columns">
      <div class="column has-text-centered">
        <img src="../assets/logo.png" width="100">
        <h1 class="title">ระบบฐานข้อมูลห้องปฏิบัติการทดสอบเครื่องมือแพทย์มหาวิทยาลัยมหิดล</h1>
        <router-link class="button is-light is-success is-outlined" :to="{name: 'Tests'}">
          <span class="icon">
           <i class="fas fa-search"></i>
          </span>
          <span>ค้นหาจากรายการทดสอบ</span>
        </router-link>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column has-text-centered">
        <router-link :to="{ name: 'Form' }" class="button is-info is-light is-outlined">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
          <span>เพิ่มข้อมูลห้องปฏิบัติการ</span>
        </router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-table :data="data" :striped="true" :paginated="true" :per-page="10">
          <b-table-column field="faculty" label="คณะ/หน่วยงาน" :searchable="true" :sortable="true">
            <template #searchable="props">
              <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  icon="magnify"
                  size="is-small is-rounded" />
            </template>
            <template v-slot="props">
              {{ props.row.faculty }}
            </template>
          </b-table-column>
          <b-table-column field="labname" label="ห้องปฏิบัติการ" :searchable="true" :sortable="true">
            <template #searchable="props">
              <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  icon="magnify"
                  size="is-small is-rounded" />
            </template>
            <template v-slot="props">
              {{ props.row.labname }}
            </template>
          </b-table-column>
          <b-table-column field="numTests" label="จำนวนการทดสอบ" v-slot="props">
            {{ props.row.numTests }}
          </b-table-column>
          <b-table-column field="website" label="เว็บไซต์" v-slot="props">
            <a :href="'//' + props.row.website">{{ props.row.website }}</a>
          </b-table-column>
          <b-table-column field="address" label="ที่อยู่/โทรศัพท์" v-slot="props">
            <p v-if="props.row.address">
              <span class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <span class="is-size-6">{{ props.row.address }}, {{ props.row.province }}</span>
            </p>
            <p v-if="props.row.phone">
              <span class="icon">
                <i class="fas fa-phone"></i>
              </span>
              <span class="is-size-6">{{ props.row.phone }}</span>
            </p>
            <p v-if="props.row.email">
              <span class="icon">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="is-size-6">{{ props.row.email }}</span>
            </p>
          </b-table-column>
          <b-table-column field="updatedAt" label="เพิ่มเมื่อ" v-slot="props">
            {{ props.row.updatedAt.toDate().toLocaleDateString() }}
          </b-table-column>
          <b-table-column field="action" v-slot="props">
            <router-link :to="{ name: 'Detail', params: {labId: props.row.id}}" class="button is-light is-primary">
              <span class="icon">
                <i class="fas fa-info-circle"></i>
              </span>
              <span>detail</span>
            </router-link>
          </b-table-column>
        </b-table>
        <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
      </div>
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
      school: {},
      categories: {},
    }
  },
  methods: {
    async loadData () {
      const self = this;
      await db.collection('school').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          self.school[d.id] = d.data().name
        })
      })
      await db.collection('categories').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          self.categories[d.id] = d.data().name
        })
      })
      await db.collection('faculty').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          let fac = d.data()
          self.data.push({
            labname: fac.labname,
            faculty: self.school[fac.faculty],
            address: fac.address,
            province: fac.province,
            website: fac.website,
            phone: fac.phone,
            email: fac.email,
            updatedAt: fac.updatedAt,
            numTests: fac.tests.length,
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