import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const submitBtn = document.getElementById("submit-btn")
const messageField = document.getElementById("message")
const endorsementsListEl = document.getElementById("endorsements-list")

const firebaseConfig = {
  databaseURL: "https://endorsement-board-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

onValue(endorsementListInDB, function(snapshot) {
  if (snapshot.exists()) {
    const endorsementListArr = Object.values(snapshot.val())
    endorsementsListEl.innerHTML = ""
    for (let i = 0; i < endorsementListArr.length; i++) {
      // console.log(endorsementListArr[i])
      appendToEndorsementList(endorsementListArr[i])
    }
  } else {
    endorsementsListEl.innerHTML = `
      <p class="white-text">No endorsements yet</p>
    `
  }

})

submitBtn.addEventListener("click", function() {
  const messageValue = messageField.value
  messageField.value = ""
  push(endorsementListInDB, messageValue)
})

function appendToEndorsementList(message) {
  endorsementsListEl.innerHTML += `
  <li class="endorsement">
    <p class="endorsement-text">${message}</p>
  </li>
  `
}