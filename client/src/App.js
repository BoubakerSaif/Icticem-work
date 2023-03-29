
import './App.css';
import{ToastContainer}from"react-toastify"
import{BrowserRouter,Routes,Route}from'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

import Signin from './pages/signin';
import Register from './pages/register';
import Header from './components/Navbar';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/Slices/authSlice";
import AddNewVisit from './pages/AddNewVisit';
import Home from './pages/Home';
import VisitPage from './pages/Selfvisit';



function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (  
     <BrowserRouter>
    <div className="App">
    <Header />
     <ToastContainer/>
 
    
<Routes>


  <Route path="/" element={<Home></Home>}/>
  <Route path="/signin" element={<Signin></Signin>}/>
  <Route path="/register" element={<Register></Register>}/>
  <Route path="/Add" element={<AddNewVisit></AddNewVisit>}/>
  <Route path="/editvisit/:id" element={<AddNewVisit></AddNewVisit>}/>
  <Route path="/Visit/:id" element={<VisitPage></VisitPage>}/>


 
  </Routes>
    </div> <div className="paragraph1">
      <p1>Welcome to VisitOnline, your ultimate destination for travel inspiration and planning! Our site is designed to help you discover new destinations, plan your next adventure, and make the most out of your travels..</p1>
      <p2> Whether you're looking for budget-friendly destinations, luxury escapes, or family-friendly vacations, VisitOnline has got you covered.</p2>
    </div> </BrowserRouter>  
  );
}

export default App;
