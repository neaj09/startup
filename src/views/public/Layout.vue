<script>

import testComponent from '@/components/testComponent.vue';
import PublicNav from '@/components/PublicNav.vue'
import NavMobile from '@/components/NavMobile'
import BurgerNav from '@/components/BurgerNav.vue';
import { mapState } from 'vuex';

export default {
    name: 'PublicLayout',
    components: {
        PublicNav,
        NavMobile,
        BurgerNav,
        testComponent,
    },
    computed: {
    ...mapState(['publicStyle']),
  },
    methods: {

    }
}
</script>

<template>
    <div id="public" :style="{ backgroundColor: publicStyle.backgroundColor }">
        <BurgerNav/>

        <router-view />
    </div>
</template>


<style scoped>
#public {
    display: block;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
