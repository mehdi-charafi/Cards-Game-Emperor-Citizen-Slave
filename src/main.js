import './style.css'
import {nicknameValidation} from "./players.js"
import { addProfiles } from "./storage"
import {profileRendering} from "./players.js"

//Start
let profilesSection = document.querySelector("#exist-profiles")
profileRendering(profilesSection)


// Profile Creation
let iconSection = document.querySelector("#profile-icons")
let selectedIcon = ""

iconSection.addEventListener("click", (event) => {
    let icons = document.querySelectorAll(".iconify")
    let icon = event.target.closest(".iconify")
    if(!icon) return
    selectedIcon = icon.getAttribute("data-icon")
    icons.forEach((i) => {
        i.classList.remove(`border-2`, `border-amber-500/70`)
        i.classList.add(`border-2`, `border-blue-300`)
    })
    icon.classList.remove(`border-2`, `border-blue-300`)
    icon.classList.add(`border-2`, `border-amber-500/70`)
})

let form = document.querySelector("#profile-creation")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    let inputValue = document.querySelector("#profile-creation-input").value
    let submitMessage = document.querySelector("#submit-message")
    const formData = new FormData(form)
    let isValid = nicknameValidation(inputValue)
    if(inputValue == "") {
        submitMessage.textContent = ""
        return
    } 
    if(nicknameValidation(inputValue)) {
        if(selectedIcon == "") {
            submitMessage.textContent = "Choose a profile icon"
            submitMessage.style.color = "red"
            return
        }
        let newProfile = {nickname: inputValue, avatar: selectedIcon}
        addProfiles(newProfile)
        profileRendering(profilesSection)
        submitMessage.textContent = "Your profile is added!"
        submitMessage.style.color = "green"
        form.reset()

    } else {
        submitMessage.textContent = "Your username must be (3-15) characters"
        submitMessage.style.color = "red"
    }
       
    
})


