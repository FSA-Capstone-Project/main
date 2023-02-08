import React, { useEffect, useState } from "react";
import "./chat.css";

import { db, app, auth } from "../../firebase";
import { positive_words, negative_phrases, negative_words, positive_phrases } from "./chatSeed";
import { doc } from "firebase/firestore";



function Voice(props) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userHabits, setUserHabits] = useState([]);

  const [userSuccessRecord, setUserSuccessRecord] = useState([]);
  const [userInProgress, setUserInProgress] = useState([]);


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
        // console.log(habit)
        habits.push(habit)
        // console.log(habits)
        setUserHabits(habits)

      });

  }

  async function userSuccessRecords() {
    const successHabits = [];
    const inProgressHabits = [];
    const querySnapshot = await db
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits")
      .get();

    querySnapshot.forEach((doc) => {
      const habit = doc.data();
      if (habit.progress >= habit.goal) {
        successHabits.push(habit);
      } else {
        inProgressHabits.push(habit);
      }
    });

    console.log(successHabits);
    console.log(inProgressHabits);
    setUserSuccessRecord(successHabits);
    setUserInProgress(inProgressHabits);
  }

  async function messageDispatch() {

    const messageSeed = {}
    const positive = positive_words[Math.floor(Math.random() * positive_words.length)]
    const negative = negative_words[Math.floor(Math.random() * negative_words.length)]
    const negativePhrase = negative_phrases[Math.floor(Math.random() * negative_phrases.length)]
    const positivePhase = positive_phrases[Math.floor(Math.random() * positive_phrases.length)];
    const localUser = userInfo
    // setMessage(localUser.name + " " + localUser.reinforcement + " " + positive + " " + positivePhase)
    setMessage(localUser)
    // console.log(message)
  }



  useEffect(() => {
    fetchUserInfo()
    fetchUserHabits()
    userSuccessRecords()
  }, []);

  useEffect(() => {
    messageDispatch()
  }, [userInfo]);

  function fetchVoiceOfWisdom() {
    console.log(JSON.stringify({ message }) , "message JSON")
    fetch("http://localhost:3002/text-completion", {
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
  }


  // function fetchVoiceOfWisdom(userInfo, userProgress, currentTime) {
  //   fetch("http://localhost:3002/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userInfo, userProgress, currentTime }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setResponse(data.message);
  //     });
  // }
      const handleSubmit = (e) => {
        e.preventDefault();
        userSuccessRecords()
        fetchVoiceOfWisdom()
        // messageDispatch()
    // console.log(userHabits)
    // console.log(userInfo)
    // console.log(message)
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
