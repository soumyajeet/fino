import React, { useState, forwardRef, createContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import Addpersonalinfo from "./Addpersonalinfo";
import {ageData} from './slice/Homeslice';



export default function HomeComponent() {

    const [value, setValue] = useState(dayjs('2014-08-18'));
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState();
    const [comment, setComment] = useState('30 Lacs');
    const [btnFlag, setBtnFlag] = useState();
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const calculateAge = () => {
        const now = dayjs()
        const dateDiff = now.diff(value, 'year');
        console.log(dateDiff);
        
        setAge(dateDiff);
        setOpen(true);
        setBtnFlag(true);

        if (dateDiff > 28 && dateDiff < 35) {
            setComment(`Ideal Asset 10 Lacs and above`)           
        } else if (dateDiff > 35 && dateDiff < 45) {
            setComment(`Ideal Asset 20 Lacs and above`)
        } else if (dateDiff > 22 && dateDiff < 28) {
            setComment(`Ideal Asset 2 Lacs and above`)
        } else if (dateDiff > 45 && dateDiff < 55) {
            setComment(`Ideal Asset 30 Lacs and above`)
        } else {
            setDisable(true);
            setComment(`Don't worry yet! ENJOY`)
        }
    }

    const handleClose = () => {
        setAge();
        setComment();
        setOpen(false);
    };

    const optimize = () => {
        console.log('Optimize')
        navigate(`addinfo?age=${age}`);
    }

    return (
        <>
            <Box sx={{ minWidth: 375 }}>
                <Card variant="outlined" elevation={0}>
                    <CardContent>
                        <Typography variant="h6" component="h6" sx={{ p: 2 }}>
                            Please Enter D.O.B & Know Your Ideal Assets Value
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ mt: 2 }}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Your D.O.B."
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                            {
                                btnFlag ? 
                                (
                                    <Button variant="contained" onClick={optimize} disabled={disable} >Optimize</Button>
                                )
                                : 
                                (
                                    <Button variant="contained" onClick={calculateAge}>Next</Button>
                                )
                            }
                            
                        </Stack>
                    </CardContent>
                </Card>
            </Box>


            <Snackbar 
                open={open} 
                autoHideDuration={6000} 
                onClose={handleClose} 
                message={comment}>  
            </Snackbar>
            
        </>

    )
}