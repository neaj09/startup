<template>
  <div class="navBar">
    <ul class="navUl" v-show="!menuIsActive">
      <li><router-link class="navBarLink" to="/admin/user/index">UTILISATEURS</router-link></li>
      <li><router-link class="navBarLink" to="/admin/products/index">PRODUITS</router-link></li>
      <li><router-link class="navBarLink" to="/admin/content">MARKETING</router-link></li>
      <li><router-link class="navBarLink" to="/admin/client">Clients</router-link></li>
    </ul>
  </div>
  <label>
    <input type="checkbox" v-model="menuIsActive">
    <span class="menu">
      <span class="exit" :class="{'halbaxit': menuIsActive}" ></span>
      <img class="logo" src="@/assets/logo.png" :class="{'halba': menuIsActive}">
    </span>
  </label>

  <div @click="navigation" @wheel.prevent @touchmove.prevent @scroll.prevent :class="{ 'showNavLink': menuIsActive }"
    class="navLink">
    <ul class="ul-link">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/menu">CARTE</router-link></li>
      <li><router-link to="/admin/dashboard">Admin</router-link></li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/menu">CARTE</router-link></li>
      <li><router-link to="/admin/dashboard">Admin</router-link></li>
    </ul>
  </div>
</template>
  
<script>
export default {
  name: "BurgerNav",
  data() {
    return {
      menuIsActive: false,

    }
  },

  computed: {
  },


  methods: {
    navigation() {
      this.menuIsActive = false
    }
  }
}
</script>
  
<style scoped>
::-webkit-scrollbar {
  height: 0px;
  background-color: #00000000;
}


::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0);
  height: 0;
}


::webkit-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0);
  height: 0;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0);
  height: 0px;
}


/* .logo {
  width: 128px;
  position: fixed;
  top: 50px;
  right: -42px;
  translate: -50% -50%;
  transform: rotate(16deg);
  transition: 0.5s ease-in-out;
  opacity: 1;
} */

.logo{
  z-index: 901;
    width: 7em;
    position: fixed;
    top: 63px;
    right: -47px;
    translate: -50% -50%;
    transition: 0.5s ease-in-out;
    opacity: 1;
}

.navBar {
  z-index: 99;
  width: 100%;
  position: fixed;
  top: 0px;
  height: 110px;
  background-image: linear-gradient(180deg, #000000 -30%, #21212100);
  /* display: flex; */
  overflow-x: scroll;
}

.navUl {
  display: flex;
  width: 66%;
  font-family: 'Subtlecurves';
  font-size: 1.3em;
  list-style: none;
  transition: .3s 0.1s ease-in-out;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-top: 39px;
  overflow: scroll;
  padding: 3% 3% 3% 5%;

}


.navUl li {
  padding-left: 10px;
  padding-right: 10px;

}

.navBarLink {
  color: white;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  /* background-color: #1c1c1c8a; */
  padding: 5px;
  border-radius: 6px;
  border: 1px solid white;
}

.navUl:last-child {
  padding-right: 50px;
}



/* NEW DELICE

label .menu {
  position: fixed;
  right: 35px;
  top: 16px;
  z-index: 100;
  width: 104px;
  height: 69px;
  background: #1c1c1c;
  border-radius: 28px 28px 28px 28px;
  transition: opacity 0.3s ease;
  transition: 0.4s ease-in-out;
  box-shadow: -1px 1px 9px 0px #0000007d, 0 0 0 0 #000;
  cursor: pointer;
} */

label .menu{
  position: fixed;
    right: 29px;
    top: 27px;
    z-index: 100;
    width: 4.5em;
    height: 4.5em;
    background: #1c1c1c;
    border-radius: 100px;
    transition: 0.5s ease-in-out;
    box-shadow: -1px 1px 9px 0px #0000007d, 0 0 0 0 #000;
    cursor: pointer;
}

label .exit{
  position: absolute;
    top: 31px;
    right: 21px;
    width: 31px;
    height: 7px;
    background: #ffffff;
    display: block;
    transform-origin: center;
    transition: 1s cubic-bezier(0, 0.19, 0.12, 1.02);
    border-radius: 12px;
    rotate: 45deg;
    
}

.halbaxit{
    rotate: 2 13;
    rotate: (2turn);
    opacity: 1;

    transform: rotate(3turn);

}


label .exit:after,
label .exit:before {
  -webkit-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 12px;
}

label .exit:before,
label .exit:before {
  transform: rotate(90deg);
    top: 0;
}

.halba{
  transform: scale(0.0009) rotate(-4deg);
}

label input {
  display: none;
}

label input:checked+.menu {
  box-shadow: 0 0 0 105vw #1c1c1c00, 0 0 0 105vh #1c1c1ce0;
  border-radius: 100%;
  width: 0;
  height: 0;

}



.navLink {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #00000005;
  z-index: 99999;
  transition: .3s 0.1s ease-in-out;
}

.showNavLink {
  visibility: visible;
  opacity: 1;
}

label input:checked+.menu+.navLink {
  opacity: 1;
}


.ul-link {
  margin: 0;
  margin-block: 0;
  padding-inline: 0;
  position: fixed;
  z-index: 9999;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  font-family: 'Subtlecurves';
  font-size: 2em;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: .3s 0.1s ease-in-out;
  

}


.ul-link li {
  margin-bottom: 17px;
}

.ul-link a{
  color: white;
}


</style>
  

  
  

  