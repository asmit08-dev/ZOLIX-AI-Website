"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

const SUPPORT_EMAIL = "support@zolix.ai";

type EmailComposeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  subject?: string;
};

export default function EmailComposeLink({
  children,
  subject,
  onClick,
  ...props
}: EmailComposeLinkProps) {
  const search = new URLSearchParams({ view: "cm", fs: "1", to: SUPPORT_EMAIL });
  if (subject) search.set("su", subject);
  const href = `https://mail.google.com/mail/?${search.toString()}`;

  const openComposer = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    event.preventDefault();
    const width = 620;
    const height = 720;
    const left = Math.max(0, (window.screen.width - width) / 2);
    const top = Math.max(0, (window.screen.height - height) / 2);

    window.open(
      href,
      "zolix-email-compose",
      `popup=yes,width=${width},height=${height},left=${left},top=${top}`,
    )?.focus();
  };

  return <a {...props} href={href} onClick={openComposer}>{children}</a>;
}
