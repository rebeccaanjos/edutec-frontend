// register-score.js
export async function registerScore(score) {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/ranking", {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result.message);
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Erro ao registrar pontuação:", error);
    }
}          





