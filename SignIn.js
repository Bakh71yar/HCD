import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMvCCl5bXh2wWMBoBz-ZysGWrYfl7Us8o",
  authDomain: "fir-auth-project-f36df.firebaseapp.com",
  projectId: "fir-auth-project-f36df",
  storageBucket: "fir-auth-project-f36df",
  messagingSenderId: "711666172175",
  appId: "1:711666172175:web:0c7c6d5c91332e95ac3e7a",
  measurementId: "G-YCY0CWD6FQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email/Password Sign In
const signInForm = document.getElementById("signInForm");
const signInEmail = document.getElementById("signin-email");
const signInPassword = document.getElementById("signin-password");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // важно!

  const email = signInEmail.value;
  const password = signInPassword.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("You successfully signed in!");
    window.location.replace("index.html");
  } catch (error) {
    console.error(error.message);
    alert("Incorrect email or password!");
  }
});

// Google Sign In
const googleSignInButton = document.getElementById("google-signin-button");

googleSignInButton.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    setTimeout(() => {
      alert(`Signed in as ${user.displayName}`);
      window.location.replace("MainPage.html");
    }, 100);
  } catch (error) {
    console.error(error.message);
    alert("Something went wrong with Google Sign In");
  }
});
