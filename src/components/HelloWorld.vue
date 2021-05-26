<template>
  <div class="container">
    <h1>Mahidol University</h1>
    <h2>Lab List</h2>
    <ul v-for="lab in labs" :key="lab.name">
      <li>{{ lab.name }}</li>
    </ul>
    <b-field label="Name">
      <b-input v-model="name"></b-input>
    </b-field>
    <b-field label="Simple">
            <b-select placeholder="Select a category" v-model="test.category">
                <option
                    v-for="option in categories"
                    :value="option.name"
                    :key="option">
                    {{ option.name }}
                </option>
            </b-select>
    </b-field>

    <button class="button" @click="addData">Submit</button>
  </div>
</template>

<script>
import { db } from "../firebase"

export default {
  name: 'HelloWorld',
  data () {
    return {
      categories: [],
      name: "",
      test: {
        category: "",
      },
      labs: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData: function () {
      var self = this;
      
      db.collection('categories').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          self.categories.push(d.data())
        })
      })

      db.collection('labs').get().then((snapshot)=>{
        snapshot.forEach((d)=>{
          self.labs.push(d.data())
        })
      })
    },
    addData: function () {
      let self = this
      db.collection('labs').add({ name: this.name, test: this.test}).then(()=>{
        alert("New lab has been added.")
        self.labs = []
        self.loadData()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
