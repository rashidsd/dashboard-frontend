import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { User } from "../../Models/user";
import { updateUser } from "../../api/services/userService";
import { useState } from "react";

function EditUser({
  editRecord,
  setEditRecord,
  closeDlg,
}: {
  editRecord: User | null;
  setEditRecord: any;
  closeDlg: any;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [openSnakBar, setOpenSnakBar] = useState(true);
  const erpID = useRef<HTMLElement>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (user) {
      if (e.target.name === "ERPID")
        setUser({ ...user, ["ERPID"]: e.target.value });
      else if (e.target.name === "CustId")
        setUser({ ...user, ["CustId"]: e.target.value });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const response = await updateUser(
        user.UserID,
        user.UserName,
        user.ERPID,
        user.CustId
      );
      if (response.status == true) {
        setEditRecord({
          ...editRecord,
          ["ERPID"]: response.data.ERPID,
          ["CustId"]: response.data.CustId,
        });
        closeDlg(false);
      }
    }
  };

  useEffect(() => {
    if (editRecord) setUser(editRecord);
  }, []);

  useEffect(() => {
    if (erpID.current) erpID.current.focus();
  }, []);

  useEffect(() => {
    setOpenSnakBar(false);
  }, []);
  return (
    <>
      <Paper elevation={1} sx={{ height: "410px", width: "450px" }}>
        <Box component="form">
          <Box
            maxWidth="sm"
            height={400}
            sx={{ p: 4 }}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <TextField
              disabled
              type="text"
              name="UserID"
              label="User ID"
              value={user?.UserID}
            />
            <TextField
              type="text"
              name="UserName"
              label="User Name"
              value={user?.UserName}
              onChange={handleChange}
            />
            <TextField
              type="email"
              name="EMail"
              label="E-Mail"
              value={user?.EMail}
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="ERPID"
              label="ERP ID"
              value={user?.ERPID}
              onChange={handleChange}
              inputRef={erpID}
            />
            <TextField
              type="text"
              name="CustId"
              label="Customer ID"
              value={user?.CustId}
              onChange={handleChange}
            />

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
    </>
  );
}

export default EditUser;
