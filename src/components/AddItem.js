import React from 'react';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Header from './Header';
import { sections } from './sections';
import { useMutation, useQueryClient } from 'react-query';
import { postData } from  '../modules/util_query';
import { handleApiError } from '../modules/responseHandlers';
import { toast } from 'react-hot-toast';
import { ADD_ITEM } from '../config/api';

import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

const style = {
  fontSize: 60,
  backgroundColor: "violet",
  '&:hover': {
    backgroundColor: "red"
  }
}

const fieldStyle = {
  marginTop:1,
  marginBottom: 1,
  display: "block"
}

export default function AddItem() {

    const [values, setValues] = React.useState({});
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            toast.success('Successfully added');
            queryClient.invalidateQueries('items');
            navigate('/');
        },
        onError: (error, variables, context) => {
            handleApiError(error);
        }
    });

    const handleChange = (evt) => {
        setValues({...values, [evt.target.name]: evt.target.value});
    };

    const createItem = () => {

        console.log('values: ', values);

        if (!values.type){
            alert('Type is required');
            return;
        }

        if (!values.title){
            alert('Title is required');
            return;
        }

        mutation.mutate({
          url: ADD_ITEM,
          payload_data: values,
        });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();



        console.log(values);
        createItem();
        return;
      }

    return (
        <>
         <Header 
          title="Hacker News Blog"
          sections={sections}
          onSearchChange={()=>{}}
          handleTypeChange={()=>{}}
          filters={{}}
          handleSearch={()=>{}}
          mode={'create'}
        />         
      <Container>
            <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                Add a new post
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                    sx={fieldStyle}
                    label="title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    name={'title'}
                    onChange={handleChange}
                />
                <TextField 
                    sx={fieldStyle}
                    label="text"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    name='text'
                    onChange={handleChange}
                />
                <TextField 
                    sx={fieldStyle}
                    label="url"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    name={'url'}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values?.type || ''}
                        label="type"
                        name='type'
                        onChange={handleChange}
                    >
                    <MenuItem value={'story'}>Story</MenuItem>
                    <MenuItem value={'job'}>Job</MenuItem>
                    <MenuItem value={'poll'}>Poll</MenuItem>
                    <MenuItem value={'comment'}>Comment</MenuItem>
                    <MenuItem value={'pollopt'}>Poll Opt</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    sx={fieldStyle}
                    label="by"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    name='by'
                    onChange={handleChange}
                />
                <TextField 
                    sx={fieldStyle}
                    label="score"
                    type="number"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    name='score'
                    onChange={handleChange}
                />
            </form>
            <LoadingButton
                loading={mutation?.isLoading}
                loadingPosition="start"
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSubmit}
            >
                Submit
            </LoadingButton>
        </Container>
        </>
    );

}