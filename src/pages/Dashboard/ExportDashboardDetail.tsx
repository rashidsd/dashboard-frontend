import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { exportDashboardDetail } from "../../api/services/dashboardService";
import {  Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import ERPGrid from "../../components/shared/ERPGrid";

function ExportDashboardDetail() {
  const { heading, tag, unitId, empCategory, dated } = useParams();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDetail() {
      setLoading(true);
      if (heading && tag && unitId ) {
        const result = await exportDashboardDetail(
          heading,
          tag,
          unitId,
         );
        if (result.data[0]) {
          setList(result.data);
          setLoading(false);
        }
      }
    }
    getDetail();
  }, []);

  return (
    <>
    
      <Typography variant="h5" textAlign="center" sx={{mt:-2}}>
        {heading}
      </Typography>
      <Button
        variant="contained"       
        onClick={() => navigate("/Dashboard/exportDashboard")}
      >
        <KeyboardBackspaceIcon sx={{ marginRight: 1 }} />
        Dashboard
      </Button>
    
        {list[0] && <ERPGrid rows={list} columns={list[0]} options={{hideColumns:['UnitID']}}/>}
    
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default ExportDashboardDetail;
