import { Skeleton } from '@mui/material';
import React from 'react'

export const MessageLoader = () => {
    return (
        <Skeleton variant="rectangular" sx={{ borderRadius: 40, mb: 2 }} width="100%" height={60} />
    );
}
