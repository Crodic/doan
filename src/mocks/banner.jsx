import { uniqueId } from 'lodash'
import Banner1 from '~/assets/images/banner1.webp'
import Banner2 from '~/assets/images/banner2.webp'
import Banner3 from '~/assets/images/banner3.webp'
import Banner4 from '~/assets/images/banner4.webp'

export const BannerData = [
    {
        bid: uniqueId('came'),
        path: Banner1,
    },
    {
        bid: uniqueId('came'),
        path: Banner2,
    },
    {
        bid: uniqueId('came'),
        path: Banner3,
    },
    {
        bid: uniqueId('came'),
        path: Banner4,
    },
]
