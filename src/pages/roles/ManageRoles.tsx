import {  GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { allRoles } from "../../api/services/roleService";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddRole from "./AddRole";
import DeleteRole from "./DeleteRole";
import DataGridStyled from "../../components/shared/Styled/DataGridStyled";
import BootstrapDialog from "../../components/shared/Styled/BootstrapDialog";
import { RoleLitProps } from "../../Models/role";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";




function ManageRoles() {
  const [list, setList] = useState<RoleLitProps[]>([]);
  const [openDlg, setOpenDlg] = useState(false);
  const [newRecord, setNewRecord] = useState({});
  const [manage, setManage] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleId,setRoleId] = useState('')
  const [showDeleteErrorMsg,setShowDeleteErrorMsg] = useState(false)
  const [deleteErrorMsg,setDeleteErrorMsg]= useState('')



  const columns: GridColDef[] = [
    { field: "RoleID", headerName: "Role ID" },
    { field: "RoleName", headerName: "Role Name", width: 200 },
    { field: "GroupName", headerName: "GroupName", width: 200 },
    {
      field: "Delete",
      headerName: "Delete",
      filterable: false,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDeleteUser(row.RoleID)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  function handleClose() {
    setOpenDlg(false);
  }

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowDeleteErrorMsg(false);
  };

  useEffect(() => {
    const loadRoles = async () => {
     const response: any = await allRoles();
      if (response.data) {
        setLoading(false);
        return setList(response.data);
      }
    };
    setDeleted(false);
    setLoading(true);
    loadRoles();
  }, [newRecord, deleted]);


  function handleNew() {
    setManage("New");
    setOpenDlg(true);
  }

  function handleDeleteUser(Id: string) {
    setManage("Delete");
    setRoleId(Id)
    const role = list.find((r) => r.RoleID === Id);
    setOpenDlg(true);
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => handleNew()}>
          Add New Role
        </Button>
      </Box>
      <Box height={650}>
        <DataGridStyled
          rows={list}
          columns={columns}
          getRowId={(row) => row.RoleID}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          loading={loading}
        />
      </Box>

      <BootstrapDialog open={openDlg} onClose={handleClose}>
        <DialogContent>
          <DialogTitle sx={{ m: 0, p: 2, mt: -2 }}>
            {manage == "New"
              ? "Add New Record"
              : "Delete Role"}
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          {manage == "New" && (
            <AddRole setNewRecord={setNewRecord} closeDlg={setOpenDlg} />
          )}
          
          {manage === "Delete" && (
            <DeleteRole
              recordId={roleId}
              setdeleted={setDeleted}
              closeDlg={setOpenDlg}
              setDeleteErrorMsg={setDeleteErrorMsg}
              setShowDeleteErrorMsg={setShowDeleteErrorMsg}
            />
          )}
        </DialogContent>
      </BootstrapDialog>
      <Snackbar open={showDeleteErrorMsg} 
      autoHideDuration={3000} 
      anchorOrigin={ {vertical:'top',horizontal:'center'}}
      onClose={handleCloseAlert}
       >
        <Alert onClose={handleCloseAlert}  severity="error">{deleteErrorMsg}</Alert>
      </Snackbar>
    </>
  );
}

export default ManageRoles;
