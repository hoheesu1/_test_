'use client';

import BoardForm from '@/components/form/BoardForm';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React from 'react';

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

export default function BoardEditPage() {
  const { boardId } = useParams();

  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: boardId,
    },
  });
  return <>{data && <BoardForm isEdit={true} data={data?.fetchBoard} />}</>;
}
