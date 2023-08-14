<script>

import testComponent from '@/components/testComponent.vue';
import PublicNav from '@/components/PublicNav.vue'
import NavMobile from '@/components/NavMobile'
import BurgerNav from '@/components/BurgerNav.vue';
import NewdeliceNav from '../../components/newdeliceNav.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'PublicLayout',
    components: {
        PublicNav,
        NavMobile,
        BurgerNav,
        testComponent,
        NewdeliceNav
    },
    computed: {
        ...mapGetters(['getPublicStyle']),

    },
    methods: {
        ...mapMutations(['changePublicStyle']),
        change() {
            this.changePublicStyle('paul')
        }

    }
}
</script>

<template>
    <div id="public">
        <!-- <PublicNav/>
        <BurgerNav/> -->
        <!-- <testComponent/> -->
        <!-- <NewdeliceNav/> -->

        <router-view />
    </div>
</template>


<style scoped>
#public {
    width: 100vw;
    height: 100vh;
    display: block;
    text-align: center;
    /* background: radial-gradient(#ffa473, #f2d5ff); */
    background-image: url('../../assets/img/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
