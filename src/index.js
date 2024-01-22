import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  
  palette: {
   
    primary: {
     main: '#9c27b0',
     light: '#ba68c8',
     dark:'#7b1fa2',
     contrastText:'#fff'
    },
    secondary: {
      main:'#1976d2',
      light:'#42a5f5',
      dark:'#1565c0',
      contrastText:'#fff'
     }
  },
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
    </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
