<template>
        <h1 id="homeManager-head">HOME MANAGER</h1>
        <section id="heroEdit" class="module">
            <h1>IMAGE HERO</h1>
            <moreDetail>
                <template #summary>
                    <h2>Modifier l'image de couverture de la page d'accueil</h2>
                </template>
                <p>Ceci est le contenu personnalisé du détail.</p>
            </moreDetail>

            <form enctype='multipart/form-data' @submit.prevent="$event => editHero()">
                <div class="banner-content">
                    <label for="changeHero" class="label-changeFile">
                        <svg class="icon upload-icon">
                            <use href="@/assets/icons/icons.svg#upload"></use>
                        </svg>
                        <input class="changeFile" id="changeHero" type="file" @change="$event => selectFileHero($event)"
                            accept="image/png, image/jpg, image/jpeg" />
                    </label>

                    <div class="picture">
                        <img v-if="this.hero" class="oldImg" :class="{ 'newImg': this.hero.newFile }"
                            :src="this.hero.imgHero">
                    </div>
                </div>
                <button type="submit" class="btn">PUBLIER</button>
            </form>
        </section>

        <section id="colorTable" class="module">

            <h1>TABLE DES COULEURS</h1>

            <moreDetail>
                <template #summary>
                    <h2>Modifier le thème avec la table des couleurs</h2>
                </template>
                <p>Ceci est le contenu personnalisé du détail.</p>
            </moreDetail>

            <form @submit.prevent="saveStyle">

                <div class="container-grid">

                    <div class="swatch">

                        <input type="color" class="colorSelector" id="backgroundColor"
                            v-model="publicStyle.backgroundColor" @input="updateColor('backgroundColor')">
                        <div class="info">
                            <label for="backgroundColor">
                                <h1>GENERAL</h1>
                            </label>
                            <h2 class="hexaCode">{{ publicStyle.backgroundColor }}</h2>
                        </div>
                    </div>

                    <div class="swatch">
                        <input type="color" class="colorSelector" id="homeColor" v-model="publicStyle.homeColor" @input="updateColor('homeColor')">
                        <div class="info">
                            <label for="homeColor">
                                <h1>PAGE HOME</h1>
                            </label>
                            <h2 class="hexaCode">{{ publicStyle.homeColor }}</h2>
                        </div>
                    </div>

                    <div class="swatch">

                        <input type="color" class="colorSelector" id="moduleColor" v-model="publicStyle.moduleColor"  @input="updateColor('moduleColor')">
                        <div class="info">
                            <label for="moduleColor">
                                <h1>MODULES</h1>
                            </label>
                            <h2 class="hexaCode">{{ publicStyle.moduleColor }}</h2>
                        </div>
                    </div>

                    <div class="swatch">

                        <input type="color" class="colorSelector" id="buttonColor" v-model="publicStyle.buttonColor" @input="updateColor('buttonColor')">
                        <div class="info">
                            <label for="buttonColor">
                                <h1>BOUTTON</h1>
                            </label>
                            <h2 class="hexaCode">{{ publicStyle.buttonColor }}</h2>
                        </div>
                    </div>

                    <div class="swatch">
                        <input type="color" class="colorSelector" id="titleColor" v-model="publicStyle.titleColor" @input="updateColor('titleColor')">
                        <div class="info">
                            <label for="titleColor">
                                <h1>TITRAGE</h1>
                            </label>
                            <h2 class="hexaCode">{{ publicStyle.titleColor }}</h2>
                        </div>
                    </div>

                    <div class="swatch">
                        <input type="color" class="colorSelector" id="textColor" v-model="publicStyle.textColor" @input="updateColor('textColor')">
                        <div class="info">
                            <label for="textColor">
                                <h1>TEXTE</h1>
                            </label>
                            <h2 class="hexaCode">{{ publicStyle.textColor }}</h2>
                        </div>
                    </div>

                </div>
                <button class="btn" type="submit">Publier</button>
                <button class="btn" type="button" @click="resetToInitialStyle()">Annuler</button>
            </form>
        </section>


        <section class="section-marketing module">

            <h1>LE FEED MARKETING</h1>

            <moreDetail>
                <template #summary>
                    <h2>Modifier le contenu de la page d'accueil</h2>
                </template>
                <p>Ceci est le contenu personnalisé du détail.</p>
            </moreDetail>

            <div class="container-grid">

                <div class="banner" v-for="(post, index) in home" :key="post._id">
                    <form enctype='multipart/form-data' @submit.prevent="$event => editPost('marketing', index)">
                        <div class="banner-content">
                            <label :for="'changeImg' + index" class="label-changeFile">
                                <svg class="icon upload-icon">
                                    <use href="@/assets/icons/icons.svg#upload"></use>
                                </svg>
                                <input class="changeFile" :id="'changeImg' + index" type="file"
                                    @change="$event => selectFile1($event, index)"
                                    accept="image/png, image/jpg, image/jpeg" />
                            </label>

                            <div class="picture">
                                <img class="oldImg" :class="{ 'newImg': post.newFile }" :src="post.imgPost">
                            </div>
                        </div>
                        <div class="textWrap">
                            <div class="cardText">
                                <div class="edit-card" @click="activeIndex = 'title' + index">

                                    <textarea :class="{ cardFocus: activeIndex === 'title' + index }" class="card-title"
                                        type="text" rows="1" maxlength="20" pattern="[A-Za-z0-9 ]+"
                                        v-model="post.titlePost">
                                                                                        </textarea>

                                    <div class="btn-textarea" v-if="activeIndex === 'title' + index">
                                        <!-- <button class="btn" @click.stop.prevent="validModif('cardTitle', index)">ok</button> -->
                                        <!-- <button class="btn"
                                            @click.stop.prevent="cancelModif('cardTitle', index)">annuler</button> -->
                                    </div>
                                </div>
                                <div class="edit-card" @click="activeIndex = 'description' + index">
                                    <textarea :class="{ cardFocus: activeIndex === 'description' + index }"
                                        class="card-description" type="text" rows="2" maxlength="90"
                                        v-model="post.descriptionPost">
                                                                                        </textarea>
                                    <div v-if="activeIndex === 'description' + index" class="btn-textarea">
                                        <!-- <button class="btn"
                                            @click.stop.prevent="validModif('description', index)">ok</button> -->
                                        <!-- <button class="btn"
                                            @click.stop.prevent="cancelModif('description', index)">annuler</button> -->
                                    </div>
                                </div>



                            </div>
                            <!-- <label :for="'optionBtn' + index">Que fait le bouton?</label>
                            <select :name="'optionBtn' + index" class="btn" v-model="post.btnOption">
                                <option value="menu">DECOUVRIR</option>
                                <option value="signup">SIGN UP</option>
                                <option value="order">COMMANDEZ</option>
                            </select> -->
                            <button type="submit" class="btn green">PUBLIER</button>
                            <button class="btn" @click.stop.prevent="cancelEdit('marketing', index)">annuler</button>
                        </div>
                    </form>
                </div>


            </div>

        </section>
