import React from 'react';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Container, Box, Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import parse from 'html-react-parser';
import {  useNavigate } from 'react-router-dom';


const html_string = '<h1>My guy my guy</h1>';

export default function BlogDetail ({
    title=null
}) {

    const navigate = useNavigate();

    return (
        <>
            <Container>
            <Stack 
                sx={{ margin: 2 }}
                direction="row"
                justifyContent="space-between" 
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                    { title || 'Blog Detail' }
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        sx={{ margin: 1 }}
                        onClick={ () => {navigate('/')} }
                    >
                        Go back Home
                    </Button>
                    <Button 
                        variant="outlined"
                        color="error"
                    >
                        Delete
                    </Button>
                </Box>
            </Stack>
            <Box sx={{ minHeight: '50vh', borderRadius: 10 }}>
                <CardMedia
                    component="img"
                    height="340"
                    image="https://source.unsplash.com/random"
                    alt="green iguana"
                />
                <Typography>{ parse(html_string) } </Typography>
            </Box>
        </Container>
        </>
    )
}
