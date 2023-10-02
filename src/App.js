import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Logout from "./components/Logout";
import AccountManufacturers from "./components/AccountManufacturers";
import Product from "./components/Product";
import OrderPreview from "./components/OrderPreview";
import NullOrderModal from "./components/NullOrderModal";
import CustomerSupportServiceIssues from "./components/CustomerSupportServiceIssues";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import InvoicePDF from "./components/InvoicePDF";
import SalesReport from "./components/Sales_Report/SalesReport";
import RevenueReport from "./components/RevenueReport/RevenueReport";
import ComparisonReport from "./components/Comparison Report/ComparisonReport";
import NewnessReport from "./components/Newness Report/NewnessReport";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route
          path="/account-manufacturers"
          element={<AccountManufacturers />}
        ></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/preview" element={<OrderPreview />}></Route>
        <Route path="/modal" element={<NullOrderModal />}></Route>
        <Route path="/invoice" element={<InvoicePDF />}></Route>
        <Route path="/orderList" element={<OrderList />}></Route>
        <Route path="/orderDetail" element={<OrderDetail />}></Route>
        <Route path="/reports" element={<SalesReport />}></Route>
        <Route path="/comparison-report" element={<ComparisonReport />}></Route>
        <Route path="/revenue-report" element={<RevenueReport />}></Route>
        <Route path="/newness-report" element={<NewnessReport />}></Route>
        <Route
          path="/customer-support"
          element={<CustomerSupportServiceIssues />}
        ></Route>
      </Routes>
      {/* <Login/> */}
      {/* <Dashboard/> */}
    </>
  );
}

export default App;
