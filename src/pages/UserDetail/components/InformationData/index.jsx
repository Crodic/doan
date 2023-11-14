/* eslint-disable react/prop-types */
import { Grid, Tooltip, Typography } from '@mui/material'

const InformationData = ({ title, value }) => {
    return (
        <Grid item md={6} sm={12}>
            <Typography variant="h6">{title} </Typography>
            <Tooltip title={value}>
                <Typography variant="subtitle2" sx={{ opacity: 0.5 }} noWrap>
                    {value}
                </Typography>
            </Tooltip>
        </Grid>
    )
}

export default InformationData
