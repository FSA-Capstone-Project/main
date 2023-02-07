import React, { useState } from "react";
import { auth, app, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

import { Button, Box } from "@mui/material";

const ImageUploader = () => {

    const user = auth.currentUser

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };

      const handleSubmit = () => {
        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image)
          .then(() => {
            getDownloadURL(imageRef)
              .then((url) => {
                setUrl(url);
                console.log("URL", url)
                updateProfile(user, {
                    photoURL: `${url}`
                  })
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
          <input type="file" onChange={handleImageChange} style={{color:'#94a1b2', paddingLeft:'3rem'}} />

        <Button variant="contained" onClick={handleSubmit} sx={{m:'2rem'}}>Submit</Button>
    </Box>
)
}

export default ImageUploader


