import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Grid from '@mui/material/Grid';


import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";


export default function SavingsComponent({ savingsValue }) {
    const [formValues, setFormValues] = useState([{ itemName: "", itemBudget: "" }]);

    let handleChange = (i, e) => {
        console.log(i)
        console.log(e.target.value)
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        console.log("Clicked")
        setFormValues([...formValues, { itemName: "", itemBudget: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let sum = 0;
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
            if (sum >= savingsValue) {
                console.log("Your Save amount is lesser than you added!");
            } else {
                alert(JSON.stringify(formValues));
            }
        })
    }
    return (
        <>
            <Box sx={{ minWidth: 375 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="h6" sx={{ p: 2, color: 'primary.main' }}>
                            Savings {savingsValue}
                        </Typography>
                        <Stack spacing={3} sx={{ p: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <div className="button-section">
                                    <Tooltip title="Add New Row">
                                        <IconButton color="warning" onClick={() => addFormFields()}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Save Items">
                                        <IconButton variant="contained" color="success" type="submit">
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                                {formValues.map((elem, index) => {
                                    return (
                                        <Box key={index} sx={{ mt: 2, mb: 2 }}>
                                            <Select
                                                labelId="item-name"
                                                id="item-name-save"
                                                value={elem.itemName}
                                                label="Item"
                                                name="itemName"
                                                onChange={e => handleChange(index, e)}
                                                sx={{ m: 2 }}
                                            >
                                                <MenuItem value={'LIC'}>LIC</MenuItem>
                                                <MenuItem value={'NPS'}>NPS</MenuItem>
                                                <MenuItem value={'PPF'}>PPF</MenuItem>
                                            </Select>
                                            <TextField name="itemBudget" value={elem.itemBudget || ""} onChange={e => handleChange(index, e)} label="Budget" sx={{ mt: 2, mb: 2 }} />
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
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}