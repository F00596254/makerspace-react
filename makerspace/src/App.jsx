 
import NavigationBar from './components/NavigationBar'
import {BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavigationBar />
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      
      </BrowserRouter>
   
       
    </div>
  );
}

export default App
