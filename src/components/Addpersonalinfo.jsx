import React, { useState, useEffect } from 'react';
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
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import NeedComponent from './NeedComponent';


import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

function valuetext(value) {
    return `${value}`;
}


function Addpersonalinfo() {
    let { paramAge } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    let ageValue = searchParams.get("age");
    const [age, setAge] = useState(ageValue);
    const [checked, setChecked] = useState(false);
    const [marriageAge, setMarriageAge] = useState(25);
    const [value, setValue] = useState(40000);
    const [haveFamily, setHaveFamily] = useState(false);
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
    const navigate = useNavigate();
    const neededExpense = useSelector((state) => state.neededExpense.value);



    const handleChange = () => {
        console.log("Clicked")
        setChecked(prev => !prev);
        setHaveFamily(prev => !prev);
    }

    const handleSalaryChange = (event, newValue) => {
        setValue(newValue);
        const expense = makeRatio(newValue);
        const {fiftyPercent, sixtyPercent, fourtyPercent} = expense;
        setExpenseState({
            needed: {
                amount: Math.round(fiftyPercent),
                percent: 50
            },
            wish: {
                amount: Math.round(sixtyPercent),
                percent: 30
            },
            savings: {
                amount: Math.round(fourtyPercent),
                percent: 20
            }
        })
    }

     
    const makeRatio = (value) => {
        let fiftyPercent = value / 2;
        let restAmount = value - fiftyPercent;
        let sixtyPercent = restAmount * (60 / 100);
        let fourtyPercent = restAmount - sixtyPercent;

        return {fiftyPercent, sixtyPercent, fourtyPercent}
        
    }



    return (
        <>

            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="h6" sx={{ p: 2 }}>
                            Add more info
                        </Typography>

                        <Stack spacing={3} sx={{ p: 2 }}>
                            {
                                age >= marriageAge ?
                                    (
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Android12Switch onChange={handleChange} checked={checked} />}
                                                label="Are you married"
                                            />
                                        </FormGroup>
                                    )
                                    :
                                    null
                            }
                        </Stack>
                        <Stack spacing={3} sx={{ p: 2 }}>
                            <Typography gutterBottom>Approx {haveFamily ? 'Family' : 'Individual'} Montly Income {value}</Typography>
                            <Slider
                                getAriaLabel={() => 'Salary Range'}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={handleSalaryChange}
                                getAriaValueText={valuetext}
                                min={10000}
                                step={3}
                                max={150000}
                            />
                        </Stack>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Typography variant="h6" component="h6" sx={{ p: 2 }}>Monthly Salary Spending Breakups</Typography>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="my need"
                                    id="need-header"
                                >
                                    <Typography>
                                        <Chip label="Need" color="success" variant='outlined' sx={{ mr: 2 }} /> {expenseState.needed.amount}
                                    </Typography>
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
                                    id="want-header"
                                >
                                    <Typography>
                                        <Chip label="Want" color="warning" variant='outlined' sx={{ mr: 2 }} />
                                        {expenseState.wish.amount}
                                    </Typography>
                                    <Progress percent={expenseState.wish.percent} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    Want
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="my want"
                                    id="want-header"
                                >
                                    <Typography>
                                        <Chip label="Savings" color="primary" variant='outlined' sx={{ mr: 2 }} />
                                        {expenseState.savings.amount}
                                    </Typography>
                                    <Progress percent={expenseState.savings.percent} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    Save
                                </AccordionDetails>
                            </Accordion>

                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default Addpersonalinfo;