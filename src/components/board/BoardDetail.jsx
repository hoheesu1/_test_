'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import CustomButton from '../form/CustomButton';
import Link from 'next/link';
import BorderBottom from '../layout/BorderBottom';
import { UserOutlined } from '@ant-design/icons';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      images
      createdAt
      likeCount
      dislikeCount
      updatedAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardDetail() {
  const { boardId } = useParams();
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const routes = useRouter();
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: boardId,
    },
    fetchPolicy: 'no-cache',
  });
  const onBoardDelete = async () => {
    await deleteBoard({ variables: { boardId } }).then(() => {
      routes.push('/boards');
    });
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 px-10 py-5 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] rounded-[10px]">
        {!loading && data && (
          <>
            <h3 className="text-[16px] font-[700]">{data?.fetchBoard.title}</h3>
            <BorderBottom />

            <div className="flex gap-2">
              {data?.fetchBoard.images?.map((image, index) => (
                <div
                  className="relative w-[200px] h-[125px] overflow-hidden"
                  key={image + index}>
                  <Image
                    src={`https://storage.googleapis.com/${image}`}
                    fill
                    objectFit="cover"
                    alt="사진"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <p className=" font-[700]">
                <UserOutlined className="text-main" />
                {data?.fetchBoard.writer}
              </p>
              <p>{data?.fetchBoard.contents}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center gap-2 py-[30px]">
        <CustomButton styleType="main">
          <Link href="/boards">글 목록</Link>
        </CustomButton>
        <CustomButton>
          <Link href={`/detail/${boardId}/edit`}>수정</Link>
        </CustomButton>
        <CustomButton onClick={onBoardDelete}>삭제</CustomButton>
      </div>
    </>
  );
}
