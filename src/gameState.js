
export const gameState = {
    round: 1,
    group: 1,
    currentCamp: "Emperor", 
    playerScore: 0,
    botScore: 0,
    playerHand: [],
    botHand: []
};

export function saveGame() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

export function loadGame() {
    Object.assign(gameState, JSON.parse(localStorage.getItem("gameState") || "{}"))}


export function resetGameState() {
    gameState.round = 1;
    gameState.group = 1;
    gameState.currentCamp = "Emperor";
    gameState.playerScore = 0;
    gameState.botScore = 0;
    gameState.playerHand = [];
    gameState.botHand = [];

    localStorage.removeItem("gameState");
}


loadGame()