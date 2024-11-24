let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let idInputResposta = "";
let respostaCorretaId = "";

// Função para buscar o nome do usuário diretamente do localStorage
async function getName() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/getname", {
            headers: {
                "Authorization": token,
            },
        });

        if (!response.ok) {
            throw new Error("Falha ao buscar nome do usuário.");
        }

        const data = await response.json();
        const nameP = document.querySelector(".user p");

        if (nameP) {
            nameP.innerText = `Usuário: ${data.name}`;
        }
    } catch (error) {
        console.error("Erro ao buscar o nome:", error);
    }
}

async function buscarPerguntas() {
    const urlDados = "../../data.json";

    await fetch(urlDados)
        .then((resposta) => resposta.json())
        .then((dados) => {
            dados.quiz.forEach((dado) => {
                quiz = dado;
            });
        });
}

function montarPergunta() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="pergunta">
            <p>Pergunta ${pergunta}/5</p>
            <div class="barra_progresso">
                <div style="width: ${pergunta * 20}%"></div>
            </div>
            <h2>${quiz.questions[pergunta - 1].question}</h2>
        </section>

        <section class="alternativas">
            <form action="">
                ${quiz.questions[pergunta - 1].options
                    .map(
                        (option, index) => `
                    <label for="alternativa_${index}">
                        <input type="radio" id="alternativa_${index}" name="alternativa" value="${option}">
                        <div>${option}</div>
                    </label>`
                    )
                    .join("")}
            </form>
            <a href="">
                <button>Responder</button>
            </a>
        </section>
    `;
}

function guardarResposta(evento) {
    resposta = evento.target.value;
    idInputResposta = evento.target.id;

    const botaoEnviar = document.querySelector(".alternativas button");
    botaoEnviar.addEventListener("click", validarResposta);
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".alternativas button");
    botaoEnviar.innerText = "Próxima";
    botaoEnviar.removeEventListener("click", validarResposta);

    if (pergunta === 5 ) {
        botaoEnviar.innerText = "Finalizar";
        botaoEnviar.addEventListener("click", finalizar);
    } else {
        botaoEnviar.addEventListener("click", proximaPergunta);
    }

    if (resposta === quiz.questions[pergunta - 1].answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta");
        pontos++;
    } else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada");
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta");
    }

    event.preventDefault();
    pergunta++;
}

function finalizar() {
    localStorage.setItem("pontos", pontos);
    window.location.href = "../ranking/ranking.html";
    event.preventDefault();
}

function proximaPergunta() {
    event.preventDefault();
    montarPergunta();
    adicionarEventoInputs();
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input");
    inputsResposta.forEach((input) => {
        input.addEventListener("click", guardarResposta);

        if (input.value === quiz.questions[pergunta - 1].answer) {
            respostaCorretaId = input.id;
        }
    });
}

function salvarRanking(nome, pontos) {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({ nome, pontos, timestamp: Date.now() });

    ranking.sort((a, b) => {
        if (b.pontos === a.pontos) {
            return a.timestamp - b.timestamp;
        }
        return b.pontos - a.pontos;
    });

    ranking = ranking.slice(0, 3);

    localStorage.setItem("ranking", JSON.stringify(ranking));
    console.log("Ranking atualizado:", ranking); // Debug
}

function finish() {
    const nome = document.querySelector(".user p").innerText.replace("Usuário: ", "");
    salvarRanking(nome, pontos);

    window.location.href = "../ranking/ranking.html";
}










async function iniciar() {
    // Carrega as perguntas e monta o quiz
    await buscarPerguntas();
    montarPergunta();
    adicionarEventoInputs();

    // Carrega o nome do usuário
    getName();
}

iniciar();


//4 bimestre

