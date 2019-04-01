import Vue from "vue";
import App from "./App.vue";
import store from './store'
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import firebase from 'firebase/app'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueYoutube from 'vue-youtube'
import smoothScroll from 'vue-smoothscroll'

Vue.use(VueYoutube)
Vue.use(smoothScroll)
Vue.use(BootstrapVue)
Vue.use(Croppa)


Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyDnf1eiO5vB9uwQGYoPCUfapi_6KVY13qk",
  authDomain: "jpopjam0813.firebaseapp.com",
  databaseURL: "https://jpopjam0813.firebaseio.com",
  projectId: "jpopjam0813",
  storageBucket: "jpopjam0813.appspot.com",
  messagingSenderId: "846963922708"
};
firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

