import React from 'react';

const INPUT_LABEL = {
  title: '제목',
  contents: '내용',
  writer: '작성자',
  pw: '비밀번호',
};

export default function CustomInput({
  id,
  value,
  type,
  onChange,
  disabled = false,
  tagType = 'input',
}) {
  return (
    <div className="flex w-full gap-2">
      <label htmlFor={id} className="shrink-0">
        {INPUT_LABEL[id]}
      </label>
      {tagType === 'textarea' ? (
        <textarea
          id={id}
          value={value[id]}
          onChange={(event) => onChange(id, event)}
          className="w-full h-[400px] border border-lightGray rounded-[5px] border-solid focus:border-main focus:outline-none"
        />
      ) : (
        <input
          id={id}
          value={value[id]}
          onChange={(event) => onChange(id, event)}
          className={`w-full border border-lightGray rounded-[5px] border-solid focus:border-main focus:outline-none ${
            disabled && 'bg-lightGray text-gray'
          } `}
          disabled={disabled}
          type={type || 'text'}
        />
      )}
    </div>
  );
}
