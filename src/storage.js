import { gameState, resetGameState } from './gameState.js'
import { historyRender } from './ui.js';

// profiles
export function getProfiles() {
    const data = localStorage.getItem("profiles")
    return data ? JSON.parse(data) : [];
}

export function saveProfiles(profilesArray) {
    localStorage.setItem("profiles", JSON.stringify(profilesArray))
}

export function addProfiles(newProfile) {
    let profiles = getProfiles()
    if(profiles.some(p => p.nickname == newProfile.nickname)) {
        alert("The nickname is already used")
        return false
    }
    profiles.push(newProfile)
    saveProfiles(profiles)
    return true
}

export function removeProfiles(profileName) {
    let profiles = getProfiles()
    if(!window.confirm("Are you sure ?"))return
    profiles = profiles.filter((p) => p.nickname != profileName)
    saveProfiles(profiles)
    window.location.reload()
}

// active profile
export function getActiveProfile() {
    const data = localStorage.getItem("activeprofile")
    return data ? JSON.parse(data) : {};
}
export function saveActiveProfile(activeP) {
    localStorage.setItem("activeprofile", JSON.stringify(activeP))
}

export function setActiveProfile(activeP) {
    saveActiveProfile(activeP)

}

export function removeActiveProfile() {
    saveActiveProfile({})
}

// History 
export function addHistory(result) {
    let history = getHistory()
        let hObj = {
        nickname: getActiveProfile().nickname,
        avatar: getActiveProfile().avatar,
        result: result,
        score: gameState.playerScore
        }
        history.push(hObj)
        saveHistory(history)
}

export function saveHistory(history) {
    localStorage.setItem("history", JSON.stringify(history))
}

export function getHistory(sort) {
    let data = localStorage.getItem("history")
    return data ? JSON.parse(data) : [];
    
}

export function clearHistory() {
    if(confirm("Are you sure ?")) {
    let history = []
    saveHistory(history)
    historyRender()
    }
}