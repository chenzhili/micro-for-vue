const getters = {
  info: (state) => state.example.info,
  infoCustom: (state) => state.example.infoCustom,
  token: state => state.user.token,
  visited: (state) => state.user.visited,
  permissions: state => state.user.permission,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  nickName: state => state.user.nickName,
  account: state => state.user.account,
  mobile: state => state.user.mobile,
  btns: state => state.permission.btns,
  loginModal: state => state.user.loginModal,
  unReadCount: state => state.operation.unReadCount
}
export default getters
