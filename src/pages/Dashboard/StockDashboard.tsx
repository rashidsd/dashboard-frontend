import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { stockDashboard } from "../../api/services/dashboardService";
import { dashboardTileType } from "../../Models/dashboard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getStoresWithAll } from "../../api/services/utilityService";
import dayjs, { Dayjs } from "dayjs";
import Dtile from "../../components/shared/Dtile";
import { Button } from "@mui/material";



type autoCompleteProps = {
  storeId: string;
  storeName: string;
};

function StockDashboard() {
  const [dashboard, setdashboard] = useState<dashboardTileType[]>();
  const [options, setOptions] = useState([]);
  const [store, setStore] = useState<autoCompleteProps | null>(null);
  const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStores() {
      const result = await getStoresWithAll();
      setOptions(result.data);
    }
    getStores();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("stockDashboard");
    if (data) {
      const db = JSON.parse(data);
      setdashboard(db.dashboard);
      setStore(db.store);
      setFromDate(dayjs(db.fromDate))
      setToDate(dayjs(db.toDate))
    }
  }, []);

  async function getDashboard() {
    if (store) {
      setLoading(true);
      const result = await stockDashboard(
        store.storeName,
        dayjs(fromDate).format("YYYY-MM-DD"),
        dayjs(toDate).format("YYYY-MM-DD")
      );
      setdashboard(result.data);
      SaveDashboard(result.data);
      setLoading(false);
    }
  }

  function SaveDashboard(dashboard: any) {
    localStorage.removeItem("stockDashboard");
    const db = {
      dashboard: dashboard,
      store: store,
      fromDate: fromDate,
      toDate: toDate,
    };
    localStorage.setItem("stockDashboard", JSON.stringify(db));
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
        <Autocomplete
          sx={{ flexGrow: 1 }}
          options={options}
          value={store}
          getOptionLabel={(option: autoCompleteProps) => option.storeName}
          renderInput={(prams) => <TextField {...prams} />}
          onChange={(e: any, val: autoCompleteProps | null) => {
            setStore(val);
          }}
          isOptionEqualToValue={(option, value) =>
            option.storeId === value.storeId
          }
        />

        <DatePicker
          format="DD-MM-YYYY"
          label="From Date"
          value={fromDate}
          onChange={(val: Dayjs | null) => setFromDate(val)}
        />

        <DatePicker
          format="DD-MM-YYYY"
          label="To Date"
          value={toDate}
          onChange={(val: Dayjs | null) => setToDate(val)}
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

export default StockDashboard;
