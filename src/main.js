import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Form,
  FormItem,
  Button,
  Submenu,
  Menu,
  MenuItem,
  Calendar,
  Tree,
  Dialog,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  ColorPicker
} from "element-ui"
Vue.config.productionTip = false
Vue.use(DropdownItem)
  .use(DropdownMenu)
  .use(Dropdown)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Button)
  .use(Submenu)
  .use(Menu)
  .use(MenuItem)
  .use(Calendar)
  .use(Tree)
  .use(Dialog)
  .use(Select)
  .use(Option)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(ColorPicker)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
