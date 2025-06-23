import { useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CustomerCard from './components/CustomerCard';
import customerData from './tests/MOCK_DATA.json';




console.log(customerData);
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    {customerData.map((item, index) => (<CustomerCard key={index} customer = {item} />))}
      

    </>
  )
}

export default App
