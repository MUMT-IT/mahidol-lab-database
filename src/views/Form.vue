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
      <div class="column is-half is-offset-3">
        <h1 class="title is-size-4">ข้อมูลห้องปฏิบัติการ</h1>
        <b-field label="ชื่อคณะ">
          <b-select v-model="faculty.faculty" placeholder="โปรดเลือก">
            <option
                v-for="s in school"
                :value="s.id"
                :key="s.name">
              {{ s.name }}
            </option>
          </b-select>
        </b-field>
        <b-field type="is-danger" label="ชื่อห้องปฏิบัติการ">
          <b-input v-model="faculty.labname"></b-input>
        </b-field>
        <p class="help is-danger">required</p>
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
        <b-field label="ชื่อผู้ประสานงาน">
          <b-input v-model="faculty.contactperson"></b-input>
        </b-field>
        <b-field label="E-mail">
          <b-input v-model="faculty.email"></b-input>
        </b-field>
        <b-field label="Line ID">
          <b-input v-model="faculty.lineid"></b-input>
        </b-field>
      </div>
    </div>
    <br>
    <div class="columns">
      <div class="column is-half is-offset-3">
        <h1 class="title is-size-4">รายการทดสอบ</h1>
        <h1 v-if="faculty.tests.length == 0" class="subtitle is-size-6 has-text-danger">กรุณาระบุอย่างน้อยหนึ่งรายการ</h1>
        <div class="field is-horizontal" v-for="t in faculty.tests" :key="t.id">
          <div class="field-body">
            <b-field>
              <b-input v-model="t.test" placeholder="ชื่อการทดสอบ"></b-input>
            </b-field>
            <b-field>
              <b-input v-model="t.standard" placeholder="มาตรฐาน"></b-input>
            </b-field>
            <b-field>
              <b-select v-model="t.category" placeholder="ประเภท">
                <option
                    v-for="cat in categories"
                    :value="cat.id"
                    :key="cat.name">
                  {{ cat.name }}
                </option>
              </b-select>
            </b-field>
            <b-field>
              <button @click="removeTest(t.id)" class="button is-danger">
                <span class="icon">
                  <i class="fas fa-minus"></i>
                </span>
                <span>ลบ</span>
              </button>
            </b-field>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <b-field>
              <b-input v-model="test.test" placeholder="ชื่อการทดสอบ"></b-input>
            </b-field>
            <b-field>
              <b-input v-model="test.standard" placeholder="มาตรฐาน"></b-input>
            </b-field>
            <b-field>
              <b-select v-model="test.category" placeholder="ประเภท">
                <option
                    v-for="cat in categories"
                    :value="cat.id"
                    :key="cat.name">
                  {{ cat.name }}
                </option>
              </b-select>
            </b-field>
            <b-field>
              <button @click="addTest" class="button is-link">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
                <span>เพิ่ม</span>
              </button>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons is-centered">
      <button class="button is-light" @click="$router.back()">Cancel</button>
      <button class="button is-primary" @click="saveData">Submit</button>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "Form",
  data () {
    return {
      school: [],
      categories: [],
      test: {
        category: null,
        standard: null,
        test: null
      },
      faculty: {
        updatedAt: null,
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
        tests: [],
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
      db.collection('school').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          self.school.push({
            name: d.data().name,
            id: d.id
          })
        })
      })
    },
    saveData () {
      const self = this
      if (self.faculty.labname !== null && self.faculty.tests.length > 0) {
        self.faculty.updatedAt = new Date()
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
      } else {
        self.$buefy.toast.open({
          type: 'is-warning',
          message: 'Please fill out the required form and add at least one test.'
        })
      }
    },
    addTest () {
      const self = this
      self.faculty.tests.push({
        id: Date.now(),
        test: self.test.test,
        standard: self.test.standard,
        category: self.test.category
      })
      self.test = {
        test: null,
        standard: null,
        category: null,
      }
      self.$buefy.toast.open({
        type: 'is-success',
        message: 'New test has been added.'
      })
    },
    removeTest (testId) {
      this.faculty.tests = this.faculty.tests.filter((item)=>{
        return item.id != testId
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