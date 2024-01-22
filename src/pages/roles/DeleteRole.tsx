import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { deleteRole } from "../../api/services/roleService";
import { useState } from "react";


function DeleteRole({
  recordId,
  setdeleted,
  closeDlg,
  setDeleteErrorMsg,setShowDeleteErrorMsg
}: {
  recordId: string | undefined;
  setdeleted: (param: boolean) => void;
  closeDlg: (pram: boolean) => void;
  setDeleteErrorMsg:(param:string)=>void,
  setShowDeleteErrorMsg:(param:boolean)=>void
})
 {

  async function handleDelete() {
    if (recordId) {
      const response = await deleteRole(recordId);
      if (response.status == true) {
        setdeleted(true);
        closeDlg(false);
      }else {
        setDeleteErrorMsg(response.msg)
        setShowDeleteErrorMsg(true)
        closeDlg(false);
      }
    }
  }
  return (
    <Box width={280} height={80}>
      <Typography>
        {" "}
        role will be permanently deleted. sure to delete ?
      </Typography>
      <Divider sx={{ borderColor: (theme) => theme.palette.primary.main }} />
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "end",
          gridGap: 6,
          marginTop: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => closeDlg(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    
    </Box>
  );
}

export default DeleteRole;
