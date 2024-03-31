import { CHAT_ROOM_KEYS, COMMON_KEYS } from '../keys';

export const CHAT_ROOM = {
  [CHAT_ROOM_KEYS.SEND]: '发送',
  [CHAT_ROOM_KEYS.MEMBER_ADDED]: '欢迎 {{name}} 加入',
  [CHAT_ROOM_KEYS.MEMBER_REMOVED]: `{{name}} 已退出`,
  [CHAT_ROOM_KEYS.OWNER_MEMBER_REMOVED]: `频道主 {{name}} 已退出，即将返回$t(${COMMON_KEYS.HOME})`,
  [CHAT_ROOM_KEYS.HOUSE_OWNER]: '频道主',
  [CHAT_ROOM_KEYS.DECRYPTION_FAILURE]:
    '未知问题，消息解密失败！请前往 {{origin}} 反馈问题',
  [CHAT_ROOM_KEYS.CONTENT_CANNOT_BE_EMPTY]: '内容不能为空',
  [CHAT_ROOM_KEYS.SPEAK_OUT_FREELY]: '畅所欲言吧~',
  [CHAT_ROOM_KEYS.UNCONNECTED_CHANNEL]: '未连接频道',
};
