import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './styles.scss'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { BannerData } from '~/mocks/banner'

export default function Banner() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="bannerSwiper"
            >
                {BannerData.map(banner => {
                    return (
                        <SwiperSlide key={banner.bid}>
                            <img
                                src={banner.path}
                                alt={banner.bid}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}
