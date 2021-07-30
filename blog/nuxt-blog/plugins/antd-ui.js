import Vue from 'vue'
import { Menu, Dropdown, Icon, message, Row, Col, BackTop, Spin, Anchor, Tag, Pagination } from 'ant-design-vue';
Vue.use(Menu).use(Dropdown).use(Icon).use(Row).use(Col).use(BackTop).use(Spin).use(Anchor).use(Tag).use(Pagination);
Vue.prototype.$message = message;
