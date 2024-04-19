'use client';
import bus from '@/utils/bus';
import { FC } from 'react';
import type { Meta } from '../app/[lng]/meta';
import { AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';
import { COMMON_KEYS } from '@@/locales/keys';
import { Lng } from '@/locales/i18n';
import { TFunction } from 'i18next';

export type NavRightProps = {
  metadata: Meta;
  t: TFunction<'translation', undefined>;
  language: Lng;
};

export const NavRight: FC<NavRightProps> = ({ metadata, t, language }) => {
  // 完成事件，点击触发全局通信
  const handleComplete = () => {
    bus.emit('complete');
  };

  return (
    <>
      {metadata.rightOperateType === 'setting' ? (
        <Link href={`/${language}/setting`}>
          <AiOutlineSetting className="ml-3 svg-icon fill-base-content" />
        </Link>
      ) : metadata.rightOperateType === 'complete' ? (
        <button className="btn btn-primary btn-sm" onClick={handleComplete}>
          {t(metadata.NavbarRightText || COMMON_KEYS.COMPLETE)}
        </button>
      ) : metadata.rightOperateType === 'custom' &&
        metadata.NavbarRightComponent ? (
        <metadata.NavbarRightComponent
          {...{
            metadata,
            t,
            language,
          }}
        ></metadata.NavbarRightComponent>
      ) : (
        <></>
      )}
    </>
  );
};
