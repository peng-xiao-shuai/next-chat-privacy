'use client';
import logo from '/public/logo4.png';
import { useState } from 'react';
import { Dialog, HomeForm } from './components';
import { useTranslation } from '@/locales/client';
import { HOME_KEYS } from '@@/locales/keys';
import Image from 'next/image';

export default function Home({ params: { lng } }: CustomReactParams) {
  const [roomStatus, setRoomStatus] = useState<'ADD' | 'JOIN'>('ADD');
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  // 点击加入/创建房间按钮
  const handleRoom = (type: 'JOIN' | 'ADD') => {
    setRoomStatus(type);
    setVisible(true);
  };

  return (
    <>
      <div className="flex flex-wrap h-[82vh] items-center">
        <Image
          className="w-32 h-32 m-auto mask mask-squircle"
          src={logo}
          alt="Logo"
        />

        <div className="flex my-auto m-t w-[100%] justify-around">
          <button
            className="w-[43%] btn btn-outline border-base-content text-base-content"
            onClick={() => handleRoom('JOIN')}
          >
            {t(HOME_KEYS.SELECT_ROOM)}
          </button>
          <button
            className="w-[43%] btn btn-primary btn-active"
            onClick={() => handleRoom('ADD')}
          >
            {t(HOME_KEYS.CREATE_ROOM)}
          </button>
        </div>
      </div>

      <Dialog visible={visible} setVisible={setVisible}>
        <div className="bg-base-300 flex flex-wrap justify-center">
          <HomeForm roomStatus={roomStatus}></HomeForm>
        </div>
      </Dialog>
    </>
  );
}
