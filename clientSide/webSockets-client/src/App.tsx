import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState<string>('');

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestMessage(message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      {latestMessage && <h1>{latestMessage}</h1>}
    </>
  )
}

export default App