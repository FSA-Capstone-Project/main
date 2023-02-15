import React from "react";
import { db, auth } from "../../firebase";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const AiBanner = () => {
  const [response, setResponse] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userHabits, setUserHabits] = useState([]);

  const [pastResponses, setPastResponses] = useState([]);

  async function fetchUserInfo() {
    const userInfo = db.collection("users").doc(`${auth.currentUser.email}`);
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
      habits.push(habit);
      setUserHabits(habits);
    });
  }

  async function aIBannerLine() {
    const habitStr = JSON.stringify(userHabits);
    const usedPhrases = JSON.stringify(pastResponses);
    const user = JSON.stringify(userInfo.name);
    fetch("http://localhost:3002/text-completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitStr, usedPhrases, user }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        setPastResponses([...pastResponses, data.message]);
      });
  }

  useEffect(() => {
    fetchUserInfo();
    fetchUserHabits();
  }, []);

  useEffect(() => {
    aIBannerLine();
  }, [userHabits]);

  const handleRefresh = (e) => {
    e.preventDefault();

    aIBannerLine();
  };

  return (
    <Button
      onClick={handleRefresh}
      style={{
        maxWidth: "1200px",
        maxHeight: "100px",
        minWidth: "600px",
        minHeight: "30px",
        color: "white"
      }}
    >
      {response}
    </Button>
  );
};

export default AiBanner;
