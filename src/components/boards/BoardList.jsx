'use client';

import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      title
      contents
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export default function BoardList() {
  const [hasMore, setHasMore] = useState(true);
  const { data: boardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const { data, loading, fetchMore } = useQuery(FETCH_BOARDS, {
    variables: { page: 1 },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  const onNext = () => {
    if (!data?.fetchBoards || data.fetchBoards.length === 0) return;

    fetchMore({
      variables: {
        page: Math.floor(data.fetchBoards.length / 10) + 1, // 다음 페이지
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.fetchBoards.length === 0) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  // 초기 렌더링 후 데이터 부족 시 onNext 강제 호출
  useEffect(() => {
    if (data?.fetchBoards.length < 10) {
      onNext();
    }
  }, [data]);

  return (
    <div id="scrollableDiv" className="h-[500px] overflow-scroll">
      {data && (
        <InfiniteScroll
          className="flex flex-col gap-y-2"
          dataLength={data?.fetchBoards.length ?? 0}
          next={onNext}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          loader={<div>게시글 불러오는 중...</div>}
          endMessage={<p>모든 게시글을 불러왔습니다.</p>}>
          {data?.fetchBoards?.map((board) => (
            <BoardItem key={board._id} board={board} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
