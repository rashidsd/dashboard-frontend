import React, { useEffect, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { stockReceivingMonthWise } from "../../api/services/dashboardService";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem";

import {
  AgChartOptions,
  AgNumberAxisOptions,
  AgCategoryAxisOptions,
} from "ag-charts-community";

function StockReceivingMonthWise() {
  const { tag, heading, fromDate, toDate, store } = useParams();
  const [chartData, setChartData] = useState<any[]>();
  const [chartType,setChartType] = useState('line')
  const chartOptions = {
    data: chartData,
    title: { text: `Stock Receivig from ${fromDate} to ${toDate}` },
    series: [
      {
        type: chartType,
        xKey: "period",
        yKey: "Stock",
        yName: "Receiving against Stock",
      },
      {
        type: chartType,
        xKey: "period",
        yKey: "Import",
        yName: "Receiving against Import",
      },
      {
        type: chartType,
        xKey: "period",
        yKey: "Asset",
        yName: "Receiving against Asset",
      },
      {
        type: chartType,
        xKey: "period",
        yKey: "General",
        yName: "Receiving against General",
      },
      {
        type: chartType,
        xKey: "period",
        yKey: "Process",
        yName: "Receiving against Process",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      } as AgCategoryAxisOptions,
      {
        type: "number",
        position: "left",
        keys: ["Stock", "Import", "Asset","General","Process"],
        // Format the label applied to this axis
        label: {
          formatter: (param) => {
            return Intl.NumberFormat('en-IN').format(param.value)   
          },
        },
      } as AgNumberAxisOptions,
    ],
  } as AgChartOptions;

  useEffect(() => {
    async function getData() {
      if (heading && tag && fromDate && toDate && store) {
        const result = await stockReceivingMonthWise(
          heading,
          tag,
          store,
          fromDate,
          toDate
        );
        if (result.status === true) setChartData(result.data);
        console.log(result.data);
      }
    }

    getData();
  }, []);

  return (
    <>
      <Box sx={{ padding: "30px", width: "80vw", height: "50vh" }}>
        <Select sx={{width:'100px'}}
        value={chartType}
        onChange={(e)=>setChartType(e.target.value)}
        >

          <MenuItem value='line' >Line</MenuItem>
          <MenuItem value='bar' >Bar</MenuItem>
        </Select>
        <AgChartsReact options={chartOptions} />
      </Box>
    </>
  );
}

export default StockReceivingMonthWise;
