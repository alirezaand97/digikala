window.Vue = require('vue');

import IncredibleOffers from "./components/IncredibleOffers";
import OrderSteps from "./components/OrderSteps";
import StockroomInput from "./components/StockroomInput";
import StockroomOutput from "./components/StockroomOutput";
import SaleReport from "./components/SaleReport";

Vue.component('Pagination', require('laravel-vue-pagination'));
Vue.component('Cleave', require('vue-cleave-component'));
Vue.component('Cleave', require('vue-cleave-component'));
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios,axios );
Vue.prototype.$siteUrl = 'http://digikala.test/';


const app = new Vue({
    el: '#app',
    components: {
        IncredibleOffers,
        OrderSteps,
        StockroomInput,
        StockroomOutput,
        SaleReport
    }
});
