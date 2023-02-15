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

  const [userCompletedHabits, setUserCompletedHabits] = useState([]);
  const [userInProgress, setUserInProgress] = useState([]);
  const [userPastDue, setUserPastDue] = useState([]);

  const [messageReceived, setMessageReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(userInfo.reinforcement);

  // Banner Section
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerMessageSeed, setBannerMessageSeed] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  const [pastResponses, setPastResponses] = useState([]);

  async function fetchUserInfo() {
    const userInfo = await db
      .collection("users")
      .doc(`${auth.currentUser.email}`);
    const data = await userInfo.get();
    setUserInfo(data.data());
    return data.data();
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
      habits.push(habit);
      setUserHabits(habits);
    });
  }

  async function userSuccessRecords() {
    const completedHabits = [];
    const inProgressHabits = [];
    const pastDueHabits = [];
    const today = new Date();
    const querySnapshot = await db
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits")
      .get();

    querySnapshot.forEach((doc) => {
      const habit = doc.data();
      if (habit.progress >= habit.goal) {
        completedHabits.push(habit);
      }
      if (habit.due.toDate() < today) {
        pastDueHabits.push(habit);
      } else {
        inProgressHabits.push(habit);
      }
    });

    setUserCompletedHabits(completedHabits);
    setUserInProgress(inProgressHabits);
    setUserPastDue(pastDueHabits);
    console.log(userPastDue, " USER pastDueHabits");
  }

  // useEffect(() => {
  //   async function fetchBannerMessage() {
  //     console.log("fetchBannerMessage");
  //   let aIBannerMessageSeed = "";

  //   const currentHour = new Date().getHours();
  //   if (currentHour >= 5 && currentHour < 12) {
  //     setTimeOfDay ("morning, so greet accordingly and assume the athlete is in talking to you in this moment, and you are setting up the mood for the rest of the day.");
  //   } else if (currentHour >= 12 && currentHour < 18) {
  //     setTimeOfDay("afternoon, so greet accordingly and assume the athlete is in talking to you in this moment, let the athlete know that half of the day is over and address that some kind of progress has to be made towards completing the training goal, so there is less to catch up later.");
  //   } else {
  //     setTimeOfDay("evening, greet accordingly and assume the athlete is in talking to you in this moment, let the athlete know that the day is almost over, and provide some kind of encouragement to complete the training goal. and state that you hope that the athlete did some work toward the goal during the day.");
  //   }

  //   if (userPastDue.length > 0)
  //   {
  //     aIBannerMessageSeed = await `Assume you are the training coach for an athlete. The athlete's name is ${userInfo.name} You are training the athlete to ${userPastDue[0].title} and ${userInfo.name} has failed to achive the training goal. It is now ${timeOfDay}. (OpenAi: assume that the person reading this message is best motivated to give his/her best troung ${mood} words. Ensure your responses is fluid and consise and uses the ${mood}est phrases. limit the response to 240 characters. Ensure that you never use the same response twice.)`;
  //     await setMessage(aIBannerMessageSeed);

  //     console.log("past due banner message", aIBannerMessageSeed);
  //   }
  //   // if (userCompletedHabits.length > 0) {
  //   //   setBannerMessage("You have completed a habit!");
  //   // } else if (userPastDue.length > 0) {
  //   //   setBannerMessage("You have a past due habit!");
  //   // } else if (userInProgress.length > 0) {
  //   //   setBannerMessage("You have a habit in progress!");
  //   // } else {
  //   //   setBannerMessage("You have no habits!");
  //   // }

  //   }
  //   fetchBannerMessage();
  // }, [userInProgress, userPastDue, userCompletedHabits])

  useEffect(() => {
    async function fetchBannerMessage() {
      console.log("fetchBannerMessage");
      setMood(userInfo.reinforcement);
      console.log(userInfo, "userInfo from fetchBannerMessage");
      // console.log(mood, 'mood from fetchBannerMessage')
      let bannerMood = "";
      let motivationalPhrases = "";
      if (userInfo.reinforcement === "negative") {
        bannerMood =
          "only use negative words, harsh and aggressive words, and words that are not encouraging. AVOID using positive words, encouraging words, and words that are not harsh or aggressive.";
        motivationalPhrases = fetchSeedContent(negative_phrases);
      } else {
        bannerMood =
          "only use positive words, encouraging words, and words that are not harsh or aggressive. AVOID using negative words, harsh and aggressive words, and words that are not encouraging.";
      }
      const currentHour = new Date().getHours();
      let timeOfDay = "";
      if (currentHour >= 5 && currentHour < 12) {
        timeOfDay =
          "morning, so greet accordingly and assume the athlete is in talking to you in this moment, and you are setting up the mood for the rest of the day.";
      } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay =
          "afternoon, so greet accordingly and assume the athlete is in talking to you in this moment, let the athlete know that half of the day is over and address that some kind of progress has to be made towards completing the training goal, so there is less to catch up later.";
      } else {
        timeOfDay =
          "evening, greet accordingly and assume the athlete is in talking to you in this moment, let the athlete know that the day is almost over, and state that you hope that the athlete did some work toward the goal during the day.";
      }

      const promises = [];
      if (userPastDue.length > 0) {
        const promise = new Promise(async (resolve, reject) => {
          const aIBannerMessageSeed =
            // await `${bannerMood} , Assume you are the training coach for an athlete. The athlete's name is ${userInfo.name} You are responsable for training the athlete to ${userPastDue[0].title} and ${userInfo.name} has failed to achive or complete the training goal. It is now ${timeOfDay}. Assume the reader is receiving this via an app, and has no way to respond to yuo. (OpenAi: assume that the person reading this message is best motivated to give his/her best troung ${bannerMood} words. Ensure your responses is fluid and consise and uses the ${bannerMood}est phrases. limit the response to 280 characters. Ensure that you NEVER use the same response twice. Also, dont make yoursel available to the reader, just direct to the app)`;

            ` Assume you are a virtual coach for a non-human that who only understands reverse pschology , specially when the real meaning of the words is harsh and agressive. You communicate with ${userInfo.name} via an app, and ${userInfo.name} has failed to complete the training goal. It is now ${timeOfDay}. Use phrases like ${motivationalPhrases} to generate your response, since ${bannerMood}. Ensure Messages are always unique and dont exceed 120 characters. Also, dont make yoursel available to the reader, just direct to the app)`;
          setMessage(aIBannerMessageSeed);
          // console.log("past due banner message", aIBannerMessageSeed);
          resolve(aIBannerMessageSeed);
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then((results) => {
          console.log("all promises resolved", results);
        })
        .catch((error) => {
          console.log("promise rejected", error);
        });
    }
    fetchBannerMessage();
  }, [userInfo]);

  //userInProgress, userPastDue, userCompletedHabits

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
    // setMessage(user);
    // console.log(message)
    console.log(user.reinforcement, "localUser");
  }

  useEffect(() => {
    fetchUserInfo();
    fetchUserHabits();
    userSuccessRecords();
  }, []);

  useEffect(() => {
    setMood(userInfo.reinforcement);
    // fetchBannerMessage();
    // console.log(message, "message");
    // messageDispatch();
  }, [userInfo]);

  useEffect(() => {
    setLoading(false);
  }, [response]);

  async function fetchVoiceOfWisdom() {
    console.log(userHabits, "from fetchVoiceOfWisdom");
    const habitStr = JSON.stringify(userHabits);
    const usedPhrases = JSON.stringify(pastResponses);
    console.log(usedPhrases, "usedPhrases")
    console.log(habitStr, "from fetchVoiceOfWisdom");
    fetch("http://localhost:3002/text-completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({habitStr, usedPhrases}),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        setPastResponses([...pastResponses, data.message]);
      });
  }

  // function fetchVoiceOfWisdom() {
  //   console.log(message, 'from fetchVoiceOfWisdom');
  //   fetch("http://localhost:3002/text-completion", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setResponse(data.message);
  //     });
  // }

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

    console.log(userHabits, "userHabits from handleSubmit");
    fetchVoiceOfWisdom();
    // messageDispatch();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setActive((prev) => !prev);
    setLoading(true);
    handleSubmit();
    setMood(mood);
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
                onClick={() => {
                  handleClick();
                  setMood("nice");
                }}
                disabled={active}
              >
                Nice
              </button>
              <button
                style={active ? styles.disabled : styles.redButton}
                onClick={() => {
                  handleClick();
                  setMood("mean");
                }}
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
