import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import "@/assets/styles/index.scss"

// Создайте экземпляр Pinia
const pinia = createPinia();

// Создайте и смонтируйте приложение
createApp(App)
    .use(pinia) // Подключите Pinia к приложению
    .mount('#app');
