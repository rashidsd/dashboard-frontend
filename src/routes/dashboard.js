import HrDashboard from "../pages/Dashboard/HrDashboard";
import HrDashboardDetail from "../pages/Dashboard/HrDashboardDetail";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import ProductionDashboard from "../pages/Dashboard/ProductionDashboard";
import ProductionDashboardDetail from "../pages/Dashboard/ProductionDashboardDetail";
import StockDashboard from "../pages/Dashboard/StockDashboard";
import StockDashboardDetail from "../pages/Dashboard/StockDashboardDetail";
import StockReceivingMonthWise from "../pages/Dashboard/StockReceivingMonthWise";
import AccountDashboard from "../pages/Dashboard/AccountDashboard";
import AccountDashboardDetail from "../pages/Dashboard/AccountDashboardDetail";
import ExportDashboard from "../pages/Dashboard/ExportDashboard";
import ExportDashboardDetail from "../pages/Dashboard/ExportDashboardDetail";


const dashbaord = [
    {
    path: "Dashboard/HrDashboard",
    element: 
    <ProtectedRoute>
    <HrDashboard />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/hrDashboard/hrDashboardDetail/:heading/:tag/:unitId/:empCategory/:dated",
    element: 
    <ProtectedRoute>
    <HrDashboardDetail />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/productionDashboard",
    element: 
    <ProtectedRoute>
    <ProductionDashboard />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/productionDashboard/productionDashboardDetail/:heading/:tag/:unitId/:orderCategory",
    element: 
    <ProtectedRoute>
    <ProductionDashboardDetail />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/stockDashboard",
    element: 
    <ProtectedRoute>
    <StockDashboard />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/stockDashboard/stockDashboardDetail/:heading/:tag/:store/:fromDate/:toDate",
    element: 
    <ProtectedRoute>
    <StockDashboardDetail />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/stockDashboard/stockDashboardDetail/monthWiseReceiving/:heading/:tag/:store/:fromDate/:toDate",
    element: 
    <ProtectedRoute>
    <StockReceivingMonthWise />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/accountDashboard",
    element: 
    <ProtectedRoute>
    <AccountDashboard />
    </ProtectedRoute>
  },

  {
    path: "Dashboard/accountDashboard/accountDashboardDetail/:heading/:tag/:dated",
    element: 
    <ProtectedRoute>
    <AccountDashboardDetail />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/exportDashboard",
    element: 
    <ProtectedRoute>
    <ExportDashboard />
    </ProtectedRoute>
  },
  {
    path: "Dashboard/exportDashboard/exportDashboardDetail/:heading/:tag/:unitId",
    element: 
    <ProtectedRoute>
    <ExportDashboardDetail />
    </ProtectedRoute>
  },
  
]

export default dashbaord