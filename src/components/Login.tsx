import React, { useEffect, useState } from 'react'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 const navigate = useNavigate();

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(`Registered with: ${user.email}`)
      navigate('/home')
  })
    .catch(error => alert(error.message))
}

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(`Logged in with: ${user.email}`)
  })
    .catch(error => alert(error.message))
  }

  return (
   <>Login</>
  );

}

export default Login

