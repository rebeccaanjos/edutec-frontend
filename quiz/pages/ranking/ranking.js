// ranking.js
import { registerScore } from "./register-score.js";

async function fetchRanking() {
    try {
        const response = await fetch("http://localhost:3000/ranking");
        const rankingData = await response.json();

        const container = document.querySelector("main");
        container.innerHTML = "<h1>RANKING</h1>";

        rankingData.forEach((player, index) => {
            // Atribui a medalha com base na pontuação
            const medalImg =
                player.score >= 5 ? "/imgs/ouro.png" : 
                player.score >= 4 ? "/imgs/prata.png" : 
                player.score >= 3 ? "/imgs/bronze.png" : null;

            const rankingDiv = document.createElement("div");
            rankingDiv.className = "ranking";

            // Adiciona o conteúdo do ranking, incluindo a medalha e pontuação
            rankingDiv.innerHTML = `
                ${medalImg ? `<img src="${medalImg}" alt="medalha">` : ""}
                <div class="div">
                    <span class="name">${player.name}</span>
                    <span class="score">${player.score} pontos</span>
                </div>
            `;

            container.appendChild(rankingDiv);
        });
    } catch (error) {
        console.error("Erro ao carregar o ranking:", error);
    }
}

// Função para finalizar o jogo e atualizar o ranking
async function endGameAndUpdateRanking(finalScore) {
    // Registra a pontuação
    await registerScore(finalScore);

    // Atualiza o ranking exibido na tela
    await fetchRanking();
}

// Exemplo de chamada ao término do jogo
const finalScore = 5; // Substitua pela lógica de pontuação do seu jogo
endGameAndUpdateRanking(finalScore);
