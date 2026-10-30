import './style.css'
import {loginRendering, nicknameValidation, profileRendering} from "./players.js"
import { addProfiles, removeProfiles, setActiveProfile, removeActiveProfile } from "./storage"



//Start
let profilesSection = document.querySelector("#exist-profiles")
let loginSection = document.querySelector("#login")
profileRendering(profilesSection)
loginRendering(loginSection)


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
        i.classList.add(`border-2`, `border-slate-600`)
    })
    icon.classList.remove(`border-2`, `border-slate-600`)
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


// profile removal
let profilesList = document.querySelector("#exist-profiles")
profilesList.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete-btn")) {
    let profileCard = event.target.closest(".profile-card")
    if(profileCard) {
    let profileName = profileCard.getAttribute("data-nickname")
    removeProfiles(profileName)
    profileRendering()

    }
}})


// active profile

// add active
    profilesList.addEventListener("click", (event) => {
    if(event.target.closest(".select-btn")) {
    let profileCard = event.target.closest(".profile-card")
    if(!profileCard) return
      let profiles = profilesList.querySelectorAll(".profile-card")
    profiles.forEach((p) => {
        p.classList.remove(`border-2`, `border-amber-500/70`)
        p.classList.add(`border-2`, `border-slate-600`)
        p.querySelector(".profile-avatar").classList.remove(`border-2`, `border-amber-500/70`)
        p.querySelector(".profile-avatar").classList.add(`border-2`, `border-slate-600`)
    })
    profileCard.classList.remove(`border-2`, `border-slate-600`)
    profileCard.classList.add(`border-2`, `border-amber-500/70`)
    profileCard.querySelector(".profile-avatar").classList.remove(`border-2`, `border-slate-600`)
    profileCard.querySelector(".profile-avatar").classList.add(`border-2`, `border-amber-500/70`)
    let profileName = profileCard.getAttribute("data-nickname")
    let profileIcon = profileCard.querySelector(".profile-avatar").getAttribute("data-icon")
    let activeProfile = {nickname: profileName, avatar: profileIcon}
    setActiveProfile(activeProfile)
    }
    loginRendering(loginSection)
    })

// remove active
let desconnectBtn = document.querySelector("#desconnect") 
desconnectBtn.addEventListener("click", () => {
    removeActiveProfile()
    loginRendering(loginSection)
    window.location.reload()
})

    

    

   

    

    

