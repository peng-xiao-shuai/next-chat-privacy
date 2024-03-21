'use client';
import { useEffect, useState } from 'react';
import { Lng } from '@/locales/i18n';
import { AppContextData, AppContext, defaultData } from '@/context';
import { useTranslation } from '@/locales/client';
export function AppProvider({
  children,
  language,
}: {
  children: React.ReactNode;
  language: Lng;
}) {
  const { t } = useTranslation();
  const [setting, setSetting] = useState<AppContextData>({
    ...defaultData,
    language: language,
    t,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      window.console.log = () => {};
    }
  }, []);

  return <AppContext.Provider value={setting}>{children}</AppContext.Provider>;
}
