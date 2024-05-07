import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "@/icons"

// import http from "./utils/http"
// Vue.prototype.$http = http

//引入element处理语言
import ElementLocale from "element-ui/lib/locale"
// 引入我们实例化后vue-i18
import i18n from "./language/index"
//将我们实例化的vue-i8编写公共方法,绑定要elementui语言上
ElementLocale.i18n((key, value) => i18n.t(key, value))
// 把i18注册到Vue实例上

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
  ColorPicker,
  Switch,
  Badge,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
	Tag
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
  .use(Switch)
  .use(Badge)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
	.use(Tag)

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount("#app")
