// Duel

export function duel(PlayerCard, BotCard) {
   let winner = gameRule(PlayerCard, BotCard)
   if (winner == PlayerCard)return "vectory"
   else if ( winner == BotCard)return "Defeat"
   else return winner
}

function gameRule(PlayerCard, BotCard) {
if(PlayerCard == BotCard)return "equal"
   else if (PlayerCard == "emperor" && BotCard == "citizen" || PlayerCard == "citizen" && BotCard == "emperor")return "emperor"
   else if (PlayerCard == "slave" && BotCard == "citizen" || BotCard == "citizen" && PlayerCard == "slave")return "citizen"
   else if (PlayerCard == "emperor" && BotCard == "slave" || BotCard == "slave" && PlayerCard == "emperor")return "slave"
}