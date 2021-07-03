const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userId: state => state.user.id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  messageMap: state => state.vueChat.messageMap,
  friendList: state => state.vueChat.friendList,
  content: state => state.vueChat.content,
  currentSessionId: state => state.vueChat.currentSessionId,
  client: state => state.vueChat.client,
  unreadMsgCount: state =>state.vueChat.unreadMsgCount
}
export default getters
