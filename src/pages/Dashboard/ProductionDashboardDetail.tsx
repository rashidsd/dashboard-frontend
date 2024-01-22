import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productionDashboardDetail } from "../../api/services/dashboardService";
import Box from "@mui/material/Box";
import DataGridStyled from "../../components/shared/Styled/DataGridStyled";
import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import  CircularProgress  from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import ERPGrid from "../../components/shared/ERPGrid";

function ProductionDashboardDetail() {
  const { heading,tag, unitId, orderCategory } = useParams();
  const [list, setList] = useState<any[]>([]);
  
  const [loading,setLoading] =  useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getDetail() {
      setLoading(true)
      if (heading && tag && unitId && orderCategory ) {
        const result = await productionDashboardDetail(heading,tag, unitId, orderCategory);
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
    <Typography variant="h5" textAlign='center'
    sx={{color:(theme)=>theme.palette.primary.main}}
    >{heading}</Typography>
    <Button variant="contained" sx={{mb:1}} 
     onClick={()=>navigate("/Dashboard/ProductionDashboard")}
    >
      <KeyboardBackspaceIcon sx={{marginRight:1}} />
    
      Dashboard
      </Button>
      {list[0] && <ERPGrid rows={list} columns={list[0]} options={{hideColumns:['PriorityNo','UnitID','CategoryID','PlanNo','ID']}} />}
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default ProductionDashboardDetail;
