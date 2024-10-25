'use client';
import BoardList from '@/components/boards/BoardList';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 페이지가 로드되면 URL을 '/new-url'로 변경
    router.replace('/boards'); // 'replace'는 기록에 남기지 않음
  }, [router]);
  return '보드 리스트 페이지로 이동중...';
}
