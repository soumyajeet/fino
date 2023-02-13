import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveData } from './slice/needSlice';




function WantComponent({ valuation }) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" component="h6" sx={{ p: 2, color: 'warning.main' }}>
                        Want {valuation}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )

}

export default WantComponent;