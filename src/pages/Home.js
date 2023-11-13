import React from 'react'
import {v4 as uuidv4} from 'uuid'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'




const Home = () => {
    const [roomId , setRoomId] = useState('');
    const [username , setUsername] = useState('');
    const navigate = useNavigate();


   


    const createNewRoom = (e) => {
        e.preventDefault()
        const id = uuidv4();
        setRoomId(id);
        toast.success('Room Created Successfully');
    }

    const joinRoom = () => {
      if(roomId === '' || username === '') {
          toast.error('Please fill all the fields');
          return;
      } 
      navigate(`/editor/${roomId}`, { state: { username,}});


  }

  const onClickEnter = (e) => {
    console.log(e.key);
    if(e.key === 'Enter') {
      joinRoom();
    }
  }

  return (
    <div className='flex items-center justify-center text-white h-screen'>
      <div className=" bg-stone-900 p-20 rounded-lg w-400px max-w-xl" >
        <img src={process.env.PUBLIC_URL + '/logo.ico'} alt="Logo" border="0"  className='mb-3'/>

        <h4 className='mainLabel mb-2 font-bold '> Lets Start Quickly</h4>

        <div className="inputGroup flex flex-col items-center">
            <input className ='mb-2 rounded-lg w-full p-1 text-black  text-start' type="text" placeholder=" Paste your joining code here" value={roomId} onChange={(e) => setRoomId(e.target.value)} onKeyUp={onClickEnter}/>
            <input className ='mb-2 rounded-lg w-full p-1 text-black ' type="text" placeholder=' Your Username' onChange={(e) => setUsername(e.target.value)} onKeyUp={onClickEnter}/>
            <button className="btn joinbtn bg-amber-800 p-2 rounded-xl w-20 max-w-xl mt-2 "  onClick={joinRoom}>Join</button>
            <span className="createInfo font-semibold bottom-0 mt-3">
                If you don't have a invite code then &nbsp;
                <a onClick={createNewRoom} href="#" className='text-blue-500'>Create a new room</a>
            </span>
        </div>
      </div>

      <footer className='fixed bottom-1 p-2'>
        <h4>
            Lets Code Easy with <span className="logo">CodeEasy</span>
        </h4>
      </footer>
    </div>
  )
}

export default Home
