import { useState } from 'react'
import './App.css'
import { Toolbar } from '@mui/material';
import NavBar from './components/NavBar';
import CustomerOverviewPage from './components/Customer Overview Page/OverviewPage';
import UsersListCard from './components/Home Page/UsersList';





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      < NavBar />
      < Toolbar />
      {/* router -> home page or customer overview  */}
      {/* <CustomerOverviewPage /> */}
      < UsersListCard /> 
    </>
  )

}

export default App




