<template>
  <div class="home">
    <!-- faire un caroussel -->
    <!-- <div class="mainImage">
      <img class="bigImg" src="../../assets/img/hero2.jpg" alt="">
    </div> -->

    <!-- <div class="navDown">
      <button class="btnMobile">Commandez</button>
    </div> -->

    <div class="container-grid">
      <section class="section-marketing">


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
            <button class="btn">Voir l'offre</button>
          </div>
        </div>

      </section>

      <section class="section-dashboard">

        <div class="banner">
          <div class="date" v-if="currentDateTime">{{ currentDateTime.date }}</div>
          <div class="time" v-if="currentDateTime">{{ currentDateTime.time }}</div>

          <div class="info-meteo">
            <div class="meteoIcon" v-if="weatherDegre">{{ weatherDegre }}°</div>
            <div class="meteoIcon" v-if="weatherIcon"><img class="weatherIcon" :src="weatherIcon" alt="Icône météo" />
            </div>
          </div>
        </div>

        <div class="banner">
          <div class="banner-content">
            <h2>à la Une</h2>
            <div id="alaune">
              <div class="news-article" v-for="article in filteredArticles" :key="article.author">
                <h3>{{ article.title }}</h3>
                <p>{{ article.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="banner">
          <div class="banner-content">


            <h2>à la Une</h2>
            <div>

            </div>
          </div>
        </div>

      </section>

      <section class="section-copro">

        <div class="banner">
          <div class="banner-content">
            <ThreadsList />
          </div>
        </div>

      </section>


      <section class="section-menu">

        <div class="banner">
          <div class="banner-content">

            <navDash />

          </div>
        </div>

      </section>

      <section class="section-more">

        <div class="banner">
          <div class="banner-content">

            <navDash />

          </div>
        </div>

      </section>


    </div>


  </div>
</template>

<script>
import { customService } from '@/services/custom.service'
import { weatherService } from '@/services/weather.service'
import { newsService } from '@/services/news.service'
import navDash from '@/components/nav-dash.vue'
import ThreadsList from '@/components/ThreadsList.vue';



export default {
  name: 'HomeView',
  components: {
    navDash,
    ThreadsList
  },
  data() {
    return {
      home: {},
      contents: [],
      hero: "",
      intervalId: null,
      currentDateTime: null,
      weatherIcon: '',
      weatherDegre: null,
      weatherIntervalId: null,
      news: [],
      authorsToFilter: ["L'Équipe", "TF1 INFO", "franceinfo", "BFMTV"], // Les auteurs que vous souhaitez afficher
      newsIntervalId: null,
      expirationDate: null
    };
  },
  methods: {
    getCurrentDateTime() {
      let now = new Date();
      this.currentDateTime = {
        date: now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
    },

    getWeather() {
      weatherService.getWeather('Marseille')
        .then(res => {
          const weatherCode = res.data.current.weather_code;
          this.weatherIcon = this.getWeatherIcon(weatherCode);
          this.weatherDegre = res.data.current.temperature;
        })
        .catch(err => { console.log(err) });
    },

    getNews() {
      newsService.getNews()
        .then(res => {
          this.news = res.data.articles;
          console.log(res.data)
        })
    },

    getWeatherIcon: weatherCode => {
      const weatherMappings = {
        snowy: [395, 392, 371, 368, 335, 326, 323, 338, 332, 329, 320, 317, 314, 311, 230, 227],
        rainy: [389, 386, 359, 356, 353, 305, 299, 296, 293, 308, 302],
        sleet_drizzle: [377, 374, 365, 362, 182, 350, 284, 281, 185, 266, 263],
        foggy: [260, 248, 143],
        thundery: [200, 179, 176],
        cloudy_to_clear: [122, 119, 116, 113]
      };

      for (const [icon, codes] of Object.entries(weatherMappings)) {
        if (codes.includes(weatherCode)) {
          let weatherIcon = require(`@/assets/icons/${icon}_icon.png`);
          return weatherIcon;
        }
      }

      return null;
    },

  },

  computed: {
    filteredArticles() {
      return this.news.filter(article => this.authorsToFilter.includes(article.author));
    }
  },
  mounted() {
    customService.getContent()
      .then(res => {
        this.home = res.data.home;
      })
      .catch(err => { console.log(err) });

    this.getCurrentDateTime();
    this.intervalId = setInterval(this.getCurrentDateTime, 60000);


    this.getWeather(); // Appeler immédiatement la fonction pour obtenir la météo
    this.weatherIntervalId = setInterval(this.getWeather, 6 * 60 * 60 * 1000); // Planifier la mise à jour toutes les 6 heures

    this.getNews();
    this.newsIntervalId = setInterval(this.getNews, 6 * 60 * 60 * 1000);


  },


  beforeUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.weatherIntervalId); // Effacer l'intervalle lorsque le composant est démonté
    clearInterval(this.newsIntervalId);
  }
}
</script>


<style scoped>
.home {
  height: 100%;
  overflow: hidden;
}

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
  border-radius: 19px;
  width: auto;
  cursor: pointer;
  margin: 0;
  padding: 0.45rem 1rem;
  transition: all 0.125s ease 0s;
}



