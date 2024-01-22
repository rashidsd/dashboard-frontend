import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import {login} from "../api/services/auth"
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg"
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import InputAdornment from "@mui/material/InputAdornment"

function LoginNew() {
  const [state, setState] = useState({email:'' , password:''});
  const [msg,setMsg]= useState('')
 const userInfo = useLocalStorage()
 const {user} = userInfo
  const navigate =  useNavigate()


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({...state,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.email.trim().length == 0) return setMsg("Invalid email!");
    else if (state.password.trim().length == 0)
      return setMsg("Invalid password!");
    else {
      const resp: any = await login(state.email, state.password);
      setMsg(resp.data.msg);
      if (resp.data.data) {
        localStorage.setItem("authInfo", JSON.stringify(resp.data.data));
        sessionStorage.setItem("user",JSON.stringify(resp.data.data.user.email))
        navigate("/", { replace: true });
      } else {
        navigate("/login");
      }
    }
  };

  return (
 
      <Paper
        elevation={3}
        sx={{
          width: 660,
          height: 500,
          display: "flex",
          gap: 2,
          margin: "50px  auto 0 auto",
          
          
        }}
      >
        <Box
          component="div"
          sx={{ width: "40%",
           borderRight:'1px solid #e5e5e5'
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={1}
          
        >
          
        <img src={logo} height='100%' width='100%' alt="logo"  />
         
        </Box>
        <Box component="div" sx={{ width: "50%" ,padding: "15px", }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={2} sx={{ marginTop: "30px" }}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100px' width='100px' sx={{border:(theme)=>`2px solid ${theme.palette.primary.main}`
            , borderRadius:'50%' ,margin:'auto' }} >
            <Typography color='primary'
              variant="h5"
              textAlign="center"
              sx={{ fontWeight: "bold"  }}
            >
              Login
            </Typography>
            </Box>
           
            <TextField sx={{marginTop:'20px'}}
            label="Email" 
            name="email" 
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon sx={{color:(theme)=>theme.palette.primary.main}} />
                </InputAdornment>
              ),
            }}
            />

            <TextField 
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PasswordIcon sx={{color:(theme)=>theme.palette.primary.main}} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{ width: "max-content", marginLeft: "auto", textTransform:'capitalize' }}
              onClick={handleSubmit}      
            >
              Login
            </Button>
            <Typography color='error'  >{msg}</Typography>
          </Stack>
          </form>
        </Box>
      </Paper>
   
  );
}

export default LoginNew;
