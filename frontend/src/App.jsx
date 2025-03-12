import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import summaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import Navbar from './components/Navbar'
import Help from './components/Help'
import BestSellers from './pages/BestSellers'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

const App = () => {
  const dispatch = useDispatch()
  const [isLoginPage, setIsLoginPage] = useState(true); 
  const [hideBestsellers, setHideBestsellers] = useState(false);
  
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: "include", 
      });
  
      const dataApi = await dataResponse.json();
  
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        toast.error(dataApi.message || "Failed to fetch user details.");
      }
    } catch (err) {
      toast.error("Failed to fetch user details. Please try again.");
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        isLoginPage,setIsLoginPage, 
        hideBestsellers,setHideBestsellers
      }}>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/loginpage' element={<LoginPage />} />
          <Route path='/signuppage' element={<SignUpPage />} />
          <Route path='/bestsellers' element={<BestSellers/>}/>
          <Route path='/productpage' element={<ProductPage/>}/>
          <Route path='/cartpage' element={<CartPage/>}/>
        </Routes>
        <Help />
      </Context.Provider>
    </>
  )
}

export default App;
