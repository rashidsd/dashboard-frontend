
import { Paper, Typography, lighten,Stack } from '@mui/material'
import Box from '@mui/material/Box'
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


function AccessDenied() {
   return (
    <>
    
   <Paper elevation={2} 
   sx={{height:'80vh' ,width:'100%',
    backgroundColor:(theme)=> lighten( theme.palette.primary.light,0.9)
  }}
   >
    <Box gap={1} sx={{display:'flex',alignItems:'center' , 
    height:'100%',flexDirection:'column',  }}>
      <DesktopAccessDisabledIcon fontSize='large' sx={{mt:10}} color='error' />
      <Typography variant='h3' color='error'>
        Access Denied
      </Typography>
      <Typography variant='h6'>
        You are not allowed to view this page
      </Typography>
      <Stack direction='row' gap={2}>
      <SentimentVeryDissatisfiedIcon fontSize='large' 
      sx={{transform:'rotate(180deg)'}}
      />
      <SentimentVeryDissatisfiedIcon fontSize='large'  />
      <SentimentVeryDissatisfiedIcon fontSize='large'  
      sx={{transform:'rotate(180deg)'}}
      />
      <SentimentVeryDissatisfiedIcon fontSize='large'  />
      <SentimentVeryDissatisfiedIcon fontSize='large' 
      sx={{transform:'rotate(180deg)'}}
      />
      <SentimentVeryDissatisfiedIcon fontSize='large'  />
      </Stack>
      
    </Box>
  

   </Paper>
   </>
  )
}

export default AccessDenied