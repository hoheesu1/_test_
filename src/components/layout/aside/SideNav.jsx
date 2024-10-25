'use client';
import Link from 'next/link';
import {
  WechatOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import BorderBottom from '../BorderBottom';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed flex flex-col px-[20px] py-[30px] gap-y-4">
      <Link href="/" className={`flex font-[800]`}>
        <WechatOutlined className="text-main" />
        TALKER
      </Link>
      <BorderBottom />
      <Link
        href="/boards"
        className={`flex gap-2 font-[800] ${
          pathname === '/boards' ? 'text-main' : 'text-gray'
        }`}>
        <UnorderedListOutlined
          className={`${pathname === '/boards' ? 'text-main' : 'text-gray'}`}
        />
        <p>전체 글 보기</p>
      </Link>
      <Link
        href="/boards/new"
        className={`flex gap-2 font-[800] ${
          pathname === '/boards/new' ? 'text-main' : 'text-gray'
        }`}>
        <PlusCircleOutlined
          className={`${
            pathname === '/boards/new' ? 'text-main' : 'text-gray'
          }`}
        />
        <p>새 글 작성</p>
      </Link>
    </nav>
  );
}
