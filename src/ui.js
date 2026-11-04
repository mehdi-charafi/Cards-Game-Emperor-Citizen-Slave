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


export function showGameOver() {
    document.querySelector("#gameplay").classList.add("hidden");
    document.querySelector("#profiles").classList.add("hidden");
    document.querySelector("#game-over").classList.remove("hidden");

    const title = document.querySelector("#result-title");
    const subtitle = document.querySelector("#result-subtitle");
    const icon = document.querySelector("#result-icon");
    
    document.querySelector("#summary-player-score").textContent = gameState.playerScore;
    document.querySelector("#summary-bot-score").textContent = gameState.botScore;
    document.querySelector("#pav").setAttribute("data-icon", getActiveProfile().avatar)

    if (gameState.playerScore > gameState.botScore) {
        title.textContent = "VICTORY!";
        title.className = "text-4xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]";
        subtitle.textContent = "Congratulations! You defeated the Bot.";
        icon.setAttribute("data-icon", "game-icons:trophy");
        icon.className = "iconify text-amber-400 w-24 h-24 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]";
    } else if (gameState.playerScore < gameState.botScore) {
        title.textContent = "DEFEAT!";
        title.className = "text-4xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-600 to-rose-900 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]";
        subtitle.textContent = "The Bot has won this match. Better luck next time!";
        icon.setAttribute("data-icon", "game-icons:skull-crossbones");
        icon.className = "iconify text-red-500 w-24 h-24 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]";
    } else {
        title.textContent = "DRAW!";
        title.className = "text-4xl md:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]";
        subtitle.textContent = "It's an even match!";
        icon.setAttribute("data-icon", "game-icons:scales");
        icon.className = "iconify text-slate-400 w-24 h-24";
    }
}