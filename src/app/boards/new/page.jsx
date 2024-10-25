import BoardForm from '@/components/form/BoardForm';
import React from 'react';

export default function BoardsNewPage() {
  return (
    <div>
      <BoardForm isEdit={false} />
    </div>
  );
}
