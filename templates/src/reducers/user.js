import { UserStatus, USER_INFO } from '../actions/user'

const defaultState = {
  status: UserStatus.NEED_LOGIN,
  info: {
    nickname: 'Stranger',
  },
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        info: action.info,
        status: action.status,
      })
    default:
      return state
  }
}
