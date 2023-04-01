import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/global.css'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPenToSquare, faTrashCan)


createApp(App)
.use(store)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')


