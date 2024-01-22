import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { Logout } from '@mui/icons-material';
import { logout } from '../api/services/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import globalRouter from '../globalRouter';
import { useEffect } from 'react';


const drawerWidth = 270;

export default function Layout() {
  const navigate = useNavigate()
  globalRouter.navigate=navigate
  const userNavigate = useNavigate()
 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {logo,name} = useLocalStorage().company

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function removeUserInfo() {
    localStorage.removeItem("authInfo");
    localStorage.removeItem("stockDashboard");
    localStorage.removeItem("prodDashboard");
    localStorage.removeItem("accountDashboard");
    localStorage.removeItem("exportDashboard");
    localStorage.removeItem("hrDashboard");
    sessionStorage.removeItem("user")
  }

  useEffect(()=> {
 const user = sessionStorage.getItem("user")
 if (!user) {
  removeUserInfo()
    userNavigate("/login",{replace:true})
 }
  },[])

  const drawer = (
    <div>
      <Toolbar />
      <List sx={{position:'absolute',top:0,width:'100%',m:0,p:0}}>
    <Sidebar />
    </List>
    </div>
  );

  async function handleLogout() {
    const response: any = await logout();
    if (response.data.status == true) {
      removeUserInfo()
      navigate("/login", { replace: true });
    } else {
    }
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
       
            <Box
              component="img"
              sx={{
                widht: "48px",
                height: "48px",
                mr: 2,
                opacity: "0.4",
                borderRadius: "8px",
              }}
              src={logo}
              alt="company logo"
            >

            </Box>
            <Typography variant="h6" noWrap component="div" sx={{mr:'auto'}}>
            {name}
          </Typography>
        
        <Logout sx={{'&:hover':{cursor:'pointer'}}} onClick={handleLogout} />
       
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
      
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
       
        <Outlet />
      </Box>
    </Box>
  );
}