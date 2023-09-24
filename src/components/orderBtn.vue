<template>
   <div class="navDown">
      <button :href="link" class="btnMobile">Commandez</button>
    </div>
</template>
  
<script>

export default {
  name: "orderBtn",
  data() {
    return {
      link: ""

    }
  },

  methods: {
   
  }
}
</script>
  
<style scoped>

.btnMobile {
  z-index: 9999;
  position: fixed;
  bottom: 20px;
  right: 1.375rem;
  font-size: 21px;
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 5px 2px;
  font-family: 'Subtlecurves';
  max-width: 100%;
  overflow: hidden;
  color: rgb(255, 255, 255);
  background-color: rgb(237 49 36);
  outline: 0px;
  border: 0px;
  border-radius: 15px;
  width: auto;
  cursor: pointer;
  margin: 0;
  padding: 0.45rem 1rem;
  transition: all 0.125s ease 0s;

  line-height: 28px;
  vertical-align: middle;
}
</style>
  

  