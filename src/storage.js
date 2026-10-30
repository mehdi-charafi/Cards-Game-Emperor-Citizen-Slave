import { loginRendering } from "./players";

let profiles = JSON.parse(localStorage.getItem("profiles")) || []
let activeProfile = JSON.parse(localStorage.getItem("activeprofile")) || {}

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
    profiles.push(newProfile)
    saveProfiles(profiles)
}

export function removeProfiles(profileName) {
    let profiles = getProfiles()
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
    activeProfile = activeP
    saveActiveProfile(activeProfile)

}

export function removeActiveProfile() {
    activeProfile = {}
    saveActiveProfile(activeProfile)
}