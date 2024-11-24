function inserirResultado() {
    const sectionPontuacao = document.querySelector(".pontuacao")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = ` 
        <strong>${pontos}</strong>

        <p>de 5</p>
    `
}

inserirResultado()