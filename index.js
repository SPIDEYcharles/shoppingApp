// import { multiply } from "./functions"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopground-86ae1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const itemsinDB = ref(dataBase, "items")


let btn = document.getElementById("add-button")
let input = document.getElementById("input-field")
let listofitems = document.getElementById("lists")



btn.addEventListener("click", function () {

    let valuein = input.value

    push(itemsinDB, valuein)

    clearitems()

})


onValue(itemsinDB, function (snapshot) {
    if (snapshot.exists()) {
        let arrayitems = Object.entries(snapshot.val())

        clearshoppinglistdata()

        for (let i = 0; i < arrayitems.length; i++) {
            let currentItem = arrayitems[i]
               let currentitemId = currentItem[0]
               let currentitemName = currentItem[1]
            appendlist(currentItem)
        }
    }
    else {
        listofitems.innerHTML = "No items added"
    }
})

function clearshoppinglistdata() {
    listofitems.innerHTML = ""
}


function clearitems() {
    input.value = ""
}


function appendlist(additem) {

    let itemId = additem[0]
    let itemName = additem[1]

    // listofitems.innerHTML += `<li>${itemName}</li>`
    let newlists = document.createElement("li")
    newlists.classList.add("newli")
    newlists.textContent = itemName


    newlists.addEventListener("click", function () {
        let locationOfItem = ref(dataBase, `items/${itemId}`)
        remove(locationOfItem)
    })
    listofitems.append(newlists)

}