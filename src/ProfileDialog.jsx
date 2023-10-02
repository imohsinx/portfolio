import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useSnackbar } from "notistack";

export default function ProfileDialog({ user, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("imohsinx@gmail.com");
  const [address, setAddress] = useState("Andheri");
  const [phone, setPhone] = useState("8657032762");
  const [photoURL, setPhotoURL] = useState("");
  const [photo, setPhoto] = useState("null");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = async () => {
    setLoading(true);
    try {
      if (user) {
        const userDocRef = await doc(
          collection(getFirestore(app), "users"),
          user.uid
        );

        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        if (userData) {
          setName(userData.name || "");
          setAddress(userData.address || "");
          setPhone(userData.phone || "");
          setPhotoURL(user.photoURL || "");
        } else {
          console.log("No such document!");
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      enqueueSnackbar(`Error fetching profile data: ${error}`, {
        variant: "error",
      });
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
      setPhotoURL(user.photoURL || "");
    }

    const fetchProfileData = async () => {
      try {
        if (user) {
          const userDocRef = await doc(
            collection(getFirestore(app), "users"),
            user.uid
          );

          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          if (userData) {
            setName(userData.name || "");
            setAddress(userData.address || "");
            setPhone(userData.phone || "");
            setPhotoURL(user.photoURL || "");
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [user]);

  const handleImageChange = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    setPhoto(image);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoURL(event.target.result);
    };
    reader.readAsDataURL(image);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if name only contains letters and spaces
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (name && !nameRegex.test(name)) {
      enqueueSnackbar("Name should only contain letters and spaces", {
        variant: "error",
      });
      return;
    }

    // Check if phone is a valid phone number
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
      enqueueSnackbar("Phone should be a valid 10-digit number", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      if (photo) {
        const base64String = photoURL.replace("data:", "").replace(/^.+,/, "");

        if (base64String !== photoURL) {
          const storageRef = ref(getStorage(app), "profileImages/" + user.uid);
          await uploadString(storageRef, base64String, "base64");
          const url = await getDownloadURL(storageRef);
          await updateProfile(user, { photoURL: url });
        }
      }

      await updateProfile(user, { displayName: name });

      const userRef = doc(getFirestore(app), "users", user.uid);
      await setDoc(userRef, {
        name,
        address,
        phone,
      });

      enqueueSnackbar("Successfully Updated Profile !!", {
        variant: "success",
      });
      handleClose();
    } catch (error) {
      console.log(photoURL);
      enqueueSnackbar(`Error updating profile: ${error}`, {
        variant: "error",
        autoHideDuration: "3000",
      });

      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      {loading ? <LinearProgress /> : ""}
      <DialogTitle>User Profile</DialogTitle>
      <Divider />
      <div style={{ padding: 30 }}>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <label htmlFor="photo">
            <IconButton component="span">
              {photoURL ? (
                <Avatar
                  alt={name}
                  src={photoURL}
                  style={{
                    border: "1px solid #ddd",
                    fontSize: "64px",
                    height: "120px",
                    width: "120px",
                  }}
                />
              ) : (
                <AccountCircle style={{ fontSize: "80px", color: "grey" }} />
              )}
            </IconButton>
          </label>
          <input
            type="file"
            id="photo"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          Change Profile Photo
        </Box>
        <TextField
          margin="dense"
          id="name"
          label="Full Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="phone_number"
          label="Phone Number"
          type="number"
          fullWidth
          variant="outlined"
          value={phone}
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="name"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={address}
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>

      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">
          Save Details
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
      <Divider style={{ marginBottom: "5px", marginTop: "5px" }} />
    </Dialog>
  );
}
