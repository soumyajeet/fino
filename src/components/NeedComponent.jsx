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
    { id: 1, item: 'Electricity', amount: null },
    { id: 2, item: 'Internet', amount: null },
    { id: 3, item: 'School Fees', amount: null },
    { id: 4, item: 'School Bus', amount: null },
    { id: 5, item: 'Household', amount: null },
    { id: 6, item: 'Consolidated EMI', amount: null },
    { id: 7, item: 'Cooking GAS', amount: null }
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
        const response = valuation - expenses;
        console.log(response);
    }, [valuation]);

    

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" component="h6" sx={{ p: 2, color: 'success.main' }}>
                        Need {actualExpense}
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
                                            fullWidth
                                            disabled={flag}
                                        />
                                    </span>

                                )
                            })
                        }
                    </Stack>
                    <Stack spacing={3} sx={{ p: 2 }}>
                        <Button variant="contained" onClick={() => dispatch(saveData(conExp))}>Save</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
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

