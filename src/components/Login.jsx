//https://reactstrap.github.io/?path=/docs/components-forms--input
import { Label } from "@heroui/react";
import { InputGroup } from "@heroui/react";
import { TextField } from "@heroui/react";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import { login } from "../api";



export const Login = ({setIsLoggedIn}) => {
  const [username,setUsername]=useState('')
  const [pw,setPw]=useState('')
  const [message, setMessage] = useState('');

    const handleLogin = async () => {
          try {
            const data = await login(username, pw);
            setMessage(data.message);
            //
            
            console.log(data);
            setIsLoggedIn(data.success)
        } catch (error) {
            setMessage(error.response?.data?.message || 'Nem sikerült kapcsolódni a szerverhez.');
        }
    };


  return (
   <div className="max-w-md
   
   m-auto p-4 bg-indigo-400 rounded-2xl">
      <TextField fullWidth name="email">
        <Label>Felhasználónév:</Label>
        <InputGroup fullWidth>
         
          <InputGroup.Input  onChange={(e)=>setUsername(e.target.value)}/>
        </InputGroup>
      </TextField>
      <TextField fullWidth name="password">
        <Label>Jelszó</Label>
        <InputGroup fullWidth>
          <InputGroup.Input placeholder="Enter password" type="password"   onChange={(e)=>setPw(e.target.value)}/>
         
        </InputGroup>
      </TextField>
      <Button className="m-4 bg-indigo-950" onClick={()=>handleLogin()}>Belépés</Button>
      <div>{message}</div>
  </div>  
  );
};
 