import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import httpRequest from "./utils/httpRequest"
Vue.prototype.$http = httpRequest
import { Button, Select } from "element-ui"
Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
