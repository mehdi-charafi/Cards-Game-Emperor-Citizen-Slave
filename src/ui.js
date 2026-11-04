import { gameState } from "./gameState"
import { getActiveProfile } from "./storage"

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

export function staticsRender() {
    let s = gameState
    let activeP = getActiveProfile()
    let roundStatic = document.querySelector("#rounds")
    let groupStatic = document.querySelector("#group")
    let campStatic = document.querySelector("#Camp")
    let scoreStatic = document.querySelector("#points")
    let playerScore = document.querySelector("#playerscore")
    let botScore = document.querySelector("#botscore")
    let playerName = document.querySelector("#playername")
    let playerIcon = document.querySelector("#playericon")
   

    roundStatic.textContent = `Rounds: ${s.round}/12`
    groupStatic.textContent = `Group: ${s.group}/4`
    campStatic.textContent = `Actual Camp: ${s.currentCamp}`
    scoreStatic.textContent = `Score: ${s.playerScore}`
    playerScore.textContent = `Score: ${s.playerScore}`
    botScore.textContent = `Score: ${s.botScore}`
    playerName.textContent = `${activeP.nickname}`
    playerIcon.setAttribute("data-icon", `${activeP.avatar}`);
    console.log(playerIcon)
    
}

export function playGroundRender(card, botCard) {
    let playerPg = document.querySelector("#player-pg")
    let botPg = document.querySelector("#bot-pg")

    playerPg.innerHTML = ""
    botPg.innerHTML = ""

    if (card) {
        let playerClone = card.cloneNode(true)
        playerClone.classList.remove("hidden") 
        playerPg.appendChild(playerClone)
    }

    if (botCard) {
        let url = `${botCard.getAttribute("data-card")}.png`
        let name = botCard.getAttribute("data-card")
        botPg.innerHTML = `
   <div data-card="${name}" class="card w-36 h-52 bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber-500/70 hover:scale-105 cursor-pointer">
   <img src="${url}">
   </div>
   `
    }
}
