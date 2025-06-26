import { useState } from 'react'
import './App.css'
import { Toolbar } from '@mui/material';
import NavBar from './components/NavBar';
import { useLoaderData, Outlet } from 'react-router-dom';





function App() {

  return (
    <>
      < NavBar />
      < Toolbar />
        <Outlet /> 
      {/* router -> home page or customer overview  */}
      {/* <CustomerOverviewPage /> */}
      {/* < UsersListCard /> */}
    </>
  )

}

export default App




