import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import Toasted from 'vue-toasted';
import Vuelidate from 'vuelidate';
// import VueAnimate from 'vue-animate-scroll';
// import VueFacebookPixel from 'vue-analytics-facebook-pixel'



//use
Vue.use(Toasted, {
  duration: 3000
});
// Vue.use(VueAnimate);
Vue.use(VueTheMask);
Vue.use(Vuelidate);
// Vue.use(VueFacebookPixel)