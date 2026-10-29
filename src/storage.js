let profiles = JSON.parse(localStorage.getItem("profiles")) || []
let activeProfile = JSON.parse(localStorage.getItem("activeprofile")) || {}

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

