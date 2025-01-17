import { CHAT_ROOM_KEYS, COMMON_KEYS } from '../keys';

export const CHAT_ROOM = {
  [CHAT_ROOM_KEYS.MEMBER_ADDED]: 'Welcome to {{name}}',
  [CHAT_ROOM_KEYS.MEMBER_REMOVED]: `{{name}} has quit`,
  [CHAT_ROOM_KEYS.OWNER_MEMBER_REMOVED]: `House owner {{name}} has quit, will return to the $t(${COMMON_KEYS.HOME})`,
  [CHAT_ROOM_KEYS.HOUSE_OWNER]: 'House owner',
  [CHAT_ROOM_KEYS.DECRYPTION_FAILURE]:
    'Unknown problem, message decryption failed! Please go to {{origin}} to feedback your questions',
  [CHAT_ROOM_KEYS.CONTENT_CANNOT_BE_EMPTY]: 'The content cannot be empty',
  [CHAT_ROOM_KEYS.SPEAK_OUT_FREELY]: 'Feel free to speak up ~',
  [CHAT_ROOM_KEYS.NAME_EXISTS]: 'Nickname already exists',
  [CHAT_ROOM_KEYS.INVITATION_DESCRIPTION]:
    'Each invitation link can only invite one user, and the invitation is invalid after success',
  [CHAT_ROOM_KEYS.REPLY_MESSAGE_NOT_EXIST]: 'The reply message does not exist',
} as const;
