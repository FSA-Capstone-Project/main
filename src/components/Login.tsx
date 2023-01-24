import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [input, setInput] = useState({ email: "", password: "" });

 const navigate = useNavigate();

 const handleSignUp = (e) => {
  e.preventDefault()
  let email = input.email.toLowerCase().trim();
  let password = input.password;
  auth
  .createUserWithEmailAndPassword(email, password)
  .then(userCredentials => {
    const user = userCredentials.user;
    console.log(`Registered with: ${user.email}`)
})
  .catch(error => alert(error.message))
}

const handleChange = (e) => {
  setInput((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

  // const handleLogin = () => {
  //   auth
  //   .signInWithEmailAndPassword(email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user;
  //     console.log(`Logged in with: ${user.email}`)
  // })
  //   .catch(error => alert(error.message))
  // }

  return (
    <>
    <form onSubmit={handleSignUp}>
        <h1>Sign In</h1>
        <div>
          <input
            name="email"
            placeholder="Email"
            type="text"
            onChange={handleChange}
            value={input.email}
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={input.password}
            type="password"
          />
        </div>
          <button title="signUp" type="submit">
            Sign Up
          </button>
      </form>
    </>
  )


}

export default Login
