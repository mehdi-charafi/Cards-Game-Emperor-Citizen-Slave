import { gameState, resetGameState } from "./gameState.js"
import { addHistory, getActiveProfile, getHistory, saveHistory } from "./storage.js"


let sections = document.querySelectorAll("section")

// nav buttons
export function toHome() {
    let home = document.querySelector("section")
    sections.forEach(s => s.classList.add("hidden"))
    home.classList.remove("hidden")
    resetGameState()
}
export function toRules() {
    let rules = document.querySelector("#rules")
    sections.forEach(s => s.classList.add("hidden"))
    rules.classList.remove("hidden")
}
export function toHistory() {
    let history = document.querySelector("#history")
    sections.forEach(s => s.classList.add("hidden"))
    history.classList.remove("hidden")
}

export function toGamePlay() {
    let gamePlay = document.querySelector("#gameplay")
    sections.forEach(s => s.classList.add("hidden"))
    gamePlay.classList.remove("hidden")
}

export function historyRender(name, result) {
    let history = getHistory()
    if(name)history = history.filter(h => h.nickname.toLowerCase().includes(name.toLowerCase()))
    if(result && result != "all")history = history.filter(h => h.result == result)
    let historySection = document.querySelector("#history-container") 
    let icon = ""
    historySection.innerHTML = ""
    history.forEach(h => {
    if(h.result == "Vectory" )icon = "game-icons:trophy"
    else if(h.result == "Defeat") icon = "game-icons:skull-crossed-bones"
    else icon = "game-icons:scales"
    historySection.innerHTML += `
    <div class="bg-slate-950/80 border-2 border-slate-700 p-4 rounded-2xl shadow-lg flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="iconify text-amber-400 w-10 h-10 flex-shrink-0" data-icon="${icon}"></span>
          <div class="text-left">
            <p class="text-amber-100 font-bold text-lg">${h.result}</p>
            <p class="text-slate-400 text-xs">Score: ${h.score} | Rounds: 12/12</p>
          </div>
        </div>
        <span class="text-emerald-400 font-semibold text-sm bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-lg"><span class="iconify text-amber-400 w-13 h-13 border-2 border-slate-600 rounded-xl" data-icon="${h.avatar}"></span><p>${h.nickname}</p></span>
      </div>
    `
})
}

export function deleteHistory() {
     let historySection = document.querySelector("#history-container")
     historySection.innerHTML = ""
}

export function staticsRender() {
    let s = gameState
    let activeP = getActiveProfile()
    
    // Desktop
    let roundStatic = document.querySelector("#rounds")
    let groupStatic = document.querySelector("#group")
    let campStatic = document.querySelector("#Camp")
    let scoreStatic = document.querySelector("#points")
    let playerScore = document.querySelector("#playerscore")
    let botScore = document.querySelector("#botscore")
    let playerName = document.querySelector("#playername")
    let playerIcon = document.querySelector("#playericon")

    // Mobile
    let playerScoreMobile = document.querySelector("#playerscore-mobile")
    let botScoreMobile = document.querySelector("#botscore-mobile")
    let playerNameMobile = document.querySelector("#playername-mobile")
    let playerIconMobile = document.querySelector("#playericon-mobile")

    // General statics
    if (roundStatic) roundStatic.textContent = `Rounds: ${s.round}/12`
    if (groupStatic) groupStatic.textContent = `Group: ${s.group}/4`
    if (campStatic) campStatic.textContent = `Camp: ${s.currentCamp}`
    if (scoreStatic) scoreStatic.textContent = `Score: ${s.playerScore}`
    
    // Players Score
    if (playerScore) playerScore.textContent = `Score: ${s.playerScore}`
    if (playerScoreMobile) playerScoreMobile.textContent = `Score: ${s.playerScore}`

    if (botScore) botScore.textContent = `Score: ${s.botScore}`
    if (botScoreMobile) botScoreMobile.textContent = `Score: ${s.botScore}`

    let nickname = activeP && activeP.nickname ? activeP.nickname : "Guest"
    let avatar = activeP && activeP.avatar ? activeP.avatar : "game-icons:spectacle-lenses"

    if (playerName) playerName.textContent = nickname
    if (playerNameMobile) playerNameMobile.textContent = nickname

    if (playerIcon) playerIcon.setAttribute("data-icon", avatar)
    if (playerIconMobile) playerIconMobile.setAttribute("data-icon", avatar)
}

export function playGroundRender(card, botCard) {
    let playerPg = document.querySelector("#player-pg")
    let botPg = document.querySelector("#bot-pg")

    if (card) {
        let name = card.getAttribute("data-card")
        let url = `images/${name}.png`
        
        playerPg.innerHTML = `
        <div data-card="${name}" class="w-36 h-52 [perspective:1000px]">
           <div class="card-inner relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform">
              
              <div class="absolute inset-0 [backface-visibility:hidden] w-full h-full bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
                 <img class="w-full h-full object-cover" src="images/bg-card.jpg">
              </div>

              <div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
                 <img src="${url}" class="w-full h-full object-cover">
              </div>

           </div>
        </div>
        `

        setTimeout(() => {
            let inner = playerPg.querySelector(".card-inner")
            inner.classList.add("[transform:rotateY(180deg)]")
        }, 100)
    }

    if (botCard) {
        let name = botCard.getAttribute("data-card")
        let url = `images/${name}.png`

        botPg.innerHTML = `
        <div data-card="${name}" class="w-36 h-52 [perspective:1000px]">
           <div class="card-inner relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform">
              
              <div class="absolute inset-0 [backface-visibility:hidden] w-full h-full bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
                 <img class="w-full h-full object-cover" src="images/bg-card.jpg">
              </div>

              <div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-slate-900/90 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
                 <img src="${url}" class="w-full h-full object-cover">
              </div>

           </div>
        </div>
        `

        setTimeout(() => {
            let inner = botPg.querySelector(".card-inner")
            inner.classList.add("[transform:rotateY(180deg)]")
        }, 100)
    }
}


export function showGameOver(result) {
    document.querySelector("#gameplay").classList.add("hidden");
    document.querySelector("#profiles").classList.add("hidden");
    document.querySelector("#game-over").classList.remove("hidden");

    const title = document.querySelector("#result-title");
    const subtitle = document.querySelector("#result-subtitle");
    const icon = document.querySelector("#result-icon");
    
    document.querySelector("#summary-player-score").textContent = gameState.playerScore;
    document.querySelector("#summary-bot-score").textContent = gameState.botScore;
    
    let pav = document.querySelector("#pav");
    if (pav) {
        pav.setAttribute("data-icon", getActiveProfile().avatar);
    }

    if (result == "Vectory") {
        title.textContent = "VICTORY!";
        title.className = "text-4xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]";
        subtitle.textContent = "Congratulations! You defeated the Bot.";
        icon.setAttribute("data-icon", "game-icons:trophy");
        icon.setAttribute("class", "iconify text-amber-400 w-24 h-24 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]");
    } else if (result == "Defeat") {
        title.textContent = "DEFEAT!";
        title.className = "text-4xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-600 to-rose-900 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]";
        subtitle.textContent = "The Bot has won this match. Better luck next time!";
        icon.setAttribute("data-icon", "game-icons:skull-crossed-bones");
        icon.setAttribute("class", "iconify text-red-500 w-24 h-24 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]");
    } else {
        title.textContent = "DRAW!";
        title.className = "text-4xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]";
        subtitle.textContent = "It's an even match!";
        icon.setAttribute("data-icon", "game-icons:scales");
        icon.setAttribute("class", "iconify text-slate-400 w-24 h-24");
    }

    addHistory(result);
}