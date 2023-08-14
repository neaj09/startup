<template>
   <div>
        <header> header</header>
        <router-link to="/admin/user/index">Users</router-link> / 
        <router-link to="/admin/products/index">products</router-link> /
        <router-link to="/admin/content">content</router-link> /
        
        <button @click="logout" class="btn">Deconnexion</button>
   </div>
</template>

<script>
import { accountService } from '@/services';

export default {
  name: 'AdminNav',
  methods: {
    logout(){
      accountService.logout()
      this.$router.push('/')
    }
  }
}
</script>