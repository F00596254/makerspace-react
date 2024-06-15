 
 
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
import { RecoilRoot } from 'recoil';
import AccountDetails from './pages/AccountDetails';
import ForgotPassword from './pages/ForgotPassword';
import EnterYourEmail from './pages/EnterEmail';

import Tickets from './pages/Tickets';
import AllTickets from './pages/AllTickets';
import AllUsers from './pages/AllUsers';
import EditUserDetails from './pages/EditUserDetails';
function App() {
  return (
    <div className="flex flex-col  min-h-screen ">
      <BrowserRouter>
      
          <RecoilRoot>
        <NavigationBar />
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
          <Route path='/allTickets' element={<AllTickets/>}></Route>
          <Route path='/allUsers' element={<AllUsers/>}></Route>
          <Route path='/edit-user/:id' element={<EditUserDetails/>}></Route>
          
        </Routes>
        <Footer />
          </RecoilRoot>
       
      </BrowserRouter>
    </div>
  );
}
export default App
