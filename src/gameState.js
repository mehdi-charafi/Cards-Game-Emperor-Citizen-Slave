
export const gameState = {
    round: 1,
    group: 1,
    currentCamp: "Emperor", 
    playerScore: 0,
    botScore: 0,
    playerHand: [],
    botHand: []
};

export function resetGameState() {
    gameState.round = 1;
    gameState.group = 1;
    gameState.currentCamp = "Emperor";
    gameState.playerScore = 0;
    gameState.botScore = 0;
    gameState.playerHand = [];
    gameState.botHand = [];
}