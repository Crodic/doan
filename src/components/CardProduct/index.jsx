import {
    Badge,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const CardProduct = ({ item, widthCard = '250px' }) => {
    const navigate = useNavigate()
    const cloudinaryRegex = /cloudinary/i

    const navigateDetail = (id, slug) => {
        let path = `${id}`
        navigate(`/product/${path}`)
    }

    return (
        <Badge badgeContent={item?.discount > 0 ? `-${item?.discount}%` : 0} color="primary">
            <Card sx={{ width: widthCard }} title={item?.title}>
                <CardActionArea onClick={() => navigateDetail(item?.pid, item?.slug)}>
                    <CardMedia
                        component="img"
                        image={
                            item?.images[0] && cloudinaryRegex.test(item?.images[0])
                                ? item?.images[0]
                                : `http://localhost/mvc${item?.images[0]}`
                        }
                        height={200}
                        alt={item?.slug}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" noWrap>
                            {item?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Giá Gốc:{' '}
                            <Box
                                component="span"
                                sx={{ textDecoration: item?.discount > 0 ? 'line-through' : 'unset' }}
                            >
                                {item?.price} VNĐ
                            </Box>
                        </Typography>
                        {item?.discount > 0 && (
                            <Typography variant="body2" color="red" fontSize={13}>
                                Khuyến Mãi:{' '}
                                <Box component="span">{Math.round(item?.price - item?.price / item?.discount)} VNĐ</Box>
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Tooltip title="Giỏ Hàng">
                        <IconButton>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Thông Tin">
                        <IconButton onClick={() => navigate(`/product/${item?.pid}`)}>
                            <ArrowCircleRightIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Badge>
    )
}

export default CardProduct
