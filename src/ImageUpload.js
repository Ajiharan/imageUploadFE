import React, { useState, useEffect } from "react";
import { storage } from "./Firebase";
import axios from "axios";
const ImageUpload = () => {
  const [fileObj, setFileObj] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const uploadData = () => {
    console.log("working");
    const uploadTask = storage.ref(`eshop/${fileObj.name}`).put(fileObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progressPercentage);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        storage
          .ref(`eshop/${fileObj.name}`)
          .getDownloadURL()
          .then((res) => {
            console.log("imageUrl", res);
            axios
              .post("http://localhost:5000/image/upload", { imageUrl: res })
              .then((response) => {
                console.log("Response", response.data);
              })
              .catch((error) => {
                console.log("Error", error.response);
              });
          })
          .catch((err) => {
            console.log("Error", err);
          });
        // console.log("Completed");
      }
    );
  };

  const uploadSingleFile = (e) => {
    if (e && e.target.files && e.target.files[0]) {
      setFileObj(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className="AddProduct">
      <form>
        <div className="AddProduct__left">
          <div className="AddProduct__imageContainer mb-2">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="ProductImage"
                className="AddProduct__image img-thumbnail"
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="upload" className="AddProduct__file">
              <input
                type="file"
                id="upload"
                className="form-control"
                onChange={uploadSingleFile}
              />
            </label>
          </div>
        </div>
        <input
          type="button"
          value="submit"
          type="button"
          onClick={uploadData}
        />
      </form>
    </div>
  );
};

export default ImageUpload;
