import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Message } from './components/Message'

function App() {
  const [socket,setSocket] = useState<null | WebSocket>(null)
  const [chat,setChat] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  function sendMessage() {
    const message : string = inputRef.current!.value
    socket?.send(message)
    inputRef.current!.value = ""
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080")
    socket.onopen = () => {
      setSocket(socket)
    }
    socket.onmessage = (message : { 
      data : string
    }) => {
      setChat((chat) => [...chat,message.data])
    }
    () => {
      socket.close()
    }
  },[])

  if(!socket) {
    return <>
      connecting to socket...
    </>
  }

  return <>
    <div className='h-screen bg-black flex justify-center items-center'>
      <div className='p-4 bg-gray-300 text-gray-700 w-full max-w-screen-sm rounded-lg'>
        <p className='font-mono underline underline-offset-4 text-3xl text-center mb-5'>
          Group Chat
        </p>
        <div className='min-h-96 max-h-96 overflow-y-auto'>
          <div className='text-white flex-row space-y-2'>
            {chat.map((msg) => <Message data={msg}/>)}
          </div>
        </div>
        <div className='mt-4 flex items-center'>
          <input autoFocus ref={inputRef} onKeyDown={(press) => (press.key == "Enter" && sendMessage())} 
          className="w-full rounded-lg p-2" type="text" placeholder='Enter your message'/>
          <button onClick={sendMessage} className='bg-white rounded-lg p-2 border ml-2'>
            <SendIcon /> 
          </button>
        </div>
      </div>
    </div>
  </>
}

function SendIcon() {
  return <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  </>
}

export default App
