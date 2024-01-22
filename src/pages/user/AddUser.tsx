import React, { useEffect,useRef } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { UserReg as User, UserReg } from "../../Models/user"
import { registerUser } from "../../api/services/userService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useState} from 'react'



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const defaultValues = {
  UserName:"",
  ERPID:"",
  EMail:"",
  HashPassword:"",
  ConfirmPassword:""
}

function AddUser({setNewRecord,closeDlg}:{setNewRecord:any,closeDlg:any}) {
  const [state,setState] = useState<UserReg>(defaultValues)
  const [openSnakBar,setOpenSnakBar]=useState(true)
  const userName = useRef<HTMLElement>()
  const [msg,setMsg] = useState('')
  


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
         setState({ ...state, [e.target.name]: e.target.value });
    }

function handleError(msg:string) {
  setMsg(msg)
  setOpenSnakBar(true)
 }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
   if (state) {
    if (state.UserName.trim().length === 0)
      return handleError("Invalid User Name");
    else if (state.HashPassword != state.ConfirmPassword) {
      return handleError("password and confirm password do not match");
    }
    const response: any = await registerUser({ ...state });
    if (response.data.status == false) return handleError(response.data.msg)
    setNewRecord(response.data.data)
     closeDlg(false)
  } else {
    console.log("state is not define");
  }
};

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === "clickaway") {
    return;
  }
  setOpenSnakBar(false);
};

useEffect(()=> {
  if (userName.current)
      userName.current.focus()
},[])

useEffect(()=> {
setOpenSnakBar(false)
},[])
  return (
    <div>
      <Paper elevation={1} sx={{ height: "390px", width: "450px" }}>
      <Box component='form'>
        <Box
          maxWidth="sm"
          height={400}
          sx={{ p: 4 }}
          display="flex"
          flexDirection="column"
          gap={1}
        >
     
          <TextField
            disabled
            type="text"
            name="UserID"
            label="User ID"
            size="small"
          />
          <TextField
            type="text"
            name="UserName"
            label="User Name"
            size="small"
            value={state.UserName}
            onChange={handleChange}
           inputRef={userName}
          />
          <TextField
            type="email"
            name="EMail"
            label="E-Mail"
            size="small"
            value={state.EMail}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="ERPID"
            label="ERP ID"
            size="small"
            value={state.ERPID}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="HashPassword"
            label="Password"
            size="small"
            value={state.HashPassword}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="ConfirmPassword" 
            label="Confirm Password"
            size="small"
           value={state.ConfirmPassword}
            onChange={handleChange}
          />
          <Snackbar open={openSnakBar} 
          autoHideDuration={4000}
           onClose={handleClose}
           anchorOrigin={{ vertical:'top', horizontal:'center' }}
           >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
            {msg}
            </Alert>
          </Snackbar>

          <Box component="div" bgcolor="red" sx={{ position: "relative" }}>
            <Button
            onClick={handleSubmit}
              variant="contained"
              sx={{ position: "absolute", right: 0, top: 10 }}
            >
              Submit
            </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default AddUser