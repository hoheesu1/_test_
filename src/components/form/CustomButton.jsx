import React from 'react';

export default function CustomButton({
  styleType = 'default',
  type = 'button',
  onClick,
  disabled = false,
  children,
}) {
  const BUTTON_CONFIG = {
    default: 'bg-gray',
    main: 'bg-main',
    disabled: 'bg-lightGray text-gray',
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-full inline-flex justify-center items-center gap-2.5 px-5 py-[5px]  text-white ${BUTTON_CONFIG[styleType]}`}
      type={type}
      disabled={type === 'disabled'}>
      {children}
    </button>
  );
}
