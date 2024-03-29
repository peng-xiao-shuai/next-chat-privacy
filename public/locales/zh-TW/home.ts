import { HOME_KEYS } from '../keys';

export const HOME = {
  [HOME_KEYS.SELECT_ROOM]: '加入頻道',
  [HOME_KEYS.CREATE_ROOM]: '創建頻道',
  [HOME_KEYS.ROOM_NUMBER]: '頻道號',
  [HOME_KEYS.NICKNAME]: '暱稱',
  [HOME_KEYS.PASSWORD]: '頻道密碼',
  [HOME_KEYS.PLEASE_INPUT]: '請輸入',

  [HOME_KEYS.HOME_API]: {
    [HOME_KEYS.ROOM_NAME]: '很抱歉~ 頻道名稱已經存在！',
    [HOME_KEYS.NO_ROOM_NAME]: '很抱歉~ 頻道不已經存在！',
    [HOME_KEYS.PASSWORD_ERROR]: '密碼錯誤！',
  },

  [HOME_KEYS.EMPTY_NICKNAME]: `$t(${HOME_KEYS.PLEASE_INPUT}) $t(${HOME_KEYS.NICKNAME}) 作為您的頻道暱稱`,
  [HOME_KEYS.EMPTY_PASSWORD]: `$t(${HOME_KEYS.PLEASE_INPUT}) $t(${HOME_KEYS.PASSWORD}) 進入頻道`,
  [HOME_KEYS.EMPTY_ROOM_NUMBER]: `$t(${HOME_KEYS.PLEASE_INPUT}) $t(${HOME_KEYS.ROOM_NUMBER}) 進入頻道`,
};
