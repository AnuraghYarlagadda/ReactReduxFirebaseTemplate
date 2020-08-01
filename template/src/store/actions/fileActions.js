import { setAlert } from "./alertActions";
export const uploadFile = (file, setProgress, setLoading) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    var metadata = {
      contentType: file.type,
    };
    console.log(file.name);
    var uploadTask = storageRef.child(file.name).put(file, metadata);
    await uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
          default:
        }
      },
      function (error) {
        dispatch(setAlert(error.code, "error"));
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setLoading(false);
          dispatch(setAlert("File Uploaded!", "dark"));
        });
      }
    );
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const getDownloadURL = (fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    const res = await storageRef.child("IMG_9525.MOV").getDownloadURL();
    return res;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const deleteFile = (fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    const res = await storageRef.child("IMG_9525.MOV").delete();
    return res;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const listFiles = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    var files = [];
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    // Find all the prefixes and items.
    const res = await storageRef.listAll();
    res.items.forEach((itemRef) => {
      files.unshift(itemRef.location.path);
    });
    return files;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};
