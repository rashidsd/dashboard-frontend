import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DProgressBar from "./DProgressBar";
import { NavLink } from "react-router-dom";

type TileProps = {
  heading: string,
  value: number,
  valueInPerc: number,
  color?: string,
  link: string,
  bgColor?:string,
  subHeading?:string,
  };

function Dtile({ heading, value, valueInPerc, color, link,bgColor,subHeading }: TileProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "7.5em",
        border: (theme) =>
          `1px solid ${color ? color : theme.palette.primary.main}`,
        margin: ".5em",
        boxShadow: "2px 4px 4px rgba(0,0,0,.5)",
        borderRadius: "4px",
        padding: ".5em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor:(theme)=>bgColor ? bgColor : 'white'
      }}
    >
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        sx={{
          ":hover": {
            "& .dashboardIcon": { transform: "scale(1.3)", opacity: "0.2" },
          },
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            fontWeight: "bold",
            color: (theme) => (color ? color : theme.palette.primary.main),
          }}
        >
          {heading}
        </Typography>
        <Box component="div" display="flex" justifyContent="space-between">
          <Box sx={{ alignSelf: "center" ,display:`${valueInPerc<0 ? 'none' : 'block'}` }}>
            <DProgressBar valueInPerc={valueInPerc} color={color} bgColor={bgColor} />
          </Box>
          <Typography
            sx={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: `${valueInPerc <0 ? (subHeading ?  '1em' : '1.5em') : '1.3em'}`,
              color: (theme) => (color ? color : theme.palette.primary.main),
              ml:`${valueInPerc<0 ? '28px' :0}`
            }}
          >
            {subHeading ? subHeading : Intl.NumberFormat('en-IN',{}).format( value) }
          
          </Typography>
          <DashboardIcon className="dashboardIcon"
            sx={{
              width: "60px",
              height: "60px",
              transition: "all .5s ease-in-out",
              color: (theme) => (color ? color : theme.palette.primary.main),
              opacity: 0.1,
            }}
          />
        </Box >
        <Box component='div' display='flex' justifyContent='center' alignItems='center'
        sx={{
        "& a":{textDecoration:'none'},
         "&:hover":{"& .MuiSvgIcon-root":{transform:'rotate(180deg)'}}
        }}
        >
        <NavLink to={link}>
          <Typography
            textAlign="center"
            sx={{
              fontWeight: "bold",
              fontSize: "0.9em",
              color: (theme) => (color ? color : theme.palette.primary.main),
            }}
          >
            more detail
          </Typography>
        </NavLink>
        <ArrowRightIcon
        sx={{ color: (theme) => (color ? color : theme.palette.primary.main),
        ml:'-4px',
        fontSize:'1.7em',
        transition: "all .5s ease-in-out"
        }}
        />
        </Box>
      </Box>
    </Box>
  );
}

export default Dtile;
