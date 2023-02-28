import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';



function NeedComponent({ valuation }) {
    const [formValues, setFormValues] = useState([{ itemName: "", itemBudget: "" }]);

    console.log(valuation);

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
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
            if (sum >= valuation) {
                console.log("Your Need amount is lesser than you added!");
            } else {
                alert(JSON.stringify(formValues));
            }
        })
    }


    return (
        <Box sx={{ maxWidth: 575 }}>
            

                    <Stack spacing={3} sx={{ p: 2 }}>
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
                                    <Box key={index} >
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
                    </Stack>
                
        </Box>
    )

}


export default NeedComponent;