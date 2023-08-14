const { createApp } = Vue

createApp({
  data() {
    return {
      message: 'Hello Vue!',
      currentPage: '',
      girlGroups: [],
      inputLogin: {
        email: '',
        password: '',
      },
      inputGirlGroup: {
        name: '',
        company: '',
        imgUrl: '',
      }
    }
  },

  methods: {
    changePage(page) {
      this.currentPage = page
    },
    async doLogin() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:3000/users',
          data: this.inputLogin
        })
        localStorage.setItem('access_token', data)
        this.changePage('homePage')
      } catch (err) {
        console.log(err)
      }
    },
    async fetchGirlGroups() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/girlgroups',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.girlGroups = data
      } catch (err) {
        console.log(err)
      }
    },
    async addGirlGroup() {
      try {
        await axios({
          method: 'POST',
          url: 'http://localhost:3000/girlgroups',
          headers: {
            access_token: localStorage.access_token
          },
          data: this.inputGirlGroup
        })

        this.fetchGirlGroups()
        this.changePage('homePage')
      } catch (err) {
        console.log(err)
      }
    },
    doLogout() {
      localStorage.clear()
      this.changePage('loginPage')
    }
  },
  created() {
    if (localStorage.access_token) {
      this.currentPage = 'homePage'
      this.fetchGirlGroups()
    } else {
      this.currentPage = 'loginPage'
    }
  }
}).mount('#app')