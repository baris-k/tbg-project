<template>
  <div id="app">
    <div class="header">
      <img class="mylogo" alt="Vue mylogo" src="../assets/mylogo.png" />
      <h1>Available matches</h1>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="match of matches" :key="match.id" class="col-12 col-md-6 col-lg-4">
          <MatchCard :match="match" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MatchCard from '@/components/match-card'
export default {
  name: 'App',
  data() {
    return {
      matches: [
        { id: 1, title: 'match 1', description: 'test' },
        { id: 2, title: 'match 2', description: 'test' },
        { id: 3, title: 'match 3', description: 'test' },
        { id: 4, title: 'match 4', description: 'test' },
        { id: 5, title: 'match 5', description: 'test' },
        { id: 6, title: 'match 6', description: 'test' },
        { id: 7, title: 'match 7', description: 'test' },
        { id: 8, title: 'match 8', description: 'test' },
      ],
    }
  },
  components: {
    MatchCard,
  },
}
</script>

<style lang="scss">
@import '@/assets/theme.scss';
@import 'bootstrap/scss/bootstrap.scss';
.logo {
  height: 120px;
  width: 120px;
}
.header {
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
