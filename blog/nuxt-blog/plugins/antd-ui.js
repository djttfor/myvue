import Vue from 'vue'
import { Menu, Dropdown, Icon, message, Row, Col, BackTop, Spin, Anchor, Tag, Pagination,Tooltip,Button} from 'ant-design-vue';
Vue.use(Menu).use(Dropdown).use(Icon).use(Row).use(Col)
.use(BackTop).use(Spin).use(Anchor).use(Tag).use(Pagination).use(Tooltip).use(Button);
Vue.prototype.$message = message;
