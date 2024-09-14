'use client';
import { ClientChatContext, LinkPreviewInfo } from '@/context';
import { cn } from '@/utils/utils';
import {
  FC,
  Fragment,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// 正则表达式用于快速检查 URL 格式
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-\?\=&%+]*)\/?$/;
const isValidUrl = (string: string) => {
  // 首先使用正则表达式进行快速检查
  if (!URL_REGEX.test(string)) {
    return false;
  }

  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
const isHttpUrl = (string: string) => {
  return string.startsWith('http://') || string.startsWith('https://');
};

const LinkPreview: FC<{ url: string }> = memo(({ url }) => {
  const [preview, setPreview] = useState<LinkPreviewInfo | null>(null);
  const { serveActive } = useContext(ClientChatContext);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      if (serveActive?.getLinkPreview) {
        const data = await serveActive.getLinkPreview(url);
        console.log(data);

        setPreview(data);
      }
    };
    fetchPreview();
  }, [url, serveActive]);

  if (!preview) return null;

  return (
    <QuoteTemplate>
      <a
        href={url}
        target="_blank"
        className="flex items-center"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex-1" ref={textRef}>
          <h1 className="hover:underline capitalize cursor-pointer underline-offset-4 decoration-double font-bold text-primary duration-300 transition-[color] group-[.group-select.group-select-model]:text-primary-content">
            {preview.ogSiteName}
          </h1>
          <h3 className="font-bold">{preview.ogTitle || preview.title}</h3>
          <p>{preview.ogDescription || preview.description}</p>
        </div>

        {preview.ogImage && textRef.current && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview.ogImage}
            alt="Preview"
            className="block ml-4 rounded-md"
            style={{
              height: textRef.current?.clientHeight + 'px',
              width: textRef.current?.clientHeight + 'px',
            }}
          />
        )}
      </a>
    </QuoteTemplate>
  );
});
LinkPreview.displayName = 'LinkPreview';

const ATemplate: FC<{ msg: string }> = memo(({ msg }) => (
  <a
    href={msg}
    target="_blank"
    className="group-[.group-select.group-select-model]:text-primary-content text-primary hover:underline underline-offset-4 decoration-double duration-300 transition-colors"
    onClick={({ stopPropagation }) => {
      stopPropagation();
    }}
  >
    {msg}
  </a>
));
ATemplate.displayName = 'ATemplate';

const QuoteTemplate: FC<{
  title?: string;
  children: ReactNode;
}> = memo(({ title, children }) => (
  <div
    className={cn(
      'border-l-4 border-primary rounded-md px-2 bg-primary/5 mb-1 duration-300 transition-[border,background-color]',
      'group-[.group-select.group-select-model]:border-primary-content group-[.group-select.group-select-model]:text-primary-content group-[.group-select.group-select-model]:bg-white/10'
    )}
  >
    {title && (
      <div
        className={cn(
          'font-bold transition-colors duration-300 text-primary',
          'group-[.group-select.group-select-model]:text-inherit'
        )}
      >
        {title}
      </div>
    )}

    {children}
  </div>
));
QuoteTemplate.displayName = 'QuoteTemplate';

export const ContentMsg: FC<{ msg: string }> = memo(({ msg }) => {
  // 单 Url时显示
  if (isValidUrl(msg)) {
    return (
      <div className="break-words">
        <ATemplate msg={msg} />
        {isHttpUrl(msg) && <LinkPreview url={msg} />}
      </div>
    );
  }

  const parts = msg.split(/\s+/);
  const firstUrl = parts.find((part) => isValidUrl(part));
  return (
    <div className="break-words">
      {parts.map((part, index) => {
        if (isValidUrl(part)) {
          return (
            <Fragment key={index}>
              {' '}
              <ATemplate msg={part} />{' '}
            </Fragment>
          );
        }
        return (
          <span className="whitespace-break-spaces break-words" key={index}>
            {part}
          </span>
        );
      })}

      {firstUrl && isHttpUrl(firstUrl) && <LinkPreview url={firstUrl!} />}
    </div>
  );
});
ContentMsg.displayName = 'ContentMsg';

export { QuoteTemplate as ContentReply };