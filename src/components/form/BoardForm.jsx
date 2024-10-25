'use client';

import React, { useEffect, useState } from 'react';
import CustomInput from './CustomInput';
import CustomImageInput from './CustomImageInput';
import CustomButton from './CustomButton';
import { gql, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import BorderBottom from '../layout/BorderBottom';

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      createdAt
      updatedAt
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function BoardForm({ isEdit, data }) {
  const [boardData, setBoardData] = useState({
    title: data?.title || '',
    contents: data?.contents || '',
    writer: data?.writer || '',
    pw: '',
  });
  const [images, setImages] = useState(data?.images || ['', '', '']);

  const onChangeBoardData = (name, event) => {
    setBoardData((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const routes = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { boardId } = useParams();

  const onChangeFile = async (event, index) => {
    const file = event.target.files?.[0]; // 배열로 들어오는 이유: <input type="file" multiple /> 일 때, 여러개 드래그 가능
    console.log(file);

    const result = await uploadFile({ variables: { file } });

    setImages((prev) => {
      const newImageUrls = [...prev];
      newImageUrls[index] = result.data?.uploadFile.url || '';
      return newImageUrls;
    });

    console.log(result.data?.uploadFile.url);
  };

  const onSubmitBoard = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const { data } = await updateBoard({
          variables: {
            updateBoardInput: {
              title: boardData.title,
              contents: boardData.contents,
              images,
            },
            password: boardData.pw,
            boardId,
          },
        });
        console.log(data);
        data && routes.push(`/detail/${boardId}`);
      } else {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: boardData.writer,
              password: boardData.pw,
              title: boardData.title,
              contents: boardData.contents,
              images,
            },
          },
        });
        data && routes.push(`/detail/${data?.createBoard._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log('☀️', boardData);
  return (
    <>
      <form onSubmit={onSubmitBoard}>
        <div className="flex flex-col gap-y-6 w-full h-full shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] rounded-[10px] p-[40px]">
          <h2 className="font-[700] ">
            {isEdit ? '게시물 수정' : '게시글 작성'}
          </h2>
          <BorderBottom />

          <CustomInput
            id="title"
            value={boardData}
            onChange={onChangeBoardData}
          />
          <CustomInput
            id="contents"
            value={boardData}
            tagType="textarea"
            onChange={onChangeBoardData}
          />
          <div className="flex">
            {images.map((imageUrl, index) => (
              <CustomImageInput
                key={index + imageUrl}
                imageUrl={imageUrl}
                onChange={onChangeFile}
                index={index}
              />
            ))}
          </div>
          <div className="flex w-full gap-4">
            <CustomInput
              id="writer"
              disabled={isEdit ? true : false}
              value={boardData}
              onChange={onChangeBoardData}
            />
            <CustomInput
              id="pw"
              value={boardData}
              type="password"
              onChange={onChangeBoardData}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 py-[20px]">
          <CustomButton
            type="submit"
            styleType={
              boardData.writer &&
              boardData.contents &&
              boardData.title &&
              boardData.pw
                ? 'main'
                : 'disabled'
            }>
            {isEdit ? '수정' : '등록'}
          </CustomButton>
          <CustomButton>취소</CustomButton>
        </div>
      </form>
    </>
  );
}
