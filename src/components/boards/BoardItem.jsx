import dateFormatter from '@/commons/util/dateFormatter';
import Link from 'next/link';
import React from 'react';

export default function BoardItem({ board }) {
  return (
    <div className="px-[30px] py-[15px] w-full  bg-[main] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] rounded-[10px]">
      <Link
        href={`/detail/${board?._id}`}
        className="flex items-center justify-between ">
        <p>{board?.title}</p>
        <p>{dateFormatter(board?.createdAt)}</p>
      </Link>
    </div>
  );
}
