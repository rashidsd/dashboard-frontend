import { Typography } from "@mui/material"
import Box from "@mui/material/Box"


type progressBarProps = {
    valueInPerc:number 
    color?:string
    bgColor?:string
}

function DProgressBar({valueInPerc,color,bgColor}:progressBarProps) {
  return (
    <Box component='div' sx={{
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignIitems: 'center',
    height: '100%',
    width: '100%',
    }}>
    <Box component='div'
        sx={{
            position: 'relative',
            width:'4em',
            height: '4em',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: (theme)=> `conic-gradient(${ color ? color: theme.palette.primary.main} ${valueInPerc * 3.6}deg ,grey 0deg)`,
            ":before":{
                position: 'absolute',
                content: '""',
                width: '2.8em',
                height: '2.8em',
                borderRadius:  '50%',
                backgroundColor: (theme)=>bgColor ? bgColor : 'white'
            }
        }}
        >
            <Box component='div' sx={{
                position: 'absolute',
                color:(theme)=> color ? color : theme.palette.primary.main,
                fontWeight: 'bold'
            }}>
               <Typography sx={{
                fontWeight:'bold', fontSize:'0.9em'
               }} >{valueInPerc}%</Typography>
            </Box>
    </Box>    
    </Box>
  )
}

export default DProgressBar