let sections = document.querySelectorAll("section")

export function toHome() {
    let home = document.querySelector("section")
    sections.forEach(s => s.classList.add("hidden"))
    home.classList.remove("hidden")
    
    
}

export function toGamePlay() {
    let gamePlay = document.querySelector("#gameplay")
    sections.forEach(s => s.classList.add("hidden"))
    gamePlay.classList.remove("hidden")
}