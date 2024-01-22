import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Theme
import React, {
  useState,
  useMemo,
  useRef,
} from "react";
import { useTheme, lighten } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Switch } from "@mui/material";
import { ColDef } from "ag-grid-community";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ERPGridProps } from "../../Models/ErpGrid";


const ERPGrid = ({ rows, columns,options }: ERPGridProps) => {
  const theme = useTheme();
  const gridRef = useRef<AgGridReact | null>(null);
  const [showFloatFilter, setShowFloatFilter] = useState(false);
  
  const [colDefs, setColDefs] = useState<ColDef[]>(
    Object.keys(hideColumns(columns)).map((c) => ({
      field: c,
      valueFormatter: (params) => {
        if (typeof params.value === "number")
          return Intl.NumberFormat("en-IN", {}).format(params.value);
        else return params.value;
      }
       
    }))
  );
  const defaultColDef = useMemo(() => {
    return {
      minWidth: 150,
      flex: 1,
      filter: true,
      floatingFilter: showFloatFilter ? true : false,
      
    };
  }, [showFloatFilter]);

  function hideColumns(oldHeader: any) {
    if (options && options.hideColumns) {
      var newHeader = {};
      for (const key in oldHeader) {
        if (!options.hideColumns.includes(key))
          newHeader = { ...newHeader, [key]: oldHeader[key] };
      }
      return newHeader;
    } else {
      return oldHeader;
    }
  }

  return (
    <>
      <Box component="div" justifyContent="end" display="flex" gap={3}>
        <FormControlLabel
          control={
            <Switch
              checked={showFloatFilter}
              onChange={(e) => setShowFloatFilter(e.target.checked)}
            />
          }
          label="Show Filter"
        />
        <Button
          onClick={() =>
            gridRef.current && gridRef.current.api.exportDataAsCsv()
          }
        >
          Export to Excel
        </Button>
      </Box>
      <div className="ag-theme-material" style={{ height: "70vh" }}>
        <AgGridReact
          rowData={rows}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          getRowStyle={(params: any) => {
            if (params.node.rowIndex % 2 === 0)
              return {
                background: `${lighten(theme.palette.primary.light, 0.9)}`,
              };
          }}
          
          pagination={true}
          paginationAutoPageSize={true}
          ref={gridRef}
          suppressScrollOnNewData={true}
          rowHeight={35}
          headerHeight={45}
          suppressAutoSize={true}
          />
   
      </div>
    </>
  );
};

export default ERPGrid;
