import { lighten } from "@mui/material/styles";
import {
  DataGrid,
  DataGridProps,
  gridPageCountSelector,
  GridPagination,
  GridToolbar,
  useGridApiContext,
  useGridSelector,

} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import  LinearProgress  from "@mui/material/LinearProgress";


function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function DataGridStyled(props: DataGridProps) {
  return (
    <DataGrid
      sx={{
        "& .MuiDataGrid-row:hover": {
          backgroundColor: (theme) => lighten(theme.palette.primary.light, 0.9),
        },

        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
        },
        "& .MuiDataGrid-columnHeaderTitleContainer .MuiButtonBase-root": {
          color: "white",
        },
        "& .MuiDataGrid-menuIcon .MuiSvgIcon-root": { color: "white" },
        "& .MuiDataGrid-footerContainer":{display:'flex',justifyContent:'center'} ,
        "& .MuiTablePagination-displayedRows":{marginTop:2},
        "& .MuiDataGrid-selectedRowCount":{display:'none'} ,
        "& .odd":{backgroundColor:(theme)=>lighten(theme.palette.primary.main,0.9)} ,
        

      }}

      {...props}
      disableColumnFilter
      disableDensitySelector
      slots={{
        pagination: CustomPagination,
        loadingOverlay:LinearProgress,
        toolbar:GridToolbar
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      getRowClassName={(params)=>`${params.indexRelativeToCurrentPage % 2 == 0 ? 'even' : 'odd'}`}
      autoPageSize
      
    />
  );
}
