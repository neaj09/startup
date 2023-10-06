<template>
  <div class="home" :style="{ backgroundColor: publicStyle.homeColor }">
    <!-- faire un caroussel -->
    <div class="mainImage">
      <img v-if="hero" class="bigImg" :src="hero" alt="">
    </div>
    <orderBtn/>
    <section class="section-marketing">
      <div class="container-grid">

        <div class="banner" v-for="post in home" :key="post._id">
          <div class="banner-content">
            <div class="picture">
              <img :src="post.imgPost">
            </div>
          </div>
          <div class="textWrap">
            <div class="cardText">
              <div class="card-title">{{ post.titlePost }}</div>
              <div class="card-description">{{ post.descriptionPost }}</div>
            </div>
            <button class="btn">DECOUVRIR</button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import { customService } from '@/services/custom.service'
import { mapState} from "vuex";
import orderBtn from '@/components/orderBtn.vue';

export default {
  name: 'HomeView',
  components: {
    orderBtn
  },
  data() {
    return {
      home: {},
      contents: [],
      hero: "",
    }
  },
  computed: {
        ...mapState(['publicStyle']),
    },

  mounted() {

    customService.getContent()
      .then(res => {
        this.home = res.data.home
      })
      .catch(err => { console.log(err) })

      customService.getHero()
            .then(res => {
                this.hero = res.data.hero[0].imgHero;
            })
            .catch(err => console.log(err));
  }



}
</script>

<style scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #d82201; */
}


.mainImage {
  top: -1px;
  position: relative;
  width: 100%;
  padding-bottom: 670px;
  overflow: hidden;
}

.bigImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
}

.section-marketing {
  position: relative;
  display: block;
  width: 100%;
  padding: 16px 0;
}

.textWrap{
    position: static;
}

.container-grid {
  width: 93%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 13px;
  column-gap: 16px;
  margin: 0px 4%;
  max-width: 1180px; /* ou 1000px selon ce que vous préférez */
  margin-right: auto;
  margin-left: auto;
}


.banner {
    position: relative;
    grid-column-end: span 2;
    cursor: pointer;
    text-align: center;
    border-radius: 12px;
    box-shadow: 1px 4px 3px 0px #0000004f;
    background: rgb(255 255 255);
}

.banner-content {
    overflow: hidden;
    border-radius: 12px 12px 0 0;
    position: relative;
    padding-top: 53.33%;
    border: 5px solid white;
}

.banner-content img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}

.textWrap {
    padding: 10px 16px 11px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    color: rgb(125 44 33);
}

.cardText {
    position: relative;
    display: block;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    padding-bottom: 12px;
    width: 100%;
}

.card-title {
    padding: 10px;
    border-radius: 0;
    display: flex;
    font-family: 'Subtlecurves';
    font-size: 1em;
    max-width: 100%;
    border: none;
    resize: none;

    color: var(--moduleColor);

}


.card-description {
    border-radius: 0;
    cursor: pointer;
    display: block;
    padding: 10px;
    width: 100%;
    font-family: 'Anton';
    text-align: start;
    border: none;
    resize: none;

    color: var(--moduleColor);
}


@media (min-width: 769px) {

  .banner {
    grid-column-end: span 4;
  }

  .container-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 16px;
    column-gap: 16px;
  }

  .btn:hover {
  background-color: #ffbd6c;
  box-shadow: inset 0px 1px 0px 1px #ffffff5e, inset 0px -1px 0px 1px #0000003b, 0px 4px 2px #11111199;
  transform: scale(1.1);
}
}

@media (min-width: 1000px) {

  .banner {
    grid-column-end: span 4;
  }

  .container-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 20px;
    column-gap: 35px;



  }

}





</style>


