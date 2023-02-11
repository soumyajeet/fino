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


import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { debounce } from "lodash";


const data = [
    { id: 1, item: 'Electricity', amount: 0 },
    { id: 2, item: 'Internet', amount: 0 },
    { id: 3, item: 'School Fees', amount: 0 },
    { id: 4, item: 'School Bus', amount: 0 },
    { id: 5, item: 'Household', amount: 0 },
    { id: 6, item: 'Consolidated EMI', amount: 0 },
    { id: 7, item: 'Cooking GAS', amount: 0 }
]


export default function NeedComponent({ valuation }) {
    // const [searchParams, setSearchParams] = useSearchParams(); // it is a hook for getting values from URL
    // let valuation = searchParams.get("valuation"); //valuation parameter from URL
    const [flag, setFlag] = useState(false); // flag for show and hide expense text
    const [expenses, setExpenses] = useState(data); // initial expense item list
    const [actualExpense, setActualExpense] = useState(valuation); //Total expense value
    const [totalValue, setTotalValue] = useState();
    const conExp = calculateTotalExpenses(expenses);
    const dispatch = useDispatch();


    const updateFieldChanged = index => e => {
        let newArr = [...data];
        newArr[index].amount = +e.target.value;
        setExpenses(newArr);
    }

    useEffect(() => {
        setActualExpense(valuation);
    }, [valuation]);


    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="h6" sx={{ p: 2 }}>
                            <span className='grid'>
                                <div>Need</div>  <div>{actualExpense}</div>
                            </span>

                        </Typography>

                        <Stack spacing={3} sx={{ p: 2 }}>

                            {
                                expenses.map((elem, index) => {
                                    return (
                                        <span key={index}>
                                            <TextField
                                                id="outlined-helperText"
                                                label={elem.item}
                                                name="amount"
                                                value={elem.amount}
                                                onChange={updateFieldChanged(index)}
                                            />
                                        </span>

                                    )

                                })
                            }

                        </Stack>
                        <Stack spacing={3} sx={{ p: 2 }}>
                            <Button variant="contained" onClick={() => dispatch(saveData(remaining))}>Save</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    )



    function calculateTotalExpenses(arr) {
        let total = 0;
        arr.forEach(element => {
            total = total + element.amount;
        });
        return total;
    }


}

NeedComponent.propTypes = {
    neededExpense: PropTypes.number,
    totalExpense: PropTypes.number,
    flag: PropTypes.bool
};

