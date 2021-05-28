<template>
  <div class="container">
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="title">
          แบบฟอร์มข้อมูลห้องปฏิบัติการ
        </h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half is-offset-3 box">
        <b-field label="ชื่อคณะ">
          <b-input v-model="faculty.faculty"></b-input>
        </b-field>
        <b-field label="ชื่อห้องปฏิบัติการ">
          <b-input v-model="faculty.labname"></b-input>
        </b-field>
        <b-field label="ที่อยู่">
          <b-input v-model="faculty.address" type="textarea"></b-input>
        </b-field>
        <b-field label="จังหวัด">
          <b-input v-model="faculty.province"></b-input>
        </b-field>
        <b-field label="รหัสไปรษณีย์">
          <b-input v-model="faculty.postcode"></b-input>
        </b-field>
        <b-field label="โทรศัพท์">
          <b-input v-model="faculty.phone"></b-input>
        </b-field>
        <b-field label="Web Site">
          <b-input v-model="faculty.website"></b-input>
        </b-field>
        <b-field label="Facebook">
          <b-input v-model="faculty.facebook"></b-input>
        </b-field>
        <b-field label="รับรองโดย">
          <b-input v-model="faculty.certifiedby"></b-input>
        </b-field>
        <b-field label="รหัสการรับรอง">
          <b-input v-model="faculty.certificateid"></b-input>
        </b-field>
        <b-field label="ประเภท">
          <b-select v-model="faculty.testing.category" placeholder="เลือกประเภท">
            <option
                v-for="cat in categories"
                :value="cat.id"
                :key="cat.name">
              {{ cat.name }}
            </option>
          </b-select>
        </b-field>
        <b-field label="ชื่อการทดสอบ">
          <b-input type="textarea" v-model="faculty.testing.test"></b-input>
        </b-field>
        <b-field label="มาตรฐาน">
          <b-input v-model="faculty.testing.standard"></b-input>
        </b-field>
        <b-field label="ชื่อผู้ประสานงาน">
          <b-input v-model="faculty.contactperson"></b-input>
        </b-field>
        <b-field label="E-mail">
          <b-input v-model="faculty.email"></b-input>
        </b-field>
        <b-field label="Line ID">
          <b-input v-model="faculty.lineid"></b-input>
        </b-field>
        <div class="buttons is-centered">
          <button class="button is-light" @click="$router.back()">Cancel</button>
          <button class="button is-primary" @click="saveData">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "Form",
  data () {
    return {
      categories: [],
      faculty: {
        address: null,
        faculty: null,
        certifiedby: null,
        certificateid: null,
        contactperson: null,
        email: null,
        facebook: null,
        labname: null,
        lineid: null,
        phone: null,
        postcode: null,
        province: null,
        testing: {
          category: null,
          standard: null,
          test: null
        },
        website: null
      }
    }
  },
  methods: {
    loadData () {
      const self = this;
      db.collection('categories').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          self.categories.push({
            name: d.data().name,
            id: d.id
          })
        })
      })
    },
    saveData () {
      const self = this
      db.collection('faculty').add(this.faculty).then(()=>{
        self.$buefy.toast.open({
          type: 'is-success',
          message: 'Data has been saved successfully.'
        })
        self.$router.push({ name: 'Main' })
      }).catch(()=>{
        self.$buefy.toast.open({
          type: 'is-danger',
          message: 'Error occurred.'
        })
      })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>