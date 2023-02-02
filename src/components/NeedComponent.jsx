import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';


import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { debounce } from "lodash";


const data = [
    { id:1, item: 'Electricity', amount: 0 },
    { id:2, item: 'Internet', amount: 0 },
    { id:3, item: 'School Fees', amount: 0 },
    { id:4, item: 'School Bus', amount: 0 },
    { id:5, item: 'Household', amount: 0 },
    { id:6, item: 'Consolidated EMI', amount: 0 },
    { id:7, item: 'Cooking GAS', amount: 0 }
]


export default function NeedComponent() {
    const [expenses, setExpenses] = useState(data);

    const conExp = calculateTotalExpenses(expenses);
    const [totalExpense, setTotalExpense] = useState(conExp);

    //https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    const updateFieldChanged = index => e => {
        console.log('index: ' + index);
        console.log('property amount: '+ e.target.name);
        let newArr = [...data]; // copying the old datas array
        // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
        console.log(newArr)
        newArr[index].amount = +e.target.value; // replace e.target.value with whatever you want to change it to
        console.log(newArr);
        setExpenses(newArr);
        console.log('Expense '+ newArr);
      }

    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="h6" sx={{ p: 2 }}>
                            <span className='grid'>
                                <div>Need</div>  <div>Total: {totalExpense}</div>
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