</template>

<script>
import { customService } from '@/services/custom.service';
import { mapState, mapMutations, mapActions } from "vuex";
import moreDetail from "@/components/detail.vue"
export default {
    name: 'homeEdit',
    components: {
        moreDetail
    },
    data() {
        return {
            home: [],
            hero: {},
            originalData: [],
            originalHero: [],
            newFileHero: null,
            activeIndex: '',
            styleForm: {}

        }
    },

    methods: {

        ...mapActions(['getPublicStyle', 'updatePublicStyle']),

        updateColor(selector) {
      document.documentElement.style.setProperty(`--${selector}`, this.publicStyle[selector]);
    },

    resetToInitialStyle() {
        this.getPublicStyle()
  },

        saveStyle() {
            this.styleForm = { ...this.publicStyle }
            // Appeler l'action Vuex pour mettre à jour le style public
            this.updatePublicStyle(this.styleForm)
                .then(() => {
                    console.log("mise à jour du style")
                })
                .catch(err => {
                    console.error("Erreur lors de la mise à jour du style:", err);
                });
        },

        cancelEdit(section, index) {

            if (section === 'marketing') {
                this.home[index].titlePost = this.originalData[index].titlePost
                this.home[index].descriptionPost = this.originalData[index].descriptionPost
                this.home[index].imgPost = this.originalData[index].imgPost
                this.home[index].newFile = null
            }

        },

        validModif(modification) {

            if (modification === "description") {
                this.home.descriptionPost = this.description

            }

            if (modification === "cardTitle") {
                this.home.titlePost = this.cardTitle
            }
            this.activeIndex = null

        },

        selectFile1(event, index) {
            const file = event.target.files[0];
            if (file) {
                this.home[index].imgPost = URL.createObjectURL(file);
                this.home[index].newFile = file;
            }
        },

        createPost(index) {

            const formData = new FormData();
            formData.append('titlePost', this.home[index].titlePost);
            formData.append('descriptionPost', this.home[index].descriptionPost);
            if (this.home[index].newFile) {
                formData.append('imgPost', this.home[index].newFile)
            };
            customService.createPost(formData)
                .then(res => {
                    console.log(res)

                })
                .catch(err => console.log(err))

        },


        editPost(section, index) {

            if (section === 'marketing') {
                const formData = new FormData();
                formData.append('titlePost', this.home[index].titlePost);
                formData.append('descriptionPost', this.home[index].descriptionPost);
                if (this.home[index].newFile) {
                    formData.append('imgPost', this.home[index].newFile)
                };

                if (this.home[index]._id) {
                    customService.postContent(this.home[index]._id, formData)
                        .then(res => {
                            console.log(res)
                            this.home[index].newFile = null
                            this.originalData[index].imgPost = this.home[index].imgPost

                        })
                        .catch(err => console.log(err))
                }
                else {
                    customService.createPost(formData)
                        .then(res => {
                            console.log(res)
                            this.home[index].newFile = null
                            this.originalData[index].imgPost = this.home[index].imgPost
                            console.log(res.data)
                            this.home[index]._id = res.data.post._id

                        })
                        .catch(err => console.log(err))

                }
            }

        },

        selectFileHero(event) {
            const file = event.target.files[0];
            if (file) {
                this.hero.imgHero = URL.createObjectURL(file);
                this.hero.newFile = file;
                console.log('newFile', this.hero.newFile)
            }
        },

        editHero() {

            const formData = new FormData();
            if (this.hero.newFile) {
                formData.append('imgHero', this.hero.newFile)
            };

            if (this.hero._id) {
                console.log(this.hero._id)
                customService.postHero(this.hero._id, formData)
                    .then(res => {
                        this.hero.newFile = null
                        this.originalHero.imgHero = this.hero.imgHero

                    })
                    .catch(err => console.log(err))
            }
            else {
                customService.createHero(formData)
                    .then(res => {
                        this.hero.newFile = null
                        this.originalHero.imgHero = this.hero.imgHero
                        this.hero._id = res.data.newHero._id

                    })
                    .catch(err => console.log(err))

            }
        }

    },

    computed: {
        ...mapState(['publicStyle']),


    },


    mounted() {

        customService.getContent()
            .then(res => {
                const defaultHome = {
                    titlePost: "NOUVEAU POST",
                    descriptionPost: "Modifier l'image, le titre et la description puis cliquez sur PUBLIER",
                    imgPost: ""
                };

                function fillArrayWithDefaults(arr, defaultItem, targetLength) {
                    while (arr.length < targetLength) {
                        arr.push({ ...defaultItem });
                    }
                    return arr;
                }

                const home = res.data.home || [];
                const filledHome = fillArrayWithDefaults(home, defaultHome, 4);

                this.home = filledHome;
                this.originalData = JSON.parse(JSON.stringify(filledHome));
            })
            .catch(err => { console.log(err); })



        customService.getHero()
            .then(res => {
                const defaultHero = {
                    imgPost: ""
                };

                if (res.data.hero && res.data.hero.length > 0) {
                    this.hero = res.data.hero[0];
                } else {
                    this.hero = defaultHero
                }
            })
            .catch(err => console.log(err));
    }

}

