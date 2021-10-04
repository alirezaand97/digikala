window.Vue = require('vue');

import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios, axios);

Vue.prototype.$siteUrl = 'http://digikala.test/';
Vue.component('Pagination', require('laravel-vue-pagination'));

import Timer from './components/Timer';
import IncredibleTimer from './components/IncredibleTimer';
import ShoppingCart from "./components/ShoppingCart";
import Shopping from "./components/Shopping";
import GiftDiscountCode from "./components/GiftDiscountCode";
import ProductsBox from "./components/ProductsBox";
import CompareProductsModal from "./components/CompareProductsModal";
import Comment from "./components/Comment";
import PriceChart from "./components/PriceChart";
import HeaderSummaryCart from "./components/HeaderSummaryCart";
import MoreProductPrice from "./components/MoreProductPrice";
import MobileMoreProductPrice from "./components/MobileMoreProductPrice";
import MobileShoppingCart from "./components/MobileShoppingCart"
import MobileShopping from "./components/MobileShopping";
import MobileProductsBox from "./components/MobileProductsBox";
import MobileComment from "./components/MobileComment";
import ProfileUserAddress from "./components/ProfileUserAddress";
import Questions from "./components/Questions";
import FavoriteList from "./components/FavoriteList";
import MobileFavoriteList from "./components/MobileFavoriteList";
import MobileQuestion from "./components/MobileQuestion";
import AddQuestion from "./components/AddQuestion";
const app = new Vue({
    el: '#app',
    components: {
        Timer,
        ShoppingCart,
        Shopping,
        GiftDiscountCode,
        ProductsBox,
        CompareProductsModal,
        Comment,
        PriceChart,
        HeaderSummaryCart,
        IncredibleTimer,
        MoreProductPrice,
        MobileMoreProductPrice,
        MobileShoppingCart,
        MobileShopping,
        MobileProductsBox,
        MobileComment,
        ProfileUserAddress,
        Questions,
        FavoriteList,
        MobileFavoriteList,
        MobileQuestion,
        AddQuestion
    }
})
