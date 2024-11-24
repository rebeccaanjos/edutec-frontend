export async function getName() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado!");
        return;
    }

    try {
        const response = await fetch("https://edutec-backend.vercel.app/getname", {
            headers: {
                "Authorization": token,
            },
        }).then((response) => response.json());

        // Atualiza o elemento com o nome do usuário
        const nameP = document.querySelector(".user p");
        if (response.name) {
            nameP.innerText = `Usuário: ${response.name}`;
        } else {
            nameP.innerText = "Usuário não encontrado";
        }
    } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
    }
}
