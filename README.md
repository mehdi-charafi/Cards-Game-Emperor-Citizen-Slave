🃏 Emperor, Citizen, Slave — Web Game

An interactive, responsive strategy card game built with modern native JavaScript, Tailwind CSS CLI, and HTML5. Play against an AI opponent in the legendary high-stakes psychological card duel!

🌟 Overview

Emperor, Citizen, Slave is a tactical card game inspired by the famous strategy dynamics of the Kaiji universe. Players match their tactical skills against an automated bot across multiple rounds, balancing risk between the powerful Emperor, reliable Citizens, and the underdog Slave.

The project features a sleek, dark-fantasy themed UI, real-time match state persistence, profile management, and a comprehensive match history tracker.

🎯 Game Rules & Hierarchy

The core dynamic follows a modified Rock-Paper-Scissors hierarchy:

    ┌──────────┐
    │ Emperor  │ ─────────▶ Defeats ─────────▶ ┌──────────┐
    └──────────┘                               │ Citizen  │
         │                                     └──────────┘
      Beaten                                         │
        by                                        Equal
         │                                           │
         ▼                                           ▼
    ┌──────────┐                               ┌──────────┐
    │  Slave   │ ◀───────── Defeats ───────────│ Citizen  │
    └──────────┘                               └──────────┘


Emperor vs. Citizen: Emperor Wins (+1 Point)

Citizen vs. Slave: Citizen Wins (+1 Point)

Slave vs. Emperor: Slave Wins (Upset Victory: +5 Points!)

Same Cards: Tie (0 Points)

Match Format

Total Rounds: 12 Rounds divided into 4 Groups (3 rounds per group).

Camps: Players alternate roles between the Emperor Camp and Slave Camp.

🚀 Key Features

👤 Profile Management: Create custom player profiles with personalized avatars and saved progress.

💾 Real-time Persistence: LocalStorage integration preserves active match state, round progress, and statistics upon page refresh.

📊 Match History & Analytics: Filter and search through previous game results (Victories, Defeats, Ties) by player name or date.

📱 Fully Responsive UI: Crafted with Tailwind CSS CLI for seamless play across mobile, tablet, and desktop devices.

⚡ Zero-Framework Performance: Powered by clean native ES Modules and modern JavaScript.

🛠️ Tech Stack & Tools

Frontend Framework: Vanilla JavaScript (ES Modules)

Styling: Tailwind CSS (v4 CLI workflow)

Icons: Iconify Framework

Storage: Native Browser localStorage API

Deployment: GitHub Pages

📂 Project Structure

.
├── index.html          # Main HTML entry point
├── package.json        # Dependencies & compilation scripts
├── src/
│   ├── input.css       # Tailwind CSS entry directives
│   ├── output.css      # Compiled Tailwind CSS output
│   ├── main.js         # Application bootstrap & event listeners
│   ├── game.js         # Core game mechanics & card logic
│   ├── gameState.js    # State management controller
│   ├── players.js      # Profile validation & rendering logic
│   ├── storage.js      # LocalStorage wrapper functions
│   └── ui.js           # DOM UI rendering & view transitions
└── images/             # Static card assets & background textures


🔧 Local Development Setup

To run this project locally and work on the styling:

Clone the Repository:

git clone https://github.com/mehdi-charafi/Cards-Game-Emperor-Citizen-Slave.git
cd Cards-Game-Emperor-Citizen-Slave


Install Dependencies:

npm install


Start Tailwind CSS Watch Mode:

npm run watch


Launch Live Server:

Open index.html in VS Code.

Right-click and choose "Open with Live Server" (or click Go Live).

📜 License

This project is created for educational and assessment purposes as part of the Web Development Brief. Feel free to explore, clone, and improve!
