import { gameState , saveGame, resetGameState} from "./gameState"
import { staticsRender, historyRender, deleteHistory, playGroundRender, showGameOver } from "./ui"

//Deck
let emperorCards = [{name: "emperor", url: "images/emperor.png"}, {name: "citizen", url: "images/citizen.png"}, {name: "citizen", url: "images/citizen.png"}, {name: "citizen", url: "images/citizen.png"}, {name: "citizen", url: "images/citizen.png"}]
let slaveCards = [{name: "slave", url: "images/slave.png"}, {name: "citizen", url: "images/citizen.png"}, {name: "citizen", url: "images/citizen.png"}, {name: "citizen", url: "images/citizen.png"}, {name: "citizen", url: "images/citizen.png"}]

// Duel

export function duel(PlayerCard, BotCard) {
   let winner = gameRule(PlayerCard, BotCard)
   if (winner == PlayerCard)return "vectory"
   else if ( winner == BotCard)return "defeat"
   else return winner
}

function gameRule(PlayerCard, BotCard) {
if (PlayerCard === BotCard) {
      return "equal";
   }
   else if ((PlayerCard === "emperor" && BotCard === "citizen") || (PlayerCard === "citizen" && BotCard === "emperor")) {
      return "emperor";
   }
   else if ((PlayerCard === "slave" && BotCard === "citizen") || (PlayerCard === "citizen" && BotCard === "slave")) {
      return "citizen";
   }
   else if ((PlayerCard === "emperor" && BotCard === "slave") || (PlayerCard === "slave" && BotCard === "emperor")) {
      return "slave";
   }
   return "equal";
}

export function distripution(card, botCard) {
   
   let playerSpace = document.querySelector("#playercards")
       let botSpace = document.querySelector("#botcards")
   if (gameState.group === 2 || gameState.group === 4) {
      gameState.playerHand = [...slaveCards]
      gameState.botHand = [...emperorCards]
   } else {
      gameState.playerHand = [...emperorCards]
      gameState.botHand = [...slaveCards]
   }
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
saveGame()
}

export function game(card, cardType) {
let random = Math.floor(Math.random() * gameState.botHand.length)
let botCardType = gameState.botHand[random].name
let botCardsSection = document.querySelector("#botcards")
let botCards = Array.from(botCardsSection.querySelectorAll(".card"))
let botCard = botCards.find(c => c.getAttribute("data-card") == botCardType && !c.classList.contains("hidden"))

   removeCard(card, botCard, cardType, botCardType)
   playGroundRender(card, botCard)

   setTimeout(() => {
      let result = duel(cardType, botCardType)

      if(result == "vectory") {
         if(cardType == "slave") {
            gameState.playerScore += 5
         } else { 
            gameState.playerScore += 1
         }
         staticsRender()
       
      } else if(result == "defeat") {
         if(botCardType == "slave") {
            gameState.botScore += 5
         } else {
            gameState.botScore += 1
         }
         staticsRender()
         
      }

      
      if(gameState.playerHand.length == 0) {
         if(gameState.round == 3 || gameState.round == 6 || gameState.round == 9) {
            gameState.group += 1
         }
         if(gameState.round == 12) {
            let result = ""
         if(gameState.playerScore > gameState.botScore)result="Vectory"
         else if (gameState.playerScore < gameState.botScore)result="Defeat"
         else result = "Tie"
         showGameOver(result)
         resetGameState()
         return
      }
         gameState.round += 1
         staticsRender()
         distripution()
      }
      saveGame()
      
   }, 1000); 
   
}

function removeCard(playerCard, botCard , cardType, botCardType) {
playerCard.classList.add("hidden")
botCard.classList.add("hidden")
let index1 = gameState.playerHand.findIndex(c => c.name == cardType)
gameState.playerHand.splice(index1, 1)
let index2 = gameState.botHand.findIndex(c => c.name == botCardType)
gameState.botHand.splice(index2, 1)
}

