import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-df319-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()

    appendItemToShoppingListEl(inputValue)
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    
    // Challenge: Write a for loop to iterate on itemsArray and console log each item
    for (let i = 0; i < itemsArray.length; i++) {
        // Challenge: Use the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
        
        appendItemToShoppingListEl(itemsArray[i])
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}