export const USER_INFO = 'USER_INFO'
export const USER_STATUS = 'USER_STATUS'

export const UserStatus = {
  NEED_LOGIN: -1,
  PENDING: 0,
  LOGGED_IN: 1,
}

function handleUserInfo(info) {
  return {
    type: USER_INFO,
    info,
    status: UserStatus.LOGGED_IN,
  }
}

export function userLogin(nickname, password) {
  return (dispatch) => {
    // fetch from server
    // ...

    // for demo
    dispatch(handleUserInfo({ id: 1, nickname }))
  }
}
