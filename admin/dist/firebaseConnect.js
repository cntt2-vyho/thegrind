var firebaseConfig = {
  apiKey: "AIzaSyAqBaq41Qu7y5LnqEmwPggFE-eIEZ5HtFU",
  authDomain: "the-grind-310.firebaseapp.com",
  databaseURL: "https://the-grind-310.firebaseio.com",
  projectId: "the-grind-310",
  storageBucket: "the-grind-310.appspot.com",
  messagingSenderId: "792340913174",
  appId: "1:792340913174:web:640dc3570e3b38a77ae937",
  measurementId: "G-58MM153CGX"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var data = firebase.database();
const dbRef = firebase.database();

async function getDataAsync(name) {
    let response = await fetch(`https://the-grind-310.firebaseio.com/${name}.json`);
    let data = await response.json()
    return data;
}