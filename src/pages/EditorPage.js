import React, { useEffect } from 'react';
import { useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initsocket } from '../socket';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ACTIONS = require('../Actions');




const EditorPage = () => {
  const socketref = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate(); 
  const {roomId} = useParams();

  useEffect(  () => {
      
    async function connect() {
     socketref.current = await initsocket();
     socketref.current.on('connect error', (err) => handlleError(err));
     socketref.current.on('connect_failed', (err) => handlleError(err));


     function handlleError(err) {
       console.log('socket error' ,err);
       toast.error('Socket Error');
       reactNavigator('/');
     }
     socketref.current.emit(ACTIONS.JOIN , { 

      roomId,
      username: location.state?.username,
     });

    // for  JOINED

    socketref.current.on(ACTIONS.JOINED, ({clients, username, socketId}) => {
      if(username !== location.state?.username) 
      {
        toast.success(`${username} joined the room`);
        console.log(`${username} joined the room`);
      }
      setClients(clients);
    });


    // for DISCONNECTED

    socketref.current.on(ACTIONS.DISCONNECTED, ({socketId, username}) => {
      toast.error(`${username} left the room`);
      console.log(`${username} left the room`);
      setClients((prevClients) => {
        return prevClients.filter((client) => client.socketId !== socketId);
      });
    });

    }
    connect();

    return () => {
      if (socketref.current) {
        socketref.current.disconnect();
        socketref.current.off(ACTIONS.JOINED);
        socketref.current.off(ACTIONS.DISCONNECTED);
      }
    };

  }, [location.state?.username, roomId]);




  const [clients, setClients] = useState([]);

  if(!location.state?.username) {
    return <Navigate to='/'/>
  }

 
  

  return (
    <div className='mainWrap flex text-white h-screen'>
      <div className="aside w-1/5">
        <div className="asideInner justify-center items-center flex flex-col h-screen">
          <div className="logo mb-5">
            <img src={process.env.PUBLIC_URL + '/logo.ico'} alt="" className="image" />
          </div>
          <div className="font-semibold mt-2 mb-2">Connected</div>
          <div className="clientsListt flex flex-col space-y-2 overflow-y-auto h-3/5  max-h-max">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <div className="mt-auto flex flex-col w-1/2 max-w-xl">
            <button className="bg-amber-800 text-white p-2 rounded-lg mb-2">Copy Room</button>
            <button className="bg-red-600 text-white p-2 rounded-lg mb-2">Leave Room</button>
            
          </div>
        </div>
      </div>
      <div className="editor w-4/5 p-4">
      
        <Editor/>
      </div>
    </div>
  );
};

export default EditorPage;
