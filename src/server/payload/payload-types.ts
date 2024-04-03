/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    'feedback-record': FeedbackRecord;
    rooms: Room;
    'invite-link': InviteLink;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface FeedbackRecord {
  id: string;
  email?: string | null;
  status?: ('0' | '1') | null;
  type: '1' | '2' | '3';
  content: string;
  replyContent?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Room {
  id: string;
  roomId: string;
  houseOwnerId: string;
  hash: string;
  iv: string;
  updatedAt: string;
  createdAt: string;
}
export interface InviteLink {
  id: string;
  roomId: string | Room;
  userInfo: string;
  status?: ('0' | '1') | null;
  updatedAt: string;
  createdAt: string;
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}