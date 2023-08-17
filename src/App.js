import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom"
import Logout from "./components/Logout";
import AccountManufacturers from "./components/AccountManufacturers";
function App() {
   
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
      <Route path="/account-manufacturers" element={<AccountManufacturers/>}></Route>
    </Routes>
    {/* <Login/> */}
    {/* <Dashboard/> */}
    </>
  );
}

export default App;
