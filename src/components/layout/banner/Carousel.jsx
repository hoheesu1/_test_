'use client'; // 클라이언트 컴포넌트로 설정

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Carousel1 from '@/../public/Carousel1.svg';
import Carousel2 from '@/../public/Carousel2.svg';
import Carousel3 from '@/../public/Carousel3.svg';
import { useParams, usePathname } from 'next/navigation';

// Swiper 스타일을 임포트하지 않으면 스타일이 적용되지 않습니다.
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Carousel() {
  const pathname = usePathname();
  const { postId } = useParams();
  const HIDDEN_BANNERS = [`/boards/${postId}/edit`, '/boards/new'];
  const isHiddenHeader = HIDDEN_BANNERS.includes(pathname);

  return (
    !isHiddenHeader && (
      <div className="container shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] rounded-[10px] border-4 border-solid border-white">
        <Swiper
          loop={true} // 슬라이드가 루프되도록 설정
          spaceBetween={50} // 슬라이드 간격
          slidesPerView={1} // 한 번에 보여질 슬라이드 수
          pagination={{
            clickable: true, // 클릭 가능한 페이지네이션
          }}
          autoplay={{
            delay: 3000, // 3초마다 자동 슬라이드
            disableOnInteraction: false, // 상호작용 후에도 자동 슬라이드 유지
          }}
          modules={[Autoplay, Pagination]} // 사용 모듈
          className="w-full h-[240px]" // 원하는 높이와 너비 설정
        >
          <SwiperSlide>
            <Image
              src={Carousel1}
              fill
              style={{ objectFit: 'cover' }}
              alt="슬라이드 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Carousel2}
              fill
              style={{ objectFit: 'cover' }}
              alt="슬라이드 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Carousel3}
              fill
              style={{ objectFit: 'cover' }}
              alt="슬라이드 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    )
  );
}
