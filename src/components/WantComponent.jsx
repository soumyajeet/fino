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




function WantComponent({ valuation }) {
    const [formValues, setFormValues] = useState([{ itemName: "", itemBudget: "" }]);    

    let handleChange = (i, e) => {
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
        formValues.forEach((item, i)=> {
            sum  = sum + parseInt(item.itemBudget);
            if(sum >= valuation) {
                console.log("Your want amount is lesser than you added!");
            } else {
                alert(JSON.stringify(formValues));
            }
        })
    }


    return (
        <Box sx={{ minWidth: 375 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" component="h6" sx={{ p: 2, color: 'warning.main' }}>
                        Want {valuation}
                    </Typography>
                    <Stack spacing={3} sx={{ p: 2 }}>
                        <form onSubmit={handleSubmit}>
                            {formValues.map((elem, index) => {
                                return (
                                    <Box key={index} sx={{ m: 2 }}>
                                        <TextField name="itemName" value={elem.itemName || ""} onChange={e => handleChange(index, e)} label="Item" sx={{ m: 2 }} />
                                        <TextField name="itemBudget" value={elem.itemBudget || ""} onChange={e => handleChange(index, e)} label="Budget" sx={{ m: 2 }} />
                                        {
                                            index ?
                                                <Button variant="contained" color="error" onClick={() => removeFormFields(index)} sx={{ m: 2 }}>X</Button>
                                                : null
                                        }
                                    </Box>
                                )
                            })}
                            <div className="button-section">
                                <Button variant="contained" color="warning" onClick={() => addFormFields()} sx={{ m: 2 }}>Add</Button>
                                <Button variant="contained" color="success" type="submit" sx={{ m: 2 }}>Submit</Button>
                            </div>
                        </form>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )

}


export default WantComponent;