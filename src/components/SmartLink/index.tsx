import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import clsx from "clsx";

import DocsIcon from "@site/static/img/svgIcons/docs.svg";
import LinkArrowUpRight from '../Common/Icons/LinkArrowUpRight';
import LinkArrowRight from '../Common/Icons/LinkArrowRight';

const LinkIcon = (to: 'docs' | 'external' | 'internal') => {
  switch (to) {
    case 'docs':
      return <DocsIcon />;
    case 'external':
      return <LinkArrowUpRight />;
    default:
      return <LinkArrowRight />;
  }
}

type SmartLinkProps = {
  href: string;
  noIcon?: boolean;
  target?: string;
  children: React.ReactNode;
};

const SmartLink: React.FC<SmartLinkProps & React.HTMLProps<HTMLAnchorElement>> = ({ 
  href, 
  noIcon, 
  target, 
  children, 
  ...props 
}) => {

  const [isExternal, setIsExternal] = useState(false);
  useEffect(() => {
    setIsExternal(
      target === '_blank' || (!href.includes(window.location.hostname) && (!href.includes('internetcomputer.org'))  && href.startsWith('http'))
    );
  }, []);

  const isDocs = href.includes('developer-docs') || href.includes('/docs');
  const iconBefore = isDocs || !isExternal;
  const classNames = clsx(props.className);
  
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : target}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
      className={classNames}
    >
      {!noIcon && iconBefore && LinkIcon(isDocs ? 'docs' : isExternal ? 'external' : 'internal')}
      {children}
      {!noIcon && !iconBefore  && LinkIcon(isDocs ? 'docs' : isExternal ? 'external' : 'internal')}
    </Link>
  );
};

export default SmartLink;
