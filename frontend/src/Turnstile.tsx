import { useEffect, useRef } from "react";

type Props = {
  onVerify: (token: string) => void;
};

declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
        },
      ) => void;
    };
  }
}

export const Turnstile = ({ onVerify }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    window.turnstile.render(ref.current, {
      sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
      callback: onVerify,
    });
  }, [onVerify]);

  return <div ref={ref} />;
};
