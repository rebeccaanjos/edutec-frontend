function carregarRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    console.log("Ranking carregado:", ranking); // Debug

    const divRankings = document.querySelectorAll(".ranking");

    ranking.forEach((jogador, index) => {
        if (divRankings[index]) {
            divRankings[index].querySelector(".name").textContent = jogador.nome;
            divRankings[index].querySelector(".score").textContent = `${jogador.pontos} de 5`;
        }
    });
}

document.addEventListener("DOMContentLoaded", carregarRanking);







