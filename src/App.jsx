import { useState } from 'react'
import './App.css'
import ChatBox from './Chatbox/ChatboxHome'
// import dotenv from 'dotenv'

function App() {
  const [count, setCount] = useState(0)
  // dotenv.config()
  return (
    <ChatBox />
  )
}

export default App
