import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { useSelector } from 'react-redux';

import NeedComponent from './NeedComponent';
import WantComponent from './WantComponent';
import SavingsComponent from './SavingsComponent';

import initialRatio from '../utils/ratioCalulator';

export default function MonthlySalaryBreakup() {
    const totalIncome = useSelector((state) => {
        return state.data.totalIncome.totalIncome
    });

    const needExpense = useSelector((state) => {
        return state.data.needData.totalNeededAmount
    })

    const [income] = useState(totalIncome);
    const [expenseState, setExpenseState] = useState({
        needed: {
            amount: 0,
            percent: 0
        },
        wish: {
            amount: 0,
            percent: 0
        },
        savings: {
            amount: 0,
            percent: 0
        },
    })

    useEffect(() => {
        const expense = initialRatio(income, 50, 30, 20);
        const { x, y, z } = expense;
        setExpenseState({
            needed: {
                amount: parseFloat(x).toFixed(2),
                percent: 50
            },
            wish: {
                amount: parseFloat(y).toFixed(2),
                percent: 30
            },
            savings: {
                amount: parseFloat(z).toFixed(2),
                percent: 20
            }
        })

        // if (needExpense) {
        //     let temp = { ...expenseState };
        //     temp.needed.amount = expenseState.needed.amount - needExpense;
        //     setExpenseState(temp);
        // }

    }, [])


    return (
        <Box sx={{ maxWidth: 590 }}>
            <Card variant="outlined">
                <CardContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Typography>
                            Monthly Spending Breakups of <b>{income}</b>
                        </Typography>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="my need"
                                id="need-header">

                                <Chip
                                    label={"Need" + " " + expenseState.needed.amount}
                                    color="success"
                                    variant='outlined'
                                    sx={{ mr: 2 }}
                                />

                                <Progress percent={expenseState.needed.percent} />
                            </AccordionSummary>
                            <AccordionDetails>
                                <NeedComponent />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="my want"
                                id="want-header">

                                <Chip
                                    label={"Want" + " " + expenseState.wish.amount}
                                    color="warning"
                                    variant='outlined'
                                    sx={{ mr: 2 }}
                                />

                                <Progress percent={expenseState.wish.percent} />
                            </AccordionSummary>
                            <AccordionDetails>
                                <WantComponent valuation={expenseState.wish.amount} />

                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="my want"
                                id="want-header">

                                <Chip
                                    label={"Save" + " " + expenseState.savings.amount}
                                    color="primary"
                                    variant='outlined'
                                    sx={{ mr: 2 }}
                                />

                                <Progress percent={expenseState.savings.percent} />
                            </AccordionSummary>
                            <AccordionDetails>
                                <SavingsComponent savingsValue={expenseState.savings.amount} />

                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </CardContent>
            </Card>

        </Box>
    )
}