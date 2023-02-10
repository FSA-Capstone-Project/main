import React, { useEffect, useState } from "react";
import "./chat.css";

import { db, app, auth } from "../../firebase";
import {
  positive_words,
  negative_phrases,
  negative_words,
  positive_phrases,
} from "./chatSeed";
import { doc } from "firebase/firestore";
import { makeStyles } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

const blue = "#2196f3";
const gray = "#9e9e9e";
const red = "#ff5252";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blueButton: {
    backgroundColor: blue,
    color: "white",
  },
  redButton: {
    backgroundColor: red,
    color: "white",
  },
  disabled: {
    backgroundColor: gray,
    color: "black",
  },
};

function Voice(props) {
  // const classes = useStyles();
  const [active, setActive] = useState(false);

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userHabits, setUserHabits] = useState([]);

  const [userSuccessRecord, setUserSuccessRecord] = useState([]);
  const [userInProgress, setUserInProgress] = useState([]);

  const [messageReceived, setMessageReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("");

  async function fetchUserInfo() {
    const userInfo = await db
      .collection("users")
      .doc(`${auth.currentUser.email}`);
    const data = await userInfo.get();
    setUserInfo(data.data());
  }

  async function fetchUserHabits() {
    const habits = [];
    const userHabits = await db
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits");
    const data = await userHabits.get();
    data.forEach((doc) => {
      let habit = {
        id: doc.id,
        title: doc.data().title,
        goal: doc.data().goal,
        progress: doc.data().progress,
      };
      // console.log(habit)
      habits.push(habit);
      // console.log(habits)
      setUserHabits(habits);
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

  function fetchSeedContent(array) {
    let randomWords = [];
    while (randomWords.length < 3) {
      let randomIndex = Math.floor(Math.random() * array.length);
      let randomWord = array[randomIndex];
      if (!randomWords.includes(randomWord)) {
        randomWords.push(randomWord);
      }
    }
    return randomWords.join(" ");
  }
  async function messageDispatch() {
    const messageSeed = {};
    const user = userInfo;

    const positive = fetchSeedContent(positive_words);
    const negative = fetchSeedContent(negative_words);
    const negativePhrase = fetchSeedContent(negative_phrases);
    const positivePhase = fetchSeedContent(positive_phrases);

    const positiveWord =
      positive_words[Math.floor(Math.random() * positive_words.length)];

    const currentTime = new Date();

    // setMessage(localUser.name + " " + localUser.reinforcement + " " + positive + " " + positivePhase)
    setMessage(user);
    // console.log(message)
    console.log(user.reinforcement, "localUser");
  }

  useEffect(() => {
    fetchUserInfo();
    fetchUserHabits();
    userSuccessRecords();
  }, []);

  useEffect(() => {
    messageDispatch();
  }, [userInfo]);

  useEffect(() => {
    setLoading(false);
  }, [response]);

  function fetchVoiceOfWisdom() {
    console.log(JSON.stringify({ message }), "message JSON");
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
    userSuccessRecords();
    fetchVoiceOfWisdom()
    messageDispatch();
  };

  const handleClick = (mood) => {
    // e.preventDefault();
    setActive((prev) => !prev);
    setLoading(true);
    handleSubmit();
    // console.log(e.target)
    setMood(mood)
    console.log(mood)
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
      <div>
        <h4 style={{ color: "blue" }}>{response}</h4>
      </div>
      <div>
        <button style={{ border: "solid black" }} onClick={handleSubmit}>
          Inspire Me
        </button>
        <div style={styles.root}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <button
                style={active ? styles.disabled : styles.blueButton}
                onClick={() => { handleClick("nice");}}
                disabled={active}
              >
                Nice
              </button>
              <button
                style={active ? styles.disabled : styles.redButton}
                onClick={() => {handleClick("mean")}}
                disabled={active}
              >
                Mean
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Voice;
