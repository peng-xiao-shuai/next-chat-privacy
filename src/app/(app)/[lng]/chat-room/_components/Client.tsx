'use client';

import type { Lng } from '@/locales/i18n';
import type { JoinLinkType } from '@/app/api/join-link/route';
import { ClientShare } from './ClientShare';
import { stringToUnicode } from '@/utils/string-transform';
import {
  ChatPopoverProviders,
  type AvatarName,
  type ShareFormDataRules,
} from '@/components';
import { useRoomStore } from '@/hooks/use-room-data';
import { RoomStatus } from '@/server/enum';
import { useBusWatch } from '@/hooks/use-bus-watch';
import { FC, useContext, useEffect, useState } from 'react';
import {
  AppContext,
  ChatPopoverContext,
  ClientChatContext,
  definedCurrent,
  type GetLinkPreview,
  type LinkUserInfo,
  type SetUserInfoType,
} from '@/context';
import { usePusher } from '@/hooks/use-pusher';
import { API_KEYS } from '@@/locales/keys';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { ClientChat } from './ClientChat';
import emitter from '@/utils/bus';
import { type Chat, MESSAGE_TYPE } from '@/hooks/use-pusher';

export function Client() {
  const { joinData, lng, serveActive } = useContext(ClientChatContext);
  const { setCurrent } = useContext(ChatPopoverContext);
  const { t } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const { signin } = usePusher();
  const { setData } = useRoomStore();

  const joinChannelSignin = (formData?: ShareFormDataRules) => {
    return new Promise<string>((resolve, reject) => {
      const userInfo = JSON.parse(joinData!.userInfo) as LinkUserInfo;
      const encryptData = {
        nickName: stringToUnicode(formData?.nickName || userInfo.nickName),
        roomName: userInfo.roomName,
        password: '',
      };
      setData({
        ...encryptData,
        avatar: (formData?.avatar || userInfo.avatar) as AvatarName,
      });

      signin({
        roomStatus: RoomStatus.LINK_JOIN,
        roomId: joinData?.roomData.roomId,
        hash: joinData?.roomData.hash,
      })
        .then((hash) => {
          Cookies.set('hash', hash);

          /**
           * 加入后修改用户信息
           */
          serveActive.setUserInfo?.({
            nickName: formData?.nickName || userInfo.nickName,
            avatar: (formData?.avatar || userInfo.avatar) as AvatarName,
            roomName: userInfo.roomName,
          });
          resolve(hash);
          setVisible(false);
          setChatVisible(true);
        })
        .catch((err) => {
          reject(err);
          toast.error(t(API_KEYS.PUSHER_AUTH_500));
          console.log('joinChannelSignin ===> ', err);
        });
    });
  };

  useEffect(() => {
    /**
     * 判断是否存在 joinData 信息，存在说明邀请链接有效，并且拿到数据。
     * 在进行判断是否存在用户名称，没有存在则弹出表单输入用户名称
     */
    if (joinData) {
      const userInfo = JSON.parse(joinData?.userInfo!) as LinkUserInfo;
      if (!userInfo.nickName) {
        setVisible(true);
      } else {
        joinChannelSignin();
      }
    } else {
      setChatVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinData]);

  /**
   * 多选情况下点击 cancel type = CANCEL
   */
  useBusWatch('complete', (type) => {
    if (type === 'CANCEL') {
      setCurrent({ ...definedCurrent });
      emitter.emit('setSelectChat', { ...definedCurrent });
    } else {
      setVisible(true);
    }
  });

  return (
    <>
      <ClientShare
        visible={visible}
        setVisible={setVisible}
        joinChannelSignin={joinChannelSignin}
      ></ClientShare>
      {chatVisible && <ClientChat></ClientChat>}
    </>
  );
}

export const ClientContext: FC<{
  joinData?: JoinLinkType['data'];
  lng: Lng;
  serveActive: {
    getLinkPreview: GetLinkPreview;
    setUserInfo?: SetUserInfoType;
  };
  children: React.ReactNode;
}> = (props) => {
  const [chat, setChat] = useState<Chat[]>([]);
  return (
    <ClientChatContext.Provider
      value={{
        joinData: props.joinData,
        serveActive: props.serveActive,
        userInfo: props.joinData
          ? JSON.parse(props.joinData?.userInfo!)
          : undefined,
        lng: props.lng,
        chat,
        setChat,
      }}
    >
      <ChatPopoverProviders>{props.children}</ChatPopoverProviders>
    </ClientChatContext.Provider>
  );
};
