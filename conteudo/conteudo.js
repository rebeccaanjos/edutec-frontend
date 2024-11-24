let contador = 0;
let contents = [];

// Carregar o conteúdo do data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    contents = data.contents;
    loadContent(contador); // Carrega o primeiro conteúdo inicialmente
  })

function loadContent(index) {
  if (index >= 0 && index < contents.length) {
    const content = contents[index];

    // Monta o conteúdo HTML dinamicamente
    let html = content.mainContent;

    if (content.p) {
      html += content.p;
    }

    // Verifica se existem itens na lista e cria a lista dinamicamente abaixo do parágrafo
    if (content.listItems && content.listItems.length > 0) {
      html += '<ul>';
      content.listItems.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += '</ul>';
    }

    if (content.imageHTML) {
      html += content.imageHTML;
    }

    document.getElementById('main-content').innerHTML = html;

    
    // Controle de visibilidade das setas
    document.querySelector('.seta-voltar').style.display = index > 0 ? 'block' : 'none';

    // Esconde a seta de próximo na última página
    if (index === 10) { // Página 11
      document.querySelector('.seta').style.display = 'none';
    } else {
      document.querySelector('.seta').style.display = 'block';
    }
  }
}

// Carrega a próxima página
document.getElementById('seta').addEventListener('click', function (event) {
  event.preventDefault();
  if (contador < contents.length - 1) { // Limita a navegação até a página 11
    contador++;
    loadContent(contador);
  }
});

// Carrega a página anterior
document.getElementById('seta-voltar').addEventListener('click', function (event) {
  event.preventDefault();
  if (contador > 0) { // Limita a navegação para não ultrapassar o índice 0
    contador--;
    loadContent(contador);
  }
});



//4bimestre
import { verifyToken } from "../utils/verify-token.js"

const url = "../login/login.html"

verifyToken(url)