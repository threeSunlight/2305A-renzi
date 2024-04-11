import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false
import { Input, Form, FormItem, Button, Submenu, Menu } from "element-ui"
Vue.config.productionTip = false
Vue.use(Input).use(Form).use(FormItem).use(Button).use(Submenu).use(Menu)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
