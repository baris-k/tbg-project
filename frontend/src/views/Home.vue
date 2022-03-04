<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue'

export default {
  name: 'Home',
  components: {
    UserCard,
  },
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
      d
      img(alt="Vue mylogo" src="../assets/mylogo.png")
    h2 Users
    UserCard(v-for="user in users" :user="user")
      router-link(:to="`/users/${user._id}`") {{ user.name }}
</template>
