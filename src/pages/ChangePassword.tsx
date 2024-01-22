
import { useState } from "react";
import { changePassword } from "../api/services/userService";
import { changePasswordProps } from "../Models/user";
import  TextField  from "@mui/material/TextField";
import Box from "@mui/material/Box"
import  Typography  from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button"


const defaultValues = {
     email:"",
     password:"",
     newPassword:"",
     confirmPassword:""
}

function ChangePassword() {
  const [state, setState] = useState<changePasswordProps>(defaultValues);
 
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state) {
      if (state.newPassword != state.confirmPassword) {
        return setMsg("password and confirm password do not match");
      }

      const response: any = await changePassword({ ...state });
      return setMsg(response.msg)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
           setState({ ...state, [e.target.name]: e.target.value });
   }
  return (
    <form onSubmit={handleSubmit}>
      <Paper component='div' sx={{maxWidth:'500px' ,padding:'30px' ,marginRight:'auto', marginLeft:'auto' }} >
      <Box display='flex' justifyContent='center' flexDirection='column'  gap={2}>
        <Typography variant="h5" textAlign='center' 
        sx={{color:(thmee)=>thmee.palette.primary.main, fontWeight:'bold'}}>Change Password</Typography>
     
          <TextField
              type="text"
              name="email"
              placeholder="User Name"
              onChange={handleChange}
              label='User Name'
            />
          
            <TextField
              type="password"
              name="password"
              placeholder="old password"
              onChange={handleChange}
              label='Old Password'
            />
          
            <TextField
              type="password"
              name="newPassword"
              onChange={handleChange}
              label='New Password'
            />
       

            <TextField
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              label='Confirm Password'
            />
          
      
        <Box sx={{display:'flex' , fornWeight:'bold' , justifyContent:'space-between'}}>
          <Typography variant="body2" color='error' sx={{fontWeight:'bold'}}>{msg}</Typography>
          <Button  variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
      </Paper>
      </form>
  );
}

export default ChangePassword;