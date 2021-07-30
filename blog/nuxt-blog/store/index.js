import banner1 from '../assets/images/banner-1.png'
import banner2 from '../assets/images/banner-2.png';
import banner3 from '../assets/images/banner-3.png';
import banner4 from '../assets/images/banner-4.png';
import list01 from '../assets/images/list_01.png';
import list02 from '../assets/images/list_02.png';
import list03 from '../assets/images/list_03.png';
import list04 from '../assets/images/list_04.png';
import list05 from '../assets/images/list_05.png';
import list06 from '../assets/images/list_06.png';
import list07 from '../assets/images/list_07.png';
import list08 from '../assets/images/list_08.png';
import list09 from '../assets/images/list_09.png';
import list10 from '../assets/images/list_10.png';
import list11 from '../assets/images/list_11.png';
import list12 from '../assets/images/list_12.png';
import list13 from '../assets/images/list_13.png';
import list14 from '../assets/images/list_14.png';




export const state = () => ({
    categoryNav: [],
    userInfo: {},
    config: {},
    menu: [],
    ListImg: [
        {img: list01},
        {img: list02},
        {img: list03},
        {img: list04},
        {img: list05},
        {img: list06},
        {img: list07},
        {img: list08},
        {img: list09},
        {img: list10},
        {img: list11},
        {img: list12},
        {img: list13},
        {img: list14},
    ],
    bannerList: [
        {img: banner1},
        {img: banner2},
        {img: banner3},
        {img: banner4},
    ],
    musicList: [],
    socialsList: [],
    avatar: ''
})

export const mutations = {
    setCategoryNav(state, data) {
        state.categoryNav = data
    },
    setUserInfo(state, data) {
        state.userInfo = data
    },
    setConfig(state, data) {
        state.config = data
    },
    setMenu(state, data) {
        state.menu = data
    },
    setMusic(state, data) {
        state.musicList = data
    },
    setSocials(state, data) {
        state.socialsList = data
    },
    setAvatar(state, data) {
        state.avatar = data
    }
}

export const actions = {
    //获取分类，用户基本信息，配置信息，自定义菜单，音乐列表，打赏信息
    async nuxtServerInit({ commit }, { $axios }) {
        const [categoryNav, userInfo, config, menu, musicList, socialsList] = await Promise.allSettled([
            $axios.$get('/api/blog/category/category/v1/list'),
            $axios.$get('/api/blog/auth/master/v1/get'),
            $axios.$get('/api/blog/config/config-base/v1/list'),
            $axios.$get('/api/blog/menu/front/v1/list?page=1&size=10'),
            $axios.$get('/api/blog/music/music/v1/list'),
            $axios.$get('/api/blog/auth/social/v1/socials?code=reward')
        ])
        commit('setCategoryNav', categoryNav.status === 'fulfilled' ? categoryNav.value.models : []);
        commit('setUserInfo', userInfo.status === 'fulfilled' ? userInfo.value.model : {});
        commit('setMenu', menu.status === 'fulfilled' ? menu.value.models : [])
        commit('setMusic', musicList.status === 'fulfilled' ? musicList.value.models : [])
        commit('setSocials', socialsList.status === 'fulfilled' ? socialsList.value.models : [])
        if (config.status === 'fulfilled') {
            const list = config.value.models
            let arr = {};
            for (let i = 0; i < list.length; i++) {
                arr[list[i].configKey] = list[i].configValue
            }
            commit('setConfig', arr);
        } else {
            commit('setConfig', {});
        }
    },
    //首页社交
    getSocial() {
        return this.$axios.$get('/api/blog/auth/social/v1/info');
    },
    //首页推荐
    getFeature() {
        return this.$axios.$get('/api/blog/posts/weight/v1/list?page=1&size=3');
    },
    //首页博客列表
    getBlogList({ commit }, { page }) {
        return this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, size: 10 } });
    },
    //分类列表
    getCategoryList({ commit }, { page, categoryId }) {
        return this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, siez: 10, categoryId } });
    },
    // 文章归档
    getArchives() {
        return this.$axios.$get('/api/blog/posts/archive/v1/list');
    },
    // 友链
    getLinks() {
        return this.$axios.$get('/api/blog/link/link/v2/list');
    },
    // 标签墙列表
    getTags() {
        return this.$axios.$get('/api/blog/tags/tags-article-quantity/v1/list');
    },
    //标签详情
    getTagsDetails({ commit }, { page, postsTagsId }) {
        return this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, siez: 10, postsTagsId } });
    },
    //搜索
    getKeywords({ commit }, { page, keywords }) {
        return this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, siez: 10, keywords } });
    },
    // 文章详情
    getPosts({ commit }, { id }) {
        return this.$axios.$get(`/api/blog/posts/posts/v1/${id}`);
    },
    //评论列表
    getComments({ commit }, { postsId, page }) {
        return this.$axios.$get('/api/blog/comments/comments-posts/v1/list', { params: { page, siez: 5, postsId } });
    },
    //添加评论
    addComments({ commit }, data) {
        return this.$axios.$post('/api/blog/comments/comments/v1/add', data);
    },
    //去登录
    goLogin() {
        return this.$axios.$get('/api/blog/auth/github/v1/get');
    },
    // 登录
    login({ commit }, data) {
        return this.$axios.$post('/api/blog/auth/user/v1/login', data);
    },
}