import React, { useEffect, useState } from "react";
import { auth, app, storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Button, Box } from "@mui/material";
import AiPhoto from "../Ai/AiPhoto";

const ImageUploader = () => {
  const user = auth.currentUser;

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0], "image file");
      setImage(e.target.files[0]);
    }
  };

  ////Richard's code

  const [userInfo, setUserInfo] = useState(null);
  const storage = getStorage();

  // // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });

  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = db.collection("users").doc(`${auth.currentUser.email}`);
      const data = await userInfo.get();
      setUserInfo(data.data());
      console.log("USER INFO", data.data());
    }
    fetchUserInfo();
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.split(" ").length >= 5) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  };

  // const [photoPath, setPhotoPath] = useState(null);

  const handleAi = (e) => {
    e.preventDefault();
    setShowInput(true);

    AiPhoto(inputValue, userInfo.email)
      .then((location) => {
        console.log(location, "location");
        const filePath = `../../src/API/openAi/img/${location}`;
        fetch(filePath)
          .then((response) => response.blob())
          .then((blob) => {
            const storageRef = ref(
              storage,
              `${auth.currentUser.email}-profileImage`
            );
            uploadBytes(storageRef, blob).then((snapshot) => {
              console.log("Uploaded a blob or file!");
              console.log(blob, "imageRef");
              console.log(storageRef, "storageRef");
            });
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // const handleAi = (e) => {
  //   e.preventDefault();
  //   setShowInput(true);
  //   const storageRef = ref(storage, `${auth.currentUser.email}-profileImage`);
  //   AiPhoto(inputValue, userInfo.email)
  //     .then((fileName) => {
  //       console.log(fileName, 'location')
  //       const imageRef = ref(storage, `../../src/API/openAi/img/${fileName}`);
  //       uploadBytes(storageRef, imageRef).then((snapshot) => {
  //         console.log("Uploaded a blob or file!");
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  useEffect(() => {
    if (image) {
      handleSubmit();
    }
  }, [image]);

  // end Richard's code

  const handleSubmit = () => {
    const imageRef = ref(storage, `${auth.currentUser.email}-profileImage`);
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

      {/* Richard's code */}
      <Box>
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
      </Box>
      {/* End of Richard's code */}
    </Box>
  );
};

export default ImageUploader;
