// create a react component that will render a div with class name "AiBanner", and then render the AiBanner component inside of it. this will use mateiral ui to render the banner using a <Box></Box>.

import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { db, app, auth } from "../../firebase";
import { useEffect, useState } from "react";
import textAiCall from "../../API/openAi/aICall";

const AiBanner = () => {
  const [response, setResponse] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [messageAi, setMessageAi] = useState("");

  const [loading, setLoading] = useState(true);

  async function fetchUserInfo() {
    const userInfo = db
      .collection("users")
      .doc(`${auth.currentUser.email}`);
    const data = await userInfo.get();
    setUserInfo(data.data());
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [userInfo]);

  return (
    <Box>
      {loading ? (
        <Box sx={{ width: "10%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <h2 style={{ color: "blue" }}>{userInfo.name}</h2>
      )}
    </Box>
  );
};

export default AiBanner;
