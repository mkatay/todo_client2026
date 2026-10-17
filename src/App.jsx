import './App.css'
import { MyTodos } from './components/MyTodos'
import { useState } from 'react'
import { Login } from './components/Login'

function App() {
 const [isLoggedIn, setIsLoggedIn]=useState(false)

  return (
    <div className='bg-indigo-950 text-indigo-50 min-h-screen relative'>
      <h1 className='text-center font-bold text-3xl p-4 '>My todo App</h1>
       {isLoggedIn? <MyTodos setIsLoggedIn={setIsLoggedIn}/> : <Login  setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  )
}

export default App
