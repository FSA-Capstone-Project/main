import React, { useEffect, useState } from "react";
import { auth, app, storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Button, Box } from "@mui/material";
import AiPhoto from "../Ai/AiPhoto";

const ImageUploader = () => {
  const user = auth.currentUser;

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  ////Richard's code

  // const [userInfo, setUserInfo] = useState(null)

  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     const userInfo = db.collection("users").doc(`${auth.currentUser.email}`);
  //     const data = await userInfo.get();
  //     setUserInfo(data.data());
  //     console.log("USER INFO", data.data())
  //   }
  //   fetchUserInfo()
  // }, [])

  // const [inputValue, setInputValue] = useState("");
  // const [showInput, setShowInput] = useState(false);
  // const [showSubmit, setShowSubmit] = useState(false);

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   if (e.target.value.split(" ").length >= 10) {
  //     setShowSubmit(true);
  //   } else {
  //     setShowSubmit(false);
  //   }
  // };

  // const [photoPath, setPhotoPath] = useState(null);

  // const handleAi = (e) => {
  //   e.preventDefault();
  //   setShowInput(true);
  //   AiPhoto(inputValue, userInfo.email)
  //     .then((path) => setPhotoPath(path));
  // }

  // useEffect(() => {
  //   if (image) {
  //     handleSubmit();
  //   }
  // }, [image, photoPath]);

  const handleSubmit = () => {
    const imageRef = ref(storage, `${auth.currentUser.email}-profileImage`);
    console.log(image, "hopefully the path");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            console.log("URL", url);
            updateProfile(user, {
              photoURL: `${url}`,
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="file"
        onChange={handleImageChange}
        style={{ color: "#94a1b2", paddingLeft: "3rem" }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ m: "2rem" }}>
        Submit
      </Button>
      {/* <Box>
      <Button variant="contained" onClick={handleAi} sx={{ m: "2rem" }}>
        Ai Image
      </Button>
      {showInput && (
        <form onSubmit={handleAi}>
          <label>
            Enter 10 words to generate an image:
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </label>
          {showSubmit && <input type="submit" value="Generate" />}
        </form>
      )}
    </Box> */}
    </Box>
  );
};

export default ImageUploader;
