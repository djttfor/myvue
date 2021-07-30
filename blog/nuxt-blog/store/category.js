export const state = () => ({
});

export const mutations = {
    setPage(state, data) {
        state.page = data;
    },
    setFinished(state, data) {
        state.finished = data;
    },
    setLoading(state, data) {
        state.loading = data;
    }
};

export const actions = {
    getCategoryList({ commit }, { page, categoryId }) {
        return this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, siez: 10, categoryId } });
    }
}