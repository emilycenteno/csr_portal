import { useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CustomerCard from './components/CustomerCard';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomerCard name = "Emily" />
      <CustomerCard name = "Erik" />
      <p>Mikey is stinky</p>
    </>
  )
}

export default App
