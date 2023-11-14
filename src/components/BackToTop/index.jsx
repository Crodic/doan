import { ArrowUpward } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'

const BackToTop = () => {
    const [show, setShow] = useState(false)

    const handleShowButton = () => {
        if (window.scrollY > window.innerHeight * 1.5) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleShowButton)
        return () => window.removeEventListener('scroll', handleShowButton)
    }, [])

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        show && (
            <Fab
                sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
                color="secondary"
                onClick={handleBackToTop}
            >
                <ArrowUpward />
            </Fab>
        )
    )
}

export default BackToTop
