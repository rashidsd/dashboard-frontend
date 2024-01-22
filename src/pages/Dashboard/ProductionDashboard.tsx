import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { productionDashboard } from "../../api/services/dashboardService";
import { dashboardTileType } from "../../Models/dashboard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getCompanyUnitsWithAll } from "../../api/services/utilityService";
import Dtile from "../../components/shared/Dtile";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type autoCompleteProps = {
  UnitID: string;
  UnitName: string;
};

function ProductionDashboard() {
  const [dashboard, setdashboard] = useState<dashboardTileType[]>();
  const [options, setOptions] = useState([]);
  const [unit, setUnit] = useState<autoCompleteProps | null>(null);
  const [orderCategory, setOrderCategory] = useState("Regular");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUnits() {
      const result = await getCompanyUnitsWithAll();
      setOptions(result.data);
     }
    getUnits();
  }, []);

  useEffect(()=> {
    const data = localStorage.getItem("prodDashboard")
    if (data) {
      const db = JSON.parse(data)
      setdashboard(db.dashboard)
      setUnit(db.unit)
      setOrderCategory(db.orderCategory)
     }
  },[])

  async function getDashboard() {
    if (unit) {
      setLoading(true);
      const result = await productionDashboard(
        unit.UnitID,
        orderCategory
       );
      setdashboard(result.data);
      SaveDashboard(result.data)
      setLoading(false);
    }
  }

  function SaveDashboard(dashboard:any) {
    localStorage.removeItem("prodDashboard")
    const db = {
      dashboard:dashboard,
      unit:unit,
     orderCategory:orderCategory
    }
    localStorage.setItem("prodDashboard",JSON.stringify(db))
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
          value={unit}
          getOptionLabel={(option: autoCompleteProps) => option.UnitName}
          renderInput={(prams) => <TextField {...prams} />}
          onChange={(e: any, val: autoCompleteProps | null) => {
            setUnit(val);
          }}
          isOptionEqualToValue={(option,value)=> option.UnitID===value.UnitID}  
        />

        <Select
          value={orderCategory}
          onChange={(e) => setOrderCategory(e.target.value)}
        >
          <MenuItem value="Regular">Regular</MenuItem>
          <MenuItem value="Sample">Sample</MenuItem>
          <MenuItem value="Inquiry">Inquiry</MenuItem>
        </Select>

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
                  subHeading={d.subHeading}
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

export default ProductionDashboard;
