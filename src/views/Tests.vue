<template>
<div class="container">
  <div class="columns">
    <div class="column has-text-centered">
      <h1 class="title">รายการทดสอบ</h1>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <b-table :data="tests"
               :striped="true"
               :loading="isLoading"
               :debounce-search="100"
               :paginated="true"
               :per-page="20"
      >
        <b-table-column field="test" label="การทดสอบ" :searchable="true">
          <template #searchable="props">
            <b-input
                v-model="props.filters[props.column.field]"
                placeholder="Search..."
                icon="magnify"
                size="is-small is-rounded" />
          </template>
          <template v-slot="props">
            {{ props.row.test }}
          </template>
        </b-table-column>
        <b-table-column field="standard" label="มาตรฐาน" :searchable="true">
          <template #searchable="props">
            <b-input
                v-model="props.filters[props.column.field]"
                placeholder="Search..."
                icon="magnify"
                size="is-small is-rounded" />
          </template>
          <template v-slot="props">
            {{ props.row.standard }}
          </template>
        </b-table-column>
        <b-table-column field="category" label="ประเภท" :searchable="true">
          <template #searchable="props">
            <b-input
                v-model="props.filters[props.column.field]"
                placeholder="Search..."
                icon="magnify"
                size="is-small is-rounded" />
          </template>
          <template v-slot="props">
            {{ props.row.category }}
          </template>
        </b-table-column>
        <b-table-column field="labname" label="ห้องปฏิบัติการ" v-slot="props">
          <router-link :to="{ name: 'Detail', params: { labId: props.row.schoolId}}">
            {{ props.row.labname }}
          </router-link>
        </b-table-column>
        <b-table-column field="labname" label="คณะ/หน่วยงาน" v-slot="props">
          {{ props.row.faculty }}
        </b-table-column>
      </b-table>

    </div>
  </div>
</div>
</template>

<script>
import {db} from "@/firebase";

export default {
  name: "Tests",
  data () {
    return {
      isLoading: true,
      tests: [],
      categories: {},
      school: {}
    }
  },
  async mounted () {
    const self = this
    await db.collection('categories').get().then((snapshot) => {
      snapshot.forEach((d) => {
        self.categories[d.id] = d.data().name
      })
    })
    await db.collection('school').get().then((snapshot) => {
      snapshot.forEach((d) => {
        self.school[d.id] = d.data().name
      })
    })
    await db.collection('faculty').get().then((snapshot) => {
      let dt;
      snapshot.forEach((d) => {
        dt = d.data()
        dt.tests.forEach((test)=>{
          self.tests.push({
            schoolId: d.id,
            faculty: self.school[dt.faculty],
            labname: dt.labname,
            test: test.test,
            category: self.categories[test.category],
            standard: test.standard,
          })
        })
      })
      self.isLoading = false
    })
  }
}
</script>

<style scoped>

</style>