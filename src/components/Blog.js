import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

  

  // https://source.unsplash.com/random
  
  const theme = createTheme();
  
  export default function Blog() {


    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Outlet />
          </main>
        </Container>
        <Footer
          title="Hacker News Clone"
          description="Hi, please if you like the site give me the job. "
        />
      </ThemeProvider>
    );
  }
