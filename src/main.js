import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.js';


import firebase from '@firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter) // регистрация фильтра ('название', ф-ция) - после чего в
// глобальной области видимости данный фильтр для использования
Vue.component('Loader',Loader)

firebase.initializeApp({
  apiKey: "AIzaSyDNzDqUVK-dK1ZPjVukW_PLyJWvy_9VY3I",
  authDomain: "economizervue.firebaseapp.com",
  databaseURL: "https://economizervue.firebaseio.com",
  projectId: "economizervue",
  storageBucket: "economizervue.appspot.com",
  messagingSenderId: "700933227544",
  appId: "1:700933227544:web:6867a04e46f35c4b"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
}) // если firebase найдет локальные данные пользователя для поддержки автоматической авторизация
// то колбэком инициализируем приложение Vue - для удобства поддержания сессии пользователя