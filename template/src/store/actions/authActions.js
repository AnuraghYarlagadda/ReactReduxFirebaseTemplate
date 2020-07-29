import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";
import { setAlert } from "./alertActions";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import "sweetalert2/src/sweetalert2.scss";

export const signUp = (newUser) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const fireStore = getFirestore();

  try {
    var res = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    await fireStore.collection("users").doc(res.user.uid).set({
      name: newUser.name,
    });
    dispatch({ type: REGISTER_SUCCESS });
    res = await fireStore.collection("users").doc(res.user.uid).get();
    Swal.fire({
      icon: "success",
      title: "Hello " + res.data().name,
      text: "Welcome to the Project😃",
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};

export const logIn = (credentials) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const { email, password } = credentials;
  const firebase = getFirebase();
  const fireStore = getFirestore();
  try {
    let res = await firebase.auth().signInWithEmailAndPassword(email, password);
    res = await fireStore.collection("users").doc(res.user.uid).get();
    dispatch({ type: LOGIN_SUCCESS });
    Swal.fire({
      icon: "success",
      title: "Hello " + res.data().name,
      text: "Welcome to the Project😃",
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};

export const logOut = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
    dispatch({ type: LOGOUT_SUCCESS });
    Swal.fire({
      icon: "info",
      title: "Log-Out Successfull!",
      text: "Visit us Back 😃",
    });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};
