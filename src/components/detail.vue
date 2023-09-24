<template>
  <details>
    <summary>
      <slot name="summary">Titre de la section par défaut</slot>
      <span>...</span>
    </summary>
    <!-- Contenu de la section -->
    <div  class="text-detail">
      <slot></slot>
    </div>
  </details>
</template>
  
<script>

export default {
  name: "moreDetail",


  data() {
    return {

    }
  },

}
</script>
  
<style scoped>
details {
  margin: 10px 0;
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 0.5em 0.5em 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

summary {
  margin: -0.5em -0.5em 0;
    padding: 0.5em 0.5em 0.5em 0.5em;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

details[open] {
    padding: 0.5em;
}

details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
}

.text-detail{
  color: white;
}

summary span{
  color: white;
    margin: 0px 5px;
}


</style>
  

  