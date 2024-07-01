import './App.css'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { RecoilRoot } from 'recoil';
import AccountDetails from './pages/AccountDetails';
import AddPrivilege from './pages/AddPrivilege';
import ViewPrivilege from './pages/ViewPrivilege';
import LinkRolePrivilege from './pages/LinkRolePrivilege'; 
import Sidebar from './components/SideBar';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
      
          <RecoilRoot>
        <NavigationBar />
        <Sidebar />
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/accountdetails' element={<AccountDetails/>}></Route>
          <Route path='/services' element={<Services/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/add-privilege' element={<AddPrivilege />} />
          <Route path='/view-privilege' element={<ViewPrivilege />} />
          <Route path='/link-role-privilege' element={<LinkRolePrivilege />} /> 

        </Routes>
        <Footer />
          </RecoilRoot>
       
      </BrowserRouter>
    </div>
  );
}
export default App