</script>

<style scoped>
.module {
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0px 2px 3px 0px #00000069;
    margin-top: 15px;
}



h1#homeManager-head {
    color: var(--moduleColor)
}


.textWrap {
    position: static;
}

#homeManager-head {
    text-align: center;
    border-bottom: solid 2px var(--moduleColor);;
    margin-bottom: 30px;
}

.colorSelector {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    height: 15em;
    padding: 0;
    width: 100%;
    height: 100%;

}

.swatch {
    grid-column-end: span 1;
    display: flex;
    box-sizing: border-box;
    background: #1c1c1c;
    color: white;
    overflow: hidden;
    height: 7em;
    border: solid 3px #1c1c1c;
    flex-direction: column-reverse;
    border-radius: 12px 12px 12px 12px;
}

.swatch .info {
    position: relative;
    padding: 0.7em;
    text-align: center;
}

.swatch h1 {
    font-size: 1em;
    font-family: Subtlecurves;
    margin: 0;
    text-transform: uppercase;
}

.swatch h2 {
    font-family: 'Anton';
    font-size: 1em;
    font-weight: normal;
    margin: 0;
}

.hexaCode {
    position: absolute;
    left: 50%;
    translate: -50%;
    bottom: -2.6em;
    pointer-events: none;
}

::-webkit-color-swatch-wrapper {
    padding: 0;
}

