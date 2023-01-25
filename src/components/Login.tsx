import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Login = () => {

  const [input, setInput] = useState({ email: "", password: "" });
  const collectionRef = collection(db, 'users')

 const provider = new GoogleAuthProvider();

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
.then(() => {
  addDoc(collectionRef,{
    email: input.email
  })
  })
  .catch(error => alert(error.message))
}


const handleChange = (e) => {
  setInput((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   let email = input.email.toLowerCase().trim();
  //   let password = input.password;
  //   auth
  //   .signInWithEmailAndPassword(email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user;
  //     console.log(`Logged in with: ${user.email}`)
  // })
  //   .catch(error => alert(error.message))
  // }

  const signInWithGoogle = () => {
  const Auth = getAuth();
  signInWithPopup(Auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


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
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </>
  )
}

export default Login
