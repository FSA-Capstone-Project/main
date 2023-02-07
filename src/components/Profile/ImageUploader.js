import React, { useState } from "react";
import { auth, app, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

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
        const imageRef = ref(storage, `${auth.currentUser.email}-profileImage`);
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

<div className="App">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
)
}

export default ImageUploader