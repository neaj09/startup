<template>
  <router-view/>
</template>


<script>

export default {
  name: 'App',
  
  mounted() {
    this.$store.dispatch('initializeData');
  },
}
</script>