::-webkit-color-swatch {
    border: 0;
    border-radius: 0;
}

::-moz-color-swatch,
::-moz-focus-inner {
    border: 0;
}

::-moz-focus-inner {
    padding: 0;
}


/* .label-changeFile:hover+.picture .oldImg {
    transition: 0.5s ease;
    filter: brightness(0.7);
} */

.newImg {
    /* transition: 1s ease; */
    filter: brightness(0.7);
}

.changeFile {
    display: none;

}

.label-changeFile {
    cursor: pointer;
    z-index: 1;
    position: absolute;
    translate: -50%, -50%;
    transform: translate(50%, -50%);
    top: 50%;
    right: 50%;
}



.section-marketing {
    position: relative;
    display: block;
}

.container-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 13px;
    column-gap: 16px;
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;

    margin: 10px 0;
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
    border-radius: 12px;
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

.upload-icon {
    background-color: white;
    border-radius: 12px;
    width: 40px;
    height: 33px;
    padding: 5px;
    box-shadow: 0px 0px 5px 3px #00000030;
}

.textWrap {
    padding: 10px 16px 11px 16px;
    /* display: flex; */
    /* flex-direction: column;
    align-items: flex-start; */
    /* flex-grow: 1; */
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
    font-family: 'Funtastic';
    text-transform: uppercase;
    font-size: 1em;
    max-width: 100%;
    border: none;
    resize: none;
 
    color: var(--moduleColor)

}

.edit-card {
    position: relative;
}

.card-description {
    border-radius: 0;
    cursor: pointer;
    display: block;
    padding: 5px 5px 40px 5px;
    width: 100%;
    font-family: 'Tropica Gardens';
    font-size: 1em;
    line-height: 1.1;
    text-align: start;
    border: none;
    resize: none;
    overflow: hidden;

    color: var(--moduleColor)
}

.cardFocus {
    width: 100%;
    border-radius: 12px;
    background-color: #ffd3b4;
    transition: all 0.5s ease-out;
}

.btn-textarea {
    transition: all 0.30s ease;
    z-index: 3;
    position: absolute;
    right: 15px;
    top: 50%;
    translate: 0 -50%;

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

    .swatch {
        grid-column-end: span 2;
    }



    .btn:hover {
        background-color: #ffbd6c;
        box-shadow: inset 0px 1px 0px 1px #ffffff5e, inset 0px -1px 0px 1px #0000003b, 0px 4px 2px #11111199;
        transform: scale(1.1);
    }

}
</style>