import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider} from 'react-query'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import Blog from './components/Blog';
import BlogContent from './components/BlogHome';
import AddItem from './components/AddItem';
import BlogDetail from './components/BlogDetail';

  
  
  const theme = createTheme();

  const queryClient = new QueryClient();


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Blog />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <BlogContent />,
          index: true
        },
        {
          path: "add-post",
          element: <AddItem />
        },
        {
          path: "detail",
          element: <BlogDetail />
        },
      ]
    }
  ]);
  
  export default function App() {
    return (

      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div><Toaster position="top-right" reverseOrder={false}/></div>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>

    );
  }
