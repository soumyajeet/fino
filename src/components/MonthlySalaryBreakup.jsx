import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useSelector } from 'react-redux';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import NeedComponent from './NeedComponent';
import WantComponent from './WantComponent';
import SavingsComponent from './SavingsComponent';

import initialRatio from '../utils/ratioCalulator';

export default function MonthlySalaryBreakup({ totalincome }) {

    const [income, setIncome] = useState(totalincome);
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
                                <NeedComponent valuation={expenseState.needed.amount} />
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