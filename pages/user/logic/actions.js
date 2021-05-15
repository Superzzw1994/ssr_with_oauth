import CONSTANTS from './constants'

export const initData = (data) => ({
  type: CONSTANTS.INIT_NAME,
  payload: data
})
