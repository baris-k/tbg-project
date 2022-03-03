<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      users: [],
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')

    this.users = usersRequest.data
  },
}
</script>

<template lang="pug">
  .home
    h1 TBG - The Beautiful Game
    img(alt="Vue mylogo" src="../assets/mylogo.png")
</template>
