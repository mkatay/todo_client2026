

import React from 'react'
import { useState } from 'react'
//import { todosData } from '../data'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'
import { useEffect } from 'react'
import { addTodo, deleteTodo, readTodos, updateTodo } from '../api'
import { Spinner } from '@heroui/react'
import { Message } from './Message'

export const MyTodos = ({setIsLoggedIn}) => {
  const [todos, setTodos] = useState(null)
  const [remaining, setRemaining] = useState(0);
  const [message, setMessage] = useState(null)

 useEffect(() => {
  readTodos().then(setTodos)
 }, [])
 
todos && console.log(todos);


  useEffect(() => {
    if(!todos) return
    const count = todos.filter(todo => !todo.complete).length;
    setRemaining(count);
}, [todos]);

const handleDelete = async (id) => {
    const data = await deleteTodo(id);
    console.log(data.msg);
    setMessage(data.msg)
    //setTimeout(() => setMessage(""), 1000);
    setTodos(prev => prev.filter(todo => todo.id !== id));
};

  const handleDone=async (id)=>{
    const data = await updateTodo(id);
    setTodos(prev=>prev.map(obj=>obj.id==id? {...obj,complete:!obj.complete} : obj))
    console.log(data.msg);
    setMessage(data.msg)
  }
  const handleAdd=async (task)=>{
    const data = await addTodo({task});
    setMessage(data.msg);
    //setTimeout(() => setMessage(""), 1000);
    readTodos().then(setTodos);
  }

  return (
    <div>
      <NewTodo handleAdd={handleAdd}/>
      <ul className='flex flex-col gap-3 shadow max-w-3xl m-auto shadow-indigo-50 mt-4'>
        {todos ? todos.map(({id,task,complete})=>
        <li key={id} className='flex justify-between p-5 border-b-2'>
          <Button isIconOnly variant="tertiary"  onClick={()=>handleDone(id)} style={{background:complete ? 'green': 'gray'}}>
           <MdDoneOutline />
          </Button>

          <div style={{textDecoration: complete ? "line-through" :""}}>{task}</div>

          <Button isIconOnly aria-label="Delete" variant="danger" onClick={()=>handleDelete(id)}>
            <FaTrash />
          </Button>
        </li>
        ) :
        <Spinner/>}
      </ul>
      <div className="max-w-3xl m-auto p-4 font-bold">
         {remaining>0 ? `Elvégzetlen feladatok:${remaining}`:'Nincs több teendő.'}
      </div>
    {/*azért ne tároljunk feleslegesen származtatott adatot state-ben!!!
     <div>
        Elvégzetlen feladatok: {todos.filter(todo => !todo.done).length}
      </div> 
      */}

      <Button   style={{position:"fixed",top:"5px",right:"5px"}} onClick={()=>setIsLoggedIn(false)} >
          Logout
      </Button>
     {/* <div className='text-center animate-ping text-xl'>{message}</div>*/}
      <Message message={message}/>
    </div>
  )
}


