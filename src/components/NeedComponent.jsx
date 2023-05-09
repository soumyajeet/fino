import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useDispatch, useSelector } from "react-redux";
import { saveNeededAmount } from '../toolkits/slices/incomeSlice';

function NeedComponent() {
    const dataObj = useSelector((state) => {
        return state.data
    })

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState([
        { itemName: "", itemBudget: 0 },
    ]);


    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {
        console.log("Clicked");
        setFormValues([...formValues, { itemName: "", itemBudget: 0 }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    let handleSubmit = (event) => {
        event.preventDefault();
        let sum = 0;
        formValues.forEach((item, i) => {
            sum = sum + parseInt(item.itemBudget);
            if (sum >= dataObj.totalIncome.totalIncome) {
                console.log("Your Need amount is lesser than you added!");
            } else {
                dispatch(
                    saveNeededAmount({
                        totalNeededAmount: sum,
                        needComponentDataObj: formValues
                    })
                );
            }
        });

    };

    return (
        <Box sx={{ maxWidth: 700 }}>
            <Stack spacing={1}>
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
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
                            <Box key={index}>
                                <Grid container>
                                    <Grid item md={5}>
                                        <TextField
                                            name="itemName"
                                            value={elem.itemName || ""}
                                            onChange={(e) => handleChange(index, e)}
                                            label="Item"
                                            sx={{ m: 2 }}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item md={5}>
                                        <TextField
                                            name="itemBudget"
                                            value={elem.itemBudget}
                                            onChange={(e) => handleChange(index, e)}
                                            label="Budget"
                                            sx={{ m: 2 }}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item md={2}>
                                        {index && (
                                            <Tooltip title="Delete Item">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeFormFields(index)}
                                                    sx={{ m: 2 }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        );
                    })}
                </form>
            </Stack>
        </Box>
    );
}

export default NeedComponent;
