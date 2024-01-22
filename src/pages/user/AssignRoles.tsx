import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { plainUser } from "../../api/services/userService";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { assignUserRoles } from "../../api/services/userRoleService";
import { getRoleGroupList } from "../../api/services/roleGroupService";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { Button, Divider } from "@mui/material";
import { updateUserRoles } from "../../api/services/userRoleService";
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert";

type autoCompleteProps = {
  UserID: string;
  UserName: string;
};

type roleGroupProps = {
  GroupID: string;
  GroupName: string;
  SrNo: number;
};

function AssignRoles() {
  const [options, setOptions] = useState([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [roleGroups, setRoleGroups] = useState<roleGroupProps[]>([]);
  const [user, setUser] = useState<autoCompleteProps | null>(null);
  const [openSnackBar,setOpenSnackBar]= useState(false)
  const [msg,setMsg]= useState('')
  const [severity,setSeverity]= useState('')

  useEffect(() => {
    async function getUsers() {
      const result = await plainUser();
      setOptions(result.data);
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function getRoleGroups() {
      const result = await getRoleGroupList();
      if (result.status == true) setRoleGroups(result.data);
    }
    getRoleGroups();
  }, []);

  const handleChangeUser = async (val: autoCompleteProps | null) => {
    if (val) {
      const result = await assignUserRoles(val.UserID);
      setRoles(result.data);
      setUser(val);
    }
  };

  function handleAssign(value: any, id: string) {
    roles.filter((r: any) => r.RoleID == id)[0].Assign = value;
    setRoles([...roles]);
  }

  async function handleUpdateRoles() {
    if (user) {
      const response: any = await updateUserRoles(user.UserID, roles);
     if (response.status==true) {
        setMsg("roles updated successfully!")
        setSeverity('success')
        setOpenSnackBar(true)
     }else {
      setMsg("somthing went worng...!")
      setSeverity('error')
     }
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Autocomplete
          sx={{ maxWidth: "500px" }}
          options={options}
          getOptionLabel={(option: autoCompleteProps) => option.UserName}
          renderInput={(prams) => <TextField {...prams} />}
          onChange={(e: any, val: autoCompleteProps | null) => {
            handleChangeUser(val);
          }}
        />
        <Box sx={{ maxWidth: "500px", marginTop: "-20px" }}>
          {roleGroups.map((g, i) => (
            <Accordion key={i}>
              <AccordionSummary
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                   mb: 1,
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{g.GroupName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {roles &&
                  roles
                    .filter((r: roleGroupProps) => r.GroupName === g.GroupName)
                    .map((rf: any, i) => (
                      <Box
                        component="div"
                        key={i}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          ":hover": {
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                      >
                        <Typography>{rf.RoleName}</Typography>

                        <Switch
                          checked={rf.Assign == 1 ? true : false}
                          onChange={(e) =>
                            handleAssign(e.target.checked, rf.RoleID)
                          }
                        />
                      </Box>
                    ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              sx={{ mt: 1 }}
              variant="contained"
              onClick={handleUpdateRoles}
            >
              Update Roles
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar open={openSnackBar} anchorOrigin={{vertical:'top',horizontal:'center'}}
       autoHideDuration={3000} onClose={()=>setOpenSnackBar(false)}>
        <Alert onClose={()=>setOpenSnackBar(false)} severity="success" sx={{ width: '100%' }}>
        {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AssignRoles;
