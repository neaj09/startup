import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socket from './_helpers/socketService';
import '@/global.css'



const app = createApp(App);
app.provide('socket', socket);

app.use(store);
app.use(router);

app.mount('#app');
