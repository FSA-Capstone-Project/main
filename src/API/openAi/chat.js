import React, { useEffect, useState } from "react";
import "./chat.css";

import { db, app, auth , doc, onSnapshot} from "../../firebase";

function Voice(props) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userHabits, setUserHabits] = useState([]);
  const [userSuccess, setUserSuccess] = useState(null);

  async function fetchUserInfo() {
    const userInfo = await db.collection("users").doc(`${auth.currentUser.email}`);
    const data = await userInfo.get();
    setUserInfo(data.data());
    console.log(userInfo)
  }

  async function fetchUserHabits() {
    const habits = [];
    const userHabits = await db.collection("users").doc(`${auth.currentUser.email}`).collection("habits");
    const data = await userHabits.get()
      data.forEach((doc) => {
      let habit = {
        id: doc.id,
        title: doc.data().title,
        goal: doc.data().goal,
        progress: doc.data().progress,
      }
        console.log(habit)
        habits.push(habit)
        console.log(habits)
        setUserHabits(habits)

      });

  }

   async function fetchUserSucess() {
    console.log('fetching user success')
     const userSuccess = await db
       .collection("users")
       .doc(`${auth.currentUser.email}`)
       .collection("habits")
       .where("progress", ">=", "goal");
       userSuccess.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUserSuccess(doc.data())
        // console.log('doc in',doc)
      });
      console.log('FETCHED user success')
       })

  }


  useEffect(() => {
    fetchUserInfo();
    fetchUserHabits();
    fetchUserSucess();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userSuccess)
    console.log(userHabits)
    console.log(userInfo)
    fetch("http://localhost:3002/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
      });
  };

  return (
    <div className="Chat">
      <form onSubmit={handleSubmit}>
        <label>Tell me how do you want me to talk to you today</label>
        <input
          type="text"
          value={props.name}
          onChange={(e) => setMessage(e.target.value)}
        />
              <button type="submit">Submit</button>
          </form>
          <br />
          <button onClick={handleSubmit}>Inspire Me</button>
      <h4 style={{ color: "blue" }}>{response}</h4>
    </div>
  );
}

export default Voice;
