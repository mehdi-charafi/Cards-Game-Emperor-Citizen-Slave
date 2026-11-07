
import {loginRendering, nicknameValidation, profileRendering, selectedProfile} from "./players.js"
import { addProfiles, removeProfiles, setActiveProfile, removeActiveProfile, getActiveProfile, clearHistory } from "./storage.js"
import { toHome, toGamePlay, toRules, toHistory, staticsRender, historyRender } from './ui.js'
import { gameState, resetGameState } from './gameState.js'
import { distripution, game } from './game.js'



//Start
let profilesSection = document.querySelector("#exist-profiles")
let loginSection = document.querySelector("#login")
profileRendering(profilesSection)
loginRendering(loginSection)
selectedProfile(profilesSection)
historyRender()


// Load game
if (gameState.round > 1 && gameState.round < 12) {
    toGamePlay();
    staticsRender();
     
    let playerSpace = document.querySelector("#playercards")
       let botSpace = document.querySelector("#botcards")
       playerSpace.innerHTML = ""
gameState.playerHand.forEach(c => {
   playerSpace.innerHTML += `
   <div data-card="${c.name}" class="card w-36 h-52 bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber-500/70 hover:scale-105 cursor-pointer">
   <img src="${c.url}">
   </div>
   `
});
botSpace.innerHTML = ""
gameState.botHand.forEach(c => {
   botSpace.innerHTML += `
   <div data-card="${c.name}" class="card overflow-hidden bg-cover bg-center w-36 h-52 bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
   <img class="w-full h-full object-cover" src="images/bg-card.jpg">
   </div>
   `
});
}


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
        if(addProfiles(newProfile)) {
        profileRendering(profilesSection)
        submitMessage.textContent = "Your profile is added!"
        submitMessage.style.color = "green"
        form.reset()
        }
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

    
// Navigations

// home
let homeBtn = document.querySelectorAll(".home")
homeBtn.forEach(b => b.addEventListener("click", () => toHome()))

// rules
let rulesBtn = document.querySelector("#rules-btn") 
rulesBtn.addEventListener("click", () => toRules())

// history
let historyBtn = document.querySelector("#history-btn")
historyBtn.addEventListener("click", () => toHistory())

//clear history
let clearBtn = document.querySelector("#clear-history-btn")
clearBtn.addEventListener("click", () => clearHistory())

// history search by name & filter
let searchBtn = document.querySelector("#history-search")
let selectBtn = document.querySelector("#filter-result")
let name = ""
let result = ""
searchBtn.addEventListener("input", (event) => {
      name = event.target.value
    historyRender(name, result)
})
selectBtn.addEventListener("change", (event) => {
    result = event.target.value
    historyRender(name, result)
})


// GameStart
let play = document.querySelectorAll(".play")
play.forEach(b => b.addEventListener("click", () => {
    resetGameState()
    toGamePlay()
    distripution()
    staticsRender()
}))

//GamePlay
let playerCards = document.querySelector("#playercards")

   playerCards.addEventListener("click", (event) => {
    if(!event.target.closest(".card"))return
    let cardType = event.target.closest(".card").getAttribute("data-card")
    let card = event.target.closest(".card")
    game(card, cardType)
    staticsRender()
   })

//Service Worker
   if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker Registered Successfully!'));
}

   

    

    