/* .btn:hover {
  background-color: #ffbd6c;
  box-shadow: inset 0px 1px 0px 1px #ffffff5e, inset 0px -1px 0px 1px #0000003b, 0px 4px 2px #11111199;
  transform: scale(1.1);
} */


.mainImage {
  top: -1px;
  position: relative;
  width: 100%;
  padding-bottom: 70%;
  overflow: hidden;
}

/* .bigImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.section-marketing {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 8px;
  column-gap: 8px;
}


section.section-dashboard {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 8px;
}

.section-copro {
  display: grid;
  grid-row: 1 / -1;
  grid-column: 3;
}

.section-menu {
  display: grid;
  grid-column-start: 1;
  grid-column-end: 2;

}

.section-more {
  display: grid;
  grid-column-start: 2;
  grid-column-end: 3;

}



.container-grid {
  height: 100%;
  display: grid;
  row-gap: 8px;
  justify-content: center;
  align-content: center;
  grid-template-columns: 49% 24% 24%;
  grid-template-rows: 85% 12%;
  column-gap: 8px;
}

.banner {
  position: relative;
  display: flex;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  background: rgb(255 255 255 / 42%);
  box-shadow: 0px 2px 2px 0px #75234133;
  justify-content: center;
  flex-direction: column;
  font-family: 'Poetsen one';
}

.banner-content {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
}

.date {
  font-family: 'Poetsen one';
  max-width: 100%;
  font-size: 1.2em;
  color: #835b58;

}

.time {
  font-family: 'Poetsen one';
  color: #835b58;
  display: flex;
  font-size: 5em;
  justify-content: space-around;
  margin-bottom: 15px;

}

.info-meteo {
  display: flex;
  justify-content: space-evenly;
  font-size: 2em;
}

.meteoIcon {
  display: flex;
  background-color: #ffffff61;
  width: 30%;
  height: 2.5em;
  box-shadow: 0px 2px 2px 0px #75234114;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  color: #835a58;
  cursor: pointer;

}

.weatherIcon {
  height: 70%;
}

.banner-content img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.textWrap[data-v-6ae67e00] {
  position: absolute;
  bottom: 10px;
  right: 10px;
  /* padding: 10px 16px 11px 16px; */
  /* display: flex; */
  /* flex-grow: 1; */
  /* color: rgb(125 44 33); */
  /* flex-direction: column; */
  /* align-items: flex-start; */
}

.cardText {
  display: block;
  /* flex-grow: 1; */
  /* flex-shrink: 1; */
  /* flex-basis: auto; */
  padding-bottom: 12px;
  font-size: 1em;
}

.card-title {
  font-family: 'Subtlecurves';
  max-width: 100%;
  padding: 6px 0;
  text-align: left;
}

.card-description {
  font-family: 'Anton';
  text-align: start;
}


#alaune{
  overflow: auto;
    width: 92%;
    margin: auto;
    margin-bottom: 10px;
    height: 80%;
    box-sizing: border-box;
}
.news-article {
  background-color: white;
    margin: 5px 6px 1px 0px;
    border-radius: 14px;
    padding: 9px;
}

.news-article h3{
  text-align: start;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}


@media (min-width: 769px) {

  /* .banner {
    grid-column-end: span 4;
  }

  .container-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 16px;
    column-gap: 16px;



  } */
}

@media (min-width: 1000px) {

  /* .banner {
    grid-column-end: span 4;
  }

  .container-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 20px;
    column-gap: 35px;



  } */

}
</style>


<!-- .home {
  margin-top: -120px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mainImage {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.bigImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
}

.section-marketing{
  display: block;
  width: 100%;
}

.container-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 16px;
  margin: 0px 4%;
}

.banner {
  grid-column-end: span 2;
  cursor: pointer;
  text-align: center;
}

.banner-content {
  position: relative;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  overflow: hidden;
  padding-top: 53.33%;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 2px;
  background: rgb(255, 255, 255);
}

.banner-content img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 769px){

  .banner {
  grid-column-end: span 4;
}

.container-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 16px;
  column-gap: 16px;

  

}

} -->
