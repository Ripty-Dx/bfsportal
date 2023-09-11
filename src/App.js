import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Logout from "./components/Logout";
import AccountManufacturers from "./components/AccountManufacturers";
import Product from "./components/Product";
import OrderPreview from "./components/OrderPreview";
import NullOrderModal from "./components/NullOrderModal";
import CustomerSupport from "./components/CustomerSupport";
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
        <Route path="/customer-support" element={<CustomerSupport />}></Route>
      </Routes>
      {/* <Login/> */}
      {/* <Dashboard/> */}
    </>
  );
}

export default App;
