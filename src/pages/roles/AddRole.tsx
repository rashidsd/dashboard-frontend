import React, { useEffect,useRef } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import { AddRoleProps } from '../../Models/role'
import { createRole } from '../../api/services/roleService'
import { getRoleGroupList } from '../../api/services/roleGroupService'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useState} from 'react'
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from  "@mui/material/MenuItem"



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const defaultValues = {
  RoleName:"",
  GroupID:"",
}

type RoleGroupListProps = {
    GroupID:string,
    GroupName:string,
    SrNo:number
}

function AddRole({setNewRecord,closeDlg}:{setNewRecord:any,closeDlg:any}) {
  const [state,setState] = useState<AddRoleProps >(defaultValues)
  const [gropId,setGroupID] = useState('')
  const [roleGrouplist,setRoleGroupList] = useState<RoleGroupListProps[] | null>(null)
  const [openSnakBar,setOpenSnakBar]=useState(true)
 
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
    if (state.RoleName.trim().length === 0)
      return handleError("Invalid Role Name");
    const response: any = await createRole({ ...state });
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
useEffect(()=>{
async function roleGroupList() {
    const result = await getRoleGroupList()
    if (result.data){
      setRoleGroupList(result.data)
     }
     
}
roleGroupList()
},[])


useEffect(()=> {
setOpenSnakBar(false)
},[])

function handleChangeSelect(e:SelectChangeEvent) {
  setGroupID(e.target.value as string)
    setState({...state,['GroupID']:e.target.value as string})
}

  return (
    <div>
      <Paper elevation={1} sx={{ height: "300px", width: "450px",overflowY:'hidden' }}>
        <Box component="form">
          <Box
            maxWidth="sm"
            height={400}
            sx={{ p: 4 }}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <TextField disabled type="text" name="RoleID" label="Role ID" />
            <Select
             onChange={handleChangeSelect}
              label="select group"
              value={gropId}
             
            >
              {roleGrouplist &&
                roleGrouplist.map((g) => (
                  <MenuItem  key={g.GroupID} value={g.GroupID}>
                    {g.GroupName}
                  </MenuItem >
                ))}
               
            </Select>

            <TextField
              type="text"
              name="RoleName"
              label="Role Name"
              value={state.RoleName}
              onChange={handleChange}
             />

            <Snackbar
              open={openSnakBar}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
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

export default AddRole