import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { useDispatch, useSelector } from "react-redux";
import './App.css'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import About from './pages/About';
import Services from './pages/Services';
import PasswordChange from './pages/PasswordChange';
import Contact from './pages/Contact';
import AccountDetails from './pages/AccountDetails';
import ForgotPassword from './pages/ForgotPassword';
import EnterYourEmail from './pages/EnterEmail';
import AddPrivilege from './pages/AddPrivilege';
import ViewPrivilege from './pages/ViewPrivilege';
import LinkRolePrivilege from './pages/LinkRolePrivilege'; 
import Sidebar from './components/SideBar';
import Tickets from './pages/Tickets';
import AllTickets from './pages/AllTickets';
import MyTickets from './pages/MyTickets';
import { setIsAdmin } from './store/actions';
import ViewRoles from './pages/ViewRoles';
import AddRole from './pages/AddRole';

function App() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  useEffect(() => {
    const isAdminInfo = localStorage.getItem('isAdmin') === "true";
    dispatch(setIsAdmin(isAdminInfo));
  }, []);

  return (
    <div className="flex flex-col  min-h-screen ">
      <BrowserRouter>
      
          <RecoilRoot>
        <NavigationBar />
        <div style={{display: 'flex'}}>
          {isAdmin && <Sidebar />}
          <Routes>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/accountdetails' element={<AccountDetails/>}></Route>
            <Route path='/passwordchange' element={<PasswordChange/>}></Route>
            <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
            <Route path='/enteremail' element={<EnterYourEmail/>}></Route>
            <Route path='/services' element={<Services/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/tickets' element={<Tickets/>}></Route>
            <Route path='/MyTickets' element={<MyTickets/>}></Route>
            <Route path='/allTickets' element={<AllTickets/>}></Route>
            <Route path='/add-privilege' element={<AddPrivilege />} />
            <Route path='/view-privilege' element={<ViewPrivilege />} />
            <Route path="/add-role" element={<AddRole />} />
            <Route path='/view-roles' element={<ViewRoles />} />
            <Route path='/link-role-privilege' element={<LinkRolePrivilege />} /> 

          </Routes>
        </div>
        <Footer />
          </RecoilRoot>
       
      </BrowserRouter>
    </div>
  );
}
export default App
