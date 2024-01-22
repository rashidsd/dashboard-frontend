import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import { menu } from "./menu.js";
import useLocalStorage from "../../hooks/useLocalStorage";


export default function Sidebarm() {
    return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

function hasChildren(item) {
  const { items: children } = item;
  if (children === undefined) {
    return false;
  }
  if (children.constructor !== Array) {
    return false;
  }
  if (children.length === 0) {
    return false;
  }
  return true;
}



const MenuItem = ({ item, selected }) => {
  const userInfo =  useLocalStorage()
  const {roles} = userInfo
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return  hasChildren(item) && roles.find(r=>r.GroupName===item.role) || !hasChildren(item) && roles.find(r=>r.RoleName===item.role) ?  <Component item={item} /> : null
};

const SingleLevel = ({ item }) => {
 
   return (
    <ListItemButton
      sx={{
        backgroundColor: "inherit",
        mb: "2px",
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
     <ListItemText primary={item.title  }  />
    </ListItemButton>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ color: (theme) => theme.palette.primary.main }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          "& .MuiTypography-root": { lineHeight: "1" },
          "& .MuiButtonBase-root": { borderBottom: "1px solid #f5f5f5" },
        }}
      >
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <NavLink
              key={key}
              to={child.to}
              style={({ isActive }) => {
                return {
                  color: "black",
                  textDecoration: "none",

                  backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "",
                };
              }}
            >
              <MenuItem key={key} item={child} />
            </NavLink>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
