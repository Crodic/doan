import { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './styles.scss'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Box } from '@mui/material'

export default function Carousel({ data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const cloudinaryRegex = /cloudinary/i
    return (
        <Box>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {data?.map((img, index) => {
                    return (
                        <SwiperSlide key={`came-img-${index}`}>
                            <img src={img && cloudinaryRegex.test(img) ? img : `http://localhost/mvc${img}`} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {data?.map((img, index) => {
                    return (
                        <SwiperSlide key={`came-img-${index}`}>
                            <img src={img && cloudinaryRegex.test(img) ? img : `http://localhost/mvc${img}`} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}
