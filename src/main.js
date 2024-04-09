import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false
import { input, Form, FormItem, Button } from "element-ui"
Vue.config.productionTip = false
Vue.use(input).use(Form).use(FormItem).use(Button)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
