import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { accountDashboard } from "../../api/services/dashboardService";
import { dashboardTileType } from "../../Models/dashboard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getCompanyUnitsWithAll } from "../../api/services/utilityService";
import dayjs, { Dayjs } from "dayjs";
import Dtile from "../../components/shared/Dtile";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";



function AccountDashboard() {
  const [dashboard, setdashboard] = useState<dashboardTileType[]>();
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    const data = localStorage.getItem("accountDashboard");
    if (data) {
      const db = JSON.parse(data);
      setdashboard(db.dashboard);
      setDate(dayjs(db.date));
    }
  }, []);

  async function getDashboard() {
    if (date) {
      setLoading(true);
      const result = await accountDashboard(
       dayjs(date).format("YYYY-MM-DD")
      );
      setdashboard(result.data);
      SaveDashboard(result.data);
      setLoading(false);
    }
  }

  function SaveDashboard(dashboard: any) {
    localStorage.removeItem("accountDashboard");
    const db = {
      dashboard: dashboard,
      date: date,
     };
    localStorage.setItem("accountDashboard", JSON.stringify(db));
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
   
        <DatePicker
          format="DD-MM-YYYY"
          label="select Date"
          value={date}
          onChange={(val: Dayjs | null) => setDate(val)}
        />

     

        <Button variant="contained" onClick={getDashboard}>
          Refresh
        </Button>
      </Container>

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            gap: "10px",
            rowGap: 0,
          }}
        >
          {dashboard &&
            dashboard.map((d, i) => (
              <div key={i} style={{ width: "300px" }}>
                <Dtile
                  key={i}
                  heading={d.heading}
                  value={d.value}
                  valueInPerc={d.valueInPerc}
                  link={d.detailLink}
                  color={d.color}
                  
                />
              </div>
            ))}
        </Box>
      </Container>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default AccountDashboard;
