<template>
    <div>
      <h2>{{ thread.title }}</h2>
      <p>{{ thread.content }}</p>
      <a :href="`/threads/${thread.id}`">Voir plus</a>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Vous pouvez ajouter ici le CSS pour styliser les fils de discussion */
  </style>
  