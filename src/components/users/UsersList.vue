<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
   <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return { changesSaved: false }
  },
  methods: {
    confirmInput() {
      // programatic route change
      this.$router.push('/teams')
    },
    saveChanges() {
      this.changesSaved = true
    }
  },
  // local Navigation Guards are possible like this...
  beforeRouteEnter(to, from, next) {
    console.log('UsersList beforeRouteEnter')
    console.log(to,from)
    next()
  },
  // Prevent accidental loss of data "anti-nav"
  beforeRouteLeave(to, from, next) {
    console.log('UsersList beforeRouteLeave()')
    console.log(to, from)
    if (this.changesSaved) {
      next()
    } else {
      const confirmDataLoss = confirm('Do you want to leave without saving changes?')
      next(confirmDataLoss)
    }
  },
  unmounted() {
    console.log('unmounted')
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>