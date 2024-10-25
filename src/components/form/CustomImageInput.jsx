'use client';

import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ImageUploadPage({ imageUrl, onChange, index }) {
  const fileRef = useRef(null);

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div
        className="relative overflow-hidden w-20 h-20 border border-lightGray rounded-[5px] border-dashed"
        onClick={onClickImage}>
        이미지선택
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={(event) => onChange(event, index)}
          ref={fileRef}
        />
        {imageUrl && (
          <Image
            src={`https://storage.googleapis.com/${imageUrl}`}
            fill
            objectFit="cover"
            alt="사진 업로드"
          />
        )}
      </div>
    </>
  );
}
