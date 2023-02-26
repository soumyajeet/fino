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
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
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



import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import SavingsComponent from './SavingsComponent';
import NeedComponent from './NeedComponent';
import WantComponent from './WantComponent';
import ratioCalculator from '../utils/ratioCalulator';


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
    const [formValues, setFormValues] = useState([{ itemName: "", itemBudget: "" }]);
    const [searchParams, setSearchParams] = useSearchParams();
    let ageValue = searchParams.get("age");
    const [age, setAge] = useState(ageValue);
    const [checked, setChecked] = useState(false);
    const [otherIncomeChecked, setOtherIncomeChecked] = useState(false);
    const [marriageAge, setMarriageAge] = useState(25);
    const [value, setValue] = useState(0);
    const [haveFamily, setHaveFamily] = useState(false);
    const [otherIncomeSource, setOtherIncomeSource] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
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


    const handleCheckbox = () => {
        setChecked(prev => !prev);
        setHaveFamily(prev => !prev);
    }

    const handleSalaryChange = (event, newValue) => {
        setValue(newValue);
        setTotalIncome(newValue);
        const expense = makeRatio(newValue);
        const { fiftyPercent, sixtyPercent, fourtyPercent } = expense;
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
        return { fiftyPercent, sixtyPercent, fourtyPercent }
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { itemName: "", itemBudget: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const handleOtherIncomeSource = () => {
        setOtherIncomeChecked(prev=> !prev);
        setOtherIncomeSource(pre=> !pre)
    }

    const updateTotalValue=(item)=> {
        setValue(item);
        const expense = makeRatio(item);
        const { fiftyPercent, sixtyPercent, fourtyPercent } = expense;
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

    let handleSubmit = (event) => {
        event.preventDefault();
        value
        let sum = 0;
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
        })
        setTotalIncome(totalIncome + sum);
        const expense = makeRatio(totalIncome);
        const { fiftyPercent, sixtyPercent, fourtyPercent } = expense;
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
    

    return (
        <>

            <Box sx={{ maxWidth: 590 }}>
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
                                            <FormControlLabel name="married"
                                                control={<Android12Switch onChange={handleCheckbox} checked={checked} />}
                                                label="Are you married"
                                            />
                                        </FormGroup>
                                    )
                                    :
                                    null
                            }
                        </Stack>
                        <Stack spacing={3} sx={{ p: 2 }}>
                            <Typography gutterBottom>
                                Approx {haveFamily ? 'Family' : 'Individual'} Montly Salaried Income
                            </Typography>
                            <TextField value={value} onChange={(e) => updateTotalValue(e.target.value)} label="Income" sx={{ m: 2 }} />
                            <Slider
                                getAriaLabel={() => 'Salary Range'}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={handleSalaryChange}
                                getAriaValueText={valuetext}
                                min={0}
                                max={200000}
                            />
                            <FormGroup>
                                <FormControlLabel
                                    name="otherIncome"
                                    control={<Android12Switch onChange={handleOtherIncomeSource} checked={otherIncomeChecked} />}
                                    label="Do you have other sources of income"
                                />
                            </FormGroup>
                            {
                                otherIncomeSource ? 
                                <form onSubmit={handleSubmit}>
                                <Box display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end">
                                    <Tooltip title="Add New Row">
                                        <IconButton color="warning" onClick={() => addFormFields()}>
                                            <LibraryAddIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Save Items">
                                        <IconButton variant="contained" color="success" type="submit">
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                {formValues.map((elem, index) => {
                                    return (
                                        <Box key={index} sx={{ mt: 2, mb: 2 }}>
                                            <TextField name="itemName" value={elem.itemName || ""} onChange={e => handleChange(index, e)} label="Item" sx={{ m: 2 }} size="small" />
                                            <TextField name="itemBudget" value={elem.itemBudget || ""} onChange={e => handleChange(index, e)} label="Budget" sx={{ m: 2 }} size="small" />
                                            {
                                                index ?
                                                    <Tooltip title="Delete Item">
                                                        <IconButton color="error" onClick={() => removeFormFields(index)} sx={{ m: 2 }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    : null
                                            }
                                        </Box>
                                    )
                                })}

                            </form>
                            : null
                            }
                            
                        </Stack>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Typography variant="h6" component="h6" sx={{ p: 2 }}>
                                Monthly Spending Breakups of { totalIncome }
                            </Typography>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="my need"
                                    id="need-header">
                                    <Typography>
                                        <Chip
                                            label={"Need" + " " + expenseState.needed.amount}
                                            color="success"
                                            variant='outlined'
                                            sx={{ mr: 2 }}
                                        />
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
                                    id="want-header">
                                    <Typography>
                                        <Chip
                                            label={"Want" + " " + expenseState.wish.amount}
                                            color="warning"
                                            variant='outlined'
                                            sx={{ mr: 2 }}
                                        />
                                    </Typography>
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
                                    <Typography>
                                        <Chip
                                            label={"Save" + " " + expenseState.savings.amount}
                                            color="primary"
                                            variant='outlined'
                                            sx={{ mr: 2 }}
                                        />
                                    </Typography>
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
        </>
    );
}

Addpersonalinfo.propTypes  = {
    value: PropTypes.number,
    totalIncome: PropTypes.number
}

export default Addpersonalinfo;