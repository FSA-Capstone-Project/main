import React, { useEffect, useState } from "react";
import "./chat.css";

import { db, app, auth } from "../../firebase";
import { positive_words, negative_phrases, negative_words, positive_phrases } from "./chatSeed";



function Voice(props) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userHabits, setUserHabits] = useState([]);


  async function fetchUserInfo() {
    const userInfo = await db.collection("users").doc(`${auth.currentUser.email}`);
    const data = await userInfo.get();
    setUserInfo(data.data());
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

  async function messageDispatch() {

    const messageSeed = {}
    const positive = positive_words[Math.floor(Math.random() * positive_words.length)]
    const negative = negative_words[Math.floor(Math.random() * negative_words.length)]
    const negativePhrase = negative_phrases[Math.floor(Math.random() * negative_phrases.length)]
    const positivePhase =
      positive_phrases[Math.floor(Math.random() * positive_phrases.length)];
    const localUser = userInfo
    // const localHabits = userHabits
     console.log(positive)
     console.log(negative)
     console.log(negativePhrase)
     console.log(positivePhase)
    console.log(localUser.reinforcement);
    // console.log(userHabits[0].id)

    // setMessage(localUser.name + " " + localUser.reinforcement + " " + positive + " " + positivePhase)
    setMessage(localUser)
    console.log(message)
  }



  useEffect(() => {
    fetchUserInfo()
    fetchUserHabits()
  }, []);

  useEffect(() => {
    messageDispatch()
  }, [userInfo]);

      const handleSubmit = (e) => {
        e.preventDefault();
        // messageDispatch()
    console.log(userHabits)
    console.log(userInfo)
    console.log(message)
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
          // onChange={(e) => setMessage(e.target.value)}
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
