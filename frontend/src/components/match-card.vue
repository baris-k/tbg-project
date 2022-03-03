<template>
  <div class="match-card">
    <h4>{{ match.title }}</h4>
    <p>{{ match.description }}</p>
    <button class="btn btn-primary">Join</button>
  </div>
</template>

<script>
export default {
  name: 'MatchCard',
  props: ['match'],
}
</script>

<style lang="scss">
.match-card {
  border: 1px solid #0f0f0f;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
  min-height: 220px;
}
</style>
