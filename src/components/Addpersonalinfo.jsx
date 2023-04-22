import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { saveEarning } from '../toolkits/slices/incomeSlice'



import { useParams } from 'react-router-dom';
import "react-sweet-progress/lib/style.css";
import MonthlySalaryBreakup from './MonthlySalaryBreakup';
import staticValues from '../utils/staticValues';


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


function Addpersonalinfo({ userage }) {
    let { paramAge } = useParams();
    const [formValues, setFormValues] = useState([{ itemName: "", itemBudget: 0 }]);
    const [age, setAge] = useState(userage); // setting the age coming from home page
    const [checkMarriedBtn, setCheckMarriedBtn] = useState(false); //married checkbox button
    const [otherIncomeCheckedBtn, setOtherIncomeCheckedBtn] = useState(false); // income check button
    const [marriageAge, setMarriageAge] = useState(25); // marriage condition
    const [value, setValue] = useState(0);  //default income value
    const [haveFamily, setHaveFamily] = useState(false); // family section show/hide
    const [toggleOtherIncomeSourceSectionView, setToggleOtherIncomeSourceSectionView] = useState(false);  // other income source form fields section
    const [totalIncome, setTotalIncome] = useState(0);  // total income display at bottom
    const [isNxtBtnClicked, setIsNxtBtnClicked] = useState(false);

    const dispatch = useDispatch();

    const handleCheckbox = () => {
        setCheckMarriedBtn(prev => !prev);
        setHaveFamily(prev => !prev);
    }

    /**
     * 
     * it will be called when salary is being entred through slider
     */
    const handleSalaryChange = (event, newValue) => {
        setValue(newValue);
        let sum = 0;
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
        })
        setTotalIncome(parseInt(newValue) + parseInt(sum));
    }

    /**
     * 
     * it will be called when salary is being entred through text field
     */
    const updateTotalValue = (elem) => {
        setValue(elem);
        let sum = 0;
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
        })
        setTotalIncome(parseInt(elem) + parseInt(sum));
    }

    /**
     * 
     * these three functions are created in order to make add fields and remove dileds functions
     */
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

    /**
     * this function will be called to sho hide the addition income fields
     */
    const handleOtherIncomeSource = () => {
        setOtherIncomeCheckedBtn(prev => !prev);
        setToggleOtherIncomeSourceSectionView(pre => !pre); // enable the show hide toggle on extra additional income switch
        if (otherIncomeCheckedBtn === false) {
            setFormValues([{ itemName: "", itemBudget: "" }])
        }
        setTotalIncome(value);
    }


    /**
     * 
     * It will be called after adding additional income source
     */
    let handleSubmit = (event) => {
        event.preventDefault();
        let sum = 0;
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
        })
        setTotalIncome(parseInt(value) + parseInt(sum));
        sum = 0;
    }


    const handleNextBtn = () => {
        dispatch(saveEarning({
            totalIncome
        }))
        setIsNxtBtnClicked(true);
    }



    return (
        <>
            {isNxtBtnClicked ? (
                <MonthlySalaryBreakup />
            )

                :
                (
                    <Box sx={{ maxWidth: 590 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="h6" sx={{ p: 2 }}>
                                    Add info
                                </Typography>

                                <Stack spacing={3} sx={{ p: 2 }}>
                                    {
                                        age >= marriageAge ?
                                            (
                                                <FormGroup>
                                                    <FormControlLabel name="married"
                                                        control={<Android12Switch onChange={handleCheckbox} checked={checkMarriedBtn} />}
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
                                        Approx {haveFamily ? 'Family' : 'Individual'} Montly Income
                                    </Typography>
                                    {/* <TextField value={value} onChange={(e) => updateTotalValue(e.target.value)} label="Income" sx={{ m: 2 }} /> */}
                                    <Typography gutterBottom variant="h3" component="h3">
                                        {value}
                                    </Typography>
                                    <Slider
                                        getAriaLabel={() => 'Salary Range'}
                                        valueLabelDisplay="auto"
                                        value={value}
                                        onChange={handleSalaryChange}
                                        getAriaValueText={valuetext}
                                        min={staticValues.salary.minSalary}
                                        max={staticValues.salary.maxSalary}
                                    />
                                    <FormGroup>
                                        <FormControlLabel
                                            name="otherIncome"
                                            control={<Android12Switch onChange={handleOtherIncomeSource} checked={otherIncomeCheckedBtn} />}
                                            label="Do you have other sources of income"
                                        />
                                    </FormGroup>
                                    {
                                        toggleOtherIncomeSourceSectionView ?
                                            <form onSubmit={handleSubmit}>
                                                <Box display="flex"
                                                    justifyContent="flex-start"
                                                    alignItems="flex-start">
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
                                                            <Grid container>
                                                                <Grid item md={5}>
                                                                    <TextField
                                                                        name="itemName"
                                                                        value={elem.itemName || ""}
                                                                        onChange={e => handleChange(index, e)}
                                                                        label="Item" sx={{ m: 2 }}
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                                <Grid item md={5}>
                                                                    <TextField
                                                                        name="itemBudget"
                                                                        value={elem.itemBudget}
                                                                        onChange={e => handleChange(index, e)}
                                                                        label="Budget" sx={{ m: 2 }}
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                                <Grid item md={2}>
                                                                    {
                                                                        index ?
                                                                            <Tooltip title="Delete Item">
                                                                                <IconButton color="error" onClick={() => removeFormFields(index)} sx={{ m: 2 }}>
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            : null
                                                                    }
                                                                </Grid>
                                                            </Grid>

                                                        </Box>
                                                    )
                                                })}

                                            </form>
                                            : null
                                    }
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography gutterBottom variant="h3" component="h3">
                                        {totalIncome}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleNextBtn()}>
                                        Next
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                )
            }

        </>
    );
}

Addpersonalinfo.propTypes = {
    value: PropTypes.number,
    totalIncome: PropTypes.number
}

export default Addpersonalinfo;