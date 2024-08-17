// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore,doc, getDoc,  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";



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
const auth = getAuth(app);
const db = getFirestore(app);

let email = document.getElementById("email")
let password = document.getElementById("password")

window.loginUser = () => {
    let obj = {
      email: email.value,
      password: password.value
    }
    console.log(obj);
    signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then(async (res) => {
        const id = res.user.uid;
        const refernce = doc(db, "users", id);
        const snap = await getDoc(refernce);
        if (snap.exists()) {
          localStorage.setItem("user", JSON.stringify(snap.data()));
          window.location.replace("../../index.html");
          alert("Login successfully")
  
        } else {
          alert("Data Not Found");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  
}