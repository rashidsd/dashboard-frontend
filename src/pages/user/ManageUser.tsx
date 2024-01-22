import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getUserList } from "../../api/services/userService";
import { User } from "../../Models/user";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEdit from "@mui/icons-material/ModeEdit";
import Close from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import DataGridStyled from "../../components/shared/Styled/DataGridStyled";
import BootstrapDialog from "../../components/shared/Styled/BootstrapDialog";


function ManageUser() {
  const [list, setList] = useState<User[]>([]);
  const [openDlg, setOpenDlg] = useState(false);
  const [newRecord, setNewRecord] = useState({});
  const [editRecord, setEditRecord] = useState<User | null>(null);
  const [manageUser, setManageUser] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setOpenDlg(false);
  }

  const columns: GridColDef[] = [
    { field: "UserID", headerName: "User ID" },
    { field: "UserName", headerName: "User Name", width: 200 },
    { field: "EMail", headerName: "E-Mail", width: 200 },
    { field: "ERPID", headerName: "ERPID" },
    {
      field: "CustId",
      headerName: "CustId",
      filterable: false,
      sortable: false,
    },
    {
      field: "Edit",
      headerName: "Edit",
      filterable: false,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleEditUser(row.UserID)}>
          <ModeEdit color="primary" />
        </IconButton>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      filterable: false,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDeleteUser(row.UserID)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const loadUsers = async () => {
     const response: any = await getUserList();
      if (response.data) {
        setLoading(false);
        return setList(response.data);
      }
    };
    setDeleted(false);
    setLoading(true);
    loadUsers();
  }, [newRecord, editRecord, deleted]);

  function handleEditUser(userId: string) {
    setManageUser("Edit");
    const user = list.find((u) => u.UserID === userId);
    if (user) setEditRecord(user);
    setOpenDlg(true);
  }

  function handleNewUser() {
    setManageUser("New");
    setOpenDlg(true);
  }

  function handleDeleteUser(userId: string) {
    setManageUser("Delete");
    const user = list.find((u) => u.UserID === userId);
    if (user) setEditRecord(user);
    setOpenDlg(true);
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => handleNewUser()}>
          Add New User
        </Button>
      </Box>
      <Box height={650}>
        <DataGridStyled
          rows={list}
          columns={columns}
          getRowId={(row) => row.UserID}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          loading={loading}
        />
      </Box>

      <BootstrapDialog open={openDlg} onClose={handleClose}>
        <DialogContent>
          <DialogTitle sx={{ m: 0, p: 2, mt: -2 }}>
            {manageUser == "New"
              ? "Add New User"
              : manageUser === "Edit"
              ? "Edit User"
              : "Delete User"}
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
          {manageUser == "New" && (
            <AddUser setNewRecord={setNewRecord} closeDlg={setOpenDlg} />
          )}
          {manageUser === "Edit" && (
            <EditUser
              editRecord={editRecord}
              setEditRecord={setEditRecord}
              closeDlg={setOpenDlg}
            />
          )}
          {manageUser === "Delete" && (
            <DeleteUser
              userId={editRecord?.UserID}
              setdeleted={setDeleted}
              closeDlg={setOpenDlg}
            />
          )}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default ManageUser;
