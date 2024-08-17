// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore,doc,setDoc, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOh_hoZticB9fL8EkrIhYqrynaobSYJGQ",
  authDomain: "new-work1122.firebaseapp.com",
  projectId: "new-work1122",
  storageBucket: "new-work1122.appspot.com",
  messagingSenderId: "550003345574",
  appId: "1:550003345574:web:b0e347791625ab99cb8c67",
  measurementId: "G-3R7LHKRX6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore(app);

let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");

window.signupUser = () => {
    let obj = {
        email: email.value,
        password: password.value,
        username: name.value
    }
    console.log(obj);
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
        obj.id = res.user.uid;
        obj.userType = "user";
        delete obj.password;
  
        const refernce = doc(db, "users", obj.id);
        setDoc(refernce, obj)
          .then(() => {
            const userObj = JSON.stringify(obj);
            localStorage.setItem("user", userObj);
            window.location.replace("../../index.html");
            alert("Signup successfully")
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
    }