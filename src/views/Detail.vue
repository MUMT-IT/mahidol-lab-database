<template>
<div class="container">
  <br>
  <div class="columns">
    <div class="column has-text-centered">
      <h1 class="title">ห้องปฏิบัติการ {{ faculty.labname }}</h1>
      <h1 class="subtitle">{{ school[faculty.faculty] }}</h1>
      <h1 class="title is-size-6">ผู้ประสานงาน</h1>
      <h1 class="subtitle is-size-6">
        {{ faculty.contactperson }}
      </h1>
    </div>
  </div>
  <div class="columns">
      <div class="column is-half is-offset-3">
        <div class="notification">
          <p v-if="faculty.website">
              <span class="icon">
                <i class="fas fa-globe"></i>
              </span>
              <span>
                <a :href="'//'+faculty.website">
                    {{ faculty.website }}
                </a>
              </span>
          </p>
          <p v-if="faculty.address || faculty.province">
            <span class="icon">
              <i class="fas fa-map-marker-alt"></i>
            </span>
            <span>{{ faculty.address }}, {{ faculty.province }} {{ faculty.postcode }}</span>
          </p>
          <p v-if="faculty.phone">
            <span class="icon">
              <i class="fas fa-phone"></i>
            </span>
            <span class="is-size-6">{{ faculty.phone }}</span>
          </p>
          <p v-if="faculty.email">
            <span class="icon">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="is-size-6">{{ faculty.email }}</span>
          </p>
          <p v-if="faculty.facebook">
            <span class="icon">
              <i class="fab fa-facebook-square"></i>
            </span>
            <span class="is-size-6">{{ faculty.facebook }}</span>
          </p>
          <p v-if="faculty.lineid">
            <span class="icon">
              <i class="fab fa-line"></i>
            </span>
            <span class="is-size-6">{{ faculty.lineid }}</span>
          </p>
        </div>
      </div>
  </div>
  <div class="columns" v-if="faculty.certifiedby">
    <div class="column has-text-centered">
      <p>รับรองโดย {{ faculty.certifiedby }} หมายเลข {{ faculty.certificateid || 'N/A'}}</p>
    </div>
  </div>
  <div class="columns">
    <div class="column is-two-thirds is-offset-2">
      <b-table :data="faculty.tests" :striped="true" :loading="isLoading" :mobile-cards="true">
        <b-table-column field="test" label="การทดสอบ" v-slot="props">
          {{ props.row.test }}
        </b-table-column>
        <b-table-column field="standard" label="มาตรฐาน" v-slot="props">
          {{ props.row.standard }}
        </b-table-column>
        <b-table-column field="category" label="ประเภท" v-slot="props">
          {{ categories[props.row.category] }}
        </b-table-column>
      </b-table>
    </div>
  </div>
  <div class="columns">
    <div class="column is-two-thirds is-offset-2 has-text-centered">
      <p>แก้ไขข้อมูลเมื่อ {{ faculty.updatedAt.toDate().toLocaleDateString() }}</p>
    </div>
  </div>
  <div class="columns">
    <div class="column has-text-centered">
      <button class="button is-light" @click="$router.back()">Back</button>
    </div>
  </div>
</div>
</template>

<script>
import {db} from "@/firebase";

export default {
  name: "Detail",
  data () {
    return {
      isLoading: true,
      faculty: null,
      school: {},
      categories: {},
    }
  },
  async mounted() {
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
    await db.collection('faculty').doc(this.$route.params.labId).get().then((snapshot) => {
      if (snapshot.exists) {
        self.faculty = snapshot.data()
        self.isLoading = false
      }
    })
  }
}
</script>

<style scoped>

</style>